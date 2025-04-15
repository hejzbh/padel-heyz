"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { LatLngExpression, Map as LeafletMap } from "leaflet";
import { CourtType } from "@/types/courts";
import getCourts from "@/actions/getCourts";
import areBoundingBoxesSimilar from "../../utils/areBoundingBoxesSimilar";

interface MapControlsContextProps {
  mapRef: React.MutableRefObject<LeafletMap | any>;
  zoomIn: (coordinates: LatLngExpression, zoomLevel: number) => void;
  fetchPins: () => {};
  pins: CourtType[];
}

const MapControlsContext = createContext<MapControlsContextProps | undefined>(
  undefined
);

export const MapControlsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const mapRef = useRef<LeafletMap | any>(undefined);
  const zoomCache = useMemo(
    () => new Map<number, { boundingbox: number[]; pins: CourtType[] }[]>(),
    []
  );
  const [pins, setPins] = useState<CourtType[]>([]);

  const zoomIn = useCallback(
    (coordinates: LatLngExpression, zoomLevel: number) => {
      if (mapRef.current) {
        mapRef.current.flyTo(coordinates, zoomLevel);
      }
    },
    [mapRef]
  );

  const fetchPins = useCallback(async () => {
    const zoomLevel = mapRef.current._zoom;

    if (zoomLevel < 7) {
      setPins([]);
      return;
    } // Avoid fetching pins for zoom levels smaller than 7

    const bounds = mapRef.current?.getBounds();
    if (!bounds) return; // Ensure bounds exist before proceeding

    const boundingbox = [
      +bounds._southWest.lat,
      +bounds._northEast.lat,
      +bounds._southWest.lng,
      +bounds._northEast.lng,
    ];

    // Check if cached data exists for the current zoom level
    if (zoomCache.has(zoomLevel)) {
      const cachedData = zoomCache.get(zoomLevel);
      const similarBounds = cachedData?.find((cached) =>
        areBoundingBoxesSimilar(cached.boundingbox, boundingbox)
      );

      if (similarBounds) {
        setPins(similarBounds.pins);
        return;
      }
    }

    // Fetch data based on zoom level granularity
    const { courts: pins } = await getCourts({
      perPage: zoomLevel < 8 ? 20 : zoomLevel < 10 ? 50 : 100,
      boundingbox: boundingbox.join(","), // Convert to string format for API compatibility
    });

    // Cache fetched results to optimize future requests
    zoomCache.set(zoomLevel, [
      ...(zoomCache.get(zoomLevel) || []),
      { boundingbox, pins },
    ]);

    setPins(pins);
  }, []);

  return (
    <MapControlsContext.Provider value={{ mapRef, zoomIn, fetchPins, pins }}>
      {children}
    </MapControlsContext.Provider>
  );
};

export const useMapControls = () => {
  const context = useContext(MapControlsContext);
  if (!context) {
    throw new Error("useMapControls must be used within a MapControlsProvider");
  }
  return context;
};
