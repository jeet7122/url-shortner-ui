const TextField = ({
                       label,
                       id,
                       placeholder,
                       type,
                       errors,
                       register,
                       required,
                       message,
                       className,
                       min,
                       value
                   }) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className={`${className ? className : ""} font-semibold text-md`}>{label}</label>
            <input type={type} id={id} placeholder={placeholder}
                   className={`${className ? className : ""} px-2 py-2 border outline-none bg-transparent text-slate-700 rounded-md ${errors[id]?.message ? "border-red-500" : "border-slate-600"}`}
                   {...register(id, {
                       required: {value: required, message: message},
                       minLength: min
                           ? {value: min, message: "Minimum 6 characters required!"} : null,
                       pattern:
                           type === "email"
                               ? {
                                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // (Improved Email Regex)
                                   message: "Invalid email address",
                               } :
                               type === "url"
                                   ? {
                                       // COMPLETED URL REGEX
                                       value: /^(https?:\/\/)?([\da-z-]+)\.([a-z]{2,6})([\/\w -]*)*\/?$/,
                                       message: "Invalid URL address (e.g., https://example.com)",
                                   } : null,

                   })}/>
            {/* Display error message if present */}
            {errors[id]?.message && (
                <p className="text-sm text-red-500 mt-1">{errors[id].message}</p>
            )}
        </div>
    )
}
export default TextField;