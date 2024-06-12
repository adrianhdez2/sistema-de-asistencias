import { useState } from "react"
import HoursForm from './../HoursForm'
import UsePortals from "../hooks/usePortals"

function LinkUpdate({ id_estudiante, setError, setMessage }) {
    const [show, setShow] = useState(false)

    const handleShowHoursForm = (e) => {
        e.preventDefault()
        setShow(!show)
    }

    const handleHiddeHoursForm = (e) => {
        e.preventDefault()
        setShow(!show)
    }

    return (
        <>
            <a
                href="#"
                onClick={handleShowHoursForm}
                id="button_add_hours"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
                Agregar horas
            </a>
            {
                show &&
                <UsePortals>
                    <HoursForm handleHiddeHoursForm={handleHiddeHoursForm} setShow={setShow} id_estudiante={id_estudiante} setError={setError} setMessage={setMessage}/>
                </UsePortals>
            }
        </>
    )
}

export default LinkUpdate