import { FileText, Users, UserPlus, LayoutDashboard } from "lucide-react";
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

interface AdminSidebarProps {
  activeView: string;
  onViewChange: (view: 'dashboard' | 'applications' | 'students' | 'add-student') => void;
}

const menuItems = [
  { 
    title: "Dashboard", 
    value: "dashboard",
    icon: LayoutDashboard 
  },
  { 
    title: "All Applications", 
    value: "applications",
    icon: FileText 
  },
  { 
    title: "All Students", 
    value: "students",
    icon: Users 
  },
  { 
    title: "Add Student", 
    value: "add-student",
    icon: UserPlus 
  },
];

export function AdminSidebar({ activeView, onViewChange }: AdminSidebarProps) {
  const { state } = useSidebar();

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
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