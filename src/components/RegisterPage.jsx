import React, {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import TextField from "./TextField.jsx";
import api from "../api/api.js";
import toast from "react-hot-toast";
import {FaEye, FaEyeSlash} from "react-icons/fa";

const USERNAME_MIN_LENGTH = 4;
const USERNAME_DEBOUNCE_MS = 500;

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setError,
        clearErrors,
        formState: {errors, isValid}
    } = useForm({
        mode: "onTouched",
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    });

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [checkingUsername, setCheckingUsername] = useState(false);

    const username = watch("username");

    /* ---------------- Username Availability Check ---------------- */
    useEffect(() => {
        if (!username || username.length < USERNAME_MIN_LENGTH) {
            return;
        }

        const timer = setTimeout(async () => {
            setCheckingUsername(true);
            try {
                const res = await api.get("/api/auth/check-username", {
                    params: {username}
                });

                if (!res.data) {
                    setError("username", {
                        type: "manual",
                        message: "Username already exists"
                    });
                } else {
                    clearErrors("username");
                }
            } catch {
                // silent fail – backend still validates on submit
            } finally {
                setCheckingUsername(false);
            }
        }, USERNAME_DEBOUNCE_MS);

        return () => clearTimeout(timer);
    }, [username, setError, clearErrors]);

    /* ---------------- Register Submit ---------------- */
    const registerHandler = async (data) => {
        setLoading(true);
        try {
            await api.post("/api/auth/register", data);
            toast.success("User registered successfully!");
            reset();
            navigate("/login");
        } catch (err) {
            const message = err?.response?.data || "Registration failed";
            toast.error(message);

            if (message.toLowerCase().includes("username")) {
                setError("username", {
                    type: "manual",
                    message
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <title>Register for Free - urlShrinkit Account</title>


            <meta name="description"
                  content="Create a free urlShrinkit account to manage, track, and analyze all your shortened links."/>


            <link rel="canonical" href="https://urlshrinkit.store/register"/>
            <div className="bg-[#0d0d10] min-h-screen pt-24 pb-12 flex items-center justify-center px-5 sm:px-10">
                <form
                    onSubmit={handleSubmit(registerHandler)}
                    className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-xl glass shadow-accent/50 border border-gray-800"
                >
                    <h1 className="text-center font-extrabold text-3xl mb-2 text-neon-gradient">
                        Create Your Account
                    </h1>
                    <p className="text-center text-gray-500 mb-6">
                        Start shrinking your links today!
                    </p>

                    <div className="space-y-4">

                        {/* Username */}
                        <div>
                            <TextField
                                label="Username"
                                id="username"
                                placeholder="Choose a unique username"
                                type="text"
                                register={register}
                                errors={errors}
                                required
                                message="Username is required"
                                minLength={{
                                    value: USERNAME_MIN_LENGTH,
                                    message: `Minimum ${USERNAME_MIN_LENGTH} characters`
                                }}
                                className="text-white"
                            />

                            {checkingUsername && (
                                <p className="text-sm text-gray-400 mt-1">
                                    Checking availability…
                                </p>
                            )}

                            {!checkingUsername &&
                                username?.length >= USERNAME_MIN_LENGTH &&
                                !errors.username && (
                                    <p className="text-sm text-green-500 mt-1">
                                        Username is available ✔
                                    </p>
                                )}
                        </div>

                        {/* Email */}
                        <TextField
                            label="Email Address"
                            id="email"
                            placeholder="you@example.com"
                            type="email"
                            register={register}
                            errors={errors}
                            required
                            message="Email is required"
                            className="text-white"
                        />

                        {/* Password */}
                        <TextField
                            label="Password"
                            id="password"
                            placeholder="Minimum 6 characters"
                            type={showPassword ? "text" : "password"}
                            register={register}
                            errors={errors}
                            required
                            minLength={{
                                value: 6,
                                message: "Minimum 6 characters"
                            }}
                            className="text-white"
                            rightIcon={
                                showPassword ? <FaEyeSlash/> : <FaEye/>
                            }
                            onRightIconClick={() => setShowPassword(prev => !prev)}
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={
                            loading ||
                            checkingUsername ||
                            !!errors.username ||
                            !isValid
                        }
                        className="w-full mt-8 px-8 py-3 text-lg font-bold rounded-xl glass
                     text-neon border-2 border-neon transition
                     hover:bg-neon hover:text-black
                     disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                    <p className="text-center text-sm mt-4 text-gray-500">
                        Already have an account?
                        <Link to="/login" className="text-neon hover:underline ml-1">
                            Log In
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default RegisterPage;
