import { BASE_API_URL } from "@/enviroments";
import { useMutation, useQuery } from "@tanstack/react-query";

type SaveFlow = {
    _id: string,
    prompt: string,
    response: string,
    created_at: number,
    modified_at: number,
};

const getSaveFlowFunction = async () => {
    let res = await fetch(BASE_API_URL + "/api/save-flow", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    return await res.json()
}

export const useGetSaveFlow = () => {
    const response = useQuery<SaveFlow[]>({
        queryFn: getSaveFlowFunction,
        queryKey: ["get-saved-flow"]
    })
    return response
}