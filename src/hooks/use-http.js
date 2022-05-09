import { useState, useCallback } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                requestConfig.url, 
                {
                    method: requestConfig.method ? requestConfig.method: 'GET',
                    body: requestConfig.body ? JSON.stringify(requestConfig.body): null,
                    headers: requestConfig.headers ? requestConfig.headers: {}
                }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            applyData(data);

        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);     // doesn't need any dependency because all the data operationg on is received as parameters in the fn (no external dependency here)

    return {
        isLoading: isLoading,
        error: error,
        sendRequest: sendRequest
    }
    // above code is same with below because if property name and value are same, make short in js
    // return {
    //     isLoading,
    //     error,
    //     sendRequest
    // }
};

export default useHttp;