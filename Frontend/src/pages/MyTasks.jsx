import React, { useEffect, useState } from 'react'
import Layout from '../Utils/components/layout'
import { TableComponent } from './Table/Table'
import  getColumns  from './Table/columns'
import {useDispatch, useSelector} from "react-redux";
import { getTaskFromStore, deleteTask, updateTaskStatus, getUsers, getUserTasks } from '../Functions/FireBaseFunctions'
import { useToast } from "@/components/ui/use-toast";
import { getUsersList } from '@/Redux/Actions';

const mapStatetoProps = ({ user }) => {
  return {
    user: user.userInfo,
  };
};

const MyTasks = () => {

  const [tasks, setTasks] = useState([])
  const [columns, setColumns] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {toast} = useToast();
  const dispatch = useDispatch();


  
  const { user } = useSelector(mapStatetoProps);
  
  
  const usersList = async () => {
    const users = await getUsers();
    dispatch(getUsersList(users));
  };
  
  
  useEffect(() => {
    usersList();
  }, []);
  
  const handleGetTasks = async () => {
    setIsLoading(true);
    var res;
    if(!(user?.email == "admin@vsb.com"))
      res = await getUserTasks(user?.uid)
    else 
      res = await getTaskFromStore();
    console.log(res);
    setTasks(res);
    setIsLoading(false);
  }
  const handleDeleteTask = async (parentId,taskId) => {
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

  const getAllTasks = async () => {
    const res = await getTaskFromStore();
    console.log("Tasks from store:", res); 
    setTasks(res || []); 
  }
  
  const handleUpdateTaskStatus = async (parentId,taskId,status) => {
    const res = await updateTaskStatus(parentId,taskId, status);
    if (res.status === "ok") {
      toast({
        title: "Update Task Status",
        description: "Success",
        duration: 2000,
      });
    setTasks((prev) => prev.map((task) => task.taskId === taskId? {...task, status} : task));
    }else{
      toast({
        title: "Error",
        description: res.message,
        duration: 2000,
        variant: "destructive",
      });
    }
  }


  useEffect(() => {
    handleGetTasks()
    setColumns(getColumns(handleDeleteTask, handleUpdateTaskStatus))
  },[])

  return (
    <Layout pageName="MyTasks">
        <div className=' w-full h-full flex flex-col justify-center items-center p-4 '>
        <TableComponent columns={columns} data={tasks} isLoading={isLoading} handleDeleteTask={handleDeleteTask} />
        </div>
    </Layout>
  )
}

export default MyTasks;