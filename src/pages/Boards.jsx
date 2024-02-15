import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "../Utils/components/layout";
import Icon from "../Utils/Icons";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { AddTaskToStore, getTaskFromStore } from "../Functions/FireBaseFunctions";
import { useToast } from "@/components/ui/use-toast";


const Boards = () => {
  const [selectedValue, setSelectedValue] = useState();
  const [taskName, setTaskName] = useState("");
  const { data: users } = useSelector((state) => state.usersCollection);
  const [tasks, setTasks] = useState([]);
  const {toast} = useToast();

  const handleAddTask = async () => {
    const userUid = users?.find((user) => user.email === selectedValue)?.uid
    const taskPayload= {
      name: taskName,
      assignedTo: selectedValue,
      assignedToUid:userUid,
      dueDate: new Date().toISOString(),
      status:"Pending"
    }
    setTasks((prev) => [
      ...prev,
      taskPayload,
    ]);

    const res = await AddTaskToStore(taskPayload, userUid)
    if (res.status === "ok") {
      toast({
        title: "Adding Task",
        description: "Added Task Successfully",
        duration: 2000,
      });
    }else{
      toast({
        title: "Error",
        description: "Adding Task Failed",
        duration: 2000,
        variant: "destructive",
      });
    }
    setTaskName("");
  };


  const getTask = async () => {
    const res = await getTaskFromStore();
    console.log("inside of res: ",res);
    setTasks(res)
  }
  
  useEffect(() => {
    getTask();
  },[]);

  return (
    <Layout pageName="Boards">
      <div className=" h-full w-full flex flex-col p-3 items-start justify-start ">
        <div className=" h-[50px] rounded-md w-full flex flex-row items-center gap-3">
          <Input
            placeholder="Enter Task Details"
            onChange={(e) => setTaskName(e.target.value)}
            value={taskName}
            className="w-full"
          />
          <Select onValueChange={(e) => setSelectedValue(e)} value={selectedValue}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select User" />
            </SelectTrigger>
            <SelectContent>
              {users?.map((user) => (
                <SelectItem key={user.email} value={user.email}>
                  {user.userName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button flex className="gap-2 h-[36px]" onClick={handleAddTask}>
            <Icon name="PlusCircle" size={20} /> Add Task{" "}
          </Button>
        </div>
        <div className=" flex flex-col gap-2  w-full min-h-max mt-3 overflow-y-scroll overflow-x-hidden">
          {tasks?.map((task) => (
            <div className=" flex flex-row items-center gap-3 w-full dark:bg-slate-700 bg-blue-400 h-[70px] p-2 rounded-md " key={task.name}>
              <h4 className=" w-[60%] border-r-2 dark:border-slate-800 dark:text-white text-black border-blue-800">
                {task.name}
              </h4>
              <p className=" w-[30%] border-r-2 dark:border-slate-800 dark:text-white text-black border-blue-800">
                {task.assignedTo}
              </p>
              <p className=" w-[10%] border-r-2 dark:border-slate-800 dark:text-white text-black border-blue-800 text-center ml-[-10px]">
                {task.status}
              </p>
              <Button variant="destructive">Delete</Button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Boards;
