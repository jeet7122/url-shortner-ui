import { useQuery } from "@tanstack/react-query";
import api from "../api/api.js";

export const useFetchTotalClick = (token, onError) => {
    return useQuery({
        queryKey: ["url-totalclicks", token],

        queryFn: async () => {
            const res = await api.get(
                "/api/urls/totalClicks?startDate=2025-10-01&endDate=2026-10-01",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            return res.data;

        },

        select: (data) => {
            return Object.keys(data).map((key) => ({
                clickDate: key,
                count: data[key],
            }));
        },
        onError,
        staleTime: 5000,
        enabled: !!token,
    });

};

export const useFetchMyShortUrl = (token, onError) => {
    return useQuery({
        queryKey: ["my-shortenurls", token],
        queryFn: async () => {
            if (!token) return []; // safety check
            const res = await api.get("/api/urls/myUrls", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            return res.data; // raw response
        },
        select: (data) => {
            if (!data) return [];
            if (Array.isArray(data)) return data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
            if (Array.isArray(data.data)) return data.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
            if (Array.isArray(data.result)) return data.result.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
            return [];
        },
        initialData: [],
        onError,
        staleTime: 0, // make sure it tries to fetch fresh data
        refetchOnMount: "always", // <-- force fetch every time component mounts
        refetchOnWindowFocus: true,
        enabled: !!token, // keep token check, but combined with refetchOnMount it works
    });
};
