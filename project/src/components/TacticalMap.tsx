import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation, AlertTriangle, Info, Shield, Target } from 'lucide-react';
import { MissionPlan } from '@/src/services/geminiService';

import { cn } from '../lib/utils';

interface TacticalMapProps {
  location: { lat: number; lng: number } | null;
  missionPlan?: MissionPlan | null;
}

export default function TacticalMap({ location, missionPlan }: TacticalMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const missionLayerGroup = useRef<L.LayerGroup | null>(null);
  const patrolMarker = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;

    // Initialize Leaflet Map
    map.current = L.map(mapContainer.current, {
      center: [34.5, 76.5], // Broad J&K Region
      zoom: 7,
      zoomControl: false,
      attributionControl: false
    });

    // Add Dark Matter Tile Layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map.current);

    // Layer group for mission-specific data (cleared on every new plan)
    missionLayerGroup.current = L.layerGroup().addTo(map.current);

    // Initialize Standing Patrol Unit (Moving)
    const patrolIcon = L.divIcon({
      className: 'custom-patrol-icon',
      html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
    patrolMarker.current = L.marker([34.08, 74.79], { icon: patrolIcon })
      .addTo(map.current)
      .bindPopup('<span class="text-[10px] font-mono">MOVING PATROL UNIT</span>');

    // Interval 1: Live Threats (Random popups)
    const threatInterval = setInterval(() => {
      if (!map.current) return;
      const lat = 34 + (Math.random() - 0.5) * 3;
      const lng = 76 + (Math.random() - 0.5) * 3;

      const circle = L.circle([lat, lng], { 
        radius: 2000, 
        color: '#ff3c00', 
        fillColor: '#ff3c00', 
        fillOpacity: 0.3 
      })
      .addTo(map.current)
      .bindPopup('<span class="text-[10px] font-mono">LIVE THREAT DETECTED</span>');
      
      // Auto-remove after 10 seconds
      setTimeout(() => circle.remove(), 10000);
    }, 5000);

    // Interval 2: Moving Patrol
    const moveInterval = setInterval(() => {
      if (!patrolMarker.current) return;
      const cur = patrolMarker.current.getLatLng();
      const nextLat = cur.lat + (Math.random() - 0.5) * 0.1;
      const nextLng = cur.lng + (Math.random() - 0.5) * 0.1;
      patrolMarker.current.setLatLng([nextLat, nextLng]);
    }, 3000);

    return () => {
      clearInterval(threatInterval);
      clearInterval(moveInterval);
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Effect to handle mission data visualization
  useEffect(() => {
    if (!map.current || !missionLayerGroup.current || !missionPlan) return;

    // Clear previous mission layers
    missionLayerGroup.current.clearLayers();

    // 🔴 Threats
    missionPlan.threats?.forEach(t => {
      L.circle([t.lat, t.lng], { 
        radius: 4000, 
        color: '#ff0000', 
        fillColor: '#ff0000', 
        fillOpacity: 0.2 
      })
      .addTo(missionLayerGroup.current!)
      .bindPopup(`<div class="font-mono text-[10px]"><span class="text-red-500 font-bold">THREAT:</span> ${t.type}</div>`);
    });

    // 🟢 Safe Zones
    const safeIcon = L.divIcon({
      className: 'safe-zone-icon',
      html: `<div class="w-4 h-4 bg-green-500 rounded border-2 border-white shadow-[0_0_10px_green]"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
    missionPlan.safeZones?.forEach(s => {
      L.marker([s.lat, s.lng], { icon: safeIcon })
        .addTo(missionLayerGroup.current!)
        .bindPopup(`<div class="font-mono text-[10px] text-green-500 font-bold">SAFE ZONE</div>`);
    });

    // 🔵 Route
    if (missionPlan.route && missionPlan.route.length > 0) {
      L.polyline(missionPlan.route, { 
        color: '#00ff41', 
        weight: 3, 
        opacity: 0.6, 
        dashArray: '10, 10' 
      }).addTo(missionLayerGroup.current);

      // Fit map to route
      map.current.fitBounds(L.polyline(missionPlan.route).getBounds(), { padding: [50, 50] });
    }

  }, [missionPlan]);

  // Update center when location prop changes (initial or manual)
  useEffect(() => {
    if (map.current && location && !missionPlan) {
      map.current.flyTo([location.lat, location.lng], 10, {
        animate: true,
        duration: 1.5
      });
    }
  }, [location, missionPlan]);

  return (
    <div className="relative w-full h-full bg-[#0a0c10] border border-white/5 overflow-hidden font-mono group">
      {/* Leaflet Container */}
      <div ref={mapContainer} className="absolute inset-0 z-0" />
      
      {/* HUD Overlays */}
      <div className="absolute inset-0 pointer-events-none border-[1px] border-accent/10 z-10">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/40" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent/40" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/40" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,rgba(0,255,65,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:40px_40px] z-10" />

      {/* Control Box */}
      <div className="absolute top-6 left-6 flex flex-col gap-1 p-3 bg-black/60 border border-accent/20 backdrop-blur-md rounded z-20">
        <div className="text-[10px] font-black text-accent flex items-center gap-2 uppercase">
          <Navigation className="w-3 h-3 animate-pulse" />
          {missionPlan ? `Mission: ${missionPlan.title}` : 'AI SATELLITE FEED'}
        </div>
        <div className="text-[9px] text-white/40 uppercase tracking-tighter italic">
          {missionPlan ? `Sector: ${missionPlan.riskLevel} Risk Ops` : 'Source: OpenStreetMap // Region: J&K'}
        </div>
      </div>

      {/* Legend / Stats */}
      <div className="absolute bottom-6 left-6 flex gap-4 p-2 bg-black/40 border border-white/10 rounded backdrop-blur-sm z-20">
        <div className="flex flex-col">
          <span className="text-[7px] text-text-dim uppercase">Engine</span>
          <span className="text-[10px] font-bold text-accent">LEAFLET v1.9</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[7px] text-text-dim uppercase">Active Units</span>
          <span className="text-[10px] font-bold text-accent">01 PATROL</span>
        </div>
        {missionPlan && (
          <>
            <div className="w-px h-6 bg-white/10 self-center" />
            <div className="flex flex-col">
              <span className="text-[7px] text-red-500 uppercase font-bold">Threats</span>
              <span className="text-[10px] font-bold text-white">{missionPlan.threats.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[7px] text-green-500 uppercase font-bold">Safe</span>
              <span className="text-[10px] font-bold text-white">{missionPlan.safeZones.length}</span>
            </div>
          </>
        )}
      </div>

      <div className="absolute bottom-6 right-6 p-2 bg-accent/10 border border-accent/30 rounded flex items-center gap-2 text-[8px] font-bold text-accent uppercase z-20">
        <Shield className="w-3 h-3" />
        Encrypted Stream
      </div>

      {/* Radar Sweep Effect */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(0,255,65,0.02)_40%,transparent_100%)] pointer-events-none z-10"
      />
    </div>
  );
}
