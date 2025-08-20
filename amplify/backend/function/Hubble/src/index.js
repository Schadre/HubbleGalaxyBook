
// amplify/backend/function/HubbleApi/src/index.ts
import fetch from "node-fetch";

interface HubbleMedia {
  id: string;
  title: string;
  description: string;
  url: string;
}

export const handler = async (event: any) => {
  try {
    const res = await fetch(
      "https://images-api.nasa.gov/search?q=hubble&media_type=image"
    );
    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: `Failed to fetch Hubble images.` }),
      };
    }

    const json = await res.json();
    const items: HubbleMedia[] = json.collection.items.map(
      (item: any, index: number) => ({
        id: String(index),
        title: item.data?.[0]?.title || "Untitled",
        description: item.data?.[0]?.description || "No description available",
        url: item.links?.[0]?.href || "",
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(items.slice(0, 100)),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
