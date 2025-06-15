
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Server } from "lucide-react";

export const ModelSettings = () => {
  const [cloudPlatform, setCloudPlatform] = useState("aws");
  const [computeType, setComputeType] = useState("gpu");
  const [instanceSize, setInstanceSize] = useState("medium");
  const [gnnLayers, setGnnLayers] = useState([3]);
  const [gnnThreshold, setGnnThreshold] = useState([0.75]);
  const [realtimeGraphUpdates, setRealtimeGraphUpdates] = useState(true);
  const [sequenceLength, setSequenceLength] = useState([128]);
  const [lstmUnits, setLstmUnits] = useState([256]);
  const [predictionWindow, setPredictionWindow] = useState([15]);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-security-blue">AI Model Settings</CardTitle>
        <CardDescription>Configure machine learning models for anomaly detection</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Server className="h-5 w-5 text-security-blue" />
            Deployment
          </h3>
          
          <div className="space-y-2">
            <Label htmlFor="cloud-platform">Cloud Platform</Label>
            <Select value={cloudPlatform} onValueChange={setCloudPlatform}>
              <SelectTrigger id="cloud-platform">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aws">AWS</SelectItem>
                <SelectItem value="gcp">Google Cloud</SelectItem>
                <SelectItem value="azure">Microsoft Azure</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="compute-type">Compute Type</Label>
            <Select value={computeType} onValueChange={setComputeType}>
              <SelectTrigger id="compute-type">
                <SelectValue placeholder="Select compute type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpu">GPU (Recommended)</SelectItem>
                <SelectItem value="cpu">CPU</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instance-size">Instance Size</Label>
            <Select value={instanceSize} onValueChange={setInstanceSize}>
              <SelectTrigger id="instance-size">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (2 vCPU, 4GB RAM)</SelectItem>
                <SelectItem value="medium">Medium (4 vCPU, 16GB RAM)</SelectItem>
                <SelectItem value="large">Large (8 vCPU, 32GB RAM)</SelectItem>
                <SelectItem value="xlarge">XLarge (16 vCPU, 64GB RAM)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">GNN Configuration</h3>
          
          <div className="space-y-2">
            <Label htmlFor="gnn-layers">Number of GNN Layers</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="gnn-layers"
                value={gnnLayers}
                onValueChange={setGnnLayers}
                max={6}
                step={1}
                className="w-[300px]"
              />
              <span className="text-sm font-medium">{gnnLayers[0]}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gnn-threshold">Anomaly Detection Threshold</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="gnn-threshold"
                value={gnnThreshold}
                onValueChange={setGnnThreshold}
                min={0.5}
                max={0.99}
                step={0.01}
                className="w-[300px]"
              />
              <span className="text-sm font-medium">{gnnThreshold[0]}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Real-time Graph Updates</Label>
              <p className="text-sm text-muted-foreground">
                Update graph structure in real-time
              </p>
            </div>
            <Switch checked={realtimeGraphUpdates} onCheckedChange={setRealtimeGraphUpdates} />
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">LSTM Configuration</h3>
          
          <div className="space-y-2">
            <Label htmlFor="sequence-length">Sequence Length</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="sequence-length"
                value={sequenceLength}
                onValueChange={setSequenceLength}
                min={32}
                max={512}
                step={32}
                className="w-[300px]"
              />
              <span className="text-sm font-medium">{sequenceLength[0]}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lstm-units">LSTM Units</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="lstm-units"
                value={lstmUnits}
                onValueChange={setLstmUnits}
                min={64}
                max={512}
                step={64}
                className="w-[300px]"
              />
              <span className="text-sm font-medium">{lstmUnits[0]}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prediction-window">Prediction Window (minutes)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="prediction-window"
                value={predictionWindow}
                onValueChange={setPredictionWindow}
                min={5}
                max={60}
                step={5}
                className="w-[300px]"
              />
              <span className="text-sm font-medium">{predictionWindow[0]}</span>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <Button className="bg-security-blue hover:bg-security-blue/80">
            Save Model Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
