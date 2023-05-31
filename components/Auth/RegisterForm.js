"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import PasswordInput from "./PasswordInput";
import { useDispatch } from "react-redux";
import Input from "./Input";
import FacebookLogin from "./FacebookLogin";
import GoogleLogin from "./GoogleLogin";
import SelectGender from "./SelectGender";
import Image from "next/image";
import { login } from "@/utils/redux/reducers/userSlice";
function Register() {
  const dispatch = useDispatch();
  // password scope
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  useEffect(() => {
    function validatePassword(password) {
      if (password.length < 8) {
        return "Password should be at least 8 characters long.";
      }
      if (!/[A-Z]/.test(password)) {
        return "Password should contain at least one uppercase letter.";
      }
      if (!/\d/.test(password)) {
        return "Password should contain at least one number.";
      }
      return true;
    }
    let validationResult = validatePassword(password);
    if (typeof validationResult === "string") {
      setPasswordError(true);
      setPasswordErrorMsg(validationResult);
      setValidPassword(false);
    } else if (
      typeof validationResult === "boolean" &&
      validationResult === true
    ) {
      setPasswordError(false);
      setValidPassword(true);
    }
  }, [password]);

  // confirmPassword scope
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  useEffect(() => {
    if (password === confirmPassword) {
      setValidConfirmPassword(true);
      setConfirmPasswordError(false);
    } else {
      setValidConfirmPassword(false);
      setConfirmPasswordError(true);
    }
  }, [password, confirmPassword]);

  // email scope
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  useEffect(() => {
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    if (!isValidEmail(email)) {
      setEmailError(true);
      setEmailErrorMsg("Invalid Email");
    } else {
      // check if email exists in db
      const checkAvailability = async (email) => {
        await axios
          .post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/checkEmailAvailability`,
            {
              email,
            }
          )
          .then((res) => {
            if (res.data.success) {
              setEmailError(false);
              setValidEmail(true);
            }
          })
          .catch((e) => {
            setEmailError(true);
            setEmailErrorMsg("Email already registered try to login");
            setValidEmail(false);
          });
      };
      checkAvailability(email);
    }
  }, [email]);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrMsg, setUsernameErrMsg] = useState("");
  useEffect(() => {
    if (username.length < 6) {
      setUsernameError(true);
      setUsernameErrMsg("username must be at least 6 caracters long");
      setValidUsername(false);
    } else {
      const checkAvailability = async (username) => {
        await axios
          .post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/checkUsernameAvailability`,
            {
              username,
            }
          )
          .then((res) => {
            if (res.data.success) {
              setUsernameError(false);
              setValidUsername(true);
            }
          })
          .catch((e) => {
            setUsernameError(true);
            setUsernameErrMsg("username already taken");
            setValidUsername(false);
          });
      };
      checkAvailability(username);
    }
  }, [username]);

  const [disable2, setDisable2] = useState(false);

  const [gender, setGender] = useState("Male");
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameError, setNameError] = useState(false);
  const nameErrorMsg = "Please enter your name";
  useEffect(() => {
    if (name == " ") {
      setValidName(false);
      setNameError(true);
    } else {
      if (name.length > 3) {
        setValidName(true);
        setNameError(false);
      }
    }
  }, [name]);
  const [birthday, setBirthday] = useState(new Date());

  const [accountType, setAccountType] = useState("");
  const [disable3, setDisable3] = useState(true);
  useEffect(() => {
    if (accountType != "") {
      setDisable3(false);
    }
  }, [accountType]);
  const [registerStep, setRegisterStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    if (validEmail && validPassword && validConfirmPassword) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [validEmail, validPassword, validConfirmPassword]);
  useEffect(() => {
    if (validName && validUsername) {
      setDisable2(false);
    } else {
      setDisable2(true);
    }
  }, [validName, validUsername]);
  const [success, setSuccess] = useState(false);
  const [loginSuccessData, setLoginSuccessData] = useState();
  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validEmail && validPassword && validConfirmPassword) {
      setLoading(true);
      await axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
          email,
          password,
          username,
          birthday,
          gender,
          name,
          accountType,
        })
        .then((res) => {
          setLoading(false);
          setError(false);
          setSuccess(true);
          setLoginSuccessData(res.data.data);
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        // dispatch(LoginAction(response.data.data));
        dispatch(login(loginSuccessData));
      }, 1000);
    }
  }, [success]);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [error]);
  return (
    <section className="flex flex-col">
      <div className="w-full h-full flex items-center justify-start  flex-col bg-white shadow-lg rounded-md">
        <p className="my-4">logo</p>
        {/*inputs  */}
        {registerStep === 0 && (
          <div className="w-[450px] bg-white flex flex-col   shadow-sm items-center justify-center pt-4">
            <form
              className="flex justify-center items-center gap-3 flex-col"
              onSubmit={handleSubmit}
            >
              <Input
                label="Email"
                placeholder="Enter email"
                value={email}
                setValue={setEmail}
                valid={validEmail}
                error={emailError}
                errorMsg={emailErrorMsg}
              />
              <PasswordInput
                label="password"
                placeholder="Enter password"
                value={password}
                setValue={setPassword}
                valid={validPassword}
                error={passwordError}
                showIcon={true}
                errorMsg={passwordErrorMsg}
              />
              <PasswordInput
                label="Confirm password"
                placeholder="Confirm your password"
                value={confirmPassword}
                setValue={setConfirmPassword}
                valid={validConfirmPassword}
                error={confirmPasswordError}
                errorMsg="passwords does not match"
                showIcon={true}
              />
              {/* <Input value={password} setValue={setPassword} /> */}
            </form>
            <div className="flex justify-center items-center flex-col h-[40px] my-2 w-[272px] mx-5 shadow-sm">
              <button
                disabled={disable}
                onClick={() => setRegisterStep(1)}
                className={`flex justify-center items-center border rounded-md h-[35px] w-full ${
                  disable
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-400 hover:bg-blue-500"
                } `}
              >
                <h2 className="text-white text-sm font-semibold">Next</h2>
              </button>
            </div>
            <div className="flex justify-center items-center flex-col h-[30px] my-1 w-[272px] mx-5">
              {error && (
                <h1 className="text-md font-semibold text-red-500 text-center">
                  {errMsg}
                </h1>
              )}
            </div>
            <FacebookLogin />
            <GoogleLogin />
            <div className="h-12 flex justify-center items-center my-2 text-center">
              <p className="text-sm">Already have an account?</p>
              <Link href="/login">
                <p className="px-1 text-sm text-button-color">Login</p>
              </Link>
            </div>
          </div>
        )}
        {registerStep === 1 && (
          <div className="w-[450px] bg-white flex flex-col   shadow-sm items-center justify-center pt-4">
            <form
              className="flex justify-center items-center gap-3 flex-col"
              onSubmit={handleSubmit}
            >
              <Input
                label="Username"
                placeholder="Enter username"
                value={username}
                setValue={setUsername}
                valid={validUsername}
                error={usernameError}
                errorMsg={usernameErrMsg}
              />
              <Input
                label="Name"
                placeholder="Fullname"
                value={name}
                setValue={setName}
                valid={validName}
                error={nameError}
                errorMsg={nameErrorMsg}
              />
              <SelectGender value={gender} setValue={setGender} />
              {/* age */}
              <p>age</p>
            </form>
            <div className="flex justify-center items-center flex-col h-[40px] my-2 w-[272px] mx-5 shadow-sm">
              <button
                disabled={disable2}
                onClick={() => setRegisterStep(2)}
                className={`flex justify-center items-center border rounded-md h-[35px] w-full ${
                  disable2
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-400 hover:bg-blue-500"
                } `}
              >
                <h2 className="text-white text-sm font-semibold">Next</h2>
              </button>
            </div>
            <div className="flex justify-center items-center flex-col h-[30px] my-1 w-[272px] mx-5">
              {error ? (
                <h1 className="text-md font-semibold text-red-500 text-center">
                  {errMsg}
                </h1>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
        {registerStep === 2 && (
          <div className="w-[450px] bg-white flex flex-col   shadow-sm items-center justify-center pt-4">
            <h1>Select account Type</h1>
            <div className="w-full h-[200px] flex justify-center items-center gap-2 my-4">
              <Image
                src="/icons/doctor.png"
                alt="doctor"
                width={200}
                height={200}
                onClick={() => setAccountType("client")}
                className={`w-full h-full m-2 ${
                  accountType == "client" ? "bg-green-300" : "bg-white"
                } rounded-md shadow-lg cursor-pointer hover:bg-green-400`}
              />
              <Image
                src="/icons/doctor.png"
                alt="client"
                width={200}
                height={200}
                onClick={() => setAccountType("doctor")}
                className={`w-full h-full m-2 ${
                  accountType == "doctor" ? "bg-green-300" : "bg-white"
                } rounded-md shadow-lg cursor-pointer hover:bg-green-400`}
              />
            </div>
            <div className="flex justify-center items-center flex-col h-[40px] my-2 w-[272px] mx-5 shadow-sm">
              <button
                disabled={disable3}
                onClick={handleSubmit}
                className={`flex justify-center items-center border rounded-md h-[35px] w-full ${
                  disable3
                    ? "bg-gray-200 cursor-not-allowed"
                    : loading
                    ? "bg-green-500"
                    : error
                    ? "bg-red-500"
                    : success
                    ? "bg-green-500"
                    : "bg-blue-400 hover:bg-blue-500"
                } `}
              >
                {loading ? (
                  <div>loading</div>
                ) : error ? (
                  <div>error</div>
                ) : success ? (
                  <div>success</div>
                ) : (
                  <div>Submit</div>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Register;
