import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { logOut } from '../Functions/FireBaseFunctions';
import { useToast } from '@/components/ui/use-toast';
import { logout } from '../Redux/userActions';
import {useNavigate} from 'react-router-dom';
import { useTheme } from '../Utils/ThemeProvider';
import Icon from '../Utils/Icons';


const Home = () => {
  const {data} = useSelector(mapStatetoProps);
  const dispatch = useDispatch();
  const {toast} = useToast();
  const navigate = useNavigate();
  const {theme, toggleTheme } = useTheme()

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
      <Button className='gap-2 ml-2 mt-2' onClick={handleLogout}>Logout</Button>
      <Button className='gap-2 ml-2 mt-2' onClick={()=>{toggleTheme('dark')}}>
        <Icon name={theme === 'light'?'Moon':'Sun'} size={20}/>
      </Button>
    </div>
  )
}

const mapStatetoProps = (user) =>{
  return (
    user.user.userInfo
  )
}

export default Home