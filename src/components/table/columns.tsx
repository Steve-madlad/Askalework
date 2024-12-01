"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";

import { Button } from "@/components/ui/button";
import DialogDemo from "../modals/updateDialog";

export type Payment = {
  id: string;
  fullname: string;
  amount: number;
};

export const tableColumns = (
  handleEdit: (id: string, modifiedData: Payment) => void,
  handleDelete: (id: string) => void,
) => {
  const editButton = () => {
    return (
      <Button className="mr-2">
        <FiEdit2 />
      </Button>
    );
  };

  const deleteButton = () => {
    return (
      <Button className="mr-2" variant={"destructive"}>
        <MdOutlineDeleteOutline />
      </Button>
    );
  };

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "fullname",
      header: () => (
        <div className="text-base font-bold text-gray-100 pl-4">Full Name</div>
      ),
      cell: ({row}) => (
        <p className="pl-4">{row.original.fullname}</p>
      ) 
    },
    {
      accessorKey: "amount",
      header: () => (
        <div className="text-right text-base font-bold text-gray-100">
          Amount
        </div>
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return (
          <div className="flex justify-end font-medium">
            <div className="mr-1 w-fit min-w-14 text-center">{formatted}</div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => (
        <div className="mr-6 text-right text-base font-bold text-gray-100">
          Actions
        </div>
      ),
      cell: ({ row }) => {
        const rowData = row.original;

        return (
          <div className="text-right">
            <DialogDemo
              type="edit"
              row={rowData}
              trigger={editButton()}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            <DialogDemo
              type="delete"
              row={rowData}
              trigger={deleteButton()}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        );
      },
    },
  ];

  return columns;
};
