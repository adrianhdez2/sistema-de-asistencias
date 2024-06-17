import { useState } from "react"
import { useAxios } from '../components/hooks/useAxios'

function AddAdmin({ handleHiddeAddForm }) {
    const { axiosClient } = useAxios()
    const [values, setValues] = useState({
        names: '',
        last_name_p: '',
        last_name_m: '',
        correo: '',
        imagen: ''
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

        axiosClient.post('/admins/add', values)
            .then(res => {
                if (res.data.status) {
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleFileChange = (event) => {
        const files = event.target.files;
        const previews = [];
        const reader = new FileReader();

        reader.onload = (e) => {
            previews.push(e.target.result);
            if (previews.length === files.length) {
                setValues({ ...values, imagen: previews[0] })
            }
        };

        for (let i = 0; i < files.length; i++) {
            reader.readAsDataURL(files[i]);
        }
    };

    return (
        <div className="absolute top-0 left-0 bg-gray-500/50 w-full h-dvh flex items-center justify-center">
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
                                htmlFor="correo"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Correo personal:
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="correo"
                                    id="correo"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                    value={values.correo}
                                    onChange={handleChangeValues}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Foto de perfil:</label>
                            <label htmlFor="file-upload" className="flex items-center justify-start border border-gray-300 rounded-md px-2 py-2 gap-x-4 cursor-pointer">
                                <svg className="size-11 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-indigo-500 font-semibold">Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md"
                        onClick={handleHiddeAddForm}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Guardar administrador
                    </button>
                </div>
            </form>
        </div>

    )
}

export default AddAdmin