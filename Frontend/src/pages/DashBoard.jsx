import Layout from '../Utils/components/layout'
import React, {useEffect,useState} from 'react';
import { useSelector } from 'react-redux';

const mapStatetoProps = ({ user }) => {
  return {
    user: user.userInfo,
  };
};
  

const DashBoard = () => {
  const { user } = useSelector(mapStatetoProps);
  return (
    <Layout pageName="DashBoard">
      <div className=' w-full h-20px p-2'>
        {user.displayName ? `Hello, ${user.displayName}!` : "Hello!"}
      </div>
      <div>Welcome to your Dashboard</div>
    </Layout>
  )
}


export default DashBoard