import { useCallback, useState } from "react";
import axios from "axios";

const useHttp = () => {
    const [error, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = useCallback(async (requestData, cb) => {
        setIsLoading(true)
        try{
            setIsError(null);
            const response =  await axios({
                method: requestData.method,
                data: JSON.stringify(requestData.data),
                url: requestData.URL
            })
            cb(response.data);
        } catch(error) {
            setIsError(error);
        }
        setIsLoading(false)
    }, [])

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp;