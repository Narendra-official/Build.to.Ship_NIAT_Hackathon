import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { useApp } from '../lib/store';
import NewAnalysisModal from '../components/NewAnalysisModal';
import ScheduleModal from '../components/ScheduleModal';

export default function Analysis() {
  const { schedules } = useApp();
  const [isModalOpen, setModalOpen] = useState(false);
  const [scheduleModalRec, setScheduleModalRec] = useState<string | null>(null);

  // Check if there's a schedule application for Floor 2
  const floor2Application = schedules.find(s => s.proposedSchedule.includes('18°C'));
  const applied = !!floor2Application;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Analysis</h1>
          <p className="text-gray-500">Insights and recommendations based on recent thermal models.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>Run New Analysis</Button>
      </div>

      <NewAnalysisModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <ScheduleModal isOpen={!!scheduleModalRec} onClose={() => setScheduleModalRec(null)} recommendation={scheduleModalRec || ''} />

      <div className="grid gap-6">
        <Card className={applied ? "border-green-200" : "border-destructive/30"}>
          <CardHeader className={`pb-3 border-b border-border rounded-t-lg ${applied ? "bg-green-50/50" : "bg-destructive/5"}`}>
            <div className="flex items-center space-x-2">
              {applied ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <AlertCircle className="w-5 h-5 text-destructive" />}
              <CardTitle className="text-lg">{applied ? "Heating Schedule Application Submitted" : "Heating Schedule Inefficiency Detected"}</CardTitle>
            </div>
            <CardDescription className={applied ? "text-green-700/80" : "text-destructive/80"}>
              {applied ? `Status: ${floor2Application?.status} • Saving ~450 kWh/week` : "High confidence (94%) • Projected waste: ~450 kWh/week"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-sm mb-2">Finding</h4>
                <p className="text-sm text-gray-600 mb-4">
                  The AI model detected that Floor 2 heating remains at 21°C between 18:00 and 22:00, despite occupancy dropping below 5% after 18:30 on weekdays.
                </p>
                <h4 className="font-semibold text-sm mb-2">Data Points Analyzed</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>IoT Occupancy Sensors (Floor 2)</li>
                  <li>Historical HVAC Logs (Last 30 days)</li>
                  <li>Thermal retention capacity of Floor 2</li>
                </ul>
              </div>
              <div className="bg-secondary p-4 rounded-lg border border-border flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-sm mb-3">Schedule Application</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm opacity-50">
                      <span className="text-gray-500">Previous Schedule</span>
                      <span className="font-medium">Maintain 21°C until 22:00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Proposed Schedule</span>
                      <span className="font-medium text-accent">Drift to 18°C starting 18:30</span>
                    </div>
                    {applied && (
                      <div className="flex justify-between items-center text-sm border-t border-border pt-2 mt-2">
                        <span className="text-gray-500">Status</span>
                        <span className="font-medium text-amber-600">{floor2Application?.status}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="w-full" onClick={() => setScheduleModalRec("Drift to 18°C starting 18:30")} disabled={applied} variant={applied ? "secondary" : "default"}>
                    {applied ? "Application Pending" : "Apply Schedule"} {!applied && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
