import { Link, usePage } from "@inertiajs/react";
import { CirclePlay, Clapperboard, BookDown, Frame, ShieldEllipsis } from "lucide-react";
import { NavMain } from "@/components/nav/nav-main";
import { NavProjects } from "@/components/nav/nav-projects";
import { NavUser } from "@/components/nav/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import logo from "/public/img/logo/aemina-logo.png";

export function AppSidebar(props) {
    const { auth, items_sidebar } = usePage().props;

    const data = {
        user: {
            id: auth.user.id,
            name: auth.profile.username,
            email: auth.user.email,
            avatar: auth.profile.avatar,
            logout: route("login.logout"),
        },
        main: items_sidebar.reduce((navItems, item) => {
            // Verifica se já existe um grupo para este tipo de mídia
            let existingNav = navItems.find(
              (nav) => nav.title === item.title_content
            );
            if (!existingNav) {
              // Cria um novo grupo de navegação com os dois primeiros itens fixos:
              existingNav = {
                title: item.title_content,
                icon: Clapperboard, // Você pode alterar o ícone conforme necessário
                isActive: true,
                url: "#", // URL principal, se for utilizada
                items: [
                  {
                    title: "Favoritos",
                    // Se quiser filtrar por tipo de conteúdo, pode enviar o parâmetro
                    url: route("aemina.index", [item.content_type, 'favorito']),
                  },
                  {
                    title: "Lançamentos",
                    url: route("aemina.index", [item.content_type]),
                  },
                ],
              };
              navItems.push(existingNav);
            }
            // Adiciona as categorias específicas a partir do item
            existingNav.items.push({
              title: item.title_category,
              url: route("aemina.index", [
                item.content_type,
                item.category_name_normalized,
              ]),
            });
            return navItems;
          }, []),
          
        projects: [
            {
                name: "Repositório",
                url: route("aemina.repository"),
                icon: BookDown,
            },
            {
                name: "Usuários",
                url: '#',
                icon: ShieldEllipsis,
            },
            {
                name: "Test_Area",
                url: route("test.index"),
                icon: Frame,
            },
            // {
            //   name: "Sales & Marketing",
            //   url: "#",
            //   icon: PieChart,
            // },
            // {
            //   name: "Travel",
            //   url: "#",
            //   icon: Map,
            // },
        ],
    };

    return (
        <>
            <Sidebar collapsible="icon" {...props}>
                {/* Cabeçalho */}
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <Link href={route("aemina.index", { content: "filme", category: "lancamento" })}>
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <img src={logo} alt="Aemina" className="size-8" />
                                        {/* <CirclePlay className="size-4" /> */}
                                    </div>
                                    <div className="flex flex-col gap-0.5 leading-none">
                                        <span className="font-semibold">
                                            Aemina
                                        </span>
                                        <span className="">
                                            Filmes | Séries | Anime
                                        </span>
                                    </div>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                {/* Corpo */}
                <SidebarContent>
                    <NavMain items={data.main} />
                    <NavProjects projects={data.projects} />
                </SidebarContent>

                {/* Pé */}
                <SidebarFooter>
                    <NavUser user={data.user} />
                </SidebarFooter>

                <SidebarRail />
            </Sidebar>
        </>
    );
}
