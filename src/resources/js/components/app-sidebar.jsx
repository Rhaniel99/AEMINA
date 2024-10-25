import {
    Calendar,
    Home,
    NotebookPen,
    Search,
    Settings,
    ChevronUp,
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import Modal from "@/components/modal";
import UserSignup from "@/components/forms/UserSignup";
import UserLogin from "../Components/Forms/UserLogin";

import { useState } from "react";
import { useRoute } from "ziggy";

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
    const { auth } = usePage().props;
    const route = useRoute();

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
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
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
                                                <span>{auth.user.name.split(' ')[0]}</span>
                                                <br />
                                                <span className="text-xs italic">{auth.user.email}</span>
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
                                    <DropdownMenuItem onClick={() => setLoginOpen(true)}>
                                        <span>Conta</span>
                                    </DropdownMenuItem>

                                    {!auth.user && (
                                    <DropdownMenuItem onClick={() => setOpen(true)}>
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
