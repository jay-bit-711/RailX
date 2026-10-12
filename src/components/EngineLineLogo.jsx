import React from 'react';

/**
 * Electric loco mark — horizontal rail rush (not maglev bounce).
 * Black / white / gold only.
 */
export default function EngineLineLogo({
  className = 'w-7 h-7',
  goldAccent = true,
  animated = true,
  speedLines = true
}) {
  const strokeColor = goldAccent ? '#D4AF37' : '#FFFFFF';

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      aria-hidden
    >
      {/* Moving sleepers / track bed */}
      {animated && (
        <div className="logo-track-bed absolute bottom-[2px] left-0 right-0 h-[3px] opacity-90" />
      )}
      <div className={`relative z-[1] ${animated ? 'logo-train-rush' : ''}`}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {speedLines && (
            <g className="logo-speed-lines" stroke={strokeColor} strokeWidth="1.4" strokeLinecap="round">
              <path d="M 1 20 H 11" />
              <path d="M 0 25 H 9" />
              <path d="M 2 30 H 11" />
            </g>
          )}
          <path d="M 18 6 L 24 11 L 30 6" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="24" y1="11" x2="24" y2="15" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="16" y1="6" x2="32" y2="6" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M 14 15 Q 24 13 34 15 L 36 24 L 38 34 L 10 34 L 12 24 Z"
            stroke={strokeColor}
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill="#000000"
          />
          <polygon points="15,18 22,17 22,23 15,24" stroke={strokeColor} strokeWidth="1.2" fill="#0a0a0a" />
          <polygon points="26,17 33,18 33,24 26,23" stroke={strokeColor} strokeWidth="1.2" fill="#0a0a0a" />
          <circle cx="24" cy="27" r="1.8" stroke={strokeColor} strokeWidth="1.2" fill={strokeColor} />
          <circle cx="15" cy="30" r="1.5" stroke={strokeColor} strokeWidth="1.2" />
          <circle cx="33" cy="30" r="1.5" stroke={strokeColor} strokeWidth="1.2" />
          <line x1="8" y1="34" x2="40" y2="34" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          <rect x="22" y="34" width="4" height="3" stroke={strokeColor} strokeWidth="1" fill="#000000" />
          <path d="M 12 37 L 24 43 L 36 37" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="6" y1="44" x2="42" y2="44" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
