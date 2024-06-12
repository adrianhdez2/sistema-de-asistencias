import axios from "axios";
import { useState } from "react";


function FormOTP({ studentValues, setShow, setForm, setError, setMessage }) {
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)


    const handleValidation = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.defaults.withCredentials = true

        axios.post('http://localhost:3001/alumnos/update', { studentValues, otp },)
            .then(res => {
                if (res.data.status) {
                    setMessage(res.data?.message)
                    setShow(false)
                    setForm(true)
                    setLoading(false)
                }
            })
            .catch(err => {
                setError(err.response?.data?.error)
                setLoading(false)
            })
    }
    return (
        <div className="absolute top-0 left-0 bg-gray-500/50 w-full h-dvh flex items-center justify-center">
            <form className='w-1/3 bg-white mx-auto rounded-md p-4' onSubmit={handleValidation}>
                <div className="w-full flex items-center justify-center text-center py-2 mb-2">
                    <h3 className="text-2xl font-semibold">Ingresa el código de validación</h3>
                </div>

                <div className="my-4">
                    <div className="mt-2">
                        <input
                            id="otp_code"
                            name="otp_code"
                            type="text"
                            autoComplete="off"
                            required
                            maxLength={6}
                            pattern="\d*"
                            inputMode="numeric"
                            autoFocus
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="block w-full rounded-md border-0 py-2 px-2 font-semibold text-2xl text-center tracking-[10px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                        />
                    </div>
                </div>

                <div className="flex w-full flex-col gap-y-3 mt-5">
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 disabled:bg-indigo-500 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        disabled={loading ? true : undefined}
                    >
                        {
                            loading ?
                                <div className="border-2 border-transparent border-t-white size-3.5 mx-12 my-1 rounded-full animate-spin"></div>
                                :
                                'Validar'
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormOTP