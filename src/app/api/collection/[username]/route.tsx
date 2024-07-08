import { XMLValidator } from 'fast-xml-parser';
import { XMLParser } from 'fast-xml-parser';
import { notFound } from "next/navigation";

const API_URL = 'https://boardgamegeek.com/xmlapi2';

export async function GET(
  request: Request,
  {params}: {params: {username: string}}
) {
  console.log('fetching collection: ' + params.username);

  try {
    const options = {
      ignoreAttributes: false,
    };
    const bgcollection = await fetch(API_URL+'/collection/?username='+params.username+'&own=1');
    const xmlText = await bgcollection.text();
    const validXML = XMLValidator.validate(xmlText);
    const parser = new XMLParser(options);

    if (validXML !== true) {
        notFound();
    }

    const collection = parser.parse(xmlText);
    const data = collection?.boardgames;

    return Response.json({data});
  } catch (error) {
      return {error: "Could not fetch collection"};
  }
}