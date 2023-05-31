import { useEffect, useState } from "react";
// import { isEmpty } from "../../Register/Components/InputValidation";
function PasswordInput({
  value,
  setValue,
  label,
  placeholder,
  valid,
  error,
  errorMsg,
  showIcon,
}) {
  const [visibility, setVisibility] = useState("password");
  const [empty, setempty] = useState(true);
  const [focused, setFocused] = useState(false);
  const OnFocus = () => setFocused(true);
  const OnBlur = () => setFocused(false);
  function handleClick(e) {
    e.preventDefault();
    if (visibility === "password") {
      setVisibility("text");
    } else {
      setVisibility("password");
    }
  }
  useEffect(() => {
    const isEmpty = (value) => {
      return value == "";
    };
    if (isEmpty(value)) {
      setempty(true);
    } else {
      setempty(false);
    }
  }, [value]);
  return (
    <div className="flex justify-center items-start box-content mb-5 flex-col relative">
      <input
        autoComplete="off"
        value={value}
        onFocus={OnFocus}
        onBlur={OnBlur}
        onChange={(e) => setValue(e.target.value)}
        type={visibility}
        className={`peer block border  ${
          empty
            ? "border-gray-400"
            : valid
            ? "border-green-500"
            : "border-red-500"
        } text-xs
        box-content w-[250px] h-[20px] rounded-sm outline-none
         placeholder-transparent
         my-2 py-[6px] pr-2 pl-3 `}
        name="password"
        placeholder={placeholder}
        id={label}
      />
      <label
        htmlFor={label}
        className={` transition-all  bg-input-color text-gray-400 ${
          !empty
            ? "absolute -top-[10px] left-[6px] text-xs"
            : ` absolute top-[16px] left-[13.5px] text-sm cursor-text`
        }`}
      >
        {label}
      </label>
      <div className="absolute right-3">
        <div className="w-16 h-4 flex justify-end items-center">
          <div className="absolute right-10 w-[16px] h-[16px]">
            {!empty &&
              !focused &&
              showIcon &&
              (valid ? (
                <img src="/icons/valid.png" alt="success" />
              ) : (
                <img src="/icons/invalid.png" alt="success" />
              ))}
          </div>
          <div className=" bg-green-500 flex justify-end items-center relative ">
            {!empty ? (
              <button onClick={handleClick} className="absolute">
                {visibility === "password" ? (
                  <p className="text-sm">Show</p>
                ) : (
                  <p className="text-sm">Hide</p>
                )}
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="absolute top-[44px] left-[6px]">
        {!empty && !focused && error && !valid && (
          <p className="text-xs text-red-600">{errorMsg}</p>
        )}
      </div>
    </div>
  );
}

export default PasswordInput;
