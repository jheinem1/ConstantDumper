local serializer = require("serializer")

local print_ = print; -- if they set print to nil or some shit (lol)
local functionEnv = (getfenv or function() 
	return _ENV;
end)(0);

local function formatConstant(arg1)
	return serializer.valueToString(arg1);
end;

os = nil;
io = nil;