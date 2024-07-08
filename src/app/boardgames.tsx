import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import BoardGameDialog from "./boardgamedialog"
import { getCollection } from "../lib/bggapi"
import { relative } from "path";

export default async function BoardGames() {

    const {error, success} = await getCollection();

    return(
        <>
            <div className="flex flex-wrap gap-3 justify-around">
            {success.items.item.map((boardgame:any, idx:any) => (
                console.log(boardgame),
            <Card className="w-[300px]" id={boardgame['@_objectid']} key={boardgame['@_objectid']}>
                <CardImage src={boardgame.image}/>
                <CardHeader>
                    <CardTitle>{boardgame.name['#text']}</CardTitle>
                </CardHeader>
                <CardContent>
                    {boardgame.yearpublished}
                </CardContent>
                <CardFooter>
                    <BoardGameDialog boardgameName={boardgame.name['#text']} boardgameID = {boardgame['@_objectid']} />
                </CardFooter>
            </Card>
            ))}
            </div>
        </>
    )
}