async function init(Input, execScript, saveOutput) {
    const execRes = (/^.*?\[\d\]\[\S+.-.\S+\].=.(?<constant>L_\d+_)$/m).exec(Input);
    
    let newScript = Input.replace(execRes[0], `print(formatConstant(${execRes.groups.constant}));`);
    saveOutput(await execScript(newScript));
    console.timeEnd("Dumped in");
};

module.exports = init;