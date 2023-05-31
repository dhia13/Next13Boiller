"use client";
import LoginFrom from "../../components/Auth/LoginForm";

const page = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col overflow-hidden relative">
      <div className="absolute w-full h-full top-0 left-0">
        <img src="/images/doctor.jpg" className="w-full h-full" />
      </div>
      <main className="h-[500px] flex justify-start items-center flex-col z-40 rounded-ms p-2">
        <LoginFrom />
        {/* <div className="flex justify-center items-center mx-5">OR</div> */}
      </main>
    </div>
  );
};
export default page;
