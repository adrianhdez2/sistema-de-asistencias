import { useState } from "react"
import HoursForm from "../../components/HoursForm"


function Update() {
  const [show, setShow] = useState(false)  
  document.title = "Actualizar horas"

  const handleShowHoursForm = (e) => {
    e.preventDefault()
    setShow(!show)
  }

  const handleHiddeHoursForm = (e) => {
    e.preventDefault()
    setShow(!show)
  }

  return (
    <>
      <form className="mt-6 flex max-w-7xl gap-x-4 mx-auto mb-14 px-4">
        <input
          id="matricula-address"
          name="matricula"
          type="search"
          autoComplete="matricula"
          required
          className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-slate-700/20 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          placeholder="Escribe la matricula del alumno"
        />
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Buscar alumno
        </button>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-7xl mx-auto">
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
            <tr className="bg-white border-b text-black hover:bg-gray-50 dark:hover:bg-gray-100">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-black whitespace-nowrap"
              >
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4"> Silver </td>
              <td className="px-6 py-4"> Laptop </td>
              <td className="px-6 py-4"> $2999 </td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  onClick={handleShowHoursForm}
                  id="button_add_hours"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Agregar horas
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {show && <HoursForm handleHiddeHoursForm={handleHiddeHoursForm} />}

    </>
  )
}

export default Update