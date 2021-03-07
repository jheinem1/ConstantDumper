const { readFileSync, writeFileSync, unlinkSync } = require("fs");
const { Beautify } = require("./modules/luamin");
const { exec } = require("child_process");
 
const initScript = readFileSync("./src/modules/Lua/init.lua", "utf-8");
const Input = Beautify(readFileSync("input.lua", "utf-8"), {
    RenameVariables: true
});

function execScript(script) {
    return new Promise((resolve, reject) => {
        writeFileSync("temp.lua", initScript+script);
        exec("lua temp.lua", (error, stdout, stderr) => {
            resolve(stdout);
        });
    });
};

function saveOutput(output) {
    unlinkSync("temp.lua");
    writeFileSync("constants.txt", "-- Dumped using dsf's dumper\n\n"+output);
};

function foundObfuscator(name) {
    console.log(`Recognized obfuscator: ${name}`);
    console.time(`Dumped in`);

    try {
        require(`./modules/obfuscators/${name}`)(Input, execScript, saveOutput);
    } catch (er) {
        console.log(er);
    };
};

if (Input.match(/\("PSU\|.*?"\)/)) {
    return foundObfuscator("PSU");
} else if (Input.match(/"LPH!.*?"/)) {
    return foundObfuscator("Luraph");
};