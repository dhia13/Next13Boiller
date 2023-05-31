"use client";
import { logout } from "@/utils/redux/reducers/userSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { MdNotificationsNone } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import Image from "next/image";
import { useState } from "react";
const page = () => {
  const [userMenu, setUserMenu] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(logout());
    router.push("/login");
  };
  return (
    <div className="w-full h-full flex relative">
      {userMenu && (
        <div
          className="w-full h-full bg-gray-300 opacity-20 absolute top-0 left-0 z-20"
          onClick={() => setUserMenu(false)}
        ></div>
      )}
      {/* side Nave */}
      <div className="w-[80px] h-full bg-cyan-300 flex flex-col justify-between items-center">
        <div className="w-[80px] h-[80px] bg-green-200 flex justify-center items-center">
          <p className="text-xl font-bold">Logo</p>
        </div>
        <div className="">navigation</div>
        <div className="w-[50px] h-[50px] flex justify-center items-center mb-2">
          <FiSettings className="w-[32px] h-[32px] cursor-pointer" />
        </div>
      </div>
      <div className="w-[calc(100%-80px)] h-full flex flex-col justify-start items-start">
        {/* top nav */}
        <div className="w-full h-[50px] justify-end flex gap-6 items-center">
          <MdNotificationsNone className="w-[32px] h-[32px] cursor-pointer" />
          <div
            className="w-[32px] h-[32px] hover:border-blue-700 hover:shadow-xl
           rounded-full shadow-md border-[1px] border-blue-500 mr-9 relative"
          >
            <Image
              src="/images/profile.jfif"
              width={42}
              className="rounded-full cursor-pointer z-40"
              height={42}
              alt="profile"
              onClick={() => setUserMenu(!userMenu)}
            />
            {userMenu && (
              <div
                className="w-[200px] h-[340px] shadow-md z-40
               bg-white absolute top-[32px] right-[16px]"
              ></div>
            )}
          </div>
        </div>
        {/* content */}
        <div className="w-full h-[calc(100%-50px)]"></div>
      </div>
    </div>
  );
};
export default page;
