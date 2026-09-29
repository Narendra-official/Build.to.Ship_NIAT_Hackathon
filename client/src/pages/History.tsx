import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { useApp } from '../lib/store';

export default function History() {
  const { actionLog } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">History</h1>
        <p className="text-gray-500">Past optimizations and configuration changes.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Action Log</CardTitle>
          <CardDescription>A complete log of AI-driven and manual changes.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary text-gray-500 border-b sticky top-0">
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Impact (Est)</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {actionLog.map((row) => (
                  <tr key={row.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-4 py-3 text-gray-500">{row.date}</td>
                    <td className="px-4 py-3 font-medium">{row.action}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${row.type.includes('AI') ? 'bg-accent/10 text-accent' : 'bg-gray-100 text-gray-600'}`}>
                        {row.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-green-600 font-medium">{row.impact}</td>
                  </tr>
                ))}
                {actionLog.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">No actions recorded yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
