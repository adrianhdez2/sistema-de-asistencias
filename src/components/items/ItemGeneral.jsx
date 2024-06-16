

function ItemGeneral({ alumno }) {
    const { nombres, apellido_p, apellido_m, matricula, carrera, total_horas } = alumno
    return (
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
                <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        {nombres + " " + apellido_p + " " + apellido_m}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {`${matricula}@alumno.ujat.mx`}
                    </p>
                </div>
            </div>
            <div
                className="hidden shrink-0 sm:flex sm:flex-col sm:items-end"
            >
                <p className="text-sm leading-6 text-gray-900">
                    {carrera}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                    Total de horas: {total_horas}hrs.
                </p>
            </div>
        </li>
    )
}

export default ItemGeneral