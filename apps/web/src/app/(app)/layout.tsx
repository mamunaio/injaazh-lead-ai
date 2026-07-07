"use client";

import React, { useState } from 'react';
import { Topbar } from '../../components/app-shell/Topbar';
import { Sidebar } from '../../components/app-shell/Sidebar';
import { AiDrawer } from '../../components/app-shell/AiDrawer';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Topbar onToggleAiDrawer={() => setAiDrawerOpen(!aiDrawerOpen)} />
      <Sidebar />
      <AiDrawer isOpen={aiDrawerOpen} onClose={() => setAiDrawerOpen(false)} />
      
      <main 
        className={`pt-[56px] min-h-screen transition-all duration-300 ease-in-out md:ml-[72px] lg:ml-[256px] ${aiDrawerOpen ? 'lg:mr-[400px]' : ''}`}
      >
        {children}
      </main>
    </div>
  );
}
