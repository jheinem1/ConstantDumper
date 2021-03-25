const { readFileSync, writeFileSync, unlinkSync } = require("fs");
const { randomBytes } = require("crypto");
const { Beautify } = require("./modules/luamin");
const { exec } = require("child_process");
 
const initScript = readFileSync("./src/modules/Lua/init.lua", "utf-8");
const Input = Beautify(readFileSync("input.lua", "utf-8"), {
    RenameVariables: true
});

function execScript(script, fileName) {
    return new Promise((resolve) => {
        writeFileSync(fileName, initScript+script);
        exec(`lua ${fileName}`, (error, stdout, stderr) => {
            resolve(stdout);
        });
    });
};

async function saveOutput(script) {
    const fileName = randomBytes(4).toString("hex") + ".lua";
    const output = await execScript(script, fileName);

    let constants = "";
    let pos = 1;
    output.split("\n").forEach(line => {
        if (!line.length) return;
        constants+=`\t[${pos}] = ${line.trim()},\n`;
        pos++;
    });

    constants = `local Constants = {\n\t[0] = "dumped using dsf's dumper https://discord.gg/tPXUvFF4uH",\n${constants.slice(0, -2)}\n};`;

    unlinkSync(fileName);
    writeFileSync("constants.lua", "--[[\n\tDumped using dsf's dumper https://discord.gg/tPXUvFF4uH\n--]]\n\n"+constants);
    console.timeEnd("Dumped in");
};

function foundObfuscator(name) {
    console.log(`Recognized obfuscator: ${name}\nhttps://discord.gg/tPXUvFF4uH`);
    console.time("Dumped in");

    try {
        require(`./modules/obfuscators/${name}`)(Input, saveOutput); // retarded ik
    } catch (er) {
        console.log(er);
    };
};


if (Input.match(/\("PSU\|.*?"\)/)) {
    return foundObfuscator("PSU");
} else if (Input.match(/"LPH!.*?"/)) {
    return foundObfuscator("Luraph");
} else if (Input.match(/"\.\.:::MoonSec::\.\..*?"/)) {
    return foundObfuscator("Moonsec");
} else if (Input.match(/\.\w+, \w+\);/)) {
    return foundObfuscator("Aztup");
};

console.log("Unsupported obfuscator!");