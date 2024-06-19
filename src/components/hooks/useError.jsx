import { useEffect, useState } from "react"

export const useError = () => {
    const [error, setError] = useState(null)

    useEffect(() => {
        if (error) {
            setError(error);
            const timer = setTimeout(() => {
                setError(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    return { error, setError }
}