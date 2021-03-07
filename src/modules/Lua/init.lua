local function formatConstant(arg1)
	return (("%s"):format((type(arg1)=="string")and("\"%s\""):format(arg1)or arg1));
end;