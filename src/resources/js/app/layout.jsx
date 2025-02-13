import { Link, usePage } from "@inertiajs/react";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import { useState, useEffect } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import NotificationListener from "@/components/notifications/notification-listener";
import DynamicBreadcrumb from "@/components/breadcrumbs/dynamic-breadcrumb.jsx";
export default function Layout({ children }) {
    const { flash, errors } = usePage().props;

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
            <NotificationListener />
            <ToastContainer />
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />

                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />

                        <DynamicBreadcrumb />

                    </div>
                </header>

                <div>{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
