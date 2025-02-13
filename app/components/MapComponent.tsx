"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Define category icons
const emojiIcons: Record<string, string> = {
  restaurants: "🍽️",
  coffee_shops: "☕",
  landmarks: "📍",
  "comedy shows": "🎭",
  "music events": "🎵",
  hotels: "🏩",
  home: "🏠",
};

// ✅ Custom Icon Generator
const createIcon = (emoji: string) =>
  L.divIcon({
    html: `<div style="font-size: 24px;">${emoji}</div>`,
    className: "",
  });

// ✅ Auto-Zoom Component
const MapBounds = ({ locations }: { locations: any[] }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(
        locations.map((loc) => [loc.geometry.coordinates[1], loc.geometry.coordinates[0]])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);

  return null;
};

const MapComponent = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [metrics, setMetrics] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/saved_places.json");
        const data = await response.json();
        setLocations(data.locations || []);

        // ✅ Extract unique categories
        const categoryList = Array.from(new Set(data.locations.map((loc: any) => String(loc.category)))) as string[];
        setCategories(categoryList);

        // ✅ Generate category metrics
        const categoryCounts = data.locations.reduce((acc: Record<string, number>, loc: any) => {
          acc[loc.category] = (acc[loc.category] || 0) + 1;
          return acc;
        }, {});

        setMetrics(categoryCounts);
      } catch (error) {
        console.error("Error loading JSON:", error);
      }
    };

    fetchLocations();
  }, []);

  // ✅ Filter locations based on dropdown
  const filteredLocations =
    selectedCategory === "all"
      ? locations
      : locations.filter((loc) => loc.category === selectedCategory);

  return (
    <div className="mt-8">
      {/* ✅ Metrics Display */}
      <div className="bg-gray-900 p-4 rounded-lg text-white text-center mb-4">
        <h3 className="text-xl font-bold mb-2">Our Journey On The Map 🏆</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(metrics).map(([category, count]) => (
            <p key={category} className="text-lg">
              {emojiIcons[category] || "📍"} {count} {category.replace("_", " ")}
            </p>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-4 text-center">
        <label className="text-white mr-2">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1).replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      {/* Map */}
      <MapContainer center={[0, 0]} zoom={2} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap contributors'
        />
        <MapBounds locations={filteredLocations} />
        {filteredLocations.map((place, index) => {
          const coords = place.geometry.coordinates;
          const name = place.properties.Title;
          const icon = createIcon(emojiIcons[place.category] || "📍");

          return (
            <Marker key={index} position={[coords[1], coords[0]]} icon={icon}>
              <Popup>{name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
