async function init(Input, execScript, saveOutput) {
    const wrapFunction = (/local function .*?\((?<chunk>.+),.+,.*, ...\)/).exec(Input);

    let newScript = Input.replace(wrapFunction[0], `${wrapFunction[0]}\nfor i,v in pairs(${wrapFunction.groups.chunk}) do if type(v) == "table" then for I,V in pairs(v) do if type(V) == "string" or type(V) == "number" then print(I,formatConstant(V)) end end end end; error()`);
    saveOutput(await execScript(newScript));
    console.timeEnd("Dumped in");
};

module.exports = init;