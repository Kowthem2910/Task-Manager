import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "../Icons";
import {SideBardata} from "./constants";
import SideBarItem from "./SideBarItem";
import ToolTip from "./ToolTip";

const Sidebar = () => {
  const location = useLocation();
  const isHidden =
    location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/";
  const [expanded, setExpanded] = useState(true);

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
      if (window.innerWidth < 768) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div
      className={` ${
        isHidden ? " hidden" : ""
      } h-full w-[${expanded ? '350px':'10px'}] bg-blue-100 dark:bg-slate-900 `}
    >
      <nav className=" h-full flex flex-col shadow-sm">
         <div className=" p-4 pb-2 flex justify-between items-center ">
          <h4 className={`overflow-hidden transition-all ${expanded ? "w-auto mr-4" : "w-0"}`}>TaskManager</h4>
          <Button variant="outline" size="icon" onClick={() => setExpanded(!expanded)}>
            {expanded ? <Icon name="ChevronLeft" /> : <Icon name="ChevronRight" />}
          </Button>
         </div>
         <div className=" flex flex-col h-full px-2 gap-2 mt-8">
          {SideBardata.map((item)=>(
            <ToolTip Content={item.title} key={item.id} expanded={expanded}>
              <SideBarItem item={item} active={location.pathname === item.path} expanded={expanded}/>
            </ToolTip>
          ))}
         </div>
      </nav>
    </div>
  );
};

export default Sidebar;
