
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Bot, User, Wand2, Send, Loader2, Sparkles, AlertTriangle, ShoppingCart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateAgentResponse } from '@/ai/flows/generate-agent-response';
import { z } from 'zod';

type Role = 'user' | 'agent' | 'tool' | 'system' | 'error';

export type Message = {
  role: Role;
  text: string;
  icon?: React.ReactNode;
};

type Status = 'idle' | 'processing' | 'error';

const scenarios = {
    support: {
        title: "Angry Customer",
        prompt: "Where is my package?! The tracking says it was delivered but it's not here! This is the second time this has happened!",
        icon: <AlertTriangle />
    },
    sales: {
        title: "Sales Inquiry",
        prompt: "Hi, I'm interested in your coffee subscription. Can you tell me more about the options and pricing? My email is test@example.com",
        icon: <ShoppingCart />
    },
    booking: {
        title: "Book an Appointment",
        prompt: "I need to book a follow-up call with a sales representative for next week.",
        icon: <Calendar />
    }
}

// Define the input schema for a single message
const MessageSchema = z.object({
  role: z.enum(['user', 'agent']),
  text: z.string(),
});

// Define the input schema for the flow
const AgentResponseInputSchema = z.object({
  messages: z.array(MessageSchema),
});
type AgentResponseInput = z.infer<typeof AgentResponseInputSchema>;


