import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { BsArrowLeftCircle } from 'react-icons/bs'
import { BugAntIcon, ChartBarIcon, GlobeAltIcon, HomeModernIcon, ServerStackIcon } from '@heroicons/react/24/outline'


const Sidebar = () => {
    const [open, setOpen] = useState(true)
    const location = useLocation()

    const Menus = [
        { title: 'Home', path: '/', src: <HomeModernIcon className="h-6 w-6 text-lime-500" /> },
        { title: 'Server', path: '/server', src: <ServerStackIcon className="h-6 w-6 text-lime-500" /> },
        { title: 'Implants', path: '/implants', src: <BugAntIcon className="h-6 w-6 text-lime-500" /> },
        { title: 'Networks', path: '/networks', src: <GlobeAltIcon className="h-6 w-6 text-lime-500" /> },
        { title: 'Stats', path: '/stats', src: <ChartBarIcon className="h-6 w-6 text-lime-500" /> },
    ]

    return (
        <>
            <div
                className={`${open ? 'w-60' : 'w-fit'
                    } hidden sm:block relative h-screen duration-300 bg-gray-100 border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-slate-800 `}
            >
                <BsArrowLeftCircle
                    className={`${!open && 'rotate-180'
                        } absolute text-3xl bg-white fill-slate-800  rounded-full cursor-pointer top-9 -right-4 dark:fill-gray-400 dark:bg-gray-800`}
                    onClick={() => setOpen(!open)}
                />
                <Link to='/'>
                    <div className={`flex ${open && 'gap-x-4'} items-center`}>
                        {/* <img src={Logo} alt='' className='pl-2' /> */}
                        {open && (
                            <span className='text-xl font-medium whitespace-nowrap dark:text-white'>
                                Implants
                            </span>
                        )}
                    </div>
                </Link>

                <ul className='pt-6'>
                    {Menus.map((menu, index) => (
                        <Link to={menu.path} key={index}>
                            <li
                                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700
                        ${menu.gap ? 'mt-9' : 'mt-2'} ${location.pathname === menu.path &&
                                    'bg-gray-200 dark:bg-gray-700'
                                    }`}
                            >
                                <span className='text-2xl'>{menu.src}</span>
                                <span
                                    className={`${!open && 'hidden'
                                        } origin-left duration-300 hover:block`}
                                >
                                    {menu.title}
                                </span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Sidebar
