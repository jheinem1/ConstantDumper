async function init(Input, saveOutput) {
    const execRes = (/return \w+\((?<finishedStringTable>\w+)\);/).exec(Input);
    const newScript = Input.replace(execRes[0], `print_(formatConstant(table.concat(${execRes.groups.finishedStringTable})));\nreturn ""`);

    saveOutput(newScript);
};

module.exports = init;