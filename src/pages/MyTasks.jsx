import React, { useEffect, useState } from 'react'
import Layout from '../Utils/components/layout'
import { TableComponent } from './Table/Table'
import  getColumns  from './Table/columns'
import { getTaskFromStore, deleteTask, updateTaskStatus } from '../Functions/FireBaseFunctions'
import { useToast } from "@/components/ui/use-toast";

const MyTasks = () => {

  const [tasks, setTasks] = useState([])
  const [columns, setColumns] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {toast} = useToast();


  const handleGetTasks = async () => {
    setIsLoading(true)
    const res = await getTaskFromStore()
    setTasks(res)
    setIsLoading(false)
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
  
  const handleUpdateTaskStatus = async (parentId,taskId,status) => {
    const res = await updateTaskStatus(parentId,taskId, status);
    if (res.status === "ok") {
      toast({
        title: "Update Task Status",
        description: res.message,
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

export default MyTasks