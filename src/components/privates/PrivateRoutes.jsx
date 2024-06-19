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
            .catch();
    }, [navigate]);

    return element;
};