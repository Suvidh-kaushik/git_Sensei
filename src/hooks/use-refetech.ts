import { QueryClient } from "@tanstack/react-query"

export default function useRefetch(){

    const queryClient = new QueryClient();

    return async () => {
        await queryClient.refetchQueries({
            type : 'active'
        })
    }
}