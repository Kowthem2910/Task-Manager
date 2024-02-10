import Icon from "../Utils/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../Functions/FireBaseFunctions";
import { login } from "../Redux/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const res = await signIn(email, password);
    if(res.status === 'ok'){
      dispatch(login(res))
      navigate('/home')
    }else{
      alert(res.data)
    }
      
  }

  return (
    <div className=" h-screen w-screen flex flex-col items-center justify-center">
      <div className=" w-[350px] h-[400px] flex flex-col items-center">
        <form className=" h-full w-full box-border p-4 flex flex-col justify-start" onSubmit={(e)=>{handleSubmit(e)}}>
          <h1 className=" text-[30px] font-bold mb-2 inline-flex items-center gap-2">
            <Icon name="ListChecks" strokeWidth={3} size={30} /> Task Manager
          </h1>
          <h2 className=" text-[24px] font-bold mb-5">Login</h2>
          <div className=" flex flex-col gap-2 mb-4">
            <Label htmlFor="email" className=" font-semibold text-[18px]">
              Email
            </Label>
            <Input
              type="email"
              value={email}
              placeholder="example@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=" flex flex-col gap-2 mb-4">
            <Label htmlFor="password" className=" font-semibold text-[18px]">
              Password
            </Label>
            <Input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button className=" font-semibold text-[18px] mt-2">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;