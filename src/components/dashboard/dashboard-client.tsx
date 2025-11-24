"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import AgentCard from '@/components/dashboard/agent-card';
import Sidebar from '@/components/dashboard/sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const recentActivity = [
  { agent: 'Support Tier 1', action: 'Processed Refund (Stripe API)', outcome: 'Success', duration: '2m 14s' },
  { agent: 'Sales Outreach', action: 'Calendar Booking', outcome: 'Success', duration: '4m 30s' },
  { agent: 'Support Tier 1', action: 'Escalation to Human', outcome: 'Handoff', duration: '1m 05s' },
  { agent: 'Support Tier 1', action: 'Update Shipping Address', outcome: 'Success', duration: '0m 55s' },
  { agent: 'Sales Outreach', action: 'Lead Qualification', outcome: 'Failed', duration: '3m 12s' },
];

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState('agents');

  return (
    <div className="flex h-[calc(100vh-80px)]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950/70 p-4 sm:p-8 custom-scrollbar">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Agents</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your autonomous workforce.</p>
          </div>
          <Button className="bg-gradient-to-r from-violet-600 to-indigo-600">+ Create New Agent</Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AgentCard 
            name="Customer Support Tier 1" 
            status="active" 
            calls="1,240" 
            sentiment="94%" 
            desc="Handles general inquiries, FAQs, and ticket creation."
          />
          <AgentCard 
            name="Sales Outreach" 
            status="paused" 
            calls="85" 
            sentiment="88%" 
            desc="Cold calling leads, qualification, and meeting booking."
          />
          <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-500 h-64 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-4">
              <span className="text-2xl">+</span>
            </div>
            <span className="font-medium">Deploy New Agent</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Recent Activity</h2>
        <div className="bg-card border rounded-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
              <TableRow>
                <TableHead className="text-slate-600 dark:text-slate-300">Agent</TableHead>
                <TableHead className="text-slate-600 dark:text-slate-300">Action Taken</TableHead>
                <TableHead className="text-slate-600 dark:text-slate-300">Outcome</TableHead>
                <TableHead className="text-right text-slate-600 dark:text-slate-300">Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-slate-900 dark:text-white">{activity.agent}</TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400">{activity.action}</TableCell>
                  <TableCell className={
                    activity.outcome === 'Success' ? 'text-emerald-500 dark:text-emerald-400' :
                    activity.outcome === 'Handoff' ? 'text-amber-500 dark:text-amber-400' : 'text-rose-500 dark:text-rose-400'
                  }>{activity.outcome}</TableCell>
                  <TableCell className="text-right text-slate-600 dark:text-slate-400">{activity.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
