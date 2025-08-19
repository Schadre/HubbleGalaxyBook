import { useEffect, useState } from "react";

interface HubbleMedia {
    id: string;
    title: string;
    description: string;
    url: string;
}

export function useHubbleMedia() {
    const [data, setData] = useState<HubbleMedia[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHubble = async () => {
            try {
                const res = await fetch(
                  "https://images-api.nasa.gov/search?q=hubble&media_type=image"
                );
                if (!res.ok) throw new Error(`Failed to fetch Hubble images. Status: ${res.status}`);
                const json = await res.json();

                const items: HubbleMedia[] = json.collection.items.map(
                    (item: any, index: number) => ({
                    id: String(index),
                    title: item.data?.[0]?.title || "Untitled",
                    description: item.data?.[0]?.description || "No description available",
                    url: item.links?.[0]?.href || "",
                  }));
 
                setData(items.slice(0, 100));
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchHubble();
    }, []);

    return { data, loading, error };
}