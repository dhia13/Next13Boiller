"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PasswordInput from "./PasswordInput";
import Input from "./Input";
import Link from "next/link";
import FacebookLogin from "./FacebookLogin";
import GoogleLogin from "./GoogleLogin";
import { login } from "@/utils/redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Login() {
  const router = useRouter();
  const logged = useSelector((state) => state.user.logged);
  console.log(logged);
  const isEmpty = (value) => {
    return value == "";
  };
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(true);
  const [success, setSuccess] = useState(false);
  const [loginSuccessData, setLoginSuccessData] = useState();
  useEffect(() => {
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    if (!isValidEmail(email)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  }, [email]);
  useEffect(() => {
    if (validEmail && !isEmpty(password)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [validEmail, password]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validEmail && !isEmpty(password));
    setLoading(true);
    await axios
      .post(
        "http://localhost:8000/auth/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
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
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(login(loginSuccessData));
        router.push("/dashboard");
      }, 500);
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
      <div className="w-full h-full flex items-center justify-center  flex-col bg-white rounded-md shadow-lg py-6">
        {/*inputs  */}
        <p>logo</p>
        <div className="w-[450px]  flex flex-col   shadow-sm items-center justify-center pt-4">
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
            />
            <PasswordInput
              label="password"
              placeholder="Enter password"
              value={password}
              setValue={setPassword}
              valid={true}
            />
          </form>
          <div className="flex justify-center items-center flex-col h-[40px] my-2 w-[272px] mx-5 shadow-sm">
            <button
              disabled={disable}
              onClick={handleSubmit}
              className={`flex justify-center items-center border rounded-md h-[35px] w-full ${
                disable
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
                <Image
                  src="/icons/loading.gif"
                  alt="valid"
                  width={32}
                  height={32}
                />
              ) : error ? (
                <Image
                  src="/icons/invalid.png"
                  alt="valid"
                  width={24}
                  height={24}
                />
              ) : success ? (
                <Image
                  src="/icons/valid.png"
                  alt="valid"
                  width={32}
                  height={32}
                />
              ) : (
                <div>
                  <p className="font-semibold text-lg text-white">Login</p>
                </div>
              )}
            </button>
          </div>
          <div className="flex justify-center items-center flex-col h-[30px] w-[272px] mx-5">
            {error ? (
              <h1 className="text-md font-semibold text-red-500 text-center">
                Invalid credentials
              </h1>
            ) : (
              <></>
            )}
          </div>
          <h2 className="text-black text-xs font-semibold pb-2">
            <Link href="/RequestPasswordReset">Forgot Password?</Link>
          </h2>
        </div>
        <FacebookLogin />
        <GoogleLogin />
        <div className="h-12 flex justify-center items-center my-2 text-center">
          <p className="text-sm">Don't have an account?</p>
          <Link href="/register">
            <p className="px-1 text-sm text-button-color">Sign up</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
