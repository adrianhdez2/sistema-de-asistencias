import { Link, useLocation } from "react-router-dom"

function LinkHeader({ href, title }) {
    const pathName = useLocation().pathname
    return (
        <Link
            to={href}
            className={`${href === pathName ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} rounded-md px-3 py-2 text-sm font-medium`}
            aria-current="page"
        >
            { title }
        </Link>
    )
}

export default LinkHeader