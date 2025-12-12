import React, {useState, useEffect, useRef} from 'react';
import {FaExternalLinkAlt} from "react-icons/fa";
import {LiaCheckSolid} from "react-icons/lia";
import {IoCopy} from "react-icons/io5";
import Clipboard from 'clipboard';
import {MdAnalytics} from "react-icons/md";
import api from "../api/api.js";
import {useStoreContext} from "../contextApi/ContextApi.jsx";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {Hourglass} from "react-loader-spinner";
import Graph from "./dashboard/Graph.jsx";

const ShortenItem = ({originalUrl, shortUrl, clickCount, createdDate}) => {

    const navigate = useNavigate();
    const subdomain = import.meta.env.VITE_REACT_SUBDOMAIN?.replace(/^https?:\/\//, '');
    const [isCopied, setCopied] = useState(false);
    const [analyticsToggle, setAnalyticsToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState("");
    const copyButtonRef = useRef(null);
    const [analyticsData, setAnalyticsData] = useState([]);
    const {token} = useStoreContext();

    const fetchMyShortUrl = async () => {
        setLoader(true);
        try {
            const {data} = await api.get(`api/urls/analytics/${selectedUrl}?startDate=2025-01-01T00:00:00&endDate=2026-02-01T23:59:59`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            });
            toast.success("fetched successfully");
            setAnalyticsData(data)
            setSelectedUrl("");
            console.log(data)
        } catch (error) {
            console.error(error);
            toast.error(error.message);
            navigate("/error");
        } finally {
            setLoader(false);
        }
    }

    const analyticsHandler = (shortUrl) => {
        if (!analyticsToggle) {
            setSelectedUrl(shortUrl);
        }
        setAnalyticsToggle(!analyticsToggle);
    }
    const formattedDate = createdDate
        ? new Date(createdDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
        : 'N/A';

    // Initialize clipboard
    useEffect(() => {
        if (!copyButtonRef.current) return;

        const clipboard = new Clipboard(copyButtonRef.current, {
            text: () => `${import.meta.env.VITE_REACT_SUBDOMAIN}/${shortUrl}`
        });

        clipboard.on('success', () => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2s
        });

        clipboard.on('error', () => {
            alert('Failed to copy. Please copy manually.');
        });

        return () => clipboard.destroy();
    }, [shortUrl]);

    useEffect(() => {
        if (selectedUrl) {
            fetchMyShortUrl();
        }
    }, [selectedUrl])

    return (
        <div
            className='p-4 sm:p-6 rounded-xl glass border border-gray-800 transition-all duration-300 hover:border-primary/50'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0'>

                <div className='flex flex-col'>
                    <a
                        href={`${import.meta.env.VITE_REACT_SUBDOMAIN}/${shortUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-lg font-bold text-primary-gradient hover:text-neon transition-colors duration-300'
                    >
                        <span
                            className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400">
                            {subdomain ? subdomain + "/" : ''}
                        </span>
                        <span className='text-white ml-0.5 hover:text-gray-200'>
                            {shortUrl}
                        </span>
                        <FaExternalLinkAlt className="text-purple-500 inline-block ml-3"/>
                    </a>
                    <p className='text-sm text-gray-500 truncate mt-1'>
                        Destination: {originalUrl}
                    </p>
                </div>

                <div className='flex items-center space-x-6 text-sm ml-6 xs:m-0'>
                    <div className='flex items-center space-x-1'>
                        <span className='text-xl font-extrabold text-neon-yellow'>
                            {clickCount ?? 0}
                        </span>
                        <span className='text-gray-400'>Clicks</span>
                    </div>
                    <div className='text-gray-500'>
                        <span className='hidden sm:inline'>Created: </span>{formattedDate}
                    </div>
                </div>

                <div className="flex flex-1 sm:justify-end items-center gap-4">
                    <div ref={copyButtonRef}
                         className="flex cursor-pointer gap-1 items-center bg-primary py-2 font-semibold px-4 rounded">
                        <button>{isCopied ? "Copied" : "Copy"}</button>
                        {isCopied ? <LiaCheckSolid className="text-md"/> : <IoCopy className="text-md"/>}
                    </div>
                    <div onClick={() => analyticsHandler(shortUrl)}
                         className="flex cursor-pointer gap-2 items-center font-semibold bg-green-500 py-2 px-4 rounded-md">
                        <button>Analytics</button>
                        <MdAnalytics className="text-md"/>
                    </div>
                </div>

            </div>
            <React.Fragment>
                <div
                    className={`${analyticsToggle ? "flex" : "hidden"} max-h-96 sm:mt-0 mt-5 min-h-96 relative border-t-2 w-[100%] overflow-hidden`}>
                    {loader ? (
                        <div className="min-h-[calc(450px-150px)] flex justify-center items-center w-full">
                            <div className="flex flex-col items-center gap-1">
                                <Hourglass
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="hourglass-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    colors={['#306cce', '#72a1ed']}
                                />
                                <p className='mt-5 font-semibold'>Loading data, please wait....</p>


                            </div>
                        </div>
                    ) : (<>{analyticsData.length === 0 &&(
                        <div className='flex flex-col justify-center sm:items-center items-end w-full absolute left-0 top-0 '>
                            <h1 className='font-bold text-4xl'>No Data for this period</h1>
                            <h3 className='font-semibold text-md'>Share the short-links to view where the engagements are coming from!</h3>
                        </div>
                    )}
                        <Graph graphData={analyticsData} />
                    </>)}
                </div>
            </React.Fragment>
        </div>
    );
};

export default ShortenItem;
