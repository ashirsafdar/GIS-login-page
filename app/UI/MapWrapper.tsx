"use client";

import "leaflet/dist/leaflet.css";
import InteractiveMap from "@/components/InteractiveMap";
import type { Coordinates } from "@/components/InteractiveMap";

interface MapWrapperProps {
  drawingMode: boolean;
  boundaryPoints: Coordinates[];
  onCompleteBoundary: (points: Coordinates[]) => void;
  onCancelDrawing: () => void;
}

export default function MapWrapper({ drawingMode, boundaryPoints, onCompleteBoundary, onCancelDrawing }: MapWrapperProps) {
  return (
    <div className="mx-auto max-w-full px-4 pb-8 pt-6 sm:px-6 lg:px-8">
      <InteractiveMap
        drawingMode={drawingMode}
        boundaryPoints={boundaryPoints}
        onCompleteBoundary={onCompleteBoundary}
        onCancelDrawing={onCancelDrawing}
      />
    </div>
  );
}
