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
import { LuUsers } from "react-icons/lu";
import { LuWatch } from "react-icons/lu";
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"


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
                    <CardTitle className="mb-2 h-[52px]">{boardgame.name['#text']}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-end justify-evenly">
                        <div className="flex items-center justify-around border transition-colors rounded-lg p-2 mb-8 w-full">
                            <div className="flex flex-col items-center">    
                                <LuUsers />
                                {boardgame.stats['@_minplayers']}{boardgame.stats['@_minplayers']===boardgame.stats['@_maxplayers']?'' : ' - ' + boardgame.stats['@_maxplayers']}
                            </div>
                            <Separator orientation="vertical" className="h-10" />
                            <div className="flex flex-col items-center">
                                <LuWatch />
                                {boardgame.stats['@_minplaytime']}{boardgame.stats['@_minplaytime']===boardgame.stats['@_maxplaytime']?'' : ' - ' + boardgame.stats['@_maxplaytime']}
                            </div>
                            <Separator orientation="vertical" className="h-10" />
                            <div>
                                {boardgame.yearpublished}
                            </div>
                        </div>
                        <BoardGameDialog boardgameName={boardgame.name['#text']} boardgameID = {boardgame['@_objectid']} />
                    </div>
                </CardContent>
            </Card>
            ))}
            </div>
        </>
    )
}