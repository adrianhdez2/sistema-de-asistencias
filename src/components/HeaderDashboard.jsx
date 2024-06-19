import LinkHeader from "./LinkHeader"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAxios } from '../components/hooks/useAxios'
import { useError } from './hooks/useError'
import UsePortals from '../components/hooks/usePortals'
import Error from '../components/items/Error'

function HeaderDashboard() {
    const navigate = useNavigate()
    const [image, setImage] = useState(null)
    const { axiosClient } = useAxios()
    const { error, setError } = useError()

    const handleLogOut = () => {
        axiosClient.get('/admins/logout')
            .then(res => {
                if (res.data.status) {
                    return navigate('/')
                }

                if (!res.data.status) {
                    return setError(res.data.message)
                }
            })
            .catch(err => setError(err?.response?.data?.error ? err?.response?.data?.error : 'Ocurrió un error al cerrar sesión.'))
    }

    useEffect(() => {
        axiosClient.get('/admins/verify')
            .then(res => {
                if (res.data.status) {
                    axiosClient.get('/admins/admin')
                        .then(res => {
                            const id_admin = res.data.id_admin
                            axiosClient.post('/admins/image', { id_admin })
                                .then(res => {
                                    setImage(res.data.imagen)
                                })
                                .catch(err => setError("ocurrió un errror al obtener los datos."))
                        })
                        .catch(err => setError("ocurrió un errror al obtener los datos."))
                }
            })
            .catch()
    }, [])

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <a href="/dashboard" className="flex-shrink-0">
                            <img
                                className="h-8 w-8"
                                src="/xdevlab_blanco.png"
                                alt="X DevLab"
                            />
                        </a>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <LinkHeader title={"Inicio"} href={"/dashboard"} />
                                <LinkHeader title={"Activos"} href={"/dashboard/activos"} />
                                <LinkHeader title={"Actualizar horas"} href={"/dashboard/update"} />
                                <LinkHeader title={"Alumnos"} href={"/dashboard/students"} />
                                <LinkHeader title={"Administradores"} href={"/dashboard/admins"} />
                                <LinkHeader title={"Reportes"} href={"/dashboard/reports"} />
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <button
                                type="button"
                                className="relative rounded-sm bg-gray-800 p-1 text-gray-400 hover:text-red-500 focus:outline-none focus:text-red-500"
                                onClick={handleLogOut}
                            >
                                Cerrar sesión
                            </button>

                            <div className="relative ml-3">
                                <div>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={
                                            image ?
                                                image
                                                :
                                                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                        }
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {error && <UsePortals><Error error={error} /></UsePortals>}
        </nav>
    )
}

export default HeaderDashboard