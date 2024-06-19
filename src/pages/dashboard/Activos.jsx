import { useEffect, useState } from "react"
import { useAxios } from "../../components/hooks/useAxios";
import { useError } from "../../components/hooks/useError";
import UsePortals from "../../components/hooks/usePortals";
import Error from "../../components/items/Error";


export default function Activos() {
    const [alumnos, setAlumnos] = useState([])
    const { error, setError } = useError()
    const { axiosClient } = useAxios()

    document.title = "Alumnos activos"

    useEffect(() => {
        axiosClient.get('/admins/verify')
            .then(res => {
                if (res.data.status) {
                    axiosClient.get('/alumnos/get')
                        .then(res => setAlumnos(res.data))
                        .catch(err => setError("Ocurrió un error al obtener los alumnos."))
                }
            })
            .catch()

    }, [])

    return (
        <>
            <div className="max-w-7xl w-full py-6 mx-auto flex items-center justify-end">
                <div className="my-10 w-full max-w-7xl items-center justify-between flex">
                    <h2 className="font-semibold text-lg">
                        Estado de actividad
                    </h2>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-7xl mx-auto mt-4 mb-10">
                {
                    alumnos.length === 0 ?
                        <p className="py-2 px-3">No hay alumnos activos el dia de hoy</p>
                        :
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3"> Nombre completo </th>
                                    <th scope="col" className="px-6 py-3"> Tipo </th>
                                    <th scope="col" className="px-6 py-3"> Matrícula </th>
                                    <th scope="col" className="px-6 py-3 text-center"> Hora de entrada </th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    alumnos.map(alumno => (
                                        <tr className="bg-white border-b text-black" key={alumno.id_estudiante_estudiantes}>
                                            <td className="px-6 py-4"> {alumno.nombres + " " + alumno.apellido_p + " " + alumno.apellido_m} </td>
                                            <td className="px-6 py-4"> {formatType(alumno.tipo)} </td>
                                            <td className="px-6 py-4"> {alumno.matricula} </td>
                                            <td className="px-6 py-4 text-center"> {alumno.hora_entrada} </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }

            </div>
            {error && <UsePortals><Error error={error} /></UsePortals>}
        </>
    )
}

function formatType(tipo) {
    if (tipo === 'servicio_social') return 'Servicio Social'
    if (tipo === 'practica_profesional') return 'Práctica Profesional'
    if (tipo === 'servicio_y_practica') return 'Servicio y Práctica'
}
