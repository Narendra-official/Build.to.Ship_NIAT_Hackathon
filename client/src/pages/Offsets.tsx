import { Leaf, ArrowRight, TreePine, Sun, Wind } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function Offsets() {
  return (
    <div className="space-y-10 pb-12 animate-fade-in-up">
      <div className="flex flex-col space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-2 w-fit">
          <Leaf className="w-4 h-4" />
          <span>Net Zero Marketplace</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Carbon Offsets
        </h1>
        <p className="text-muted-foreground text-base max-w-xl leading-relaxed">
          Instantly offset your remaining carbon footprint. Purchase verified carbon credits directly from your dashboard.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 glass-card p-8 rounded-3xl border border-border/60 shadow-xl flex flex-col justify-center items-center text-center">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">This Month's Footprint</p>
          <h2 className="text-5xl font-extrabold text-foreground mb-4">42 <span className="text-2xl text-muted-foreground">tons</span></h2>
          <p className="text-sm text-muted-foreground mb-8">Generated from HVAC and baseline power consumption after AI optimization.</p>
          <div className="w-full bg-secondary/50 rounded-xl p-4 border border-border/40">
            <p className="text-sm font-medium">Cost to achieve Net Zero:</p>
            <p className="text-2xl font-bold text-primary mt-1">$630.00</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {[
            { title: "Reforestation Initiative", desc: "Planting trees in deforested regions to capture carbon naturally.", icon: TreePine, price: "$15/ton" },
            { title: "Solar Farm Expansion", desc: "Funding solar infrastructure to replace coal-based energy.", icon: Sun, price: "$12/ton" },
            { title: "Offshore Wind Projects", desc: "Investing in high-yield renewable wind energy.", icon: Wind, price: "$18/ton" }
          ].map((project, i) => (
            <Card key={i} className="glass-elevated border-border/50 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <project.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{project.desc}</p>
                    <p className="text-sm font-semibold text-primary mt-2">{project.price}</p>
                  </div>
                </div>
                <Button className="shrink-0 ml-4 rounded-xl font-bold shadow-md">
                  Purchase Credits
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
