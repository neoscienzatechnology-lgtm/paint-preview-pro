import { useState } from "react";
import { WallCanvas } from "@/components/WallPainter/WallCanvas";
import { ControlPanel } from "@/components/WallPainter/ControlPanel";
import { WallPainterState } from "@/components/WallPainter/types";
import { DEFAULT_STATE } from "@/components/WallPainter/constants";
import { Paintbrush2 } from "lucide-react";

const Index = () => {
  const [state, setState] = useState<WallPainterState>(DEFAULT_STATE);

  const handleStateChange = (updates: Partial<WallPainterState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-accent p-2.5 rounded-xl shadow-medium">
              <Paintbrush2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Simulador de Pintura
              </h1>
              <p className="text-sm text-muted-foreground">
                Visualize sua parede antes de pintar
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          {/* Control Panel */}
          <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto">
            <ControlPanel state={state} onChange={handleStateChange} />
          </aside>

          {/* Canvas Preview */}
          <section className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            <div className="bg-card rounded-xl shadow-strong p-6 h-full">
              <div className="h-full">
                <WallCanvas state={state} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
