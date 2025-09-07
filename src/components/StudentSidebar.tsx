import { FileText, Calendar, LayoutDashboard } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface StudentSidebarProps {
  activeView: string;
  onViewChange: (view: 'dashboard' | 'apply-leave' | 'all-leaves') => void;
}

const menuItems = [
  { 
    title: "Dashboard", 
    value: "dashboard",
    icon: LayoutDashboard 
  },
  { 
    title: "Apply Leave", 
    value: "apply-leave",
    icon: Calendar 
  },
  { 
    title: "All Leaves", 
    value: "all-leaves",
    icon: FileText 
  },
];

export function StudentSidebar({ activeView, onViewChange }: StudentSidebarProps) {
  const { state } = useSidebar();

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Student Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.value as any)}
                    isActive={activeView === item.value}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {state !== "collapsed" && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}