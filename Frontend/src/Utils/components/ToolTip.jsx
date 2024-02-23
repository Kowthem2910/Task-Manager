import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ToolTip = ({ children, Content, expanded }) => {
  return (
    <Tooltip delayDuration={50} disableHoverableContent>
      <TooltipTrigger className=" w-full">{children}</TooltipTrigger>
      {!expanded && (
        <TooltipContent side="right">
          <p>{Content}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default ToolTip;
