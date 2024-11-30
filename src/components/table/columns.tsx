"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

import { Button } from "@/components/ui/button";

export type Payment = {
  id: string;
  fullname: string;
  amount: number;
};

export const tableColumns = (
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
) => {
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "fullname",
      header: () => (
        <div className="text-base font-bold text-gray-100">Full Name</div>
      ),
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

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      header: () => (
        <div className="text-right text-base font-bold text-gray-100">
          Actions
        </div>
      ),
      cell: ({ row }) => {
        const id = row.original.id;

        return (
          <div className="pr-3 text-right">
            <Button className="mr-2" size={"icon"} onClick={() => handleEdit(id)}>
              <FiEdit2 />
            </Button>
            <Button variant={"destructive"} size={"icon"}  onClick={() => handleDelete(id)}>
              <MdOutlineDelete />
            </Button>
          </div>
        );
      },
    },
  ];

  return columns;
};
