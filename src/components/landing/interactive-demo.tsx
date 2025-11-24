"use client";

import React, { useState, useEffect } from 'react';
import { Mic, Cpu, Terminal, Activity, Bot, User, Smile, Angry, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Role = 'system' | 'user' | 'agent' | 'tool';

type Message = {
  role: Role;
  text: string;
  sentiment?: 'angry' | 'neutral' | 'happy';
  icon?: React.ReactNode;
};

type Status = 'idle' | 'listening' | 'processing' | 'speaking' | 'acting';

const simulationSteps = [
    { type: 'message', role: 'user', text: "Where is my package?! The tracking says it was delivered but it's not here! This is the second time this has happened!", sentiment: 'angry' },
    { type: 'delay', duration: 1500 },
    { type: 'status', status: 'processing' },
    { type: 'delay', duration: 1200 },
    { type: 'message', role: 'agent', text: "I'm very sorry to hear that you're having trouble with your delivery. I understand how frustrating that must be. Let me pull up your order details right now." },
    { type: 'delay', duration: 2000 },
    { type: 'status', status: 'acting' },
    { type: 'message', role: 'tool', text: "ACTION: getOrderStatus(orderId: '1842')", icon: <ShoppingCart/> },
    { type: 'delay', duration: 1800 },
    { type: 'status', status: 'processing' },
    { type: 'delay', duration: 1200 },
    { type: 'message', role: 'agent', text: "Okay, I see the problem. It looks like the driver marked it as delivered by mistake. The package is still at the local depot. I've already messaged the driver to re-attempt delivery first thing tomorrow morning and I've also applied a 25% discount to your next order for the inconvenience." },
    { type: 'delay', duration: 3000 },
    { type: 'message', role: 'user', text: "Oh. Okay, thank you. I appreciate that.", sentiment: 'neutral' },
    { type: 'delay', duration: 1500 },
    { type: 'status', status: 'speaking' },
    { type: 'message', role: 'agent', text: "You're most welcome. While I have you, I noticed you frequently purchase our single-origin coffee. We've just launched a subscription service where you'd save 20% on every bag and get free shipping. Would you be interested in that?" },
    { type: 'delay', duration: 2500 },
    { type: 'status', status: 'acting' },
    { type: 'message', role: 'tool', text: "ACTION: addUpsellTag(user: 'Alex', tag: 'coffee_subscription_offer')", icon: <ShoppingCart/>},
    { type: 'delay', duration: 1000 },
    { type: 'message', role: 'user', text: "A subscription? Yeah, actually. That sounds great.", sentiment: 'happy' },
    { type: 'delay', duration: 1500 },
    { type: 'message', role: 'agent', text: "Excellent! I've just sent an email with all the details for you to confirm. Is there anything else I can help you with today?" },
];

export default function InteractiveDemo() {
  const [status, setStatus] = useState<Status>('idle');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', text: "AI Agent Ready. Click the button to simulate a call." }
  ]);
  const [latency, setLatency] = useState(112);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status !== 'idle' && status !== 'processing') {
      interval = setInterval(() => {
        setLatency(Math.floor(Math.random() * (140 - 80 + 1) + 80));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [status]);


  const runSimulation = async () => {
    if (status !== 'idle') return;

    setMessages([]);
    setStatus('listening');

    for (const step of simulationSteps) {
        if (step.type === 'delay') {
            await new Promise(r => setTimeout(r, step.duration));
        } else if (step.type === 'status') {
            setStatus(step.status as Status);
        } else if (step.type === 'message') {
            const { role, text, sentiment } = step;
            const icon = role === 'user' ? <User/> : role === 'agent' ? <Bot/> : <Terminal/>
            setMessages(prev => [...prev, { role: role as Role, text, sentiment: sentiment as any, icon }]);
            setStatus(role === 'user' ? 'speaking' : 'speaking');
        }
    }
    
    await new Promise(r => setTimeout(r, 2000));
    setStatus('idle');
  };

  const statusMap = {
    idle: { text: "AI Agent Ready", icon: <Mic className="w-12 h-12 text-slate-500" />, bgColor: 'bg-slate-800' },
    listening: { text: "Listening...", icon: <User className="w-12 h-12 text-white" />, bgColor: 'bg-indigo-500/20 shadow-[0_0_50px_rgba(99,102,241,0.3)] scale-110' },
    processing: { text: "Processing...", icon: <Cpu className="w-12 h-12 text-white animate-spin-slow" />, bgColor: 'bg-slate-800' },
    speaking: { text: "Agent Speaking", icon: <Bot className="w-12 h-12 text-white" />, bgColor: 'bg-violet-500/20 shadow-[0_0_50px_rgba(139,92,246,0.3)] scale-110 animate-pulse' },
    acting: { text: "Executing Action...", icon: <Terminal className="w-12 h-12 text-emerald-400" />, bgColor: 'bg-emerald-500/20 border-2 border-emerald-500/50' },
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]">
      <div className="flex-1 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 relative">
        <div className="absolute top-6 right-6 text-xs font-mono text-slate-400">
            Latency: <span className="text-white">{latency}ms</span>
        </div>

        <div className={cn(
          `w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500`,
          statusMap[status].bgColor
        )}>
          {statusMap[status].icon}
        </div>

        <div className="mt-8 text-center space-y-2 h-10">
          <div className="text-xl font-medium text-white">
            {statusMap[status].text}
          </div>
        </div>

        <Button 
          onClick={runSimulation} 
          disabled={status !== 'idle'}
          className="mt-8 bg-gradient-to-r from-violet-600 to-indigo-600 disabled:opacity-50"
        >
           {status === 'idle' ? 'Simulate Call' : 'Running...'}
        </Button>
      </div>

      <div className="flex-1 bg-slate-950 p-6 flex flex-col border-t md:border-t-0 md:border-l border-white/5 font-mono text-sm">
        <div className="flex items-center gap-2 text-slate-400 mb-4 pb-4 border-b border-white/5">
          <Activity className="w-4 h-4" /> Live Demo Transcript
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={cn('p-3 rounded-lg border text-xs flex flex-col', {
              'bg-violet-900/40 border-violet-500/30 text-violet-200 ml-4': msg.role === 'agent',
              'bg-slate-800 border-slate-700 text-slate-200 mr-4': msg.role === 'user',
              'bg-emerald-900/40 border-emerald-500/40 text-emerald-300': msg.role === 'tool',
              'text-slate-500 italic text-center border-transparent': msg.role === 'system',
            })}>
              <div className="text-[10px] uppercase opacity-50 mb-2 flex items-center gap-1.5">
                {msg.role === 'user' && (msg.sentiment === 'angry' ? <Angry size={12} className="text-rose-400"/> : msg.sentiment === 'happy' ? <Smile size={12} className="text-emerald-400"/> : <User size={12}/>)}
                {msg.role === 'agent' && <Bot size={12}/>}
                {msg.role === 'tool' && <Terminal size={12}/>}
                {msg.role}
                {msg.role === 'user' && ` (${msg.sentiment || 'neutral'})`}
              </div>
              <p className="font-sans text-white/90 text-[13px] leading-relaxed">{msg.text}</p>
            </div>
          ))}
          {status === 'processing' && (
             <div className="text-xs text-slate-500 animate-pulse text-center">Thinking...</div>
          )}
        </div>
      </div>
    </div>
  );
}
