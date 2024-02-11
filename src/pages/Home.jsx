import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { logOut } from '../Functions/FireBaseFunctions';
import { useToast } from '@/components/ui/use-toast';
import { logout } from '../Redux/userActions';
import {useNavigate} from 'react-router-dom';


const Home = () => {
  const {data} = useSelector(mapStatetoProps);
  const dispatch = useDispatch();
  const {toast} = useToast();
  const navigate = useNavigate();

  const handleLogout = async() => {
    const res = await logOut();
    if(res.code === 200){
      dispatch(logout);
      navigate('/login')
      toast(
        {
          title: "log out panniyachu da body soda",
          description: res.message,
          duration:2000, 
        }
      )
    }else{
      toast(
        {
          title: "Logout panalada panni",
          description: res.message,
          status: "failure",
          duration:3000, 
          variant: "destructive",
        }
      )
    }
  }

  return (
    <div>
      <h1>Home</h1>
      <h2>{data.email}</h2>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

const mapStatetoProps = (user) =>{
  return (
    user.user.userInfo
  )
}

export default Home