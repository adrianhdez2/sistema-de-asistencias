import { useEffect, useState } from "react"
import AddForm from "../../components/AddForm"
import ItemList from "../../components/items/ItemList"
import Filters from "../../components/items/Filters"
import { useFilters } from '../../components/hooks/useFilters'
import { useAxios } from "../../components/hooks/useAxios"


function Alumnos() {
  const [show, setShow] = useState(false)
  const [alumnos, setAlumnos] = useState([])
  const { filterStudents } = useFilters()
  const { axiosClient } = useAxios()

  document.title = "Alumnos"

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
          axiosClient.get('/alumnos')
            .then(res => setAlumnos(res.data))
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))

  }, [])

  return (
    <>
      <div className="max-w-7xl w-full py-6 mx-auto flex items-center justify-end">
        <div className="my-10 w-full max-w-7xl items-center justify-between flex">
          <h2 className="font-semibold text-lg">
            Lista total de alumnos prestadores de servicio social y práctica profesional
          </h2>
          <a
            href="#"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleShowAddForm}
          >
            Agregar alumno
          </a>
        </div>
      </div>

      <div className="max-w-7xl w-full py-6 mx-auto flex items-center justify-end">
        <div className="w-full max-w-7xl items-center justify-end flex gap-x-3">
          <span>Ordenar por: </span>
          <Filters />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-7xl mx-auto mt-4 mb-10">
        {
          alumnos.length === 0 ?
            <p>No hay alumnos inscritos</p>
            :
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3"> Matrícula </th>
                  <th scope="col" className="px-6 py-3"> Nombre completo </th>
                  <th scope="col" className="px-6 py-3"> Horas cumplidas </th>
                  <th scope="col" className="px-6 py-3"> Tipo </th>
                  <th scope="col" className="px-6 py-3 text-center"> Acción</th>
                  <th scope="col" className="px-6 py-3 text-center"> Contraseña</th>
                </tr>
              </thead>
              <tbody>
                {
                  filterStudents(alumnos).map(alumno => (
                    <ItemList key={alumno.id_estudiante_estudiantes} alumno={alumno} />
                  ))
                }
              </tbody>
            </table>
        }

      </div>

      {show && <AddForm handleHiddeAddForm={handleHiddeAddForm} />}

    </>
  )
}

export default Alumnos