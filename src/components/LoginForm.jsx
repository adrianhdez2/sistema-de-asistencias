import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import UsePortals from "./hooks/usePortals"
import Error from "./items/Error"
import Message from "./items/Message"
import { useAxios } from '../components/hooks/useAxios'


function LoginForm({ handleHiddeLoginForm }) {
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()
    const [values, setValues] = useState({
        correo: '',
        password: ''
    })
    const { axiosClient } = useAxios()

    const handleChangeValues = (e) => {
        let { target } = e
        const { name, value } = target

        const newValues = {
            ...values,
            [name]: value
        }

        setValues(newValues)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axiosClient.post('/admins/login', values)
            .then(res => {
                if (res.data.status) {
                    navigate('/dashboard')
                }
            })
            .catch(err => setError(err.response?.data?.error))
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
            <div className="absolute top-0 left-0 bg-gray-500/50 w-full h-dvh flex items-center justify-center">
                <form className='w-1/3 bg-white mx-auto rounded-md p-4' onSubmit={handleSubmit}>
                    <div className="w-full flex items-center justify-center text-center py-2 mb-2">
                        <h3 className="text-2xl font-semibold">Inicia sesión</h3>
                    </div>
                    <div>
                        <label
                            htmlFor="matricula"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Correo electrónico:
                        </label>
                        <div className="mt-2">
                            <input
                                id="correo"
                                name="correo"
                                type="email"
                                autoComplete="off"
                                required
                                value={values.correo}
                                onChange={handleChangeValues}
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="my-4">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Contraseña:
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="off"
                                required
                                value={values.password}
                                onChange={handleChangeValues}
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-y-3 mt-5">
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Entrar
                        </button>
                        <button
                            type="button"
                            onClick={handleHiddeLoginForm}
                            className="text-sm font-semibold leading-6 text-gray-900 bg-gray-100 hover:bg-gray-300 px-3 py-2 rounded-md"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
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

export default LoginForm