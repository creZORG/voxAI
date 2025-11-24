"use client";

import React, { useState, useEffect } from 'react';
import { Mic, Cpu, Terminal, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Message = {
  role: 'system' | 'user' | 'agent' | 'tool';
  text: string;
};

type Status = 'idle' | 'listening' | 'processing' | 'speaking' | 'acting';

export default function InteractiveDemo() {
  const [status, setStatus] = useState<Status>('idle');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', text: "Ready to test. Click the microphone to simulate a customer call." }
  ]);
  const [latency, setLatency] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status !== 'idle' && status !== 'processing') {
      interval = setInterval(() => {
        setLatency(Math.floor(Math.random() * (180 - 80 + 1)) + 80);
      }, 500);
    } else {
      setLatency(0);
    }
    return () => clearInterval(interval);
  }, [status]);
  
  const runSimulation = async () => {
    if (status !== 'idle') return;
    setMessages([{ role: 'system', text: "Simulation started. Simulating user voice input..." }]);
    
    setStatus('listening');
    await new Promise(r => setTimeout(r, 1500));
    setMessages(prev => [...prev, { role: 'user', text: "Hi, I need to reschedule my dental appointment to next Tuesday." }]);
    
    setStatus('processing');
    await new Promise(r => setTimeout(r, 1200));
    
    setStatus('speaking');
    setMessages(prev => [...prev, { role: 'agent', text: "I can help with that. Checking the calendar..." }]);
    await new Promise(r => setTimeout(r, 1000));
    
    setStatus('acting');
    await new Promise(r => setTimeout(r, 1500));
    const actionMsg = { role: 'tool' as const, text: "ACTION: Calendar_API.check_availability('next Tuesday')" };
    setMessages(prev => [...prev, actionMsg]);
    
    setStatus('speaking');
    await new Promise(r => setTimeout(r, 1000));
    setMessages(prev => [...prev, { role: 'agent', text: "I found a slot at 2:00 PM on Tuesday. Shall I book it?" }]);
    
    setStatus('idle');
  };

  const statusMap = {
    idle: { text: "Agent Ready", icon: <Mic className="w-12 h-12 text-slate-500" /> },
    listening: { text: "Listening...", icon: <Mic className="w-12 h-12 text-white" /> },
    processing: { text: "Processing...", icon: <Cpu className="w-12 h-12 text-white animate-spin-slow" /> },
    speaking: { text: "Agent Speaking", icon: <Mic className="w-12 h-12 text-white" /> },
    acting: { text: "Executing Tool...", icon: <Terminal className="w-12 h-12 text-emerald-400" /> },
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[600px]">
      <div className="flex-1 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 relative">
        <div className="absolute top-6 left-6 text-xs font-mono text-slate-500 border border-slate-700 px-2 py-1 rounded">
          LIVE DEMO ENV
        </div>

        <div className={cn(
          `w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500`,
          {
            'scale-110 bg-indigo-500/20 shadow-[0_0_50px_rgba(99,102,241,0.3)]': status === 'listening',
            'scale-105 bg-violet-500/20 shadow-[0_0_50px_rgba(139,92,246,0.3)] animate-pulse': status === 'speaking',
            'scale-100 bg-emerald-500/20 border-2 border-emerald-500/50': status === 'acting',
            'bg-slate-800': status === 'idle' || status === 'processing',
          }
        )}>
          {statusMap[status].icon}
        </div>

        <div className="mt-8 text-center space-y-2 h-20">
          <div className="text-xl font-medium text-white">
            {statusMap[status].text}
          </div>
          <div className="text-sm text-slate-400 font-mono">
            {latency > 0 ? `Latency: ${latency}ms` : <>&nbsp;</>}
          </div>
        </div>

        <Button 
          onClick={runSimulation} 
          disabled={status !== 'idle'}
          className="mt-8 bg-gradient-to-r from-violet-600 to-indigo-600 disabled:opacity-50"
        >
           {status === 'idle' ? 'Simulate Call' : 'Processing...'}
        </Button>
      </div>

      <div className="flex-1 bg-slate-950 p-6 flex flex-col border-t md:border-t-0 md:border-l border-white/5 font-mono text-sm">
        <div className="flex items-center gap-2 text-slate-400 mb-4 pb-4 border-b border-white/5">
          <Activity className="w-4 h-4" /> Live Transcript & Action Log
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={cn(`p-3 rounded-lg border text-xs`, {
              'bg-violet-500/10 border-violet-500/20 text-violet-200 ml-4': msg.role === 'agent',
              'bg-slate-800 border-slate-700 text-slate-200 mr-4': msg.role === 'user',
              'bg-emerald-900/20 border-emerald-500/30 text-emerald-400': msg.role === 'tool',
              'text-slate-500 italic text-center border-transparent': msg.role === 'system',
            })}>
              <div className="text-[10px] uppercase opacity-50 mb-1">{msg.role}</div>
              {msg.text}
            </div>
          ))}
          {status === 'processing' && (
             <div className="text-xs text-slate-500 animate-pulse text-center">Running vector search on knowledge base...</div>
          )}
        </div>
      </div>
    </div>
  );
}
