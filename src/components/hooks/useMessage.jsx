import { useEffect, useState } from "react";

export const useMessage = () => {
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (message) {
            setMessage(message);
            const timer = setTimeout(() => {
                setMessage();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    return { message, setMessage }
}