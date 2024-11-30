"use client";

import { Payment, columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CsvExporter from "@/components/csvExporter";
import { MdOutlineFileDownload } from "react-icons/md";
import { CSVLink } from "react-csv";

export type Exportable = {
  id: string;
  email: string;
  amount: string;
};

export default function HomePage() {
  const [data, setData] = useState<Payment[]>([]);

  const [exportable, setExportable] = useState<Exportable[]>([]);

  useEffect(() => {
    const store = localStorage.getItem("sheetData");
    if (store && typeof store === "string") {
      try {
        const storedData: Payment[] = JSON.parse(store);
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
          id: row.id,
          amount: String(row.amount),
          email: row.email,
        };
      });

      setExportable(modifiedData);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget; // Use e.currentTarget for better type inference
    const emailValue = target.email.value as string; // Explicitly cast to string
    const amountValue = parseFloat(target.amount.value); // This should be fine as is

    const data: Payment = {
      id: uuidv4(),
      email: emailValue,
      amount: amountValue,
    };

    console.log(data);

    setData((prev) => [...prev, data]);

    target.reset(); // No need to return here
  };

  return (
    <main className="min-h-screen p-4">
      <div className="container mx-auto py-10">
        <Card className="mb-6 w-full sm:w-[450px]">
          <CardHeader>
            <CardTitle className="text-2xl">Civil Service Entries</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" required />
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
                />
              </div>
              <Button type="submit" className="mt-4 w-full">
                Add
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="datatable">
          {exportable.length && (
            <Button className="mb-2 border-[1px] border-transparent duration-300 hover:border-[1px] hover:border-black hover:bg-white hover:text-black hover:shadow-md">
              <MdOutlineFileDownload />
              <CsvExporter exportable={exportable}></CsvExporter>
            </Button>
          )}
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </main>
  );
}
