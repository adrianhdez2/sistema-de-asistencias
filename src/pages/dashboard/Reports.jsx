
function Reports() {
  document.title = "Reportes"

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
          Generar reporte
        </button>
      </form>
    </>
  )
}

export default Reports