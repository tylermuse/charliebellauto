import React, { useState } from "react";

// Maps exterior colors to gradient pairs for a clean look
const COLOR_GRADIENTS = {
  // Silvers / Grays
  "Celestial Silver Metallic": ["#8E9AAF", "#5C6B7A"],
  "Ice Cap": ["#C8D0D8", "#8E9AAF"],
  "Lunar Rock": ["#8A9A8E", "#5C6B5A"],
  "Cement": ["#9A9890", "#6B6960"],
  "Sonic Silver": ["#9EA2A8", "#6A6E74"],
  "Ingot Silver Metallic": ["#A8AEB4", "#6E7478"],
  "Iconic Silver Metallic": ["#B0B6BC", "#787E84"],
  "Silver Metallic": ["#A0A6AC", "#686E74"],
  "Glacier White": ["#D0D4D8", "#A0A4A8"],
  "Platinum White Pearl": ["#E0E2E4", "#B0B2B4"],
  // Blues
  "Blueprint": ["#2A4B7C", "#152A4A"],
  "Cavalry Blue": ["#3A5A7C", "#1A3A5C"],
  "Atlas Blue Metallic": ["#2E5090", "#1A3060"],
  "Velocity Blue Metallic": ["#2060A0", "#103060"],
  "Aegean Blue Metallic": ["#1E4D8C", "#0E2D5C"],
  "Intense Blue": ["#1A3F7A", "#0A1F4A"],
  "Phytonic Blue Metallic": ["#1E3A6E", "#0E1A3E"],
  "Nautical Blue Metallic": ["#1A4070", "#0A2040"],
  "Stormy Sea Metallic": ["#2A4A6A", "#1A2A4A"],
  // Reds
  "Supersonic Red": ["#C22032", "#8A1020"],
  "Radiant Red Metallic II": ["#B81E2A", "#801018"],
  "Rapid Red Metallic": ["#A51C30", "#6A1020"],
  "Blazing Blue Pearl": ["#2040A0", "#102060"],
  "Rallye Red": ["#CC2030", "#901018"],
  "Barcelona Red Metallic": ["#9A1A28", "#601018"],
  // Blacks
  "Midnight Black Metallic": ["#2A2A30", "#101018"],
  "Crystal Black Pearl": ["#1E1E24", "#0A0A10"],
  "Shadow Black": ["#222228", "#0E0E14"],
  "Black": ["#1A1A20", "#080810"],
  "Agate Black Metallic": ["#202028", "#0C0C14"],
  "Black Sapphire Metallic": ["#1A1A28", "#08081C"],
  "Obsidian Black Metallic": ["#18181E", "#0A0A10"],
  // Whites
  "Wind Chill Pearl": ["#E8E8EC", "#C0C0C8"],
  "Super White": ["#EAEAEE", "#C4C4CC"],
  "Oxford White": ["#E6E6EA", "#BEBEC6"],
  "Summit White": ["#E8E8EC", "#C2C2CA"],
  "Iridescent Pearl Tricoat": ["#E0E0E8", "#B8B8C4"],
  "Quartz White Pearl": ["#E4E4EC", "#BCBCC8"],
  "Ceramic White": ["#E8E6E4", "#C0BEBC"],
  // Greens
  "Army Green": ["#4A5A3A", "#2A3A1A"],
  "Woodland Green": ["#3A5A3A", "#1A3A1A"],
  // Browns / Golds
  "Magnetic Gray Metallic": ["#5A5E64", "#3A3E44"],
  "Carbonized Gray Metallic": ["#4A4E54", "#2A2E34"],
  "Sterling Gray Metallic": ["#6A6E74", "#4A4E54"],
};

// Fallback gradient based on make
const MAKE_GRADIENTS = {
  Toyota: ["#CC0000", "#8A0000"],
  Honda: ["#1A3A7A", "#0A1A4A"],
  Ford: ["#003478", "#001A4A"],
  Chevrolet: ["#D4A843", "#9A7830"],
  Hyundai: ["#002C5F", "#001A3A"],
  BMW: ["#1C69D4", "#0A3A7A"],
  "Mercedes-Benz": ["#333333", "#1A1A1A"],
  Lexus: ["#1A1A2E", "#0A0A1A"],
  Jeep: ["#3A5A3A", "#1A3A1A"],
  Subaru: ["#005BAC", "#003060"],
  Mazda: ["#910000", "#5A0000"],
  Kia: ["#BB162B", "#7A0A1A"],
  Nissan: ["#C3002F", "#7A001A"],
  Volkswagen: ["#001E50", "#000E30"],
  Tesla: ["#CC0000", "#7A0000"],
  Audi: ["#333333", "#1A1A1A"],
  RAM: ["#1A1A1A", "#0A0A0A"],
  GMC: ["#CC0000", "#7A0000"],
};

function getGradient(vehicle) {
  const colorGrad = COLOR_GRADIENTS[vehicle.exteriorColor];
  if (colorGrad) return colorGrad;
  const makeGrad = MAKE_GRADIENTS[vehicle.make];
  if (makeGrad) return makeGrad;
  return ["#1B2A4A", "#0f1926"];
}

/**
 * Renders a vehicle image or a styled gradient placeholder.
 * Shows the real image if vehicle.imageUrl is set, otherwise a gradient card.
 */
export default function VehicleImage({ vehicle, className = "", aspect = "aspect-[16/10]" }) {
  const [imgError, setImgError] = useState(false);
  const [from, to] = getGradient(vehicle);
  const hasImage = vehicle.imageUrl && !imgError;

  if (hasImage) {
    return (
      <div className={`${aspect} bg-gray-100 overflow-hidden ${className}`}>
        <img
          src={vehicle.imageUrl}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`${aspect} flex items-center justify-center ${className}`}
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
    >
      <div className="text-center px-4">
        <p className="text-white/90 font-semibold text-sm sm:text-base drop-shadow-md">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </p>
        <p className="text-white/60 text-xs mt-1">
          {vehicle.trim} &middot; {vehicle.exteriorColor}
        </p>
      </div>
    </div>
  );
}
