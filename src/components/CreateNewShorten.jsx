import React, {useState} from 'react'
import {useStoreContext} from "../contextApi/ContextApi.jsx";
import {useForm} from "react-hook-form";
import TextField from "./TextField.jsx";
import {Tooltip} from "@mui/material"
import {RxCross2} from "react-icons/rx";
import api from "../api/api.js";
import toast from "react-hot-toast";

const CreateNewShorten = ({setOpen, refetch}) => {
    const {token} = useStoreContext();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            originalUrl: "",
        },
        mode: "onTouched",
    });

    const createShortUrlHandler = async (data) => {
        setLoading(true);
        try {
            const {data: res} = await api.post("/api/urls/shorten", data, {
                headers: {
                    Authorization: "Bearer " + token,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });

            const shortenUrl = `${import.meta.env.VITE_REACT_SUBDOMAIN}/${res.shortUrl}`;
            navigator.clipboard.writeText(shortenUrl).then(() => {
                toast.success("Short Url Copied to Clipboard", {
                    position: "bottom-center",
                    className: 'mb-5',
                    duration: 5000,
                });
            });
            await refetch();
            reset();
            setOpen(false);
        }
        catch (error) {
            console.log(error);
            toast.error("Creation failed");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex justify-center items-center bg-amber-50 rounded-md relative'>
            <form onSubmit={handleSubmit(createShortUrlHandler)}
                  className='sm:w-[450px] w-[360px] relative text-gray-600 pt-8 pb-5 sm:px-8 px-4 rounded-lg'>
                <h1 className='font-mono text-slate-700 sm:mt-0 mt-3 text-center font-bold sm:text-2xl text-[22px]'>
                    Create New Shorten URL
                </h1>
                <hr className='font-bold'/>
                <div>
                    <TextField
                        label="Enter URL"
                        required
                        id='originalUrl'
                        placeholder='https://example.com'
                        type='url'
                        message='URL is required'
                        register={register}
                        errors={errors}
                        className="bg-blue-300"
                    />
                </div>
                <button
                    className='bg-green-500 font-semibold text-white py-2 mt-5 px-4 rounded-xl focus:text-purple-500 focus:bg-green-500'
                    type="text"
                >
                    {loading ? "Loading..." : "Create"}
                </button>
            </form>
            {!loading && (
                <Tooltip title="Close">
                    <button disabled={loading}
                            onClick={() => setOpen(false)}
                            className='bg-transparent min-w-fit font-semibold text-white rounded-3xl py-2 mt-5 absolute top-0 right-1'
                    >
                        <RxCross2 className="text-red-900 text-2xl hover:text-white" />
                    </button>
                </Tooltip>
            )}
        </div>
    )
}
export default CreateNewShorten
//short url: http://url.localhost:5173/b3oEabe0