export default function InteractiveDemo() {
  const [status, setStatus] = useState<Status>('idle');
  const [messages, setMessages] = useState<Message[]>([
      { role: 'system', text: "Select a scenario or type your own message to begin." }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScenarioSelect = (scenarioPrompt: string) => {
    setMessages([{ role: 'system', text: 'Scenario selected. Click send to start.' }]);
    setInput(scenarioPrompt);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === 'processing') return;

    const userMessage: Message = { role: 'user', text: input, icon: <User /> };
    
    // Clear the system message on first user message
    const initialMessages = messages.length === 1 && messages[0].role === 'system' 
        ? [] 
        : messages;

    const newMessages = [...initialMessages, userMessage];
    setMessages(newMessages);
    setInput('');
    setStatus('processing');

    try {
      const stream = await generateAgentResponse({
        messages: newMessages.filter(m => m.role === 'user' || m.role === 'agent').map(m => ({role: m.role, text: m.text})),
      });
      
      let agentMessageText = '';
      let currentAgentMessageIndex = -1;

      const reader = stream.getReader();
      const decoder = new TextDecoder("utf-8");
      
      const processStream = async () => {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            
            // It's possible for a chunk to have multiple JSON objects
            const parts = chunk.split('}').filter(s => s.trim());
            for (const part of parts) {
                try {
                    const parsedChunk = JSON.parse(part + '}');
                    
                    setMessages(prev => {
                        let newMessages = [...prev];
                        if (parsedChunk.role === 'tool') {
                            newMessages.push({ role: 'tool', text: parsedChunk.text, icon: <Wand2 /> });
                            agentMessageText = '';
                            currentAgentMessageIndex = -1;
                        } else if (parsedChunk.role === 'agent') {
                            agentMessageText += parsedChunk.text;
                            if (currentAgentMessageIndex !== -1 && newMessages[currentAgentMessageIndex]?.role === 'agent') {
                                newMessages[currentAgentMessageIndex] = { ...newMessages[currentAgentMessageIndex], text: agentMessageText };
                            } else {
                                const newAgentMessage: Message = { role: 'agent', text: agentMessageText, icon: <Bot /> };
                                newMessages.push(newAgentMessage);
                                currentAgentMessageIndex = newMessages.length - 1;
                            }
                        } else if (parsedChunk.role === 'error') {
                            newMessages.push({ role: 'error', text: parsedChunk.text, icon: <AlertTriangle /> });
                        }
                        return newMessages;
                    });
                } catch(e) {
                    // This can happen if a chunk doesn't form a complete JSON object yet.
                    // The streaming nature of the decoder should handle this in the next chunk.
                    // console.warn("Could not parse stream chunk part:", part, e);
                }
            }
          }
          setStatus('idle');
      }
      
      processStream();

    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setMessages(prev => [...prev, { role: 'error', text: `Error: ${errorMessage}`, icon: <AlertTriangle/> }]);
      setStatus('error');
    }
  };


  const statusMap = {
    idle: { text: "AI Agent Ready", icon: <Sparkles className="w-12 h-12 text-slate-400" />, bgColor: 'bg-slate-800' },
    processing: { text: "Agent is thinking...", icon: <Loader2 className="w-12 h-12 text-white animate-spin" />, bgColor: 'bg-indigo-500/20' },
    error: { text: "An Error Occurred", icon: <AlertTriangle className="w-12 h-12 text-rose-400" />, bgColor: 'bg-rose-500/20' },
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[700px]">
      <div className="flex-1 p-8 flex flex-col items-center justify-between bg-gradient-to-br from-slate-900 to-slate-800 relative">
        <div>
          <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Live Demo</h2>
              <p className="text-slate-400">Interact with a real VOXA agent.</p>
          </div>
          <div className={cn(
            `w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500 mx-auto`,
            statusMap[status].bgColor
          )}>
            {statusMap[status].icon}
          </div>
          <div className="mt-8 text-center space-y-2 h-10">
            <div className="text-xl font-medium text-white">
              {statusMap[status].text}
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm">
            <p className="text-xs text-center font-semibold text-slate-400 uppercase tracking-wider mb-3">Or Start With A Scenario</p>
            <div className="grid grid-cols-3 gap-2">
                {Object.values(scenarios).map((s) => (
                     <button 
                        key={s.title}
                        onClick={() => handleScenarioSelect(s.prompt)}
                        className="text-xs text-center p-2 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors flex flex-col items-center gap-2 border border-transparent focus:border-violet-500 focus:bg-violet-500/10 focus:text-violet-300 outline-none"
                     >
                        {s.icon}
                        {s.title}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div className="flex-[2] bg-slate-950/70 p-6 flex flex-col border-t md:border-t-0 md:border-l border-white/5 font-mono text-sm">
        <div className="flex items-center gap-2 text-slate-400 mb-4 pb-4 border-b border-white/5">
          <Mic className="w-4 h-4" /> Live Call Transcript
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={cn('p-4 rounded-lg border text-xs flex flex-col shadow-inner', {
                'bg-violet-950/40 border-violet-500/20 text-violet-100 ml-8 relative': msg.role === 'agent',
                'bg-slate-800/80 border-slate-700/80 text-slate-100 mr-8 relative': msg.role === 'user',
                'bg-emerald-950/40 border-emerald-500/20 text-emerald-200 my-4 text-center text-xs': msg.role === 'tool',
                'text-slate-400 italic text-center border-transparent shadow-none': msg.role === 'system',
                'bg-rose-950/40 border-rose-500/20 text-rose-200': msg.role === 'error',
            })}>
              <div className={cn("absolute -top-3 -left-3 w-7 h-7 rounded-full flex items-center justify-center text-white",
                msg.role === 'agent' && "bg-violet-600",
                msg.role === 'user' && "bg-indigo-600",
              )}>
                {msg.role === 'agent' ? <Bot size={16}/> : msg.role === 'user' ? <User size={16}/> : null}
              </div>

               <div className={cn("text-[10px] uppercase font-bold tracking-wider mb-2 flex items-center gap-1.5",
                  msg.role === 'agent' && "text-violet-400",
                  msg.role === 'user' && "text-indigo-400",
                  msg.role === 'tool' && "text-emerald-400 justify-center",
                  msg.role === 'system' && "text-slate-500 justify-center",
                  msg.role === 'error' && "text-rose-400 justify-center",
               )}>
                {msg.icon}
                {msg.role}
              </div>
              <p className="font-sans text-white/90 text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          ))}
           {status === 'processing' && messages[messages.length - 1]?.role !== 'agent' && (
             <div className="ml-8 relative">
                <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full flex items-center justify-center text-white bg-violet-600">
                    <Bot size={16}/>
                </div>
                <div className="p-4 rounded-lg border text-xs flex flex-col shadow-inner bg-violet-950/40 border-violet-500/20 text-violet-100">
                    <div className="text-violet-400 text-[10px] uppercase font-bold tracking-wider mb-2 flex items-center gap-1.5"><Bot size={12}/> Agent</div>
                    <div className="flex items-center gap-2 text-slate-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Thinking...</span>
                    </div>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="mt-6 flex items-center gap-2 border-t border-white/5 pt-4">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-slate-800/50 rounded-lg px-4 py-2 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                disabled={status === 'processing'}
            />
            <Button 
                type="submit" 
                size="icon"
                disabled={!input.trim() || status === 'processing'}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 shrink-0"
            >
                <Send size={18} />
            </Button>
        </form>
      </div>
    </div>
  );
}
