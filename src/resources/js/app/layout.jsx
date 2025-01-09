import { Link, usePage } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
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

export default function Layout({ children }) {
    const { flash, errors } = usePage().props;
    const { content, category, movie, media } = usePage().props;

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
                        <Breadcrumb>
                            <BreadcrumbList>
                                {/* ! */}
                                {content && (
                                    <>
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>
                                                {" "}
                                                {content.toUpperCase()}
                                            </BreadcrumbPage>
                                        </BreadcrumbItem>

                                        <BreadcrumbSeparator className="hidden md:block" />
                                    </>
                                )}
                                {category && (
                                    <>
                                        <BreadcrumbItem className="hidden md:block">
                                            <BreadcrumbLink
                                                href={route("aemina.index", [
                                                    content,
                                                    category,
                                                ])}
                                            >
                                                {category.toUpperCase()}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                    </>
                                )}
                                {movie && (
                                    <>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink
                                                href={route("aemina.show", [
                                                    content,
                                                    category,
                                                    media.media_id,
                                                ])}
                                            >
                                                {movie.toUpperCase()}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                    </>
                                )}

                                {/* ! */}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div>{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
