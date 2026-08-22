import React, { useState, useEffect } from 'react';

const ROOM_NAMES = [
  'LIVING AREA', 'MASTER BEDROOM', 'KITCHEN', 'DINING', 
  'OFFICE', 'LIBRARY', 'GAME ROOM', 'GARAGE', 'GYM', 'STUDIO', 
  'STORE', 'FOYER', 'GUEST ROOM', 'BATHROOM'
];
const STAIR_NAMES = ['STAIRS', 'ELEVATOR', 'FIRE EXIT', 'LIFT LOBBY'];
const BALCONY_NAMES = ['BALCONY', 'TERRACE', 'PATIO', 'DECK'];

const PLANS = [
  {
    paths: [
      "M 100 100 L 300 100 L 300 250 L 100 250 Z",
      "M 300 100 L 450 100 L 450 350 L 200 350 L 200 250",
      "M 100 250 L 200 250 L 200 320 L 100 320 Z" 
    ],
    innerPaths: [
      "M 110 110 L 290 110 L 290 240 L 110 240 Z"
    ],
    stairs: "M 400 100 L 400 200 M 410 100 L 410 200 M 420 100 L 420 200 M 430 100 L 430 200 M 440 100 L 440 200",
    doors: [
      "M 200 250 A 30 30 0 0 1 230 220 L 230 250",
      "M 300 150 A 40 40 0 0 0 260 190 L 300 190"
    ],
    labels: [
      { x: 200, y: 180, type: 'room' },
      { x: 350, y: 270, type: 'room' },
      { x: 150, y: 290, type: 'balcony', fontSize: 10 },
      { x: 420, y: 150, type: 'stairs', rotate: -90, fontSize: 10 }
    ],
    dimsH: { x1: 100, x2: 300, y: 70, text: "24' - 0\"", tx: 200, ty: 65 },
    dimsV: { y1: 100, y2: 350, x: 480, text: "18' - 6\"", tx: 485, ty: 225 }
  },
  {
    paths: [
      "M 50 150 L 250 150 L 250 350 L 50 350 Z",
      "M 250 150 L 500 150 L 500 350 L 250 350 Z",
      "M 50 350 L 200 350 L 200 450 L 50 450 Z"
    ],
    innerPaths: [
      "M 60 160 L 240 160 L 240 340 L 60 340 Z",
      "M 260 160 L 490 160 L 490 340 L 260 340 Z"
    ],
    stairs: "M 380 150 L 380 250 M 390 150 L 390 250 M 400 150 L 400 250 M 410 150 L 410 250",
    doors: [
      "M 250 250 A 40 40 0 0 1 290 290 L 250 290",
      "M 200 350 A 40 40 0 0 1 160 390 L 200 390"
    ],
    labels: [
      { x: 150, y: 250, type: 'room' },
      { x: 375, y: 250, type: 'room' },
      { x: 125, y: 400, type: 'balcony', fontSize: 10 },
      { x: 395, y: 200, type: 'stairs', rotate: -90, fontSize: 10 }
    ],
    dimsH: { x1: 50, x2: 500, y: 120, text: "45' - 0\"", tx: 275, ty: 115 },
    dimsV: { y1: 150, y2: 450, x: 530, text: "30' - 0\"", tx: 535, ty: 300 }
  },
  {
    paths: [
      "M 150 100 L 450 100 L 450 200 L 150 200 Z",
      "M 100 200 L 300 200 L 300 450 L 100 450 Z",
      "M 300 200 L 500 200 L 500 400 L 300 400 Z"
    ],
    innerPaths: [
      "M 110 210 L 290 210 L 290 440 L 110 440 Z"
    ],
    stairs: "M 150 100 L 250 100 M 150 110 L 250 110 M 150 120 L 250 120 M 150 130 L 250 130",
    doors: [
      "M 300 300 A 30 30 0 0 0 270 330 L 300 330"
    ],
    labels: [
      { x: 300, y: 150, type: 'room' },
      { x: 200, y: 325, type: 'room' },
      { x: 400, y: 300, type: 'room' },
      { x: 200, y: 115, type: 'stairs', fontSize: 10 }
    ],
    dimsH: { x1: 100, x2: 500, y: 70, text: "40' - 0\"", tx: 300, ty: 65 },
    dimsV: { y1: 100, y2: 450, x: 530, text: "35' - 0\"", tx: 535, ty: 275 }
  }
];

