import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Link, usePage } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function Layout({ children }) {
  const { auth, flash, errors } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((error) => {
                toast.warn(error, {
                    position: "top-right",
                    autoClose: 3000,
                    className: "bg-white-500 text-black",
                });
            });
        }
    }, [flash.success, errors]);

    return (
        <SidebarProvider>          
            <AppSidebar />
            <main className="w-full h-full">
                <ToastContainer />
                <SidebarTrigger />
                <div className="mx-3">
                  {children}
                </div>
            </main>
        </SidebarProvider>
    );
}
