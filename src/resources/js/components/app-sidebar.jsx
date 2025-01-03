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
    const { auth } = usePage().props;
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
                name: "Aemina Flix",
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
        name: "Aemina Flix", // Time padrão
      });
    
      const getNavItemsByTeam = (teamName) => {
        switch (teamName) {
          case "Aemina Flix":
            return [
              {
                title: "Playground",
                url: "#",
                icon: SquareTerminal,
                items: [
                  { title: "History", url: "#" },
                  { title: "Starred", url: "#" },
                  { title: "Settings", url: "#" },
                ],
              },
              {
                title: "Models",
                url: "#",
                icon: Bot,
                items: [
                  { title: "Genesis", url: "#" },
                  { title: "Explorer", url: "#" },
                  { title: "Quantum", url: "#" },
                ],
              },
            ];
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
