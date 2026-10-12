import React from 'react';

/**
 * Minimalist White and Black Line Art Train Engine (Locomotive) Logo
 * Authentic Indian Railways Electric / WAP Locomotive Silhouette
 */
export default function EngineLineLogo({ className = "w-7 h-7", goldAccent = false }) {
  const strokeColor = goldAccent ? "#D4AF37" : "#FFFFFF";

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Pantograph High-Voltage Line at Top */}
        <path
          d="M 18 6 L 24 11 L 30 6"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="24" y1="11" x2="24" y2="15" stroke={strokeColor} strokeWidth="1.5" />
        <line x1="16" y1="6" x2="32" y2="6" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />

        {/* Aerodynamic Locomotive Roof & Body Contour */}
        <path
          d="M 14 15 Q 24 13 34 15 L 36 24 L 38 34 L 10 34 L 12 24 Z"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill="#000000"
        />

        {/* Front Dual Windshield Glass */}
        <polygon
          points="15,18 22,17 22,23 15,24"
          stroke={strokeColor}
          strokeWidth="1.2"
          fill="#0a0a0a"
        />
        <polygon
          points="26,17 33,18 33,24 26,23"
          stroke={strokeColor}
          strokeWidth="1.2"
          fill="#0a0a0a"
        />

        {/* Central Marker Light & High-Beam Headlights */}
        <circle cx="24" cy="27" r="1.8" stroke={strokeColor} strokeWidth="1.2" fill={strokeColor} />
        <circle cx="15" cy="30" r="1.5" stroke={strokeColor} strokeWidth="1.2" />
        <circle cx="33" cy="30" r="1.5" stroke={strokeColor} strokeWidth="1.2" />

        {/* Buffer Beam & Center Coupler */}
        <line x1="8" y1="34" x2="40" y2="34" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
        <rect x="22" y="34" width="4" height="3" stroke={strokeColor} strokeWidth="1" fill="#000000" />

        {/* Cowcatcher / Cattle Guard Grille (V-Shape Pilot) */}
        <path
          d="M 12 37 L 24 43 L 36 37"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="16" y1="37" x2="21" y2="41" stroke={strokeColor} strokeWidth="1" />
        <line x1="32" y1="37" x2="27" y2="41" stroke={strokeColor} strokeWidth="1" />

        {/* Rail Tracks Line */}
        <line x1="6" y1="44" x2="42" y2="44" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
