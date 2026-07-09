import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, LayoutDashboard, Users, Megaphone, 
  Repeat, Sparkles, LineChart, Layers, Settings, LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
  collapsed: boolean;
};

const NavItem = ({ icon: Icon, label, href, badge, collapsed }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);
  
  return (
    <Link 
      href={href} 
      className={clsx(
        "relative flex items-center h-9 px-3 rounded-md transition-colors group",
        isActive 
          ? "bg-primary/10 text-primary-foreground font-semibold" 
          : "text-secondary-foreground hover:bg-accent hover:text-primary-foreground"
      )}
      title={collapsed ? label : undefined}
    >
      {isActive && (
        <div className="absolute left-0 top-1.5 h-6 w-[3px] bg-primary rounded-r-[2px]" />
      )}
      <Icon className={clsx("w-[18px] h-[18px] shrink-0", isActive ? "text-primary" : "text-secondary-foreground group-hover:text-primary-foreground")} />
      
      {!collapsed && (
        <>
          <span className="ml-[10px] text-[0.875rem] whitespace-nowrap overflow-hidden">
            {label}
          </span>
          {badge !== undefined && (
            <span className="ml-auto bg-muted text-foreground text-[0.625rem] px-1.5 py-0.5 rounded-full font-mono">
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  
  return (
    <aside 
      className={clsx(
        "fixed top-[56px] bottom-0 left-0 bg-card border-r border-border z-40 flex flex-col transition-[width] duration-220 ease-in-out hidden md:flex",
        collapsed ? "w-[72px]" : "w-[256px]"
      )}
    >
      <div className="h-9 flex items-center justify-end px-3 mt-2 shrink-0">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-md transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 no-scrollbar">
        <div className="mb-6">
          {!collapsed && (
            <div className="text-[0.625rem] font-semibold uppercase text-muted-foreground tracking-[0.1em] px-3 pb-1">
              Main
            </div>
          )}
          <nav className="flex flex-col gap-0.5 px-2">
            <NavItem icon={LayoutDashboard} label="Dashboard" href="/dashboard" collapsed={collapsed} />
            <NavItem icon={Users} label="Leads" href="/leads" badge={142} collapsed={collapsed} />
            <NavItem icon={Megaphone} label="Campaigns" href="/campaigns" badge={3} collapsed={collapsed} />
            <NavItem icon={Repeat} label="Sequences" href="/sequences" collapsed={collapsed} />
          </nav>
        </div>

        <div className="mb-6">
          {!collapsed && (
            <div className="text-[0.625rem] font-semibold uppercase text-muted-foreground tracking-[0.1em] px-3 pb-1">
              Tools
            </div>
          )}
          <nav className="flex flex-col gap-0.5 px-2">
            <NavItem icon={Sparkles} label="AI Tools" href="/ai-tools" collapsed={collapsed} />
            <NavItem icon={LineChart} label="Analytics" href="/analytics" collapsed={collapsed} />
          </nav>
        </div>

        <div className="mb-6">
          {!collapsed && (
            <div className="text-[0.625rem] font-semibold uppercase text-muted-foreground tracking-[0.1em] px-3 pb-1">
              Manage
            </div>
          )}
          <nav className="flex flex-col gap-0.5 px-2">
            <NavItem icon={Layers} label="CRM" href="/crm" collapsed={collapsed} />
            <NavItem icon={Settings} label="Settings" href="/settings" collapsed={collapsed} />
          </nav>
        </div>
      </div>

      <div className="border-t border-border p-3 shrink-0">
        {collapsed ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-medium text-white">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary shrink-0 flex items-center justify-center text-xs font-medium text-white">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <div className="text-[0.875rem] font-bold text-foreground truncate">
                {user?.email || "User" || user?.email?.split('@')[0] || 'User'}
              </div>
              <div className="text-[0.75rem] text-secondary-foreground truncate">
                Admin
              </div>
            </div>
            <button onClick={logout} className="text-muted-foreground hover:text-destructive transition-colors shrink-0 p-1" title="Sign Out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}


