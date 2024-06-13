import { useEffect, useState } from 'react'
import HeaderHome from '../components/HeaderHome'
import axios from 'axios'
import { useTime } from '../components/hooks/useTime'
import FormOTP from '../components/FormOTP'
import Error from '../components/items/Error'
import Message from '../components/items/Message'
import Actividades from '../components/Actividades'

function Home() {

  const [studentValues, setStudentValues] = useState({ id_hora: null, hora_salida: null, matricula: null })
  const [initialValues] = useState({ matricula: '', password: '' })
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [form, setForm] = useState(false)
  const [values, setValues] = useState({
    matricula: '',
    password: ''
  })
  const { time } = useTime()

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
    axios.defaults.withCredentials = true
    axios.post('http://localhost:3001/alumnos/save', values)
      .then(res => {
        if (res.data.status == 200) {
          setStudentValues({ ...studentValues, id_hora: res.data.id_hora, hora_salida: time, matricula: values.matricula })
          setMessage(res.data?.message_email)
          setValues(initialValues)
          setShow(true)
          setLoading(false)
          return
        }

        if (res.data.status) {
          setMessage(res.data.message)
          setValues(initialValues)
          setLoading(false)
          return
        }
      })
      .catch(err => {
        setError(err.response?.data?.error)
        setValues(initialValues)
        setLoading(false)
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
      <HeaderHome />
      <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registra tu <i>entrada</i> o <i>salida</i>
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="matricula"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Matrícula:
              </label>
              <div className="mt-2">
                <input
                  id="matricula"
                  name="matricula"
                  type="text"
                  autoComplete="off"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={values.matricula}
                  onChange={handleChangeValues}
                />
              </div>
            </div>

            <div>
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
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={values.password}
                  onChange={handleChangeValues}
                />
              </div>
            </div>

            <div>
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

      {show && <FormOTP studentValues={studentValues} setShow={setShow} setForm={setForm} setError={setError} setMessage={setMessage}/>}
      {error && <Error error={error} />}
      {message && <Message message={message} />}
      {form && <Actividades setForm={setForm} matricula={studentValues.matricula} setError={setError} setMessage={setMessage}/>}
    </>
  )
}

export default Home