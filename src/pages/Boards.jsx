import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/Utils/components/layout";
import Icon from "@/Utils/Icons";
import { Input } from "@/components/ui/input";
import { Dialog } from "../components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { AddTaskToStore, deleteTask, getTaskFromStore, getUserTasks, updateTaskStatus } from "../Functions/FireBaseFunctions";
import { useToast } from "@/components/ui/use-toast";

const mapStatetoProps = ({ user }) => {
  return {
    user: user.userInfo,
  };
};


const Boards = () => {
  const [selectedValue, setSelectedValue] = useState();
  const [taskName, setTaskName] = useState("");
  const {list: users}  = useSelector((state) => { return state.users});
  const {userInfo} = useSelector((state) => { return state.user});
  const [tasks, setTasks] = useState([]);
  const {toast} = useToast();
  const { user } = useSelector(mapStatetoProps);


  const handleAddTask = async () => {
    if (taskName !== "" && selectedValue!== "") {
    const userUid = users?.find((user) => user.email === selectedValue)?.uid
    const userName = users?.find((user) => user.email === selectedValue)?.userName;

    
    const taskPayload= {
      name: taskName,
      userName: userName,
      assignedTo: selectedValue,
      assignedToUid:userUid,
      dueDate: new Date().toISOString(),
      status:"Assigned"
    }
    setTasks((prev) => [
      ...prev,
      taskPayload,
    ]);
    setTaskName("");
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
        description: res.message,
        duration: 2000,
        variant: "destructive",
      });
    }
  }else{
    toast({
      title: "Error",
      description: "Please Fill All Fields",
      duration: 2000,
      variant: "destructive",
    });
  }
  };

  const getAllTasks = async () => {
    const res = await getTaskFromStore();
    console.log("Tasks from store:", res); 
    setTasks(res || []); 
  }
  

  const handleDeleteTask = async (parentId,taskId) => {
    console.log(parentId+" "+taskId);
    const res = await deleteTask(parentId,taskId);
    if (res.status === "ok") {
      toast({
        title: "Deleting Task",
        description: "Deleted Task Successfully",
        duration: 2000,
      });
      setTasks((prev) => prev.filter((task) => task.taskId!== taskId));
    }else{
      toast({
        title: "Error",
        description: res.message,
        duration: 2000,
        variant: "destructive",
      });
    }
  }

  const getCurrentUserTasks = async () => {
    const res = await getUserTasks(userInfo.uid);
    setTasks(res)
  }

  const handleUpdateTaskStatus = async (parentId,taskId,status) => {
    updateTaskStatus(parentId,taskId, status);
    setTasks((prev) => prev.map((task) => task.taskId === taskId? {...task, status} : task));
  }
  
  useEffect(() => {
    getAllTasks();
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
            <div className=" flex flex-row items-center gap-3 w-full dark:bg-slate-700 bg-blue-400 h-[70px] p-2 rounded-md " key={task.taskId}>
            <h4 className=" w-[60%] border-r-2 dark:border-slate-800 dark:text-white text-black border-blue-800">
              {task.name}
            </h4>
            <p className=" w-[30%] border-r-2 dark:border-slate-800 dark:text-white text-black border-blue-800">
              {task.assignedTo}
            </p>
            <p className=" w-[10%] border-r-2 dark:border-slate-800 dark:text-white text-black border-blue-800 text-center ml-[-10px]">
              {task.status}
            </p>
            <Button onClick={()=>{handleUpdateTaskStatus(task.parentId, task.taskId, "Completed")}} disabled={task.status === "Completed"}>
              <Icon name="Check" size={20} />
            </Button>
            <Button variant="destructive" onClick={()=>{handleDeleteTask(task.parentId, task.taskId)}}>
              <Icon name="Trash2" size={20} />
            </Button>
          </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};


export default Boards;
