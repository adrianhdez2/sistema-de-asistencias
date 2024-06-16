import FormStudent from "./FormStudent"
import FormTable from "./FormTable"


export default function ItemList({ alumno }) {
    const { id_estudiante_estudiantes, matricula, nombres, apellido_p, apellido_m, tipo, estado, password, total_horas } = alumno
    const newTipo = formatType(tipo)
    const newState = estado === 0 ? 1 : 0

    return (
        <tr className="bg-white border-b text-black">
            <th
                scope="row"
                className="px-6 py-4 font-medium text-black whitespace-nowrap"
            >
                {matricula}
            </th>
            <td className="px-6 py-4"> {nombres + " " + apellido_p + " " + apellido_m} </td>
            <td className="px-6 py-4"> {total_horas}hrs </td>
            <td className="px-6 py-4">
                {newTipo}
            </td>
            <td className="px-6 py-4 text-center">
                {
                    tipo !== 'servicio_y_practica' &&
                    <>
                        <FormTable state={estado} id_user={id_estudiante_estudiantes} newState={newState} />
                    </>
                }
            </td>
            <td className="px-6 py-4 text-center">
                {
                    tipo !== 'servicio_y_practica' && 
                    <FormStudent id_estudiante={id_estudiante_estudiantes} password={password ? true : false}/>
                }
            </td>
        </tr>
    )
}

function formatType(tipo) {
    if (tipo === 'servicio_social') return 'Servicio Social'
    if (tipo === 'practica_profesional') return 'Práctica Profesional'
    if (tipo === 'servicio_y_practica') return 'Servicio y Práctica'
}