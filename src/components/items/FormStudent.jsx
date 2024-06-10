// import axios from "axios"
import axios from "axios"
import { useState } from "react"


function FormStudent({ id_estudiante, password }) {
    const [values] = useState({ id_estudiante: id_estudiante })
    const [loading, setLoading] = useState(false)

    const handleUpdateEstate = (e) => {
        e.preventDefault()
        setLoading(true)

        axios.post('http://localhost:3001/alumnos/generate', values)
            .then(res => {
                if (res.data.status) {
                    window.location.reload()
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    return (
        <form className="m-0 p-0" onSubmit={handleUpdateEstate}>
            <button type="submit"
                className={`rounded-md py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed ${password ? 'px-3 focus-visible:outline-green-600 bg-green-700 hover:bg-green-600 disabled:bg-green-500' : 'px-6 focus-visible:outline-red-600 bg-red-600 hover:bg-red-500 disabled:bg-red-500'}`}
                disabled={loading ? true : undefined}
            >
                {
                    loading ?
                        <div className="border-2 border-transparent border-t-white size-3.5 mx-12 my-1 rounded-full animate-spin"></div>
                        :
                        password ?
                            'Actualizar contraseña'
                            :
                            'Enviar contraseña'
                }
            </button>
        </form>
    )
}

export default FormStudent