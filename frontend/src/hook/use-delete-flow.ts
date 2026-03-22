import { BASE_API_URL } from "@/enviroments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetFlowsQueryKey } from "./use-get-flows";

interface Flow {
    id: string;
}

const deleteFlowFunction = async (param: Flow) => {
    let res = await fetch(BASE_API_URL + "/api/flow/" + param.id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
    return await res.json()
}

export const useDeleteFlow = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteFlowFunction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [useGetFlowsQueryKey]
            });
        }
    })
    return {
        ...mutation,
        deleteFlow: mutation.mutateAsync
    }
}