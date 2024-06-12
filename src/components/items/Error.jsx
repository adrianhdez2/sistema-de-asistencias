

function Error({error}) {
    return (
        <div className="absolute top-0 text-center w-full bg-red-600 py-5 z-50 text-white">
            {error}
        </div>
    )
}

export default Error