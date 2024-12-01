import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function DeleteDialog({callback} : { callback: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-2 rounded-sm border-[1px] border-transparent bg-[#f15656] p-[6px] px-2 text-white duration-300 hover:border-[#f15656] hover:bg-white hover:text-[#f15656]">
          <MdOutlineDeleteOutline size={20} />
          Clear All Records
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all the records added.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-[#f15656]" onClick={callback}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
