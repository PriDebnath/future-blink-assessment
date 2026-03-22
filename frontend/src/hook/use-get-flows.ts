import { BASE_API_URL } from "@/enviroments";
import { useMutation, useQuery } from "@tanstack/react-query";

export type SavedFlow = {
    _id: string,
    prompt: string,
    response: string,
    created_at: number,
    modified_at: number,
};

const getFlowsFunction = async () => {
    let res = await fetch(BASE_API_URL + "/api/flow", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    return await res.json()
}

export const useGetFlowsQueryKey = "get-flows"

export const useGetFlows = () => {
    const response = useQuery<SavedFlow[]>({
        queryFn: getFlowsFunction,
        queryKey: [useGetFlowsQueryKey]
    })
    return response
}