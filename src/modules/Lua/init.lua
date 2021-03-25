local print_ = print; -- if they set print to nil or some shit (lol)
local functionEnv = (getfenv or function() 
	return _ENV;
end)(0);

local function formatConstant(arg1)
	return (("%s"):format(functionEnv[arg1] and arg1 or type(arg1) == "string" and ("\"%s\""):format(arg1) or arg1));
end;

os = nil;
io = nil;