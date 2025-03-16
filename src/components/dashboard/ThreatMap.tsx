
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock data for threat visualization
const mockThreats = [
  { id: 1, x: 30, y: 25, size: 8, threat: 'high', label: 'Transaction Fraud' },
  { id: 2, x: 70, y: 40, size: 12, threat: 'critical', label: 'Data Breach' },
  { id: 3, x: 50, y: 65, size: 6, threat: 'medium', label: 'Suspicious Login' },
  { id: 4, x: 65, y: 25, size: 5, threat: 'low', label: 'Failed Auth' },
  { id: 5, x: 20, y: 75, size: 10, threat: 'high', label: 'Encryption Failure' },
  { id: 6, x: 85, y: 60, size: 7, threat: 'medium', label: 'API Abuse' },
  { id: 7, x: 40, y: 50, size: 4, threat: 'low', label: 'Rate Limit' },
  { id: 8, x: 75, y: 80, size: 9, threat: 'critical', label: 'SQL Injection' },
];

export function ThreatMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Determine color based on threat level
  const getThreatColor = (threat: string): string => {
    switch(threat) {
      case 'critical': return '#dc2626'; // Red
      case 'high': return '#d97706'; // Amber
      case 'medium': return '#a855f7'; // Purple
      case 'low': return '#0d9488'; // Teal
      default: return '#3b82f6'; // Blue
    }
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections between threats
    ctx.beginPath();
    mockThreats.forEach((threat, i) => {
      if (i < mockThreats.length - 1) {
        const nextThreat = mockThreats[i + 1];
        ctx.moveTo(threat.x * canvas.clientWidth / 100, threat.y * canvas.clientHeight / 100);
        ctx.lineTo(nextThreat.x * canvas.clientWidth / 100, nextThreat.y * canvas.clientHeight / 100);
      }
    });
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw threat nodes
    mockThreats.forEach(threat => {
      const x = threat.x * canvas.clientWidth / 100;
      const y = threat.y * canvas.clientHeight / 100;
      const radius = threat.size;
      
      // Draw glow for critical threats
      if (threat.threat === 'critical' || threat.threat === 'high') {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(x, y, radius, x, y, radius * 2);
        gradient.addColorStop(0, getThreatColor(threat.threat) + '40');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw node
      ctx.beginPath();
      ctx.fillStyle = getThreatColor(threat.threat);
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Label
      ctx.fillStyle = '#fff';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(threat.label, x, y + radius + 12);
    });
    
  }, []);
  
  return (
    <Card className="border-0 bg-security-navy shadow-lg overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-security-blue">Threat Map</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative w-full h-[300px]">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
