import React, {useState} from 'react';
import Graph from './Graph.jsx';
import { useStoreContext } from "../../contextApi/ContextApi.jsx";
import {useFetchMyShortUrl, useFetchTotalClick} from "../../hooks/useQuery.js";
import {Navigate, useNavigate} from 'react-router-dom';
import ShortenPopUp from "../ShortenPopUp.jsx";
import ShortenUrlList from "../ShortenUrlList.jsx";
import Loader from "../Loader.jsx"; // Assuming you'll use Link for routing

const DashboardLayout = () => {
    const { token } = useStoreContext();
    const [shortenPopup, setShortenPopup] = useState(false);

    const navigate = useNavigate();
    // Define onError inside the component or use useCallback/memo for production
    const onError = (error) => {
        // You would typically use a notification or toast here
        console.error("DashboardLayout: Error fetching data.", error);
        navigate("/error");
    }


    const { isLoading: loader, data: totalClicks} = useFetchTotalClick(token, onError);
    const { isLoading, data: myShortenUrls, refetch} = useFetchMyShortUrl(token, onError);
    if (!token){
        return <Navigate to="/login" replace/>
    }

    // CRITICAL: Check if data is null/undefined OR if the array is empty
    const hasData = totalClicks && totalClicks.length > 0;
    const hasUrls = myShortenUrls && myShortenUrls.length > 0;

    return (
        // Consistent dark background (bg-[#0d0d10]) and padding for the fixed navbar
        <div className="bg-[#0d0d10] text-white pt-20 lg:px-14 sm:px-8 px-4 min-h-screen">
            <div className="lg:w-[90%] w-full mx-auto py-8">

                {/* Dashboard Title */}
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-primary-gradient">
                    Link Analytics
                </h1>

                {loader ? (
                    // Loading State
                    <Loader />
                ) : (
                    <div className="h-[450px] sm:h-[500px] relative">
                        {/* -------------------- Conditional Rendering Logic -------------------- */}

                        {!hasData ? (
                            // 1. SHOW NO DATA MESSAGE (Styled to match the theme)
                            <div className="h-full flex flex-col items-center justify-center p-6 sm:p-8 rounded-xl glass border border-gray-800 text-center">
                                <h1 className="text-3xl text-neon mb-2 font-bold">No Click Data Yet!</h1>
                                <h3 className="text-gray-400 max-w-md">
                                    Share your short links and check back soon to view your engagement statistics here.
                                </h3>

                                {/* Call to action button */}
                                <button
                                    onClick={() => setShortenPopup(true)}
                                    className="mt-6 flex items-center justify-center gap-2 px-6 py-2 text-md font-semibold rounded-xl transition-all duration-300 ease-in-out
                                       bg-secondary hover:bg-opacity-80 text-white shadow-secondary/50 hover:shadow-secondary"
                                >
                                    Create Your First Link
                                </button>
                            </div>
                        ) : (
                            // 2. SHOW GRAPH (Styled with glass/shadow for consistency)
                            <div className="h-full p-4 sm:p-6 rounded-xl glass shadow-primary/20">
                                {/* The Graph component now only receives data when it exists,
                                    so you can remove the dummy data logic inside Graph.jsx */}
                                <Graph graphData={totalClicks} />
                            </div>
                        )}

                        {/* --------------------------------------------------------------------- */}
                    </div>

                )}

                {/* Always show the Create button if not loading */}
                {!loader && (
                    <div className='py-5 sm:text-end text-center'>
                        {/* Assuming /create is the correct route */}
                        <button
                            onClick={() => setShortenPopup(true)}
                            className="mt-6 flex items-center justify-center gap-2 px-6 py-2 text-md font-semibold rounded-xl transition-all duration-300 ease-in-out
                                       bg-secondary hover:bg-opacity-80 text-white shadow-secondary/50 hover:shadow-secondary"
                        >
                            Create a new Link
                        </button>
                    </div>
                )}
                <ShortenPopUp
                    open={shortenPopup}
                    refetch={refetch}
                    setOpen={setShortenPopup}
                />
                <div>
                    {!hasUrls ? (
                        <h2>
                            You haven't created any short link yet!
                        </h2>
                    ) : (
                        <ShortenUrlList data={myShortenUrls} />
                    )}
                </div>
            </div>
        </div>
    )
}
export default DashboardLayout;