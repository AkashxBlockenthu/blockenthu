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
  { id: 'ethereum', name: 'Ethereum', icon: '/lovable-uploads/aa3dd11f-114b-4014-8919-88aab10102d4.png', color: 'bg-blue-500' },
  { id: 'bsc', name: 'BSC', icon: '/lovable-uploads/0946246b-5cfa-49ab-805f-69cddc2df818.png', color: 'bg-yellow-500' },
  { id: 'solana', name: 'Solana', icon: '/lovable-uploads/5cf44c31-f4ea-4e5a-a388-4c5e3bd4df27.png', color: 'bg-green-500' },
  { id: 'avalanche', name: 'Avalanche', icon: '/lovable-uploads/e6b520ec-0c97-4b8f-ba92-9ddf981b8e56.png', color: 'bg-red-600' },
  { id: 'bitcoin', name: 'Bitcoin', icon: '/lovable-uploads/b23030ca-eca9-4394-a0d1-2c6bec108d69.png', color: 'bg-orange-500' },
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
              <img 
                src={selectedNetwork.icon} 
                alt={selectedNetwork.name} 
                className="w-6 h-6 rounded-full object-cover"
              />
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
              <img 
                src={network.icon} 
                alt={network.name} 
                className="w-6 h-6 rounded-full object-cover"
              />
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