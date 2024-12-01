import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColumnDef, RowData } from "@tanstack/react-table";
import { ReactNode } from "react";
import { Payment } from "../table/columns";

type DialogProps = {
  type: "edit" | "delete";
  trigger: ReactNode;
  row: Payment;
  handleEdit: (id: string, modifiedData: Payment) => void;
  handleDelete: (id: string) => void;
};

export default function DialogDemo({
  type,
  trigger,
  row,
  handleEdit,
  handleDelete,
}: DialogProps) {
  console.log("row in dialog", row);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submitting here");

    e.preventDefault();

    const target = e.currentTarget as HTMLFormElement;
    const fullnameValue = (
      target.elements.namedItem("fullname") as HTMLInputElement
    ).value;
    const amountValue = parseFloat(
      (target.elements.namedItem("amount") as HTMLInputElement).value,
    );

    const data: Payment = {
      id: row.id,
      fullname: fullnameValue,
      amount: amountValue,
    };

    if (type === "edit") handleEdit(row.id, data);
    else handleDelete(row.id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle
            className={`${type === "delete" ? "text-[#f15656]" : "text-initial"}`}
          >
            {`${type === "delete" ? "Delete" : "Edit"}`} Record
          </DialogTitle>
          <DialogDescription>
            {type === "delete"
              ? "Click delete to remove the record."
              : "Make changes to the record and click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullname" className="text-right">
              Full Name
            </Label>
            <Input
              id="fullname"
              defaultValue={row.fullname || ""}
              className="col-span-3"
              disabled={type === "delete"}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              defaultValue={row.amount || ""}
              className="col-span-3"
              type="number"
              disabled={type === "delete"}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              variant={type === "delete" ? "destructive" : "default"}
            >
              {type === "delete" ? "Delete" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
