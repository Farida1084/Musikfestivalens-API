import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const SPACE_ID = process.env.SPACE_ID;          // Contentful Space ID
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;  // Contentful Delivery API Token

    const apiURL = `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}&content_type=artist`;

    const response = await fetch(apiURL);
    if (!response.ok) throw new Error("Kunde inte hämta artister från Contentful");

    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Något gick fel med API-anropet" });
  }
}
