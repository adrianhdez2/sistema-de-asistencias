import { useFilters } from "../hooks/useFilters"

function Filters() {
    const { filters, setFilters } = useFilters()

    const handleChangeFilters = (event) => {
        setFilters(prevState => ({
            ...prevState,
            type: event.target.value
        }))
    }

    return (
        <select name="order-by" id="order-by" value={filters.type} onChange={handleChangeFilters}
            className="px-2 py-1 rounded-md border border-slate-600/10 outline-none focus:border-slate-600/30 transition-colors">
            <option value="all">Todos</option>
            <option value="servicio_social">Servicio Social</option>
            <option value="practica_profesional">Práctica Profesional</option>
        </select>
    )
}

export default Filters