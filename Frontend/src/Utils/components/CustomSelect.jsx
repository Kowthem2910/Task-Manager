import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomSelect = ({ title, options, value, onChange }) => {
  return (
    <Select onValueChange={(e) => onChange(e)} value={value} className="w-[80px]">
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
