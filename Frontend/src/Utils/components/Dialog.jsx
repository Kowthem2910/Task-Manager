import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "../Icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const CustomDialog = ({children, users, handleAddTask, handleDateChange, setSelectedValue, setTaskName, taskName, selectedValue, date, setDate}) => {
  return (
    <div>
      <Dialog>
      <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Tasks</DialogTitle>
                <DialogDescription>
                  Assign Task to the user here.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Select
                    onValueChange={(e) => setSelectedValue(e)}
                    value={selectedValue}
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Select person" />
                    </SelectTrigger>
                    <SelectContent>
                      {users?.map((user) => (
                        <SelectItem key={user.email} value={user.email}>
                          {user.userName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right ">
                    Task Name
                  </Label>
                  <Input
                    placeholder="Enter Task Details"
                    onChange={(e) => setTaskName(e.target.value)}
                    value={taskName}
                    className="w-[280px]"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right ">
                    Due Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        handleDateChange={handleDateChange}
                        // onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddTask}>
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomDialog;
