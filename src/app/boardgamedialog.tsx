'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { LuEye } from "react-icons/lu";

type BoardGameDialogProps = {
    boardgameID: string,
    boardgameName: string
}

const BoardGameDialog = ({ boardgameID, boardgameName }: BoardGameDialogProps) => {
    const [boardGameDetail, setBoardGameDetail] = useState<any>(null);

    const handleClick = async () => {
       try{
            const response = await fetch(`/api/boardgame/${boardgameID}`)
            const data = await response.json();
            setBoardGameDetail(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button onClick={handleClick} ><LuEye className="mr-2 h-4 w-4" />Peruse</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{boardgameName}</DialogTitle>
                </DialogHeader>
                    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                        <DialogDescription dangerouslySetInnerHTML={ { __html: boardGameDetail?.data?.boardgame?.description } }/>
                    </ScrollArea>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                        Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default BoardGameDialog;
