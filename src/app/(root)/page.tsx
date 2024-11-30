"use client";

import { Payment, tableColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CsvExporter from "@/components/csvExporter";
import { MdOutlineFileDownload } from "react-icons/md";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/deleteDialog";

export type Exportable = {
  fullname: string;
  amount: string;
};

export default function HomePage() {
  const [data, setData] = useState<Payment[]>([]);
  console.log(data);
  
  const [exportable, setExportable] = useState<Exportable[]>([]);

  useEffect(() => {
    const store = localStorage.getItem("sheetData");
    if (store && typeof store === "string") {
      try {
        const storedData = JSON.parse(store) as Payment[];
        if (Array.isArray(storedData)) {
          setData(storedData);
        }
      } catch (error) {
        console.error("Failed to parse stored data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (data.length) {
      
      localStorage.setItem("sheetData", JSON.stringify(data));

      const modifiedData = data.map((row) => {
        return {
          amount: String(row.amount),
          fullname: row.fullname,
        };
      });

      setExportable(modifiedData);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget as HTMLFormElement;
    const fullnameValue = (
      target.elements.namedItem("fullname") as HTMLInputElement
    ).value;
    const amountValue = parseFloat(
      (target.elements.namedItem("amount") as HTMLInputElement).value,
    );

    const data: Payment = {
      id: uuidv4(),
      fullname: fullnameValue,
      amount: amountValue,
    };

    toast("Record has been created.");

    setData((prev) => [...prev, data]);
    target.reset();
  };

  const handleDeleteAll = () => {
    localStorage.clear();
    setData([]);
    setExportable([]);
    toast("All records have been deleted.");
  };

  const handleEdit = (id: string ) => {
    console.log("editing in function", id);
    
    const records = [...data];
    const index = records.findIndex((record) => record.id === id);

    records[index] = { id: "123", amount: 299, fullname: "snoop" };
    console.log(records);
    
    setData(records);
  };

  const handleDelete = (id: string) => {
    const records = [...data];
    const index = records.findIndex((record) => record.id === id);

    records[index] = { id: "123", amount: 299, fullname: "snoop" };
    setData(records);
  };

  return (
    <main className="min-h-[calc(100vh-63px)] p-4">
      <div className="container mx-auto py-10">
        <Card className="mb-6 w-full sm:w-[450px]">
          <CardHeader>
            <CardTitle className="text-2xl">Civil Service Entries</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  placeholder="Full Name"
                  required
                  className="border-black"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  type="number"
                  min={0}
                  id="amount"
                  placeholder="Amount"
                  step={"any"}
                  required
                  className="border-black"
                />
              </div>
              <Button type="submit" className="mt-4 w-full">
                Add
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="datatable">
          {exportable.length ? (
            <div className="mb-2 flex items-center justify-between">
              <Button className="border-[1px] border-transparent duration-300 hover:border-[1px] hover:border-black hover:bg-white hover:text-black hover:shadow-md">
                <MdOutlineFileDownload />
                <CsvExporter exportable={exportable}></CsvExporter>
              </Button>

              <DeleteDialog callback={handleDeleteAll} />
            </div>
          ) : null}
          <DataTable
            columns={tableColumns(handleEdit, handleDelete)}
            data={data}
          />
        </div>
      </div>
    </main>
  );
}
