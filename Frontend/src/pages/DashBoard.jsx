import Layout from "../Utils/components/layout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart } from "@mui/x-charts";
import { getTaskFromStore, getUserTasks } from "@/Functions/FireBaseFunctions";

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
      <div className=" w-full  p-2">
        {user.displayName ? `Hello, ${user.displayName}!` : "Hello!"}
      </div>
      <div>Welcome to your Dashboard</div>
      <div className="flex justify-around w-full ">
        <div className="">
          <h2>Current Month</h2>
          <PieChart
            series={[
              {
                data: [...pieChartDataCurrentMonth],
                innerRadius: 30,
                outerRadius: 200,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -135,
                endAngle: 180,
                cx: 150,
                cy: 150,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              },
            ]}
            width={600}
            height={600}
          />
        </div>
        <div>
          <h2>Previous Month</h2>
          <PieChart
            series={[{
              data: [...pieChartDataPreviousMonth],
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -135,
              endAngle: 180,
              cx: 150,
              cy: 150,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },]}
            i
            width={400}
            height={400}
          />
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
