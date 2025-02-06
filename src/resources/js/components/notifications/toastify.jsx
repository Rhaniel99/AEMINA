import { useEffect } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import { usePage } from "@inertiajs/react";
import "react-toastify/dist/ReactToastify.css";

export default function Notification() {
  const { flash, errors } = usePage().props;

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
    }

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        toast.error(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
        });
      });
    }
  }, [flash.success, errors]);

  return <ToastContainer />;
}