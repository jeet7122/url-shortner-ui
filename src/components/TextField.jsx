import React from "react";

const TextField = ({
                       label,
                       id,
                       type,
                       placeholder,
                       register,
                       errors,
                       required,
                       message,
                       minLength,
                       className,
                       rightIcon,
                       onRightIconClick
                   }) => {
    return (
        <div className="flex flex-col space-y-1">
            <label htmlFor={id} className="text-sm text-gray-400">
                {label}
            </label>

            <div className="relative">
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className={`w-full px-4 py-3 pr-12 rounded-lg bg-[#0d0d10]
            border border-gray-700 focus:border-neon outline-none
            ${className}`}
                    {...register(id, {
                        required: required ? message : false,
                        minLength
                    })}
                />

                {rightIcon && (
                    <button
                        type="button"
                        onClick={onRightIconClick}
                        className="absolute right-3 top-1/2 -translate-y-1/2
                       text-gray-400 hover:text-neon transition"
                    >
                        {rightIcon}
                    </button>
                )}
            </div>

            {errors?.[id] && (
                <p className="text-sm text-red-500">
                    {errors[id]?.message}
                </p>
            )}
        </div>
    );
};

export default TextField;
