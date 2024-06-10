import { useEffect, useState } from "react";
import FormAdmin from "./FormAdmin"
import axios from "axios";

export default function ItemAdmin({ alumno }) {
    const { id_admin, nombres, apellido_p, apellido_m, correo, password } = alumno
    const [id, setId] = useState(null)

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:3001/admins/verify")
            .then(res => {
                if (res.data.status) {
                    axios.get("http://localhost:3001/admins/admin")
                        .then(res => {
                            setId(res.data.id_admin);
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(error => console.log("Error verifying user:", error.response ? error.response.data : error.message));
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
        </tr>
    )
}