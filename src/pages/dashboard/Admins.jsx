import { useEffect, useState } from "react"
import ItemAdmin from "../../components/items/ItemAdmin"
import AddAdmin from "../../components/AddAdmin"
import { useAxios } from "../../components/hooks/useAxios"
import UsePortals from "../../components/hooks/usePortals"
import { useError } from "../../components/hooks/useError"
import Error from "../../components/items/Error"


export default function Admins() {
  const [show, setShow] = useState(false)
  const [admins, setAdmins] = useState([])
  const { axiosClient } = useAxios()
  const { error, setError } = useError()

  document.title = "Administradores"

  const handleShowAddForm = (e) => {
    e.preventDefault()
    setShow(!show)
  }

  const handleHiddeAddForm = () => {
    setShow(!show)
  }

  useEffect(() => {
    axiosClient.get('/admins/verify')
      .then(res => {
        if (res.data.status) {
          axiosClient.get('/admins')
            .then(res => setAdmins(res.data))
            .catch(err => setError("Ocurrió un error al obtener la lista de administradores."))
        }
      })
      .catch()

  }, [])

  return (
    <>
      <div className="max-w-7xl w-full py-6 mx-auto flex items-center justify-end">
        <div className="my-10 w-full max-w-7xl items-center justify-between flex">
          <h2 className="font-semibold text-lg">
            Lista de Administradores
          </h2>
          <a
            href="#"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleShowAddForm}
          >
            Agregar administrador
          </a>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-7xl mx-auto mt-4 mb-10">
        {
          admins.length === 0 ?
            <p>No hay alumnos inscritos</p>
            :
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3"> Nombre completo </th>
                  <th scope="col" className="px-6 py-3"> Contacto </th>
                  <th scope="col" className="px-6 py-3 text-center"> Acción</th>
                </tr>
              </thead>
              <tbody>
                {
                  admins.map(alumno => (
                    <ItemAdmin key={alumno.id_admin} alumno={alumno} />
                  ))
                }
              </tbody>
            </table>
        }

      </div>

      {show && <UsePortals><AddAdmin handleHiddeAddForm={handleHiddeAddForm} /></UsePortals>}
      {error && <UsePortals><Error error={error} /></UsePortals>}

    </>
  )
}

