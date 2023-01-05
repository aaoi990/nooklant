import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import moment from 'moment';

const ImplantDetails = (props) => {
    let { guid } = useParams();

    const [nook, setNook] = useState({
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
        task: null,
        hostingFile: null,
        cryptKey: "SOMETESTGARBAGE=",
        expired: null
    })

    useEffect(() => {
        let kill_time = moment.unix(nook.lastCheckIn)
        let expires = kill_time.add(nook.killTimeHours, 'hours')
        let update = nook['expires'] = moment(expires).format("MM/DD/YYYY HH:mm:ss")
        if (moment(nook.expires).isBefore()) {
            update = nook.expired = true
        }
        setNook({ ...nook, update })
        console.log(nook)
    }, []);

    return (
        <div className="font-sans flex flex-col w-full">
            <div className="flex-grow container mx-auto sm:px-4 pt-6 pb-8">
                <div className="border-t border-b sm:border-l sm:border-r sm:rounded shadow mb-6 dark:text-gray-400">
                    <div className="border-b px-6">
                        <div className="flex justify-between -mb-px">
                            <div className="text-blue-dark py-4 text-lg">
                                {nook.guid} is <span className={nook.active ? "text-lime-500" : "text-red-800"}>
                                    {nook.active ? "Active" : "Expired"}</span>
                                <span className='text-dark-blue'> on
                                    external address {nook.ipAddrExt} and internal address {nook.ipAddrInt}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:flex">
                        <div className="w-1/3 text-center py-8">
                            <div className="border-r">
                                <div className="text-grey-darker mb-2">
                                    <span className="text-2xl">{moment.unix(nook.firstCheckIn).format("MM/DD/YYYY HH:mm:ss")}</span>
                                </div>
                                <div className="text-sm uppercase text-grey tracking-wide">
                                    initial deployment
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3 text-center py-8">
                            <div className="border-r">
                                <div className="text-grey-darker mb-2">
                                    <span className="text-2xl">{moment(moment.unix(nook.lastCheckIn)).fromNow()}</span>
                                </div>
                                <div className="text-sm uppercase text-grey tracking-wide">
                                    last seen
                                </div>
                            </div>
                        </div>
                        <div className={nook.expired ?
                            "text-red-800 w-1/3 text-center py-8" :
                            "w-1/3 text-center py-8 text-lime-500"}>
                            <div>
                                <div className="mb-2">
                                    <span className="text-2xl">{nook.expires}</span>
                                </div>
                                <div className="text-sm uppercase tracking-wide">
                                    {nook.expired ? "Expired" : `expiry with kill time of ${nook.killTimeHours} hours`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex flex-wrap -mx-4">

                    <div className="w-full mb-6 lg:mb-0 lg:w-1/2 px-4 flex flex-col">
                        <div className="flex-grow flex flex-col border-t border-b sm:rounded sm:border shadow overflow-hidden dark:text-gray-400">
                            <div className="border-b">
                                <div className="flex-grow flex px-6 py-6 text-grey-darker border-b -mx-4">
                                    <div className="flex flex-grow">
                                        <div className="w-1/2 px-4">
                                            <div>Command</div>
                                        </div>
                                        <div className="w-1/2 px-4">
                                            <div>Result</div>
                                        </div>
                                        <div className="w-1/2 px-4">
                                            <div>Executed</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-grow flex px-6 py-6 text-grey-darker border-b -mx-4">
                                <div className="flex flex-grow">
                                    <div className="w-1/2 px-4"><div>Whoami</div></div>
                                    <div className="w-1/2 px-4"><div>dave</div></div>
                                    <div className="w-1/2 px-4"><div>{moment(moment.now()).format("MM/DD/YYYY HH:mm:ss")}</div></div>
                                </div>
                            </div>
                            <div className="flex-grow flex px-6 py-6 text-grey-darker items-center border-b -mx-4">
                                <div className="flex flex-grow">
                                    <div className="w-1/2 px-4"><div>Upload</div></div>
                                    <div className="w-1/2 px-4"><div>File 'test.txt' uploaded to '/tmp'</div></div>
                                    <div className="w-1/2 px-4"><div>{moment(moment.now()).format("MM/DD/YYYY HH:mm:ss")}</div></div>
                                </div>
                            </div>
                            <div className="flex-grow flex px-6 py-6 text-grey-darker items-center border-b -mx-4">
                                <div className="flex flex-grow">
                                    <div className="w-1/2 px-4"><div>HB</div></div>
                                    <div className="w-1/2 px-4"><div>success</div></div>
                                    <div className="w-1/2 px-4"><div>{moment(moment.now()).format("MM/DD/YYYY HH:mm:ss")}</div></div>
                                </div>
                            </div>
                            <div className="px-6 py-4">
                                <div className="text-center text-grey">
                                    Last Commands
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/4 px-4">
                        <div className="dark:text-gray-400 border-t border-b sm:rounded sm:border shadow">
                            <div className="border-b">
                                <div className="flex justify-between px-6 -mb-px">
                                    <h3 className="text-blue-dark py-4 font-normal text-lg">Host Overview</h3>
                                </div>
                            </div>
                            <div>
                                <div className="text-left px-6">
                                    <div className="py-2">
                                        <div className="mb-4">Hostname: {nook.hostname}</div>
                                        <div className="mb-4">User: {nook.username}</div>
                                        <div className="mb-4">PID: {nook.pid}</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/4 px-4">
                        <div className="dark:text-gray-400 border-t border-b sm:rounded sm:border shadow">
                            <div className="border-b">
                                <div className="flex justify-between px-6 -mb-px">
                                    <h3 className="text-blue-dark py-4 font-normal text-lg">OS Overview</h3>
                                </div>
                            </div>
                            <div>
                                <div className="text-left px-6">
                                    <div className="py-2">
                                        <div className="mb-4">OS: {nook.os}</div>
                                        <div className="mb-4">OS Build: {nook.osBuild}</div>
                                        <div className="mb-4">OS Version: {nook.osVersion}</div>
                                        <div className="mb-4">PSP: Malware Bytes, Defender</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImplantDetails
