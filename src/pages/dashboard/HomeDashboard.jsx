import { useEffect, useState } from "react"
import ItemGeneral from "../../components/items/ItemGeneral"
import ButtonNotifications from "../../components/items/ButtonNotifications"
import { useAxios } from "../../components/hooks/useAxios"
import { useError } from "../../components/hooks/useError"
import UsePortals from "../../components/hooks/usePortals"
import Error from "../../components/items/Error"


function HomeDashboard() {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  document.title = "Inicio"
  const [alumnos, setAlumnos] = useState([])
  const { axiosClient } = useAxios()
  const { error, setError } = useError()

  useEffect(() => {
    axiosClient.get('/admins/verify')
      .then(res => {
        if (res.data.status) {
          axiosClient.get(`/alumnos?&estado=1&limite=7&pagina=${page}`)
            .then(res => {
              setAlumnos(res.data.alumnos)
              setTotalPages(res.data.totalPages)
            })
            .catch(err => setError("Ocurrió un error al obtener los alumnos."))
        }
      })
      .catch()
  }, [page])


  return (
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="my-1 w-full max-w-7xl items-center justify-end flex">
          <ButtonNotifications />
        </div>
        <div className="my-10 w-full max-w-7xl items-center justify-between flex">
          <h2 className="font-semibold text-lg">
            Actuales alumnos prestadores de servicio social y práctica profesional
          </h2>
          <a
            href="/dashboard/students"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Todos los alumnos
          </a>
        </div>
        <ul role="list" className="divide-y divide-gray-100">

          {
            alumnos.length === 0 ?
              <p>No hay alumnos inscritos.</p>
              :

              alumnos.map(alumno => (
                <ItemGeneral key={alumno.id_estudiante_estudiantes} alumno={alumno} />
              ))
          }

        </ul>

        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex items-center justify-center">
          <nav className="inline-flex -space-x-px rounded-md shadow-sm">
            <button type="button" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-inset ring-gray-600 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 border border-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span className="relative z-10 inline-flex items-center px-5 py-2 text-sm font-semibold text-white border border-indigo-600 bg-indigo-600 focus:z-10 focus-visible:outline-1 focus-visible:outline-offset-2 ">
              {page}
            </span>
            <button type="button" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 border border-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
            >
              Siguiente
            </button>
          </nav>
        </div>
      </div>
      {error && <UsePortals><Error error={error} /></UsePortals>}
    </main>
  )
}

export default HomeDashboard