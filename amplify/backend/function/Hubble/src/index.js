const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const res = await fetch(
      "https://images-api.nasa.gov/search?q=hubble&media_type=image"
    );
    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: "Failed to fetch Hubble images" }),
      };
    }

    const json = await res.json();
    const items = json.collection.items.map((item, index) => ({
      id: String(index),
      title: item.data?.[0]?.title || "Untitled",
      description: item.data?.[0]?.description || "No description available",
      url: item.links?.[0]?.href || "",
    }));

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify(items.slice(0, 100)),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
