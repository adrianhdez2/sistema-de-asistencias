import { useState } from "react"
import { useAxios } from '../components/hooks/useAxios'

function HoursForm({ handleHiddeHoursForm, id_estudiante, setError, setMessage, setShow }) {
    const { axiosClient } = useAxios()
    const [values, setValues] = useState({
        id_estudiante: id_estudiante,
        fecha: '',
        hora_entrada: '',
        hora_salida: '',
        total_horas: 0
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

        axiosClient.post('/alumnos/hours', values)
            .then(res => {
                if (res.data?.status) {
                    setMessage(res.data?.message)
                    setShow(false)
                }
            })
            .catch(err => {
                setError(err.response?.data?.error)
            })
    }

    return (
        <div className="fixed top-0 left-0 bg-gray-500/50 w-full h-dvh flex items-center justify-center">
            <form className="w-1/2 bg-white mx-auto rounded-md p-4" onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Ingresa las fechas y las horas por dia
                        </h2>
                        <div
                            className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                        >
                            <div className="sm:col-span-2 sm:col-start-1">
                                <label
                                    htmlFor="fecha"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Fecha:
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="fecha"
                                        id="fecha"
                                        autoComplete="off"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                        required
                                        value={values.fecha}
                                        onChange={handleChangeValues}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2 sm:col-start-1">
                                <label
                                    htmlFor="hora_entrada"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Hora de entrada:
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="time"
                                        name="hora_entrada"
                                        id="hora_entrada"
                                        autoComplete="off"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                        required
                                        value={values.hora_entrada}
                                        onChange={handleChangeValues}
                                        step={1}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="hora_salida"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Hora de salida:
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="time"
                                        name="hora_salida"
                                        id="hora_salida"
                                        autoComplete="off"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                        required
                                        value={values.hora_salida}
                                        onChange={handleChangeValues}
                                        step={1}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="total_horas"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Horas por dia:
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="total_horas"
                                        id="total_horas"
                                        min="0"
                                        step="1"
                                        max="4"
                                        autoComplete="off"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                        value={values.total_horas}
                                        onChange={handleChangeValues}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-4">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md"
                        id="cancel_button_form"
                        onClick={handleHiddeHoursForm}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default HoursForm