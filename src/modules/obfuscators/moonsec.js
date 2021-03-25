let compoundOperators = ["+=", "-=", "*=", "/=", "^=", "..=", "%="];

async function init(Input, saveOutput) {
	let newScript = Input;
	let match = newScript.match(/\w+\[\w+] = (\w+\[\w+\[\w+\]])/g);
	compoundOperators.forEach(operator => {
		newScript = newScript.replace(new RegExp(`.*?\\${operator}.*`, "g"), ""); // Bypasses moonsecs anti dump feature by removing all compound operators (lol)
	});

    if (match[1]) { // retarded ik
        let Res = (/\w+\[\w+] = (\w+\[\w+\[\w+\]])/g).exec(match[1]);
        newScript = newScript.replace(Res[0], `print_(formatConstant(${Res[1]}));`);
    };

    newScript = newScript.replace(/local function \w+\(\w+, \w+, \w+\)/, `local function moonsec_trash____()`);
    saveOutput(newScript);
};

module.exports = init;