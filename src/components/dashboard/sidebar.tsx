"use client";

import React from 'react';
import { Users, Database, Terminal, Phone, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const SidebarItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={cn(
      'flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors',
      active ? 'bg-violet-600/10 text-violet-400 dark:text-violet-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
    )}
  >
    {React.cloneElement(icon as React.ReactElement, { size: 18 })}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-white/5 hidden md:flex flex-col justify-between">
      <div className="p-4 space-y-2">
        <SidebarItem icon={<Users />} label="My Agents" active={activeTab === 'agents'} onClick={() => setActiveTab('agents')} />
        <SidebarItem icon={<Database />} label="Knowledge Base" active={activeTab === 'kb'} onClick={() => setActiveTab('kb')} />
        <SidebarItem icon={<Terminal />} label="Action Tools" active={activeTab === 'tools'} onClick={() => setActiveTab('tools')} />
        <div className="pt-4 pb-2">
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3">Analytics</div>
        </div>
        <SidebarItem icon={<Phone />} label="Call Logs" />
        <SidebarItem icon={<BarChart3 />} label="Performance" />
        <SidebarItem icon={<Settings />} label="Settings" />
      </div>
      
      <div className="p-4 border-t border-slate-200 dark:border-white/5">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg p-3 text-center">
          <div className="text-xs font-medium text-white mb-1">Trial Active</div>
          <div className="text-[10px] text-white/70">8 days remaining</div>
          <button className="mt-2 text-xs bg-white text-violet-600 px-3 py-1 rounded font-bold w-full">Upgrade Plan</button>
        </div>
      </div>
    </aside>
  );
}
