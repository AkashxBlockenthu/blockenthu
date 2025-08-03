import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, Settings as SettingsIcon, AlertTriangle, Info } from 'lucide-react';
import { DEFAULT_SWAP_CONFIG, LIQUIDITY_PROTOCOLS, AdvancedSwapConfig } from '@/types/1inch';

interface SettingsProps {
  config?: AdvancedSwapConfig;
  onConfigChange?: (config: AdvancedSwapConfig) => void;
}

export const Settings = ({ config, onConfigChange }: SettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localConfig, setLocalConfig] = useState<AdvancedSwapConfig>(config || DEFAULT_SWAP_CONFIG);
  const [slippage, setSlippage] = useState([0.5]);
  const [deadline, setDeadline] = useState('20');
  const [expertMode, setExpertMode] = useState(false);

  const slippagePresets = [0.1, 0.5, 1.0];

  const handleSlippagePreset = (value: number) => {
    setSlippage([value]);
  };

  const updateConfig = (updates: Partial<AdvancedSwapConfig>) => {
    const newConfig = { ...localConfig, ...updates };
    setLocalConfig(newConfig);
    onConfigChange?.(newConfig);
  };

  const handleProtocolToggle = (protocol: string) => {
    const { enabledProtocols, excludedProtocols } = localConfig;
    
    if (excludedProtocols.includes(protocol)) {
      updateConfig({
        excludedProtocols: excludedProtocols.filter(p => p !== protocol)
      });
    } else {
      updateConfig({
        excludedProtocols: [...excludedProtocols, protocol]
      });
    }
  };

  const resetToDefaults = () => {
    setSlippage([0.5]);
    setDeadline('20');
    setExpertMode(false);
    setLocalConfig(DEFAULT_SWAP_CONFIG);
    onConfigChange?.(DEFAULT_SWAP_CONFIG);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between glass-card">
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            <span>Advanced Settings</span>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="space-y-4 mt-4">
        <div className="glass-card p-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="gas">Gas</TabsTrigger>
              <TabsTrigger value="routing">Routing</TabsTrigger>
              <TabsTrigger value="protocols">Protocols</TabsTrigger>
            </TabsList>

            {/* Basic Settings Tab */}
            <TabsContent value="basic" className="space-y-6 mt-4">
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
                    max={50}
                    min={0.1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0.1%</span>
                    <span className="font-medium">{slippage[0]}%</span>
                    <span>50.0%</span>
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

              {/* Advanced Trade Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Allow Partial Fill</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cancel part of route if rate becomes less attractive
                    </p>
                  </div>
                  <Switch
                    checked={localConfig.allowPartialFill}
                    onCheckedChange={(checked) => updateConfig({ allowPartialFill: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Fee-on-Transfer Compatibility</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enable for tokens with transfer fees
                    </p>
                  </div>
                  <Switch
                    checked={localConfig.compatibility}
                    onCheckedChange={(checked) => updateConfig({ compatibility: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Use Permit2</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Use Permit2 for token approvals
                    </p>
                  </div>
                  <Switch
                    checked={localConfig.usePermit2}
                    onCheckedChange={(checked) => updateConfig({ usePermit2: checked })}
                  />
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
            </TabsContent>

            {/* Gas Settings Tab */}
            <TabsContent value="gas" className="space-y-6 mt-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Gas Price Strategy</Label>
                <div className="grid grid-cols-4 gap-2">
                  {['slow', 'standard', 'fast', 'custom'].map((strategy) => (
                    <Button
                      key={strategy}
                      variant={localConfig.gasPrice === strategy ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateConfig({ gasPrice: strategy as any })}
                      className="capitalize"
                    >
                      {strategy}
                    </Button>
                  ))}
                </div>
                
                {localConfig.gasPrice === 'custom' && (
                  <div className="space-y-2">
                    <Label className="text-xs">Custom Gas Price (GWEI)</Label>
                    <Input
                      type="number"
                      value={localConfig.customGasPrice || ''}
                      onChange={(e) => updateConfig({ customGasPrice: e.target.value })}
                      placeholder="e.g., 20"
                      className="w-full"
                    />
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground">
                  {localConfig.gasPrice === 'slow' && 'Lower fees, slower confirmation (3-5 min)'}
                  {localConfig.gasPrice === 'standard' && 'Balanced fees and speed (1-2 min)'}
                  {localConfig.gasPrice === 'fast' && 'Higher fees, faster confirmation (15-30 sec)'}
                  {localConfig.gasPrice === 'custom' && 'Set your own gas price'}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Gas Limit</Label>
                <div className="space-y-2">
                  <Input
                    type="number"
                    value={localConfig.gasLimit}
                    onChange={(e) => updateConfig({ gasLimit: parseInt(e.target.value) || DEFAULT_SWAP_CONFIG.gasLimit })}
                    min="100000"
                    max="11500000"
                  />
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Info className="h-3 w-3" />
                    <span>Maximum gas units for the transaction (default: {DEFAULT_SWAP_CONFIG.gasLimit.toLocaleString()})</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Routing Settings Tab */}
            <TabsContent value="routing" className="space-y-6 mt-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Route Complexity Level</Label>
                <div className="space-y-2">
                  <Slider
                    value={[localConfig.complexityLevel]}
                    onValueChange={([value]) => updateConfig({ complexityLevel: value })}
                    max={3}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Simple (0)</span>
                    <span className="font-medium">Level {localConfig.complexityLevel}</span>
                    <span>Complex (3)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Higher complexity allows more token connectors but takes longer to compute
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Maximum Route Parts</Label>
                <div className="space-y-2">
                  <Slider
                    value={[localConfig.mainRouteParts]}
                    onValueChange={([value]) => updateConfig({ mainRouteParts: value })}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1</span>
                    <span className="font-medium">{localConfig.mainRouteParts} parts</span>
                    <span>50</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Split Parts per Route</Label>
                <div className="space-y-2">
                  <Slider
                    value={[localConfig.parts]}
                    onValueChange={([value]) => updateConfig({ parts: value })}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1</span>
                    <span className="font-medium">{localConfig.parts} splits</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Protocols Tab */}
            <TabsContent value="protocols" className="space-y-6 mt-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Liquidity Protocols</Label>
                <p className="text-xs text-muted-foreground">
                  Deselect protocols to exclude them from routing (all enabled by default)
                </p>
                
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {LIQUIDITY_PROTOCOLS.map((protocol) => (
                    <div key={protocol} className="flex items-center space-x-2">
                      <Switch
                        id={protocol}
                        checked={!localConfig.excludedProtocols.includes(protocol)}
                        onCheckedChange={() => handleProtocolToggle(protocol)}
                        size="sm"
                      />
                      <Label htmlFor={protocol} className="text-xs font-normal">
                        {protocol}
                      </Label>
                    </div>
                  ))}
                </div>
                
                {localConfig.excludedProtocols.length > 0 && (
                  <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded text-xs">
                    <span className="text-blue-600">
                      {localConfig.excludedProtocols.length} protocol(s) excluded: {localConfig.excludedProtocols.join(', ')}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Referrer Settings</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Referrer address (optional)"
                    value={localConfig.referrer || ''}
                    onChange={(e) => updateConfig({ referrer: e.target.value || undefined })}
                  />
                  <div className="space-y-2">
                    <Label className="text-xs">Referrer Fee (%)</Label>
                    <Slider
                      value={[localConfig.referrerFee]}
                      onValueChange={([value]) => updateConfig({ referrerFee: value })}
                      max={3}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span className="font-medium">{localConfig.referrerFee}%</span>
                      <span>3%</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Reset Button */}
          <div className="mt-6 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={resetToDefaults}
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};