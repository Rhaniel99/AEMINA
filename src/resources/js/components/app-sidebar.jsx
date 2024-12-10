import {
    Calendar,
    Home,
    NotebookPen,
    Search,
    Settings,
    ChevronUp,
    ChevronRight,
    GalleryVerticalEnd,
    AudioWaveform,
    Command,
    SquareTerminal,
    Bot,
    BookOpen,
    Settings2,
    Frame,
    PieChart,
} from "lucide-react";

// import { ToastContainer, toast } from "react-toastify";
import { Link, usePage } from "@inertiajs/react";
import Modal from "@/components/modal";
import UserSignup from "@/components/forms/user/signup";
import UserLogin from "@/components/forms/user/login";

import { useState } from "react";
import { useRoute } from "ziggy";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { NavMain } from "@/components/nav-main";

// This is sample data.
// const data = {
//     versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
//     navMain: [
//         {
//             title: "Getting Started",
//             url: "#",
//             items: [
//                 {
//                     title: "Installation",
//                     url: "#",
//                 },
//                 {
//                     title: "Project Structure",
//                     url: "#",
//                 },
//             ],
//         },
//         {
//             title: "Building Your Application",
//             url: "#",
//             items: [
//                 {
//                     title: "Routing",
//                     url: "#",
//                 },
//                 {
//                     title: "Data Fetching",
//                     url: "#",
//                     isActive: true,
//                 },
//                 {
//                     title: "Rendering",
//                     url: "#",
//                 },
//                 {
//                     title: "Caching",
//                     url: "#",
//                 },
//                 {
//                     title: "Styling",
//                     url: "#",
//                 },
//                 {
//                     title: "Optimizing",
//                     url: "#",
//                 },
//                 {
//                     title: "Configuring",
//                     url: "#",
//                 },
//                 {
//                     title: "Testing",
//                     url: "#",
//                 },
//                 {
//                     title: "Authentication",
//                     url: "#",
//                 },
//                 {
//                     title: "Deploying",
//                     url: "#",
//                 },
//                 {
//                     title: "Upgrading",
//                     url: "#",
//                 },
//                 {
//                     title: "Examples",
//                     url: "#",
//                 },
//             ],
//         },
//         {
//             title: "API Reference",
//             url: "#",
//             items: [
//                 {
//                     title: "Components",
//                     url: "#",
//                 },
//                 {
//                     title: "File Conventions",
//                     url: "#",
//                 },
//                 {
//                     title: "Functions",
//                     url: "#",
//                 },
//                 {
//                     title: "next.config.js Options",
//                     url: "#",
//                 },
//                 {
//                     title: "CLI",
//                     url: "#",
//                 },
//                 {
//                     title: "Edge Runtime",
//                     url: "#",
//                 },
//             ],
//         },
//         {
//             title: "Architecture",
//             url: "#",
//             items: [
//                 {
//                     title: "Accessibility",
//                     url: "#",
//                 },
//                 {
//                     title: "Fast Refresh",
//                     url: "#",
//                 },
//                 {
//                     title: "Next.js Compiler",
//                     url: "#",
//                 },
//                 {
//                     title: "Supported Browsers",
//                     url: "#",
//                 },
//                 {
//                     title: "Turbopack",
//                     url: "#",
//                 },
//             ],
//         },
//         {
//             title: "Community",
//             url: "#",
//             items: [
//                 {
//                     title: "Contribution Guide",
//                     url: "#",
//                 },
//             ],
//         },
//     ],
// };

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
};

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "A. Notes",
        url: route("note.index"),
        icon: NotebookPen,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
];

export function AppSidebar() {
    const route = useRoute();
    const { auth } = usePage().props;

    // Inicializa o estado do modal
    const [open, setOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false); // Se você tiver um modal de login

    const handleSuccess = () => {
        setOpen(false); // Fecha o modal de inscrição
    };

    const handleLoginOpen = () => {
        setOpen(false); // Fecha o modal de inscrição
        setLoginOpen(true); // Abre o modal de login
    };

    const HandleSignupOpen = () => {
        setOpen(true); // Abre o modal de inscrição
        setLoginOpen(false); // Fecha o modal de login
    };

    const handleClose = () => {
        setOpen(false); // Fecha o modal de inscrição
        setLoginOpen(false); // Fecha o modal de login
    };

    return (
        <>
            <Sidebar>
                {/* Corpo Da Sidebar */}
                <SidebarContent>
                    <SidebarGroup>
                        <NavMain items={data.navMain} />

                        {/* <SidebarGroupLabel>Aemina App</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupLabel>Aemina Notes</SidebarGroupLabel>
                    {data.navMain.map((item) => (
                        <Collapsible
                            key={item.title}
                            title={item.title}
                            defaultOpen
                            className="group/collapsible"
                        >
                            <SidebarGroup>
                                <SidebarGroupLabel
                                    asChild
                                    className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                >
                                    <CollapsibleTrigger>
                                        {item.title}{" "}
                                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                <CollapsibleContent>
                                    <SidebarGroupContent>
                                        <SidebarMenu>
                                            {item.items.map((item) => (
                                                <SidebarMenuItem
                                                    key={item.title}
                                                >
                                                    <SidebarMenuButton
                                                        asChild
                                                        isActive={item.isActive}
                                                    >
                                                        <a href={item.url}>
                                                            {item.title}
                                                        </a>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>
                    ))} */}
                    </SidebarGroup>
                </SidebarContent>

                {/* Footer Da Sidebar */}
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        {auth.user ? (
                                            <div>
                                                <span>
                                                    {
                                                        auth.user.name.split(
                                                            " "
                                                        )[0]
                                                    }
                                                </span>
                                                <br />
                                                <span className="text-xs italic">
                                                    {auth.user.email}
                                                </span>
                                            </div>
                                        ) : (
                                            <div>Visitante</div>
                                        )}
                                        <ChevronUp className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    side="top"
                                    className="w-[--radix-popper-anchor-width]"
                                >
                                    {!auth.user && (
                                        <DropdownMenuItem
                                            onClick={() => setLoginOpen(true)}
                                        >
                                            <span>Conta</span>
                                        </DropdownMenuItem>
                                    )}

                                    {!auth.user && (
                                        <DropdownMenuItem
                                            onClick={() => setOpen(true)}
                                        >
                                            <span>Criar conta</span>
                                        </DropdownMenuItem>
                                    )}

                                    {auth.user && (
                                        <DropdownMenuItem>
                                            <Link
                                                href={route("login.logout")}
                                                method="post"
                                                as="button"
                                                className="w-full text-left" // Para garantir que o link ocupe toda a largura do item
                                            >
                                                <span>Sair</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>

            {/* Criar Conta Modal */}
            {!auth.user && (
                <Modal open={open} onClose={() => setOpen(false)}>
                    {open && ( // Verifica se o modal está aberto antes de renderizar o conteúdo
                        <section>
                            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                        Crie sua conta
                                    </h1>

                                    <UserSignup
                                        onSuccess={handleSuccess}
                                        onLoginClick={handleLoginOpen}
                                    />

                                    {/* <UserSignup onSuccess={handleSuccess}/> */}
                                </div>
                            </div>
                        </section>
                    )}
                </Modal>
            )}

            {/* Login Modal */}
            {!auth.user && (
                <Modal open={loginOpen} onClose={() => setLoginOpen(false)}>
                    <section>
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    Entre com a sua conta
                                </h1>

                                <UserLogin
                                    openHandleSignup={HandleSignupOpen}
                                    handleClose={handleClose}
                                />
                            </div>
                        </div>
                    </section>
                </Modal>
            )}
        </>
    );
}
