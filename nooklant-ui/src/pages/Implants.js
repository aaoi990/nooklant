import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom"
import moment from 'moment';
import { HeartIcon, ServerIcon, ClockIcon } from '@heroicons/react/24/outline'
import socketIO from 'socket.io-client';

const Implants = () => {
    const [nooks, setNooks] = useState([]);

    const timer = useRef();

    useEffect(() => {
        const socket = socketIO("localhost:5000/", {
            transports: ["websocket"],
            cors: {
                origin: "http://localhost:3000/",
            },
        });
        socket.on("connect", (data) => {
            if (data) {
                setNooks(data)
            }
        });
        timer.current = setInterval(() => {
            socket.emit("data")
        }, 10000);
        socket.on("data", (data) => {
            if (data) {
                setNooks(data)
            }
        });
        return (() => {
            clearInterval(timer.current)
            socket.disconnect()
        })
    }, [])

    function time_diff(last_check_in) {
        return moment(moment.unix(last_check_in)).fromNow()
    }

    return (
        <div className="grid grid-flow-row-dense grid-cols-1 ">
            {nooks.map((item, i) => {
                return <div key={item.guid} className="col-span-1 mt-5 ">
                    <ul className=" w-auto">
                        <li className="pb-3 sm:pb-4">
                            <div className="flex items-center space-x-6">
                                <div className="flex-shrink-0">
                                    <HeartIcon className={item.active ? "h-6 w-6 text-lime-500" : "h-6 w-6 text-red-800"} />
                                </div>

                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        <Link to={{
                                            pathname: `/implantdetails/${item.guid}`
                                        }}>{item.guid}</Link>
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {item.os} {item.osBuild} {item.osVersion}
                                    </p>
                                    <p className={item.active ? "text-sm h-6 w-6 text-lime-500" : "text-sm h-6 w-6 text-red-800"}>
                                        {item.active ? "Active" : "Expired"}
                                    </p>
                                </div>

                                <div className="flex-1">
                                    <div type="submit" className="flex items-center text-sm w-auto">
                                        <ClockIcon className="h-3 w-3 mr-1 text-gray-900 dark:text-white" />
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">First seen {moment.unix(item.firstCheckIn).format("MM/DD/YYYY HH:mm:ss")}</p>
                                    </div>
                                    <div type="submit" className="flex items-center text-sm w-auto">
                                        <ClockIcon className="h-3 w-3 mr-1 text-gray-400" />
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">Last seen {time_diff(item.lastCheckIn)} </p>
                                    </div>
                                    <div type="submit" className="flex items-center text-sm w-auto">
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            @ {moment.unix(item.lastCheckIn).format("MM/DD/YYYY HH:mm:ss")}</p>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div type="submit" className="flex items-center text-sm w-auto">
                                        <ServerIcon className="h-3 w-3 mr-1 text-gray-900 dark:text-white" />
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{item.hostname}</p>
                                    </div>
                                    <div type="submit" className="flex items-center text-sm w-auto">
                                        <ServerIcon className="h-3 w-3 mr-1 text-gray-400" />
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">External {item.ipAddrExt}</p>
                                    </div>
                                    <div type="submit" className="flex items-center text-sm w-auto">
                                        <ServerIcon className="h-3 w-3 mr-1 text-gray-400" />
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">Internal {item.ipAddrInt}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            })
            }
        </div>
    )
}

export default Implants
