async function init(Input, saveOutput) {
    const wrapFunction = (/local function .*?\((?<chunk>.+),.+,.*, ...\)/).exec(Input);
    const newScript = Input.replace(wrapFunction[0], `${wrapFunction[0]}\nfor i,v in pairs(${wrapFunction.groups.chunk}) do if type(v) == "table" then for I,V in pairs(v) do if type(V) == "string" or type(V) == "number" or type(V) == "boolean" then print_(formatConstant(V)) end end end end; error()`);
    
    saveOutput(newScript);
};

module.exports = init;