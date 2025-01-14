import { usePage } from "@inertiajs/react";
import { Play, Shell, Clapperboard, Frame } from "lucide-react";

import { NavMain } from "@/components/nav/nav-main";
import { NavProjects } from "@/components/nav/nav-projects";
import { NavUser } from "@/components/nav/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

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
        contents: [
            {
                name: "Filme",
                logo: Clapperboard,
            },
            {
                name: "Série",
                logo: Play,
            },
            {
                name: "Anime",
                logo: Shell,
            },
        ],
        main: items_sidebar.reduce((navItems, item) => {
          // Verifica se já existe um item para este tipo de mídia
          let existingNav = navItems.find(
              (nav) => nav.title === item.title_content
          );
          if (!existingNav) {
              // Cria um novo grupo de navegação
              existingNav = {
                  title: item.title_content,
                  icon: Clapperboard, // Ícone genérico, pode ser alterado
                  url: "#", // URL principal (se necessário)
                  items: [
                      {
                          title: "Lançamentos",
                          url: route("aemina.index", [
                              item.content_type,
                              "lancamento",
                          ]),
                      },
                  ],
              };
              navItems.push(existingNav);
          }
          // Adiciona a categoria específica
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
          name: "Recursos",
          url: route("aemina.list.media"),
          icon: Frame,
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
                    <TeamSwitcher contents={data.contents}/>
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
