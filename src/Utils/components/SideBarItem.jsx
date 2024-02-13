import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "./../Icons";

const SideBarItem = ({ item, active, expanded }) => {
  return (
    <NavLink
      to={item.path}
      className={` inline-flex items-center gap-2 h-[60px] px-2 rounded-md ${active?'bg-blue-400 text-white dark:bg-blue-900 dark:bg-opacity-50':""}`}
    >
      <div className={`  flex-row items-center ${expanded ? '': "p-2"}`}>
        <Icon name={item.icon} size={25} />
      </div>
      <h5 className={` overflow-hidden ${expanded ? "w-auto" : "hidden"} `}>
        {item.title}
      </h5>
    </NavLink>
  );
};

export default SideBarItem;
