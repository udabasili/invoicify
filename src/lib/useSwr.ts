import { AxiosError } from "axios";
import useSWR from "swr";
import { fetcher } from "./axios";

const useSwr = <T>(link: string | null) => {
    const { data, error } = useSWR<T>(link, fetcher);
    let errorObject = error as AxiosError
    let errorMessage = ''
    if (errorObject?.isAxiosError) {
        errorMessage = errorObject.response?.data.message
    }
    return {
        data,
        isLoading: !error && !data,
        isError: error,
        errorMessage: error ? errorMessage : null
    }

}


export default useSwr