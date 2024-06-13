import axios from "axios"
import { useEffect, useState } from "react"
import Error from "./Error"
import Message from "./Message"
import UsePortals from '../hooks/usePortals'


function ButtonNotifications() {
    const [state, setState] = useState(0)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3001/admins/verify')
            .then(res => {
                if (res.data.status) {
                    axios.get('http://localhost:3001/admins/get')
                        .then(res => {
                            if (res.status) {
                                setState(res.data.estado)
                            }
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }, [message])

    const handleChangeNofitications = () => {
        setLoading(true)
        axios.post('http://localhost:3001/admins/notifications', { estado: state === 0 ? 1 : 0 })
            .then(res => {
                if (res.data.status) {
                    setLoading(false)
                    setMessage(res.data.message)
                }
            })
            .catch(err => {
                setLoading(false)
                setError(err.response?.data?.error)
            })
    }

    useEffect(() => {
        if (error) {
            setError(error);
            const timer = setTimeout(() => {
                setError('');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            setMessage(message);
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message]);

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