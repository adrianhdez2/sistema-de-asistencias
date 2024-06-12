
function Message({ message }) {
    return (
        <div className="absolute top-0 text-center w-full bg-green-600 py-5 z-50 text-white">
            {message}
        </div>
    )
}

export default Message