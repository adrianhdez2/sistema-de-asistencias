import { useEffect, useState } from "react"
import axios from "axios"
import LinkUpdate from "../../components/items/LinkUpdate"
import Error from '../../components/items/Error'
import Message from '../../components/items/Message'


function Update() {
  const [alumnos, setAlumnos] = useState([])
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [search, setSearch] = useState('')
  document.title = "Actualizar horas"

  const handleSearch = (e) => {
    e.preventDefault()

    axios.get(`http://localhost:3001/alumnos/search?matricula=${search}`)
      .then(res => {
        setAlumnos(res.data)
      })
      .catch(err => {
        setError(err.response?.data?.error)
      })
  }

  function reloadData() {
    axios.get(`http://localhost:3001/alumnos/search?matricula=${search}`)
      .then(res => {
        setAlumnos(res.data)
      })
      .catch(err => {
        setError(err.response?.data?.error)
      })
  }

  useEffect(() => {
    if (error) {
      setError(error);
      const timer = setTimeout(() => {
        setError('');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      setMessage(message);
      const timer = setTimeout(() => {
        reloadData()
        setMessage('');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      <form className="mt-6 flex max-w-7xl gap-x-4 mx-auto mb-14 px-4" onSubmit={handleSearch}>
        <input
          id="matricula-address"
          name="matricula"
          type="search"
          autoComplete="matricula"
          required
          className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-slate-700/20 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          placeholder="Escribe la matricula del alumno"
          value={search}
          onChange={(e) => { setSearch(e.target.value) }}
        />
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Buscar alumno
        </button>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-7xl mx-auto my-10">
        {
          alumnos.length === 0 ?
            <p className="py-2 px-3 text-gray-400">No hay resultados con el término ingresado.</p>
            :
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3"> Matrícula </th>
                  <th scope="col" className="px-6 py-3"> Nombre completo </th>
                  <th scope="col" className="px-6 py-3"> Horas cumplidas </th>
                  <th scope="col" className="px-6 py-3"> Tipo </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {
                  alumnos.map(alumno => (
                    <tr key={alumno.id_estudiante_estudiantes} className="bg-white border-b text-black hover:bg-gray-50 dark:hover:bg-gray-100">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-black whitespace-nowrap"
                      >
                        {alumno.matricula}
                      </th>
                      <td className="px-6 py-4"> {alumno.nombres + " " + alumno.apellido_p + " " + alumno.apellido_m} </td>
                      <td className="px-6 py-4"> {alumno.total_horas}hrs </td>
                      <td className="px-6 py-4"> {formatType(alumno.tipo)} </td>
                      <td className="px-6 py-4 text-right">
                        <LinkUpdate id_estudiante={alumno.id_estudiante_estudiantes} setError={setError} setMessage={setMessage} />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        }
      </div>


      {error && <Error error={error} />}
      {message && <Message message={message} />}

    </>
  )
}

export default Update

function formatType(tipo) {
  if (tipo === 'servicio_social') return 'Servicio Social'
  if (tipo === 'practica_profesional') return 'Práctica Profesional'
  if (tipo === 'servicio_y_practica') return 'Servicio y Práctica'
}