import Layout from "../Utils/components/layout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, pieArcLabelClasses  } from "@mui/x-charts";
import { getTaskFromStore, getUserTasks } from "@/Functions/FireBaseFunctions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mapStatetoProps = ({ user }) => {
  return {
    user: user.userInfo,
  };
};

const DashBoard = () => {
  const { user } = useSelector(mapStatetoProps);
  const [tasks, setTasks] = useState([]);

  const getAllTasks = async () => {
    var res;
    if (!(user?.email == "vsbec2002@gmail.com"))
      res = await getUserTasks(user?.uid);
    else res = await getTaskFromStore();
    console.log("Tasks from store:", res);
    setTasks(res || []);
  };

  useEffect(() => {
    getAllTasks();
  }, [user]);

  const calculateStatus = (status) => {
    switch (status) {
      case "Assigned":
        return "Assigned";
      case "In Progress":
        return "In Progress";
      case "Completed":
        return "Completed";
      case "backlog":
        return "Backlog";
      default:
        return "Task Sent";
    }
  };

  const currentMonthTasks = tasks.filter((task) => {
    const taskDate = new Date(task.dueDate);
    const currentDate = new Date();
    return (
      taskDate.getMonth() === currentDate.getMonth() &&
      taskDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const previousMonthTasks = tasks.filter((task) => {
    const taskDate = new Date(task.dueDate);
    const currentDate = new Date();
    const previousMonth =
      currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
    const previousYear =
      previousMonth === 11
        ? currentDate.getFullYear() - 1
        : currentDate.getFullYear();
    return (
      taskDate.getMonth() === previousMonth &&
      taskDate.getFullYear() === previousYear
    );
  });

  const calculateStatusesCurrentMonth = () => {
    return currentMonthTasks.map((task) => calculateStatus(task.status));
  };

  const calculateStatusesPreviousMonth = () => {
    return previousMonthTasks.map((task) => calculateStatus(task.status));
  };

  const statusCountsCurrentMonth = calculateStatusesCurrentMonth().reduce(
    (acc, status) => {
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {}
  );

  const statusCountsPreviousMonth = calculateStatusesPreviousMonth().reduce(
    (acc, status) => {
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {}
  );

  const pieChartDataCurrentMonth = Object.keys(statusCountsCurrentMonth).map(
    (status) => ({
      id: status,
      value: statusCountsCurrentMonth[status],
      label: status,
    })
  );

  const pieChartDataPreviousMonth = Object.keys(statusCountsPreviousMonth).map(
    (status) => ({
      id: status,
      value: statusCountsPreviousMonth[status],
      label: status,
    })
  );

  return (
    <Layout pageName="DashBoard">
      <div className=" w-full  p-4 px-8 text-xl">
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src={user.photoUrl} />
          </Avatar>
          <div>
            <div className="text-2xl font-bold">
              {user.displayName ? `Hello, ${user.displayName}!` : "Hello!"}
            </div>
            <div className="text-sm text-gray-500">
              {user.email ? `${user.email}` : "Hello!"}
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div className="flex flex-wrap gap-4 justify-around w-full ">
        <div className="bg-blue-200 p-4 rounded-3xl border-2 border-blue-700 dark:bg-slate-800 ">
          <h2 className="p-4 text-2xl text-blue-900 font-semibold border-b-1 border-blue-700 dark:text-white flex justify-between">
            Task Report this Month <div className="animate-bounce ">👇</div>
          </h2>
          <PieChart
            series={[
              {
                data: [...pieChartDataCurrentMonth],
                innerRadius: 50,
                outerRadius: 120,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -135,
                endAngle: 180,
                cx: 150,
                cy: 150,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: '#ffffff',
                fontWeight: 'bold',
              },
            }}
            width={450}
            height={300}
            className=" text-white"
          />
        </div>
        <div className="bg-blue-200 p-4 rounded-3xl border-2 border-blue-700 dark:bg-slate-800 dark:text-white">
          <h2 className="p-4 text-2xl text-blue-900 font-semibold border-b-1 border-blue-700 dark:text-white flex justify-between">
            Task Report Last Month <div className="animate-bounce ">👇</div>
          </h2>
          <PieChart
            series={[
              {
                data: [...pieChartDataPreviousMonth],
                innerRadius: 50,
                outerRadius: 120,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -135,
                endAngle: 180,
                cx: 150,
                cy: 150,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            i
            width={450}
            height={300}
          />
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
