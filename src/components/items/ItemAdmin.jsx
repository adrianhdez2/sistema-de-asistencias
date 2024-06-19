import { useEffect, useState } from "react";
import FormAdmin from "./FormAdmin"
import { useAxios } from '../hooks/useAxios'
import { useError } from "../hooks/useError";
import UsePortals from "../hooks/usePortals";
import Error from "./Error";

export default function ItemAdmin({ alumno }) {
    const { id_admin, nombres, apellido_p, apellido_m, correo, password } = alumno
    const [id, setId] = useState(null)
    const { axiosClient } = useAxios()
    const { error, setError } = useError()

    useEffect(() => {
        axiosClient.get("/admins/verify")
            .then(res => {
                if (res.data.status) {
                    axiosClient.get("/admins/admin")
                        .then(res => {
                            setId(res.data.id_admin);
                        })
                        .catch(err => setError("Ocurrió un error al obtener los datos."))
                }
            })
            .catch();
    }, []);

    return (
        <tr className="bg-white border-b text-black">
            <td className="px-6 py-4"> {nombres + " " + apellido_p + " " + apellido_m} </td>
            <td className="px-6 py-4"> {correo} </td>
            <td className="px-6 py-4 text-center">
                {
                    id !== id_admin && <FormAdmin correo={correo} password={password ? true : false} />
                }
            </td>
            {error && <UsePortals><Error error={error} /></UsePortals>}
        </tr>
    )
}