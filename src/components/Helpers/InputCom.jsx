export default function InputCom({
  label,
  type,
  name,
  placeholder,
  inputHandler,
  value,
  inputClasses,
  labelClasses = "text-qgray text-[13px] font-normal",
}) {
  return (
    <div className="input-com w-full h-full">
      {label && (
        <label
          className={`input-label capitalize block mb-2 ${labelClasses || ""}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative">
        <input
          placeholder={placeholder}
          value={value}
          onChange={inputHandler}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClasses}`}
          type={type}
          id={name}
          name={name}
        />
      </div>
    </div>
  );
}
