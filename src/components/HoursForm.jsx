
function HoursForm({handleHiddeHoursForm}) {
    return (
        <div className="absolute top-0 left-0 bg-gray-500/50 w-full h-dvh flex items-center justify-center">
            <form className="w-1/2 bg-white mx-auto rounded-md p-4">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Ingresa las fechas y las horas por dia
                        </h2>
                        <div
                            className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                        >
                            <div className="sm:col-span-2 sm:col-start-1">
                                <label
                                    htmlFor="date_input"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Fecha:
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        name="date_input"
                                        id="date_input"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2 sm:col-start-1">
                                <label
                                    htmlFor="time_enter"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Hora de entrada:
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="time"
                                        name="time_enter"
                                        id="time_enter"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="time_out"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Hora de salida:
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="time"
                                        name="time_out"
                                        id="time_out"
                                        autoComplete="address-level1"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="hours"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Horas por dia:
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="hours"
                                        id="hours"
                                        min="0"
                                        step="1"
                                        max="4"
                                        defaultValue="0"
                                        autoComplete="hours"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-4">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md"
                        id="cancel_button_form"
                        onClick={handleHiddeHoursForm}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default HoursForm