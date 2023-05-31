"use client";
import RegisterForm from "@/components/Auth/RegisterForm";
const page = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col overflow-hidden relative">
      <div className="absolute w-full h-full top-0 left-0">
        <img src="/images/doctor.jpg" className="w-full h-full" />
      </div>
      <main className="h-[500px] flex justify-start items-center flex-col z-40 rounded-ms p-2">
        <RegisterForm />
      </main>
    </div>
  );
};
export default page;
