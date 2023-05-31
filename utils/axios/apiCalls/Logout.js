import { logout } from "@/utils/redux/reducers/userSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function () {
  const dispatch = useDispatch;
  const router = useRouter;
  axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  dispatch(logout);
  router.push("/login");
}
