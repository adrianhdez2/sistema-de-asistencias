import axios from "axios"
import { useState } from "react"


function FormTable({ state, id_user, newState }) {
    const [values] = useState({ id_estudiante: id_user, estado: newState })
    const [loading, setLoading] = useState(false)

    const handleUpdateEstate = (e) => {
        e.preventDefault()
        setLoading(true)

        axios.patch('http://localhost:3001/alumnos/', values)
            .then(res => {
                if (res.data.status) {
                    window.location.reload()
                    setLoading(false)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err);
            })
    }

    return (
        <form className="m-0 p-0" onSubmit={handleUpdateEstate}>
            <button type="submit"
                className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-red-500 disabled:cursor-not-allowed ${state === 0 ? 'focus-visible:outline-green-600 bg-green-700 hover:bg-green-600' : 'focus-visible:outline-red-600 bg-red-600 hover:bg-red-500'}`}
                disabled={loading ? true : undefined}
            >
                {
                    loading ?
                        <div className="border-2 border-transparent border-t-white size-3.5 mx-7 my-1 rounded-full animate-spin"></div>
                        :
                        state === 0 ?
                            'Dar de alta'
                            :
                            'Dar de baja'
                }
            </button>
        </form>

    )
}

export default FormTable