export default function BackgroundPattern() {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const randomPlan = PLANS[Math.floor(Math.random() * PLANS.length)];
    const shuffledRooms = [...ROOM_NAMES].sort(() => 0.5 - Math.random());
    let roomIndex = 0;
    
    const populatedLabels = randomPlan.labels.map(lbl => {
      let text = '';
      if (lbl.type === 'room') {
        text = shuffledRooms[roomIndex++];
      } else if (lbl.type === 'stairs') {
        text = STAIR_NAMES[Math.floor(Math.random() * STAIR_NAMES.length)];
      } else if (lbl.type === 'balcony') {
        text = BALCONY_NAMES[Math.floor(Math.random() * BALCONY_NAMES.length)];
      }
      return { ...lbl, text };
    });

    setPlan({ ...randomPlan, labels: populatedLabels });
  }, []);

  return (
    <div className="background-pattern" style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      pointerEvents: 'none',
      opacity: 0.7, 
      willChange: 'transform', 
      transform: 'translateZ(0)',
      overflow: 'hidden'
    }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="blueprint-grid" width="100" height="100" patternUnits="userSpaceOnUse">
             <path d="M 100 0 L 100 100 0 100" fill="none" stroke="var(--color-text-main)" strokeWidth="0.5" opacity="0.1" />
             <path d="M 20 0 L 20 100 M 40 0 L 40 100 M 60 0 L 60 100 M 80 0 L 80 100 M 0 20 L 100 20 M 0 40 L 100 40 M 0 60 L 100 60 M 0 80 L 100 80" fill="none" stroke="var(--color-text-main)" strokeWidth="0.25" opacity="0.05" />
          </pattern>
          
          <pattern id="blueprint-accents" width="600" height="600" patternUnits="userSpaceOnUse">
             {plan && (
               <>
                 <g stroke="var(--color-text-main)" strokeWidth="1.5" fill="none" opacity="0.25">
                    {plan.paths.map((p, i) => <path key={`p-${i}`} d={p} />)}
                    {plan.innerPaths.map((p, i) => <path key={`ip-${i}`} d={p} strokeWidth="0.5" />)}
                    <path d={plan.stairs} strokeWidth="0.5"/>
                 </g>

                 <g fill="var(--color-text-main)" opacity="0.4" fontFamily="monospace" fontSize="12" letterSpacing="2">
                    {plan.labels.map((lbl, i) => (
                      <text 
                        key={`lbl-${i}`} 
                        x={lbl.x} 
                        y={lbl.y} 
                        textAnchor="middle" 
                        fontSize={lbl.fontSize || 12}
                        transform={lbl.rotate ? `rotate(${lbl.rotate} ${lbl.x} ${lbl.y})` : undefined}
                      >
                        {lbl.text}
                      </text>
                    ))}
                 </g>

                 <g stroke="var(--color-text-main)" strokeWidth="1" fill="none" opacity="0.3">
                    {plan.doors.map((d, i) => <path key={`d-${i}`} d={d} strokeDasharray="3 3"/>)}
                 </g>

                 <g stroke="var(--color-text-main)" strokeWidth="1" opacity="0.2">
                    <path d={`M ${plan.dimsH.x1} ${plan.dimsH.y + 10} L ${plan.dimsH.x1} ${plan.dimsH.y - 10} M ${plan.dimsH.x2} ${plan.dimsH.y + 10} L ${plan.dimsH.x2} ${plan.dimsH.y - 10}`} />
                    <path d={`M ${plan.dimsH.x1} ${plan.dimsH.y} L ${plan.dimsH.x2} ${plan.dimsH.y}`} />
                    <polygon points={`${plan.dimsH.x1},${plan.dimsH.y} ${plan.dimsH.x1+5},${plan.dimsH.y-3} ${plan.dimsH.x1+5},${plan.dimsH.y+3}`} fill="var(--color-text-main)" />
                    <polygon points={`${plan.dimsH.x2},${plan.dimsH.y} ${plan.dimsH.x2-5},${plan.dimsH.y-3} ${plan.dimsH.x2-5},${plan.dimsH.y+3}`} fill="var(--color-text-main)" />
                    <text x={plan.dimsH.tx} y={plan.dimsH.ty} fontSize="10" fill="var(--color-text-main)" textAnchor="middle" fontFamily="monospace">{plan.dimsH.text}</text>
                 </g>
                 
                 <g stroke="var(--color-text-main)" strokeWidth="1" opacity="0.2">
                    <path d={`M ${plan.dimsV.x - 10} ${plan.dimsV.y1} L ${plan.dimsV.x + 10} ${plan.dimsV.y1} M ${plan.dimsV.x - 10} ${plan.dimsV.y2} L ${plan.dimsV.x + 10} ${plan.dimsV.y2}`} />
                    <path d={`M ${plan.dimsV.x} ${plan.dimsV.y1} L ${plan.dimsV.x} ${plan.dimsV.y2}`} />
                    <polygon points={`${plan.dimsV.x},${plan.dimsV.y1} ${plan.dimsV.x-3},${plan.dimsV.y1+5} ${plan.dimsV.x+3},${plan.dimsV.y1+5}`} fill="var(--color-text-main)" />
                    <polygon points={`${plan.dimsV.x},${plan.dimsV.y2} ${plan.dimsV.x-3},${plan.dimsV.y2-5} ${plan.dimsV.x+3},${plan.dimsV.y2-5}`} fill="var(--color-text-main)" />
                    <text x={plan.dimsV.tx} y={plan.dimsV.ty} fontSize="10" fill="var(--color-text-main)" fontFamily="monospace" transform={`rotate(90 ${plan.dimsV.tx} ${plan.dimsV.ty})`} textAnchor="middle">{plan.dimsV.text}</text>
                 </g>
               </>
             )}

             <g stroke="var(--color-accent)" strokeWidth="1" fill="none" opacity="0.3">
                <circle cx="500" cy="450" r="40" strokeDasharray="4 4" />
                <circle cx="500" cy="450" r="30" />
                <path d="M 500 400 L 500 500 M 450 450 L 550 450" />
                <path d="M 465 415 L 535 485 M 465 485 L 535 415" />
                <circle cx="500" cy="450" r="3" fill="var(--color-accent)" />
             </g>
          </pattern>

          <pattern id="blueprint-animated" width="800" height="800" patternUnits="userSpaceOnUse">
            <g stroke="var(--color-accent)" strokeWidth="1" fill="none" opacity="0.3" className="anim-path delay-1">
               <path d="M 100 700 L 300 500 L 400 600 L 600 400" />
               <path d="M 50 600 Q 150 500 250 650 T 450 550" strokeWidth="1.5" strokeDasharray="3 3" />
            </g>
            <g stroke="var(--color-text-main)" strokeWidth="1.5" fill="none" opacity="0.15" className="anim-path delay-3">
               <path d="M 50 150 L 250 150 L 250 350 L 50 350 Z" />
            </g>
            
            <g stroke="var(--color-accent)" strokeWidth="1" fill="none" opacity="0.2" className="anim-path delay-5">
               <circle cx="650" cy="200" r="80" />
               <circle cx="650" cy="200" r="60" strokeDasharray="5 5" />
               <circle cx="650" cy="200" r="40" strokeDasharray="2 4" />
               <path d="M 550 200 L 750 200 M 650 100 L 650 300" strokeWidth="0.5" />
            </g>

            <circle cx="300" cy="500" r="3" fill="var(--color-accent)" className="anim-fade delay-2" />
            <circle cx="400" cy="600" r="3" fill="var(--color-accent)" className="anim-fade delay-4" />
            <circle cx="600" cy="400" r="3" fill="var(--color-accent)" className="anim-fade delay-1" />
            
            <g stroke="var(--color-text-main)" strokeWidth="1" opacity="0.3" className="anim-fade delay-3">
               <path d="M 195 200 L 205 200 M 200 195 L 200 205" />
               <circle cx="200" cy="200" r="10" fill="none" strokeDasharray="2 2" />
            </g>
            <g stroke="var(--color-accent)" strokeWidth="1" opacity="0.3" className="anim-fade delay-5">
               <path d="M 695 600 L 705 600 M 700 595 L 700 605" />
               <circle cx="700" cy="600" r="15" fill="none" />
            </g>

            <g stroke="var(--color-text-main)" strokeWidth="1" fill="none" opacity="0.2" className="anim-fade delay-4">
               <path d="M 750 650 L 750 750 L 850 750" />
               <path d="M 750 720 A 30 30 0 0 0 780 750" strokeDasharray="2 2" />
               <text x="770" y="740" fontSize="10" fill="var(--color-text-main)" stroke="none">90°</text>
            </g>
            
            <g stroke="var(--color-text-main)" strokeWidth="0.5" fill="none" opacity="0.25" className="anim-fade delay-2">
               <path d="M 100 750 L 250 750" />
               <polygon points="100,750 105,747 105,753" fill="var(--color-text-main)" />
               <polygon points="250,750 245,747 245,753" fill="var(--color-text-main)" />
               <text x="175" y="745" fontSize="10" fill="var(--color-text-main)" stroke="none" textAnchor="middle" fontFamily="monospace">4.5m ELEVATION</text>
            </g>

            <g stroke="var(--color-text-main)" strokeWidth="1.5" fill="none" opacity="0.2" className="anim-path delay-2">
               <path d="M 450 150 L 450 300 L 600 300 Z" />
               <path d="M 465 170 L 465 285 L 565 285 Z" strokeWidth="0.5" />
               <path d="M 450 290 L 455 290 M 450 280 L 455 280 M 450 270 L 455 270 M 450 260 L 460 260 M 450 250 L 455 250 M 450 240 L 455 240 M 450 230 L 455 230 M 450 220 L 460 220 M 450 210 L 455 210 M 450 200 L 455 200 M 450 190 L 455 190 M 450 180 L 460 180 M 450 170 L 455 170" strokeWidth="0.5" />
            </g>

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

        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        <rect width="100%" height="100%" fill="url(#blueprint-accents)" />
        <rect width="100%" height="100%" fill="url(#blueprint-animated)" />
      </svg>
    </div>
  );
}
