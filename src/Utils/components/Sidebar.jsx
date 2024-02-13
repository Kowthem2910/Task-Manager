import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "../Icons";
import SideBardata from "./constants";
import SideBarItem from "./SideBarItem";

const Sidebar = () => {
  const location = useLocation();
  const isHidden =
    location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/";
  const [expanded, setExpanded] = useState(true);
  return (
    <div
      className={` ${
        isHidden ? " hidden" : ""
      } h-full w-[${expanded ? '300px':'10px'}] bg-blue-100 dark:bg-slate-900 `}
    >
      <nav className=" h-full flex flex-col shadow-sm">
         <div className=" p-4 pb-2 flex justify-between items-center">
          <h3 className={`overflow-hidden transition-all ${expanded ? "w-auto" : "w-0"}`}>TaskManager</h3>
          <Button variant="outline" size="icon" onClick={() => setExpanded(!expanded)}>
            {expanded ? <Icon name="ChevronLeft" /> : <Icon name="ChevronRight" />}
          </Button>
         </div>
         <div className=" flex flex-col h-full px-2 gap-2 mt-8">
          {SideBardata.map((item)=>(
            <SideBarItem key={item.id} item={item} active={location.pathname === item.path} expanded={expanded}/>
          ))}
         </div>
      </nav>
    </div>
  );
};

export default Sidebar;
