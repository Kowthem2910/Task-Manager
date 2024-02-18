import React, { useEffect, useState } from 'react'
import Layout from '../Utils/components/layout'
import { TableComponent } from './Table/Table'
import  getColumns  from './Table/columns'
import { getTaskFromStore } from '../Functions/FireBaseFunctions'

const MyTasks = () => {

  const [tasks, setTasks] = useState([])
  const [columns, setColumns] = useState([])

  const handleGetTasks = async () => {
    const res = await getTaskFromStore()
    setTasks(res)
  }

  useEffect(() => {
    handleGetTasks()
    setColumns(getColumns())
  },[])

  return (
    <Layout pageName="MyTasks">
        <div>MyTasks</div>
        <TableComponent columns={columns} data={tasks} isLoading={false} />
    </Layout>
  )
}

export default MyTasks