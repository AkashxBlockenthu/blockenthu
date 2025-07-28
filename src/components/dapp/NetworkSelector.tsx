import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface Network {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const networks: Network[] = [
  { id: 'ethereum', name: 'Ethereum', icon: '🔷', color: 'bg-blue-500' },
  { id: 'polygon', name: 'Polygon', icon: '🟣', color: 'bg-purple-500' },
  { id: 'bsc', name: 'BSC', icon: '🟡', color: 'bg-yellow-500' },
  { id: 'arbitrum', name: 'Arbitrum', icon: '🔵', color: 'bg-blue-600' },
  { id: 'optimism', name: 'Optimism', icon: '🔴', color: 'bg-red-500' },
  { id: 'avalanche', name: 'Avalanche', icon: '⛰️', color: 'bg-red-600' },
  { id: 'solana', name: 'Solana', icon: '🟢', color: 'bg-green-500' },
];

interface NetworkSelectorProps {
  value: string;
  onChange: (networkId: string) => void;
  label?: string;
}

export const NetworkSelector = ({ value, onChange, label }: NetworkSelectorProps) => {
  const selectedNetwork = networks.find(n => n.id === value) || networks[0];

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between glass-card h-12">
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full ${selectedNetwork.color} flex items-center justify-center text-xs`}>
                {selectedNetwork.icon}
              </div>
              <span className="font-medium">{selectedNetwork.name}</span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-56 glass-card border-border/50">
          {networks.map((network) => (
            <DropdownMenuItem
              key={network.id}
              onClick={() => onChange(network.id)}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white/5"
            >
              <div className={`w-6 h-6 rounded-full ${network.color} flex items-center justify-center text-xs`}>
                {network.icon}
              </div>
              <span className="font-medium">{network.name}</span>
              {network.id === value && (
                <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};