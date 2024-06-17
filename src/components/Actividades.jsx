import { useState } from "react"
import { useAxios } from '../components/hooks/useAxios'

export default function Actividades({ setForm, matricula, setError, setMessage }) {
  const [detalles, setDetalles] = useState('')
  const [loading, setLoading] = useState(false)
  const { axiosClient } = useAxios()

  const handleSubmitForm = (e) => {
    e.preventDefault()
    setLoading(true)

    axiosClient.post('/alumnos/activities', { matricula, detalles })
      .then(res => {
        if (res.data?.status) {
          setMessage(res.data?.message)
          setForm(false)
          setDetalles('')
          setLoading(false)
        }
      })
      .catch(err => {
        setError(err.response?.data?.error)
        setTimeout(() => {
          setForm(false)
        }, 100)
        setDetalles('')
        setLoading(false)
      })
  }

  return (
    <div className="absolute top-0 left-0 w-full min-h-dvh flex items-center justify-center bg-gray-500/50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="bg-white w-3/4 py-10 px-3 rounded-md">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Información de actividades
          </h2>
        </div>
        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl" onSubmit={handleSubmitForm}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="activity"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Describe brevemente las actividades realizadas el día de hoy:
              </label>
              <div className="mt-2.5">
                <textarea
                  id="activity"
                  name="activity"
                  rows="4"
                  required
                  autoFocus
                  className="block w-full h-24 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 max-h-24 min-h-24 resize-none"
                  value={detalles}
                  onChange={(e) => { setDetalles(e.target.value) }}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 disabled:bg-indigo-500 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={loading ? true : undefined}
            >
              {
                loading ?
                  <div className="border-2 border-transparent border-t-white size-3.5 mx-12 my-1 rounded-full animate-spin"></div>
                  :
                  'Guardar'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}