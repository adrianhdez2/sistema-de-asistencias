import axios from "axios"
import { useEffect, useState } from "react"
import { useGenerate } from "../../components/hooks/useGenerate"
import UsePortals from "../../components/hooks/usePortals"
import Error from "../../components/items/Error"


function Reports() {
  document.title = "Reportes"

  const [alumnos, setAlumnos] = useState([])
  const [dataExcel, setDataExcel] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState(null)
  const [error, setError] = useState(null)
  const [values, setValues] = useState({
    alumno_id: null,
    tipo_reporte: 'lista',
    alumno_tipo: 'servicio_y_practica'
  })

  const { downloadExcel } = useGenerate(dataExcel, fileName, "Actividades")

  const handleChangeValues = (e) => {
    const { target } = e
    const { name, value } = target
    const newValues = {
      ...values,
      [name]: value
    }

    setValues(newValues)
  }

  useEffect(() => {
    axios.get('http://localhost:3001/admins/verify')
      .then(res => {
        if (res.data.status) {
          axios.get('http://localhost:3001/alumnos?estado=1')
            .then(res => {
              setAlumnos(res.data)
              setValues({ ...values, alumno_id: res.data[0]?.id_estudiante_estudiantes })
            })
            .catch(err => setError(err.response?.data?.error))
        }
      })
      .catch(err => console.log(err))
  }, [])

  const handleGenerateReport = (e) => {
    e.preventDefault()
    setLoading(true)
    axios.post('http://localhost:3001/admins/reports', values)
      .then(res => {
        if (res.data.status) {
          setLoading(false)
          setDataExcel(res.data.data)
          setFileName(res.data.nombre)
          return
        }

      })
      .catch(err => {
        setError(err.response?.data?.error)
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

  return (
    <section className="my-10 px-2">
      <form className="max-w-7xl w-full bg-white mx-auto rounded-md" onSubmit={handleGenerateReport}>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
            Generar reportes
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Selecciona las opciones que necesites.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="tipo_reporte"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Generar reporte:
              </label>
              <div className="mt-2">
                <select
                  id="tipo_reporte"
                  name="tipo_reporte"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6 outline-none"
                  defaultValue={values.tipo_reporte}
                  onChange={handleChangeValues}
                >
                  <option value="lista">Lista de alumnos</option>
                  <option value="horas">Horas por alumnos</option>
                  <option value="actividades">Actividades por alumno</option>
                </select>
              </div>
            </div>
            {
              values.tipo_reporte === 'actividades' &&
              <div className="sm:col-span-3">
                <label
                  htmlFor="alumno_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Alumno:
                </label>
                <div className="mt-2">
                  <select
                    id="alumno_id"
                    name="alumno_id"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6 outline-none"
                    defaultValue={values.alumno_id}
                    onChange={handleChangeValues}
                  >
                    {
                      alumnos.map(alumno => (
                        <option key={alumno.id_estudiante_estudiantes} value={alumno.id_estudiante_estudiantes}>
                          {alumno.matricula + " - " + alumno.nombres + " " + alumno.apellido_p + " " + alumno.apellido_m}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>
            }
            {
              values.tipo_reporte !== 'actividades' &&
              <div className="sm:col-span-3">
                <label
                  htmlFor="alumno_tipo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Prestador de:
                </label>
                <div className="mt-2">
                  <select
                    id="alumno_tipo"
                    name="alumno_tipo"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6 outline-none"
                    defaultValue={values.alumno_tipo}
                    onChange={handleChangeValues}
                  >
                    <option value="servicio_y_practica">Servicio social y práctica profesional (Ambos)</option>
                    <option value="servicio_social">Servicio social</option>
                    <option value="practica_profesional">Práctica profesional</option>
                  </select>
                </div>
              </div>
            }
          </div>

        </div>
        <div className="mt-5 flex items-center justify-start gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:bg-indigo-500 disabled:cursor-not-allowed focus-visible:outline-indigo-600"
            disabled={loading ? true : undefined}
          >
            {
              loading ?
                <div className="border-2 border-transparent border-t-white size-3.5 mx-12 my-1 rounded-full animate-spin"></div>
                :

                'Generar reporte'
            }
          </button>

          {
            dataExcel && 
            <button 
            onClick={downloadExcel} 
            type="button"
            className="border border-slate-500/50 rounded-md px-3 py-1.5 flex items-center justify-center text-center  hover:bg-slate-500/10 transition-colors active:text-indigo-500 outline-none"
            >
              Descargar {fileName}.xlsx
              </button>
          }
        </div>
      </form>
      {error &&
        <UsePortals>
          <Error error={error} />
        </UsePortals>
      }
    </section>
  )
}

export default Reports