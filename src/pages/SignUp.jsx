import Icon from "../Utils/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Toggle } from "@/components/ui/toggle";
import { signUp } from "../Functions/FireBaseFunctions";
import { loginUser } from "../Redux/Actions";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error , setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!userName.trim()){
      setError("User Name is Required");
      return;
    }
    if(!email.trim()){
      setError("Email is Required");
      return;
    }
    if(!password.trim()){
      setError("Password is Required");
      return;
    }
    if(password !== confirmPassword){
      setError("Passwords should be same");
      return;
    }
    if(password.length < 6){
      setError("Password should be atleast 6 characters");
      return;
    }
    const res = await signUp(userName, email, password);
    if (res.status === "ok") {
      toast({
        title: "Login",
        description: "Login Successfull, Welcome to Task Manager",
        duration: 2000,
      });
      dispatch(loginUser(res));
      navigate("/dashboard");
    } else {
      toast({
        title: "Not Logged In",
        description: res.data,
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  return (
    <div className=" h-screen w-screen flex flex-col items-center justify-center">
      <div className=" w-[350px] h-max flex flex-col items-center">
        <form
          className=" h-full w-full box-border p-4 flex flex-col justify-start"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h1 className=" text-[30px] font-bold mb-4 inline-flex items-center gap-2 ">
            <Icon name="ListChecks" strokeWidth={3} size={30} /> Task Manager
          </h1>
          <h2 className=" text-[24px] font-bold mb-5">Sign Up</h2>
          <div className=" flex flex-col gap-2 mb-4">
            <Label htmlFor="email" className=" font-semibold text-[18px]">
              User Name
            </Label>
            <Input
              type="text"
              value={userName}
              placeholder="Please Enter Full Name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
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
            <div className=" inline-flex items-center gap-2">
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Toggle
                variant="outline"
                onClick={() => {
                  setPasswordVisible((prev) =>!prev);
                }}
                disabled={password===''}
              >
                <Icon
                  name={passwordVisible ? "EyeOff" : "Eye"}
                  size={24}
                />
              </Toggle>
            </div>
          </div>

          <div className=" flex flex-col gap-2 mb-4">
            <Label htmlFor="password" className=" font-semibold text-[18px]">
              Confirm Password
            </Label>
            <div className=" inline-flex items-center gap-2">
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Toggle
                variant="outline"
                onClick={() => {
                  setPasswordVisible((prev) =>!prev);
                }}
                disabled={password===''}
              >
                <Icon
                  name={passwordVisible ? "EyeOff" : "Eye"}
                  size={24}
                />
              </Toggle>
            </div>
          </div>
          {error ? <p style={{color:'red',textAlign:'center'}}>{error}</p> :<br/>}
          <Button className=" font-semibold text-[18px] mt-2">Sign Up</Button>
          <p className=" mt-0 text-center">Already have an account ?<Button variant={"link"} onClick={()=>{navigate('/login')}}>Login</Button></p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
