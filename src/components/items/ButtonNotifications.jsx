import { useEffect, useState } from "react"
import Error from "./Error"
import Message from "./Message"
import UsePortals from '../hooks/usePortals'
import { useAxios } from '../hooks/useAxios'
import { useError } from "../hooks/useError"
import { useMessage } from "../hooks/useMessage"


function ButtonNotifications() {
    const [state, setState] = useState(0)
    const [id, setId] = useState(null)
    const { error, setError } = useError()
    const { message, setMessage } = useMessage()
    const [loading, setLoading] = useState(false)
    const { axiosClient } = useAxios()

    useEffect(() => {
        axiosClient.get('/admins/verify')
            .then(res => {
                if (res.data.status) {
                    axiosClient.get('/admins/get')
                        .then(res => {
                            if (res.status) {
                                setState(res.data.estado)
                                setId(res.data.id_admin)
                            }
                        })
                        .catch(err => setError("Ocurrió un error al obtener la información."))
                }
            })
            .catch()
    }, [message])

    const handleChangeNofitications = () => {
        setLoading(true)
        axiosClient.post('/admins/notifications', { estado: state === 0 ? 1 : 0, id_admin: id })
            .then(res => {
                if (res.data.status) {
                    setLoading(false)
                    setMessage(res.data.message)
                }
            })
            .catch(err => {
                setLoading(false)
                setError(err.response?.data?.error ? err.response?.data?.error : "Ocurrió un error al actualizar las notificaciones.")
            })
    }

    return (
        <>
            <button type="button" className={
                `rounded-md px-3 py-2 text-sm font-semibold flex items-center justify-center gap-x-2 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  
                ${state === 1 ?
                    'bg-green-600 hover:bg-green-500 focus-visible:outline-green-600 disabled:bg-green-500'
                    :
                    'bg-slate-600 hover:bg-slate-500 focus-visible:outline-slate-600 disabled:bg-slate-500'

                }`
            }
                onClick={handleChangeNofitications}
                disabled={loading ? true : undefined}
            >
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill={state === 1 ? 'white' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                </span>
                {
                    loading ?
                        <div className="border-2 border-transparent border-t-white size-3.5 mx-12 my-1 rounded-full animate-spin"></div>
                        :
                        state === 1 ?
                            'No recibir notificaciones'
                            :
                            'Permitir notificaciones'
                }
            </button>

            {error &&
                <UsePortals>
                    <Error error={error} />
                </UsePortals>
            }
            {message &&
                <UsePortals>
                    <Message message={message} />
                </UsePortals>
            }
        </>
    )
}

export default ButtonNotifications