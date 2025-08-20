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
                  "https://qsvdfm3el9.execute-api.us-east-1.amazonaws.com/dev/hubble"
                );
                if (!res.ok) throw new Error(`Failed to fetch Hubble images. Status: ${res.status}`);
                const json: HubbleMedia[] = await res.json();

                setData(json.slice(0, 100));
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
