import { useEffect, useState } from "react"
import LoginForm from "./LoginForm"
import axios from "axios"


function HeaderHome() {
    const [show, setShow] = useState(false)
    const [login, setLogin] = useState(false)
    axios.defaults.withCredentials = true;

    const handleShowLoginForm = (e) => {
        e.preventDefault()
        setShow(!show)
    }

    const handleHiddeLoginForm = (e) => {
        e.preventDefault()
        setShow(!show)
    }

    useEffect(() => {
        axios.get('http://localhost:3001/admins/verify')
            .then(res => {
                if (res.data.status) {
                    setLogin(!login)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <header className="bg-white">
                <nav
                    className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                    aria-label="Global"
                >
                    <div className="flex lg:flex-1">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">X DevLab</span>
                            <img
                                className="size-8 w-auto"
                                src="/xdevlab.png"
                                alt="X DevLab"
                            />
                        </a>
                    </div>
                    {/* <div className="hidden lg:flex lg:gap-x-12">
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Features</a>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Marketplace</a>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Company</a>
                </div> */}
                    <div className="flex flex-1 justify-end">
                        {
                            login ?
                                <a href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
                                    Administración
                                    <span aria-hidden="true">&rarr;</span>
                                </a>
                                :
                                <a href="#" onClick={handleShowLoginForm} className="text-sm font-semibold leading-6 text-gray-900">
                                    Administración
                                    <span aria-hidden="true">&rarr;</span>
                                </a>

                        }
                    </div>
                </nav>
            </header>
            {show && <LoginForm handleHiddeLoginForm={handleHiddeLoginForm} />}
        </>

    )
}

export default HeaderHome