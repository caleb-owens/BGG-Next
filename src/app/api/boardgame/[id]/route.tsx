import { XMLValidator } from 'fast-xml-parser';
import { XMLParser } from 'fast-xml-parser';
import { notFound } from "next/navigation";

const API_URL = 'https://boardgamegeek.com/xmlapi';

export async function GET(
  request: Request,
  {params}: {params: {id: string}}
) {
  console.log('fetching boardgame: ' + params.id);

  try {
      const options = {
        ignoreAttributes: false,
      };
      const bgdetail = await fetch(API_URL+'/boardgame/'+params.id);
      const xmlText = await bgdetail.text();
      const validXML = XMLValidator.validate(xmlText);
      const parser = new XMLParser(options);

      if (validXML !== true) {
          notFound();
      }

      const boardgame = parser.parse(xmlText);
      const data = boardgame?.boardgames;

      return Response.json({data});
  } catch (error) {
      return {error: "Could not fetch game"};
  }
}