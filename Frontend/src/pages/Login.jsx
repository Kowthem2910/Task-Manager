import Icon from "../Utils/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../Functions/FireBaseFunctions";
import { loginUser } from "../Redux/Actions";
import { useToast } from "@/components/ui/use-toast";
import { Toggle } from "@/components/ui/toggle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validEmail, setEmailValid] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailValid(false);
      return;
    } else {
      setEmailValid(true);
    }
    if (password.length < 6) {
      setValidPassword(false);
      return;
    } else {
      setValidPassword(true);
    }

    const res = await signIn(email, password);
    if (res.status === "ok") {
      toast({
        title: "Login Panniyachu",
        description: "follow panuriya da body soda, vaa suruthi",
        duration: 2000,
      });
      dispatch(loginUser(res.data));
      navigate("/dashboard");
    } else {
      toast({
        title: "Login panalada panni",
        description: "password / email ae check pannu da body soda",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  return (
    <div className=" h-screen w-screen flex flex-col items-center justify-center">
      <div className=" w-[350px] h-[400px] flex flex-col items-center">
        <form
          className=" h-full w-full box-border p-4 flex flex-col justify-start"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
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
            {!validEmail && (
              <p className="text-red-500">Please enter a valid email address</p>
            )}
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
                disabled={password === ""}
              >
                <Icon name={passwordVisible ? "EyeOff" : "Eye"} size={24} />
              </Toggle>
            </div>
            {!validPassword && (
              <p className="text-red-500">Password must be at least 6 characters long</p>
            )}
          </div>

          <Button className=" font-semibold text-[18px] mt-2">Login</Button>
          <p className=" text-center">
            Don't have an account ?
            <Button variant={"link"} onClick={() => {navigate('/signup')}}>Sign Up</Button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
