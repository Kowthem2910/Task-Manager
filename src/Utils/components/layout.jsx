import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logOut } from "../../Functions/FireBaseFunctions";
import { logout } from "../../Redux/userActions";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeProvider";
import Icon from "../Icons";

const Layout = ({children, pageName}) => {
  const { data } = useSelector(mapStatetoProps);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();


  const handleLogout = async () => {
    const res = await logOut();
    if (res.code === 200) {
      dispatch(logout);
      navigate("/login");
      toast({
        title: "log out panniyachu da body soda",
        description: res.message,
        duration: 2000,
      });
    } else {
      toast({
        title: "Logout panalada panni",
        description: res.message,
        status: "failure",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  return (
    <div className=" flex flex-col items-center justify-start h-screen w-screen px-5 pb-5">
      <div className=" inline-flex items-start pt-4 w-full justify-between">
        <h2 className=" border-none ">{pageName}</h2>
        <div className=" w-max inline-flex items-center gap-2 justify-center">
          <Avatar
            onclick={() => {
              console.log("clicked");
            }}
          >
            <AvatarImage
              onclick={() => {
                console.log("clicked");
              }}
              src={data.photoUrl}
            />
            <AvatarFallback>{data.displayName}</AvatarFallback>
          </Avatar>
          <Button variant="outline" className=" inline-flex items-center gap-2" onClick={handleLogout}>
          <Icon name={"LogOut"} size={20} /> <p className=" mb-[3px]">Log out</p>
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              toggleTheme("dark");
            }}
          >
            <Icon name={theme === "light" ? "Moon" : "Sun"} size={20} />
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className=" w-full flex flex-col items-center justify-start gap-4 bg-blue-100  dark:bg-slate-800  mt-4 rounded-lg h-full" >
        {children}
      </div>
    </div>
  );
};

const mapStatetoProps = (user) => {
  return user.user.userInfo;
};

export default Layout;
