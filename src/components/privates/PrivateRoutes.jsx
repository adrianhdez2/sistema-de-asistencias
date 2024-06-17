import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";

export const PrivateRoutes = ({ element }) => {
    const navigate = useNavigate();
    const {axiosClient} = useAxios()

    useEffect(() => {
        axiosClient.get("/admins/verify")
            .then(res => {
                if (!res.data.status) {
                    navigate('/');
                }
            })
            .catch(error => console.log("Error verifying user:", error.response ? error.response.data : error.message));
    }, [navigate]);

    return element;
};