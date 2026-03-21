
import { BASE_API_URL } from "@/enviroments";
import { useMutation } from "@tanstack/react-query";

const askAiFunction = async (prompt: string) => {
    let requestBody = { "prompt": prompt }
    const response = await fetch(BASE_API_URL + "/api/ask-ai", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
    })
    return await response.json()
}


export const useAskAi = () => {
    const mutation = useMutation({
        mutationFn: askAiFunction,
    })
    return {
        ...mutation,
        askAi: mutation.mutateAsync
    }
}