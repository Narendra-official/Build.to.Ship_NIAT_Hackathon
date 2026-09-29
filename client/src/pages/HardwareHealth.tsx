import { Wrench, AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { toast } from "sonner";

export default function HardwareHealth() {
  const equipment = [
    { id: 1, name: "HVAC Unit A (Rooftop)", status: "critical", anomaly: "Heating time increased by 32% (Likely compressor degradation)", expectedFailure: "14-21 days", costRisk: "$4,500" },
    { id: 2, name: "Ventilation Fan 3 (Floor 2)", status: "warning", anomaly: "Vibration frequency anomaly detected", expectedFailure: "45-60 days", costRisk: "$800" },
    { id: 3, name: "Cooling Tower Pump", status: "healthy", anomaly: "None", expectedFailure: "N/A", costRisk: "$0" },
    { id: 4, name: "HVAC Unit B (East Wing)", status: "healthy", anomaly: "None", expectedFailure: "N/A", costRisk: "$0" },
  ];

  return (
    <div className="space-y-10 pb-12 animate-fade-in-up">
      <div className="flex flex-col space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-semibold tracking-wide uppercase mb-2 w-fit">
          <Wrench className="w-4 h-4" />
          <span>Predictive Maintenance</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Hardware Health
        </h1>
        <p className="text-muted-foreground text-base max-w-xl leading-relaxed">
          AI-driven anomaly detection for HVAC and infrastructure. Prevent equipment failure before it happens.
        </p>
      </div>

      <div className="grid gap-6">
        {equipment.map((item, i) => (
          <Card key={item.id} className={`glass-elevated overflow-hidden transition-all duration-300 stagger-${i + 1} ${item.status === 'critical' ? 'border-l-4 border-l-red-500' : item.status === 'warning' ? 'border-l-4 border-l-orange-500' : 'border-l-4 border-l-emerald-500'}`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-2xl shadow-sm ${item.status === 'critical' ? 'bg-red-500/10 text-red-600' : item.status === 'warning' ? 'bg-orange-500/10 text-orange-600' : 'bg-emerald-500/10 text-emerald-600'}`}>
                    {item.status === 'critical' ? <ShieldAlert className="w-6 h-6" /> : item.status === 'warning' ? <AlertTriangle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">{item.name}</CardTitle>
                    <CardDescription className="mt-1 font-medium text-muted-foreground">
                      Status: <span className="uppercase tracking-wide font-bold">{item.status}</span>
                    </CardDescription>
                  </div>
                </div>
                {item.status !== 'healthy' && (
                  <button 
                    onClick={() => toast.success(`Service scheduled for ${item.name}. Maintenance team notified.`)}
                    className="px-5 py-2 rounded-xl text-sm font-bold bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-md"
                  >
                    Schedule Service
                  </button>
                )}
              </div>
            </CardHeader>
            {item.status !== 'healthy' && (
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div className="bg-background/50 p-4 rounded-xl border border-border/50">
                    <p className="text-xs font-bold text-muted-foreground uppercase mb-1">AI Detected Anomaly</p>
                    <p className="font-semibold text-sm">{item.anomaly}</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border/50">
                    <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Expected Failure In</p>
                    <p className="font-semibold text-sm text-red-500">{item.expectedFailure}</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border/50">
                    <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Avoidable Repair Cost</p>
                    <p className="font-semibold text-sm text-foreground">{item.costRisk}</p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
