import moment from "moment";
import Icon from "@/Utils/Icons";
import { Button } from "@/components/ui/button";
import CustomSelect from "@/Utils/components/CustomSelect";
import { taskStatusOptions } from "@/Utils/components/constants";

const getColumns = (handleDeleteTask, handleUpdateTaskStatus) => {
  return [
    {
      accessorKey: "name",
      header: "Task",
      cell: ({ row }) => {
        return (
          <div className=" text-left font-medium w-auto">
            {row.getValue("name")}
          </div>
        );
      },
      size: 300,
    },

    {
      accessorKey: "dueDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=" pl-0"
          >
            <p className=" mr-2">Due Date</p>
            <Icon name="ArrowUpDown" size={20} />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = moment(
          row.getValue("dueDate"),
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        );
        return (
          <div className="text-left font-medium w-[160px] ">
            {date.format("DD / MMM   h:mm A ")}
          </div>
        );
      },
      size: 100,
    },
    {
      accessorKey: "userName",
      header: "Assigned To",
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium w-[100px]">
            {row.getValue("userName")}
          </div>
        );
      },
      size: 200,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <CustomSelect
            options={taskStatusOptions}
            title={row.getValue("status")}
            onChange={(e) => {
              handleUpdateTaskStatus(
                row.original.parentId,
                row.getValue("taskId"),
                e
              );
            }}
            s
          />
        );
      },
      size: 80,
    },
    {
      accessorKey: "taskId",
      header: "",
      cell: ({ row }) => {
        console.log(row);
        return (
          <Button
            className=" h-[35px] p-4"
            variant="destructive"
            onClick={() => {
              handleDeleteTask(row.original.parentId, row.getValue("taskId"));
            }}
          >
            <Icon name="Trash2" size={20} />
          </Button>
        );
      },
      size: 50,
    },
  ];
};

export default getColumns;
