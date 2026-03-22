import { BASE_API_URL } from "@/enviroments";
import { useMutation } from "@tanstack/react-query";

interface Flow {
    prompt: string;
    response: string;
}

const saveFlowFunction = async (param: Flow) => {
    let res = await fetch(BASE_API_URL + "/api/save-flow", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(param)
    })
    return await res.json()
}

export const useSaveFlow = () => {
    const mutation = useMutation({
        mutationFn: saveFlowFunction
    })
    return {
        ...mutation,
        saveFlow: mutation.mutateAsync
    }
}