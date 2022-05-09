import { useState } from "react";

const useHttp = (requestConfig, applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async (taskText) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                requestConfig.url, 
                {
                    method: requestConfig.method,
                    body: JSON.stringify(requestConfig.body),
                    headers: requestConfig.headers
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
    };

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