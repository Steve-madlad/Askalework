import { CSVLink } from "react-csv";

export type Exportable = {
  id: string,
  email: string,
  amount: string,
}

export default function CsvExporter({ exportable }: { exportable: Exportable[] }) {
  return (
    <CSVLink data={exportable}>Export CSV</CSVLink>
  )
}
