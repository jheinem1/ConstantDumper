async function init(Input, saveOutput) {
    const execRes = (/^.*?\[\d\]\[\S+.-.\S+\].=.(?<constant>L_\d+_)$/m).exec(Input);
    const newScript = Input.replace(execRes[0], `print_(formatConstant(${execRes.groups.constant}));`);

    saveOutput(newScript);
};

module.exports = init;