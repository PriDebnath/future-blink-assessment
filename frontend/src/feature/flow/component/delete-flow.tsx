import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, useEffect, type Dispatch, type SetStateAction, memo } from "react"
import type { SavedFlow } from "@/hook/use-get-flows"
import { X } from "lucide-react"
import { useDeleteFlow } from "@/hook/use-delete-flow"

interface Props {
  data: SavedFlow
}

export default memo(DeleteDialog)

function DeleteDialog(props: Props) {
const [open, setOpen] = useState(false)
  const { data } = props
  const { deleteFlow } = useDeleteFlow()

  const handleFormSubmit = async (e: React.FormEvent) => {
    console.log({ data });
    const res = await deleteFlow({
      id: data?._id
    })
    console.log({ res });
        setOpen(false)

  }

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button variant="ghost"
          className={'cursor-pointer'}
            onClick={(e) => {
        e.stopPropagation()
        setOpen(true)
      }}><X /></Button>


      }  >
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            Delete
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete ?
          </DialogDescription>
        </DialogHeader>
        <div className="bg-white font-bold">
          {data.prompt}
        </div>
        <DialogFooter>
          {/* <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose> */}
          <Button
            type="submit"
            onClick={handleFormSubmit}
            aria-label="delete"
            variant={'destructive'}
            className="">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  )
}
