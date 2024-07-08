import { XMLValidator } from 'fast-xml-parser';
import { XMLParser } from 'fast-xml-parser';
import { notFound } from "next/navigation";

const API_URL = 'https://boardgamegeek.com/xmlapi2';

export const getCollection = async () => {
  console.log('fetching collection');

  try {
    const options = {
      ignoreAttributes: false,
    };
    const bgcollection = await fetch(API_URL+'/collection/?username=snewobelac&own=1');
    const xmlText = await bgcollection.text();
    const validXML = XMLValidator.validate(xmlText);
    const parser = new XMLParser(options);

    if (validXML !== true) {
        notFound();
    }

    const collection = parser.parse(xmlText);

    return {success: collection};
  } catch (error) {
      return {error: "Could not fetch collection"};
  }
}

export const getBoardGame = async (id: string) => {
  console.log('fetching boardgame');

  try {
      const options = {
        ignoreAttributes: false,
      };
      const bgdetail = await fetch(API_URL+'/boardgame/'+id);
      const xmlText = await bgdetail.text();
      const validXML = XMLValidator.validate(xmlText);
      const parser = new XMLParser(options);

      if (validXML !== true) {
          notFound();
      }

      const boardgame = parser.parse(xmlText);

      return {success: boardgame};
  } catch (error) {
      return {error: "Could not fetch game"};
  }
}