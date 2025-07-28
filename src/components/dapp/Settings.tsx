import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, Settings as SettingsIcon, AlertTriangle } from 'lucide-react';

export const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [slippage, setSlippage] = useState([0.5]);
  const [deadline, setDeadline] = useState('20');
  const [expertMode, setExpertMode] = useState(false);
  const [gasPrice, setGasPrice] = useState('standard');

  const slippagePresets = [0.1, 0.5, 1.0];

  const handleSlippagePreset = (value: number) => {
    setSlippage([value]);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between glass-card">
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            <span>Settings</span>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="space-y-4 mt-4">
        <div className="glass-card p-4 space-y-6">
          {/* Slippage Tolerance */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Slippage Tolerance</Label>
            
            <div className="flex gap-2">
              {slippagePresets.map((preset) => (
                <Button
                  key={preset}
                  variant={slippage[0] === preset ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSlippagePreset(preset)}
                  className="px-3 py-1"
                >
                  {preset}%
                </Button>
              ))}
            </div>
            
            <div className="space-y-2">
              <Slider
                value={slippage}
                onValueChange={setSlippage}
                max={5}
                min={0.1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.1%</span>
                <span className="font-medium">{slippage[0]}%</span>
                <span>5.0%</span>
              </div>
            </div>
            
            {slippage[0] > 3 && (
              <div className="flex items-center gap-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs">
                <AlertTriangle className="h-3 w-3 text-yellow-500" />
                <span className="text-yellow-600">High slippage may result in unfavorable trades</span>
              </div>
            )}
          </div>

          {/* Transaction Deadline */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Transaction Deadline</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-20"
                min="1"
                max="120"
              />
              <span className="text-sm text-muted-foreground">minutes</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your transaction will revert if it is pending for more than this period
            </p>
          </div>

          {/* Gas Price Settings */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Gas Price</Label>
            <div className="grid grid-cols-3 gap-2">
              {['slow', 'standard', 'fast'].map((speed) => (
                <Button
                  key={speed}
                  variant={gasPrice === speed ? "default" : "outline"}
                  size="sm"
                  onClick={() => setGasPrice(speed)}
                  className="capitalize"
                >
                  {speed}
                </Button>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              {gasPrice === 'slow' && 'Lower fees, slower confirmation'}
              {gasPrice === 'standard' && 'Balanced fees and speed'}
              {gasPrice === 'fast' && 'Higher fees, faster confirmation'}
            </div>
          </div>

          {/* Expert Mode */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Expert Mode</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Allows high slippage trades and disables confirmations
                </p>
              </div>
              <Switch
                checked={expertMode}
                onCheckedChange={setExpertMode}
              />
            </div>
            
            {expertMode && (
              <div className="flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-xs">
                <AlertTriangle className="h-3 w-3 text-red-500" />
                <span className="text-red-600">Expert mode is enabled. Use with caution!</span>
              </div>
            )}
          </div>

          {/* Reset to Defaults */}
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              setSlippage([0.5]);
              setDeadline('20');
              setExpertMode(false);
              setGasPrice('standard');
            }}
          >
            Reset to Defaults
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};