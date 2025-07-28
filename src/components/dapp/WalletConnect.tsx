import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Wallet, Copy, ExternalLink, LogOut, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Wallet {
  name: string;
  icon: string;
  installed: boolean;
}

const wallets: Wallet[] = [
  { name: 'MetaMask', icon: '🦊', installed: true },
  { name: 'WalletConnect', icon: '🌐', installed: true },
  { name: 'Coinbase Wallet', icon: '🔵', installed: false },
  { name: 'Trust Wallet', icon: '🛡️', installed: false },
  { name: 'Rainbow', icon: '🌈', installed: false },
  { name: 'Phantom', icon: '👻', installed: false },
];

export const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleWalletConnect = async (wallet: Wallet) => {
    // Simulate wallet connection
    setSelectedWallet(wallet);
    setOpen(false);
    
    // Mock connection process
    toast({
      title: "Connecting...",
      description: `Connecting to ${wallet.name}`,
    });

    setTimeout(() => {
      setIsConnected(true);
      setWalletAddress('0x742d35Cc6627C94532Ac69aA9e4e45b7e73AC0aB');
      toast({
        title: "Wallet Connected!",
        description: `Successfully connected to ${wallet.name}`,
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress('');
    setSelectedWallet(null);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected && walletAddress) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="glass-card">
            <div className="flex items-center gap-2">
              <span className="text-lg">{selectedWallet?.icon}</span>
              <span className="font-mono">{formatAddress(walletAddress)}</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-56 glass-card border-border/50" align="end">
          <div className="px-3 py-2">
            <div className="text-sm font-medium">Connected with {selectedWallet?.name}</div>
            <div className="text-xs text-muted-foreground font-mono mt-1">
              {formatAddress(walletAddress)}
            </div>
          </div>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
            <Copy className="mr-2 h-4 w-4" />
            Copy Address
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer">
            <ExternalLink className="mr-2 h-4 w-4" />
            View on Explorer
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Wallet Settings
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleDisconnect} className="cursor-pointer text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="glow-button">
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md glass-card border-border/50">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleWalletConnect(wallet)}
              disabled={!wallet.installed}
              className="w-full flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{wallet.icon}</span>
                <span className="font-semibold">{wallet.name}</span>
              </div>
              {wallet.installed ? (
                <span className="text-xs text-green-500">Installed</span>
              ) : (
                <span className="text-xs text-muted-foreground">Not Installed</span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/20 rounded-lg">
          <p className="text-sm text-muted-foreground">
            By connecting a wallet, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};