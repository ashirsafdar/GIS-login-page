"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import NavbarAdvanced from "@/components/navigation";
import type { Coordinates } from "@/components/InteractiveMap";

const MapWrapper = dynamic(() => import("./MapWrapper"), { ssr: false });

export default function UIPage() {
  const [drawingMode, setDrawingMode] = useState(false);
  const [boundaryPoints, setBoundaryPoints] = useState<Coordinates[]>([]);

  const onDrawBoundary = useCallback(() => {
    setDrawingMode(true);
  }, []);

  const onCompleteBoundary = useCallback((points: Coordinates[]) => {
    setBoundaryPoints(points);
    setDrawingMode(false);
  }, []);

  const onCancelDrawing = useCallback(() => {
    setDrawingMode(false);
  }, []);

  const onEnableTabularForm = useCallback(() => {
    console.log("Enable Tabular Form clicked");
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-white">
      <NavbarAdvanced
        title="ARGIS"
        location="CSD Handlers"
        onDrawBoundary={onDrawBoundary}
        onEnableTabularForm={onEnableTabularForm}
      />

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <MapWrapper
          drawingMode={drawingMode}
          boundaryPoints={boundaryPoints}
          onCompleteBoundary={onCompleteBoundary}
          onCancelDrawing={onCancelDrawing}
        />
      </main>
    </div>
  );
}