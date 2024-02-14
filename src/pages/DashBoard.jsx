import Layout from '../Utils/components/layout'
import React, {useEffect} from 'react'
import {useSelector} from'react-redux'

const DashBoard = () => {
  const {data} = useSelector(mapStatetoProps);
  


  return (
    <Layout pageName="DashBoard">
      <div className=' w-full h-full p-2'>DashBoard</div>
    </Layout>
  )
}

const mapStatetoProps = ({usersCollection}) => {
  return usersCollection;
}

export default DashBoard