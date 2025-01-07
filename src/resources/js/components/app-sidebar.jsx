import { usePage } from "@inertiajs/react";
import { useRoute } from "ziggy";
import { useState } from "react";

import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    CirclePlay,
    SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav/nav-main";
// import { NavProjects } from "@/components/nav/nav-projects"; Verificar isso depois
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
    const route = useRoute();

    // Dados de exemplo
    const data = {
        user: {
            id: auth.user.id,
            name: auth.profile.username,
            email: auth.user.email,
            avatar: auth.profile.avatar,
            logout: route("login.logout"),
        },
        teams: [
            {
                name: "Aemina Media",
                logo: CirclePlay,
                plan: "Séries",
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
    };

    const [activeTeam, setActiveTeam] = useState({
        name: "Aemina Media", // Time padrão
      });
    
      const getNavItemsByTeam = (teamName) => {
        switch (teamName) {
          case "Aemina Media":
                // Organizando os dados de items_sidebar
                const nav_items = [];

                items_sidebar.forEach((item) => {
                  // Verifica se o tipo de conteúdo já existe nos itens de navegação
                  let existing_nav = nav_items.find(nav => nav.title === item.content_type);
                  if (!existing_nav) {
                      // Cria um novo item para o content_type, incluindo "Lançamentos"
                      existing_nav = {
                          title: item.content_type,
                          url: "#", // Adicione a URL do tipo de conteúdo, se necessário
                          items: [
                              {
                                  title: "Lançamentos",
                                  url: "#", // URL para Lançamentos
                              }
                          ], // Começa com "Lançamentos" como primeiro item
                      };
                      nav_items.push(existing_nav);
                  }

                  // Adiciona as categorias específicas para esse tipo de mídia
                  existing_nav.items.push({
                      title: `${item.category_name}`,
                      url: "#", // Adicione a URL da categoria, se necessário
                  });
              });

              return nav_items;
          case "Acme Corp.":
            return [
              {
                title: "Projects",
                url: "#",
                icon: Frame,
                items: [
                  { title: "Design Engineering", url: "#" },
                  { title: "Sales & Marketing", url: "#" },
                  { title: "Travel", url: "#" },
                ],
              },
            ];
          case "Evil Corp.":
            return [
              {
                title: "Documentation",
                url: "#",
                icon: BookOpen,
                items: [
                  { title: "Introduction", url: "#" },
                  { title: "Get Started", url: "#" },
                  { title: "Tutorials", url: "#" },
                  { title: "Changelog", url: "#" },
                ],
              },
              {
                title: "Settings",
                url: "#",
                icon: Settings2,
                items: [
                  { title: "General", url: "#" },
                  { title: "Team", url: "#" },
                  { title: "Billing", url: "#" },
                  { title: "Limits", url: "#" },
                ],
              },
            ];
          default:
            return [];
        }
      };
      
      const navMain = getNavItemsByTeam(activeTeam.name);
    
      return (
        <>
          <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
              <TeamSwitcher teams={data.teams} onTeamChange={setActiveTeam} />
            </SidebarHeader>
            <SidebarContent>
              <NavMain items={navMain} />
            </SidebarContent>
            <SidebarFooter>
              <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
        </>
      );
}
