import moment from "moment";
import Icon from "../../Utils/Icons";
import { Button } from "@/components/ui/button";

const getColumns = () => {


   return ( [
        {
          accessorKey: "name",
          header: "Task",
          cell: ({row}) => {
            return <div className=" text-left font-medium w-auto">{row.getValue('name')}</div>
          },
          size:"max-content",
        },
        {
          accessorKey: "status",
          header: "Status",
          size:150
        },
        {
          accessorKey: "dueDate",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                <p className=" mr-2">Due Date</p>
                <Icon name="ArrowUpDown" size={20} />
              </Button>
            )
          },
          cell: ({row}) => {
            const date = moment(row.getValue('dueDate'), 'YYYY-MM-DDTHH:mm:ss.SSSZ');
            return <div className="text-left font-medium w-[160px] ">{date.format('DD / MMM   h:mm A ')}</div>
          },
          size:100,
        },
        {
            accessorKey: "userName",
            header: "Assigned To",
            cell: ({row}) => {
                return <div className="text-right font-medium w-[100px]">{row.getValue('userName')}</div>
              },
              size:200,
          },
      ]);
   
}

export default getColumns;