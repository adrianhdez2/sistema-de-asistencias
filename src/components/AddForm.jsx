import axios from "axios"
import { useState } from "react"

function AddForm({ handleHiddeAddForm }) {
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        names: '',
        last_name_p: '',
        last_name_m: '',
        matricula: '',
        carrera: '',
        tipo: 'servicio_social'
    })

    const handleChangeValues = (e) => {
        const { target } = e
        const { name, value } = target

        const newValues = {
            ...values,
            [name]: value
        }

        setValues(newValues)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        axios.post('http://localhost:3001/alumnos/add', values)
            .then(res => {
                if (res.data.status) {
                    window.location.reload()
                    setLoading(false)
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
    }

    return (
        <div className="top-0 left-0 bg-gray-500/50 w-full h-dvh flex items-center justify-center fixed">
            <form className="max-w-7xl w-full bg-white mx-auto rounded-md p-4" onSubmit={handleSubmit}>
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Información personal
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Ingresa la información requerida en los campos.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="names"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Nombre(s):
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="names"
                                    id="names"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                    value={values.names}
                                    onChange={handleChangeValues}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="last_name_p"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Apellido Paterno:
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="last_name_p"
                                    id="last_name_p"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                    value={values.last_name_p}
                                    onChange={handleChangeValues}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="last_name_m"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Apellido Materno:
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="last_name_m"
                                    id="last_name_m"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                    value={values.last_name_m}
                                    onChange={handleChangeValues}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="matricula"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Matricula:
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="matricula"
                                    id="matricula"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                    value={values.matricula}
                                    onChange={handleChangeValues}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="carrera"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Carrera
                            </label>
                            <div className="mt-2">
                                <input
                                    id="carrera"
                                    name="carrera"
                                    type="text"
                                    autoComplete="carrera"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                    value={values.carrera}
                                    onChange={handleChangeValues}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="tipo"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Prestador de:
                            </label>
                            <div className="mt-2">
                                <select
                                    id="tipo"
                                    name="tipo"
                                    autoComplete="tipo-name"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    defaultValue={values.tipo}
                                    onChange={handleChangeValues}
                                >
                                    <option value="servicio_social">Servicio social</option>
                                    <option value="practica_profesional">Práctica profesional</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md disabled:bg-white"
                        onClick={handleHiddeAddForm}
                        disabled={loading ? true : undefined}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-indigo-500 focus-visible:outline-indigo-600"
                        disabled={loading ? true : undefined}
                    >
                        {
                            loading ?
                                <div className="border-2 border-transparent border-t-white size-3.5 mx-12 my-1 rounded-full animate-spin"></div>
                                :

                                'Guardar alumno'
                        }
                    </button>
                </div>
            </form>
        </div>

    )
}

export default AddForm