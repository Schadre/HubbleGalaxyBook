exports.handler = async (event) => {
  try {
    const res = await fetch(
      "https://images-api.nasa.gov/search?q=hubble&media_type=image"
    );

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

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
      },
      body: JSON.stringify(items.slice(0, 100)),
    };
  } catch (err) {
    console.error(err); // Logs go to CloudWatch
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
