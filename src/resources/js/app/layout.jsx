import { ToastContainer } from "react-toastify";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import NotificationListener from "@/components/notifications/notification-listener";
import DynamicBreadcrumb from "@/components/breadcrumbs/dynamic-breadcrumb.jsx";
import Notification from "@/components/notifications/toastify";

export default function Layout({ children }) {

    return (
        <SidebarProvider>
            <Notification />

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
