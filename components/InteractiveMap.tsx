"use client";

import { useCallback, useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, Polyline, CircleMarker, useMapEvent } from "react-leaflet";
import type { LatLngExpression, LeafletMouseEvent } from "leaflet";

export type Coordinates = [number, number];

export interface InteractiveMapProps {
  center?: Coordinates;
  zoom?: number;
  drawingMode: boolean;
  boundaryPoints: Coordinates[];
  onCompleteBoundary: (points: Coordinates[]) => void;
  onCancelDrawing: () => void;
}

const DEFAULT_CENTER: Coordinates = [33.17, 65.79];
const DEFAULT_ZOOM = 6;

function MapClickHandler({ drawingMode, onMapClick }: { drawingMode: boolean; onMapClick: (latlng: Coordinates) => void }) {
  useMapEvent("click", (event: LeafletMouseEvent) => {
    if (!drawingMode) return;
    onMapClick([event.latlng.lat, event.latlng.lng]);
  });

  return null;
}

export default function InteractiveMap({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  drawingMode,
  boundaryPoints,
  onCompleteBoundary,
  onCancelDrawing,
}: InteractiveMapProps) {
  const [draftPoints, setDraftPoints] = useState<Coordinates[]>([]);
  const [isPolygonFinalized, setIsPolygonFinalized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!drawingMode) {
      setDraftPoints([]);
      setIsPolygonFinalized(false);
    }
  }, [drawingMode]);

  const handleMapClick = useCallback((latlng: Coordinates) => {
    setDraftPoints((current) => [...current, latlng]);
  }, []);

  const handleComplete = () => {
    if (draftPoints.length < 3) {
      setError("Add at least three points before completing the boundary.");
      return;
    }

    setIsPolygonFinalized(true);
    onCompleteBoundary(draftPoints);
    setError(null);
  };

  const handleCancel = () => {
    setDraftPoints([]);
    setIsPolygonFinalized(false);
    setError(null);
    onCancelDrawing();
  };

  const statusMessage = drawingMode
    ? "Click the map to add boundary points. Complete when ready."
    : "Use Draw Boundary to begin drawing on the map.";

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-slate/30 bg-[#0c0d0e] p-4 shadow-2xl">
      <div className="absolute inset-x-4 top-4 z-20 flex flex-wrap items-center gap-2">
        <div className="rounded-2xl bg-black/80 px-4 py-2 text-sm text-white shadow-lg ring-1 ring-slate-700">
          <p className="font-semibold">{drawingMode ? "Drawing mode active" : "Map ready"}</p>
          <p className="mt-1 text-xs text-slate-300">{statusMessage}</p>
        </div>

        {drawingMode ? (
          <>
            <button
              type="button"
              onClick={handleComplete}
              disabled={draftPoints.length < 3}
              className="rounded-full bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black shadow-lg transition hover:bg-[#b58e20] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Complete Boundary
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-full border border-slate-600 bg-black/80 px-4 py-2 text-sm text-white shadow-lg transition hover:border-slate-400"
            >
              Cancel
            </button>
          </>
        ) : null}
      </div>

      {error ? (
        <div className="absolute inset-x-4 top-28 z-20 rounded-2xl border border-red-500 bg-red-500/10 px-4 py-2 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="mt-24 rounded-[28px] border border-slate-800 bg-[#020202]">
        <MapContainer
          {...({
            center: center as LatLngExpression,
            zoom,
            scrollWheelZoom: true,
          } as any)}
          className="h-[70vh] min-h-[520px] w-full rounded-[28px]"
          zoomControl
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler drawingMode={drawingMode} onMapClick={handleMapClick} />

          {draftPoints.length > 1 && !isPolygonFinalized ? (
            <Polyline positions={draftPoints as LatLngExpression[]} pathOptions={{ color: "#D4AF37", weight: 4 }} />
          ) : null}

          {isPolygonFinalized || boundaryPoints.length > 0 ? (
            <Polygon
              positions={(isPolygonFinalized ? draftPoints : boundaryPoints) as LatLngExpression[]}
              pathOptions={{ color: "#D4AF37", fillColor: "rgba(212, 175, 55, 0.25)", weight: 3 }}
            />
          ) : null}

          {(draftPoints.length > 0 ? draftPoints : boundaryPoints).map((point, index) => (
            <CircleMarker
              key={`${point[0]}-${point[1]}-${index}`}
              center={point as LatLngExpression}
              radius={5}
              pathOptions={{ color: "#ffffff", fillColor: "#D4AF37", fillOpacity: 1, weight: 2 }}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
