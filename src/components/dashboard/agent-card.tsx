import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  name: string;
  status: 'active' | 'paused';
  calls: string;
  sentiment: string;
  desc: string;
}

export default function AgentCard({ name, status, calls, sentiment, desc }: AgentCardProps) {
  const isActive = status === 'active';
  return (
    <div className="bg-card border rounded-xl p-6 hover:border-violet-500/50 transition-all h-64 flex flex-col justify-between group">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center',
            isActive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
          )}>
            <Mic size={20} />
          </div>
          <div className={cn(
            'px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wide',
            isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
          )}>
            {status}
          </div>
        </div>
        <h3 className="font-bold text-card-foreground mb-1 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors">{name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{desc}</p>
      </div>
      
      <div className="border-t border-border pt-4 flex justify-between text-xs">
        <div>
          <div className="text-muted-foreground mb-1">Total Calls</div>
          <div className="text-card-foreground font-mono">{calls}</div>
        </div>
        <div className="text-right">
          <div className="text-muted-foreground mb-1">Sentiment</div>
          <div className="text-emerald-500 dark:text-emerald-400 font-mono font-bold">{sentiment}</div>
        </div>
      </div>
    </div>
  );
}
