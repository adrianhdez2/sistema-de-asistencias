import { useContext } from "react"
import { FilterContext } from "../context/filters"

export function useFilters() {
    const { filters, setFilters } = useContext(FilterContext)

    const filterStudents = (alumnos) => {
        return alumnos.filter(alumno => {
            return (
                filters.type === 'all' ||
                alumno.tipo === filters.type
            )
        })
    }

    return { filters, filterStudents, setFilters }
}