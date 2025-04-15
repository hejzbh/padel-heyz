"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useMapControls } from "./providers/MapControlsProvider";
import { useModal } from "@/hooks/use-modal";

interface Props {
  className?: string;
  centerCoordinates: LatLngExpression;
  onClick?: (e: LeafletMouseEvent) => void;
}

const courtDefaultIcon = L.icon({
  iconUrl: "/images/padel.webp",
  iconSize: [32, 32],
});

const courtFeaturedIcon = L.icon({
  iconUrl: "/images/court-featured.png",
  iconSize: [32, 32],
});

const Map = ({ className = "", centerCoordinates, onClick }: Props) => {
  const { zoomIn, mapRef, fetchPins, pins } = useMapControls();
  const { theme } = useTheme();
  const { openModal } = useModal();

  useEffect(() => {
    if (centerCoordinates) {
      zoomIn(centerCoordinates, 10);
    }
  }, [centerCoordinates]);

  const MapEvents = () => {
    useMapEvents({
      click(event) {
        if (onClick) {
          onClick(event);
        }
      },
      moveend() {
        fetchPins();
      },
    });
    return null;
  };

  return (
    <div className={`${className}`}>
      <MapContainer
        ref={mapRef}
        zoomAnimation
        zoom={13}
        center={centerCoordinates}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url={
            theme === "dark"
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />
        <MapEvents />
        {pins?.map((pin) => (
          <Marker
            key={pin.id}
            icon={pin.featured ? courtFeaturedIcon : courtDefaultIcon}
            eventHandlers={{
              click: () => {
                openModal("courtDetails", pin);
              },
            }}
            position={[pin.lat, pin.lon]}
          >
            {/**<Popup closeOnEscapeKey>
              <div className="p-20 bg-[red] text-white">Cao</div>
            </Popup> */}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
