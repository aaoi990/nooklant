import React, { useState } from 'react';
import { Link } from "react-router-dom"
import moment from 'moment';
import { HeartIcon, ServerIcon, ClockIcon } from '@heroicons/react/24/outline'

const Implants = () => {
    const [nooks, setNooks] = useState(
        [
            {
                id: 1,
                guid: "TYGH-T63E-DSWQ-ASXD",
                active: true,
                ipAddrExt: "109.212.34.1",
                ipAddrInt: "127.0.0.1",
                username: "Dave",
                hostname: "perfidy",
                os: "Win10",
                osBuild: "19045.2364",
                osVersion: "22H2",
                pid: 1092,
                sleepTimeSeconds: 3000,
                killTimeHours: 12,
                firstCheckIn: 1672844124,
                lastCheckIn: 1672834411,
                task: "",
                hostingFile: "",
                cryptKey: "SOMETESTGARBAGE="
            }, {
                id: 2,
                guid: "PO7U-QNZ8-Y65T-IOPS",
                active: false,
                ipAddrExt: "209.34.123.3",
                ipAddrInt: "127.0.0.1",
                username: "Dave",
                hostname: "WINHOST",
                os: "Win10",
                osBuild: "19045.2364",
                osVersion: "22H2",
                pid: 1092,
                sleepTimeSeconds: 3000,
                killTimeHours: 12,
                firstCheckIn: 167261209,
                lastCheckIn: 37261712,
                task: "",
                hostingFile: "",
                cryptKey: "SOMETESTGARBAGE="
            }, {
                id: 3,
                guid: "YJNU-9OPL-TZSW-LE43",
                active: true,
                ipAddrExt: "209.212.34.1",
                ipAddrInt: "127.0.0.1",
                username: "Dave",
                hostname: "KALI",
                os: "Win10",
                osBuild: "19045.2364",
                osVersion: "22H2",
                pid: 1092,
                sleepTimeSeconds: 3000,
                killTimeHours: 12,
                firstCheckIn: 1672844124,
                lastCheckIn: 1672832311,
                task: "",
                hostingFile: "",
                cryptKey: "SOMETESTGARBAGE="
            },
        ]
    );

    function time_diff(last_check_in) {
        return moment(moment.unix(last_check_in)).fromNow()
    }
    return (
        <div className="grid grid-cols-2 gap-4">
            {nooks.map((item, i) => {
                return <ul key={item.id} className="w-auto">
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
            })
            }
        </div>
    )
}

export default Implants
