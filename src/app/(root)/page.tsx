"use client";

import { Payment, columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function HomePage() {
  const [data, setData] = useState<Payment[]>([]);

  console.log("stored", data);
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const emailValue = target.email.value;
    const amountValue = target.amount.value;

    const data = { id: uuidv4(), email: emailValue, amount: amountValue };

    setData((prev) => [...prev, data]);

    return target.reset();
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
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </main>
  );
}
