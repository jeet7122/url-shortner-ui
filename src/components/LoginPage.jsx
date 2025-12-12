import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useForm } from "react-hook-form";
// Ensure this import path is correct for your file structure
import TextField from "./TextField.jsx"
import { Link } from 'react-router-dom';
import api from "../api/api.js";
import toast from "react-hot-toast";
import {useStoreContext} from "../contextApi/ContextApi.jsx";


const LoginPage = () => {
    const { register, reset ,handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: "",
            password: ""
        },
        mode: "onTouched"
    });
    const navigate = useNavigate();

    const {setToken} = useStoreContext();

    const [loader, setLoader] = useState(false);

    const loginHandler = async (data) => {
        console.log("Registration data:", data);
        // Implement your registration logic here (e.g., API call)
        setLoader(true);
        try{
            const {data: response} = await api.post("/api/auth/login", data);
            //Store token in local storage
            localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));
            setToken(response.token);
            toast.success("User Logged-in successfully!");
            reset();
            navigate("/dashboard");
        }
        catch(err){
            console.log(err)
            toast.error("Something went wrong!");
        }
        finally {
            setLoader(false);
        }
    }

    return (
        // 1. Consistent dark background (bg-[#0d0d10])
        // 2. min-h-screen for full height
        // 3. pt-24 to push content below the fixed Navbar
        <div className="bg-[#0d0d10] min-h-screen pt-24 pb-12 flex items-center justify-center px-5 sm:px-10">

            <form
                onSubmit={handleSubmit(loginHandler)}
                // Styled container: glass effect, dark border, rounded, and accent shadow
                className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-xl glass shadow-accent/50 border border-gray-800"
            >
                <h1 className="text-center font-extrabold text-3xl mb-2 text-neon-gradient">
                    Login to your account
                </h1>
                <p className="text-center text-gray-500 mb-6">Start shrinking your links today!</p>

                {/* ------------------ Form Fields (Correct TextField Usage) ------------------ */}
                <div className="space-y-4">

                    {/* Username Field */}
                    <TextField
                        label="Username"
                        id="username"
                        placeholder="Enter your username"
                        type="text"
                        register={register}
                        errors={errors}
                        required={true}
                        message="Username is required"
                        className="text-white" // <-- Added text-white for input color
                    />

                    {/* Password Field */}
                    <TextField
                        label="Password"
                        id="password"
                        placeholder="Enter your password"
                        type="password"
                        register={register}
                        errors={errors}
                        required={true}
                        message="Password is required"
                        min={8} // Triggers minLength validation
                        className="text-white" // <-- Added text-white for input color
                    />

                </div>
                {/* ------------------------------------------------------------------------- */}

                {/* Submit Button (Styled to match Sign Up button from Navbar) */}
                <button
                    disabled={loader}
                    type="submit"
                    className="w-full mt-8 flex items-center justify-center gap-3 px-8 py-3 text-lg font-bold rounded-xl glass transition-all duration-300 ease-in-out text-neon border-2 border-neon hover:bg-neon hover:text-black hover:scale-[1.01] shadow-neon/40 hover:shadow-neon"
                >
                    {loader ? "Loading..." : "Login"}
                </button>

                <p className="text-center text-sm mt-4 text-gray-500">
                    Don't have an account'?
                    <Link to="/register" className="text-neon hover:underline ml-1">Register</Link>
                </p>

            </form>
        </div>
    )
}
export default LoginPage;