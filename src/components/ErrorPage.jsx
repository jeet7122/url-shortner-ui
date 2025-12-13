import React from 'react'
import {Link} from "react-router-dom";
import {FaExclamationTriangle} from "react-icons/fa";

const ErrorPage = ({message}) => {
    return (
        <>
            <title>Something Went Wrong - url-shrink-it</title>


            <meta name="robots" content="noindex"/>
            <div
                className='w-full h-[500px] text-white bg-gray-700 relative top-15 flex flex-col justify-center items-center'>
                <h1 className="text-2xl py-6 px-4">{message} !</h1>
                <FaExclamationTriangle className="text-red-500 text-4xl"/>
                <Link to="/" className="text-purple-500 px-2 ">Back to home page</Link>
            </div>
        </>
    )
}
export default ErrorPage
