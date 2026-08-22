import React from 'react';

export default function BackgroundPattern() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      pointerEvents: 'none',
      opacity: 0.3,
      overflow: 'hidden'
    }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Classic Blueprint Graph Paper Grid */}
          <pattern id="blueprint-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="var(--color-text-main)" strokeWidth="1" opacity="0.3" />
            <path d="M 20 0 L 20 100 M 40 0 L 40 100 M 60 0 L 60 100 M 80 0 L 80 100" fill="none" stroke="var(--color-text-main)" strokeWidth="0.5" opacity="0.1" />
            <path d="M 0 20 L 100 20 M 0 40 L 100 40 M 0 60 L 100 60 M 0 80 L 100 80" fill="none" stroke="var(--color-text-main)" strokeWidth="0.5" opacity="0.1" />
          </pattern>
          
          {/* Complex Architectural Elements */}
          <pattern id="blueprint-accents" width="600" height="600" patternUnits="userSpaceOnUse">
             
             {/* Floor Plan: Walls and Stairs (Constant) */}
             <g stroke="var(--color-text-main)" strokeWidth="1.5" fill="none" opacity="0.25">
                <path d="M 100 100 L 300 100 L 300 250 L 100 250 Z" />
                <path d="M 300 100 L 450 100 L 450 350 L 200 350 L 200 250" />
                <path d="M 110 110 L 290 110 L 290 240 L 110 240 Z" strokeWidth="0.5" />
                {/* Stairs */}
                <path d="M 400 100 L 400 200 M 410 100 L 410 200 M 420 100 L 420 200 M 430 100 L 430 200 M 440 100 L 440 200" strokeWidth="0.5"/>
             </g>

             {/* Floor Plan: Doors */}
             <g stroke="var(--color-text-main)" strokeWidth="1" fill="none" opacity="0.3">
                <path d="M 200 250 A 30 30 0 0 1 230 220 L 230 250" strokeDasharray="3 3"/>
                <path d="M 300 150 A 40 40 0 0 0 260 190 L 300 190" strokeDasharray="3 3"/>
             </g>

             {/* Drafting Compass / Protractor Tool */}
             <g stroke="var(--color-accent)" strokeWidth="1" fill="none" opacity="0.3">
                <circle cx="500" cy="450" r="40" strokeDasharray="4 4" />
                <circle cx="500" cy="450" r="30" />
                <path d="M 500 400 L 500 500 M 450 450 L 550 450" />
                <path d="M 465 415 L 535 485 M 465 485 L 535 415" />
                <circle cx="500" cy="450" r="3" fill="var(--color-accent)" />
             </g>

             {/* Dimension Line Horizontal */}
             <g stroke="var(--color-text-main)" strokeWidth="1" opacity="0.2">
                <path d="M 100 80 L 100 60 M 300 80 L 300 60" />
                <path d="M 100 70 L 300 70" />
                <polygon points="100,70 105,67 105,73" fill="var(--color-text-main)" />
                <polygon points="300,70 295,67 295,73" fill="var(--color-text-main)" />
                <text x="200" y="65" fontSize="10" fill="var(--color-text-main)" textAnchor="middle" fontFamily="monospace">24' - 0"</text>
             </g>
             
             {/* Dimension Line Vertical */}
             <g stroke="var(--color-text-main)" strokeWidth="1" opacity="0.2">
                <path d="M 470 100 L 490 100 M 470 350 L 490 350" />
                <path d="M 480 100 L 480 350" />
                <polygon points="480,100 477,105 483,105" fill="var(--color-text-main)" />
                <polygon points="480,350 477,345 483,345" fill="var(--color-text-main)" />
                <text x="485" y="225" fontSize="10" fill="var(--color-text-main)" fontFamily="monospace" transform="rotate(90 485 225)" textAnchor="middle">18' - 6"</text>
             </g>
          </pattern>

          {/* Animated Overlay Elements */}
          <pattern id="blueprint-animated" width="800" height="800" patternUnits="userSpaceOnUse">
            {/* Tracing continuous lines */}
            <g stroke="var(--color-accent)" strokeWidth="1" fill="none" opacity="0.3" className="anim-path delay-1">
               <path d="M 100 700 L 300 500 L 400 600 L 600 400" />
               {/* Architectural spline curve */}
               <path d="M 50 600 Q 150 500 250 650 T 450 550" strokeWidth="1.5" strokeDasharray="3 3" />
            </g>
            <g stroke="var(--color-text-main)" strokeWidth="1.5" fill="none" opacity="0.15" className="anim-path delay-3">
               <path d="M 50 150 L 250 150 L 250 350 L 50 350 Z" />
            </g>
            
            {/* Concentric drafting circles */}
            <g stroke="var(--color-accent)" strokeWidth="1" fill="none" opacity="0.2" className="anim-path delay-5">
               <circle cx="650" cy="200" r="80" />
               <circle cx="650" cy="200" r="60" strokeDasharray="5 5" />
               <circle cx="650" cy="200" r="40" strokeDasharray="2 4" />
               <path d="M 550 200 L 750 200 M 650 100 L 650 300" strokeWidth="0.5" />
            </g>

            {/* Pulsing Registration Nodes */}
            <circle cx="300" cy="500" r="3" fill="var(--color-accent)" className="anim-fade delay-2" />
            <circle cx="400" cy="600" r="3" fill="var(--color-accent)" className="anim-fade delay-4" />
            <circle cx="600" cy="400" r="3" fill="var(--color-accent)" className="anim-fade delay-1" />
            
            {/* Target Crosshairs */}
            <g stroke="var(--color-text-main)" strokeWidth="1" opacity="0.3" className="anim-fade delay-3">
               <path d="M 195 200 L 205 200 M 200 195 L 200 205" />
               <circle cx="200" cy="200" r="10" fill="none" strokeDasharray="2 2" />
            </g>
            <g stroke="var(--color-accent)" strokeWidth="1" opacity="0.3" className="anim-fade delay-5">
               <path d="M 695 600 L 705 600 M 700 595 L 700 605" />
               <circle cx="700" cy="600" r="15" fill="none" />
            </g>

            {/* Fading Technical Measurements */}
            <g stroke="var(--color-text-main)" strokeWidth="1" fill="none" opacity="0.2" className="anim-fade delay-4">
               <path d="M 750 650 L 750 750 L 850 750" />
               <path d="M 750 720 A 30 30 0 0 0 780 750" strokeDasharray="2 2" />
               <text x="770" y="740" fontSize="10" fill="var(--color-text-main)" stroke="none">90°</text>
            </g>
            
            {/* Moving measurement block */}
            <g stroke="var(--color-text-main)" strokeWidth="0.5" fill="none" opacity="0.25" className="anim-fade delay-2">
               <path d="M 100 750 L 250 750" />
               <polygon points="100,750 105,747 105,753" fill="var(--color-text-main)" />
               <polygon points="250,750 245,747 245,753" fill="var(--color-text-main)" />
               <text x="175" y="745" fontSize="10" fill="var(--color-text-main)" stroke="none" textAnchor="middle" fontFamily="monospace">4.5m ELEVATION</text>
            </g>

            {/* Drafting Triangle / Set Square (Tracing) */}
            <g stroke="var(--color-text-main)" strokeWidth="1.5" fill="none" opacity="0.2" className="anim-path delay-2">
               <path d="M 450 150 L 450 300 L 600 300 Z" />
               <path d="M 465 170 L 465 285 L 565 285 Z" strokeWidth="0.5" />
               {/* Tick marks on the vertical ruler edge */}
               <path d="M 450 290 L 455 290 M 450 280 L 455 280 M 450 270 L 455 270 M 450 260 L 460 260 M 450 250 L 455 250 M 450 240 L 455 240 M 450 230 L 455 230 M 450 220 L 460 220 M 450 210 L 455 210 M 450 200 L 455 200 M 450 190 L 455 190 M 450 180 L 460 180 M 450 170 L 455 170" strokeWidth="0.5" />
            </g>

            {/* Half-Circle Protractor (Tracing) */}
            <g stroke="var(--color-accent)" strokeWidth="1" fill="none" opacity="0.25" className="anim-path delay-4">
               <path d="M 150 250 A 60 60 0 0 1 270 250 Z" />
               <path d="M 160 250 A 50 50 0 0 1 260 250" strokeWidth="0.5" strokeDasharray="2 4" />
               <circle cx="210" cy="250" r="3" fill="var(--color-accent)" />
               <path d="M 210 240 L 210 250" strokeWidth="0.5" />
               <path d="M 195 240 L 210 250" strokeWidth="0.5" />
               <path d="M 225 240 L 210 250" strokeWidth="0.5" />
            </g>
          </pattern>
        </defs>

        {/* Fill background with grid and constant accents */}
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        <rect width="100%" height="100%" fill="url(#blueprint-accents)" />
        {/* Layer the animated tracing lines and nodes on top */}
        <rect width="100%" height="100%" fill="url(#blueprint-animated)" />
      </svg>
    </div>
  );
}
