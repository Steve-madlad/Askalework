import { CSVLink } from "react-csv";
import { Exportable } from "@/app/(root)/page";

export default function CsvExporter({
  exportable,
}: {
  exportable: Exportable[];
}) {
  return <CSVLink data={exportable}>Export CSV</CSVLink>;
}
