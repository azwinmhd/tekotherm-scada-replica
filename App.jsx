import { useEffect, useRef, useState } from 'react';
import "@oicl/openbridge-webcomponents/dist/components/top-bar/top-bar.js";

/* =========================================
   1. ASSETS & SYMBOLS (With High Z-Index)
   ========================================= */

const C = {
  bg: '#f2f2f2',
  card: '#ffffff',
  pipe: '#a0a0a0',
  blue: '#0095d9',
  text: '#333'
};

// 1. Plate Heat Exchanger
const HE = ({ label }) => (
  <div style={{ width: '40px', height: '60px', border: '2px solid #666', borderRadius: '2px', background: '#fff', position: 'relative', zIndex: 20 }}>
    {[10, 20, 30, 40, 50].map(y => (
      <div key={y} style={{ position: 'absolute', top: y, left: 0, width: '100%', height: '1px', background: '#ccc' }} />
    ))}
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', borderLeft: '1px dashed #999' }}></div>
    <div style={{ position: 'absolute', bottom: '-15px', width: '100%', textAlign: 'center', fontSize: '9px', fontWeight: 'bold', color: '#666' }}>{label}</div>
  </div>
);

// 2. Pump
const Pump = ({ label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 20 }}>
    <div style={{ 
      width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #555', background: '#fff', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' 
    }}>
      <div style={{ width: '0', height: '0', borderLeft: '8px solid #333', borderTop: '5px solid transparent', borderBottom: '5px solid transparent' }}></div>
      <div style={{ position: 'absolute', bottom: '-4px', width: '24px', height: '2px', background: '#555' }}></div>
    </div>
    <div style={{ marginTop: '2px', fontSize: '9px', fontWeight: 'bold' }}>{label}</div>
  </div>
);

// 3. 3-Way Valve
const Valve3 = () => (
  <div style={{ width: '24px', height: '24px', position: 'relative', zIndex: 20 }}>
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M2 2 L22 2 L12 12 Z" fill="#fff" stroke="#555" strokeWidth="2"/>
      <path d="M12 12 L2 22 L22 22 Z" fill="#fff" stroke="#555" strokeWidth="2"/>
    </svg>
  </div>
);

// 4. 2-Way Valve
const Valve2 = () => (
  <div style={{ width: '24px', height: '20px', zIndex: 20 }}>
    <svg width="24" height="20" viewBox="0 0 24 20">
      <path d="M0 0 L0 20 L12 10 Z" fill="#fff" stroke="#555" strokeWidth="2" />
      <path d="M24 0 L24 20 L12 10 Z" fill="#fff" stroke="#555" strokeWidth="2" />
    </svg>
  </div>
);

// 5. Sensor Tag (High Z-Index ensures it sits ON TOP of pipes)
const Sensor = ({ val, unit }) => (
  <div style={{ 
    padding: '2px 8px', borderRadius: '12px', border: '1px solid #ccc', background: '#fff',
    fontSize: '10px', fontWeight: 'bold', color: C.blue, minWidth: '45px', textAlign: 'center', 
    zIndex: 30, // Extremely High Z-Index
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)', position: 'relative'
  }}>
    {val} <span style={{ color: '#999', fontSize: '8px' }}>{unit}</span>
  </div>
);

/* =========================================
   2. CARD CONTAINER
   ========================================= */

const Card = ({ title, x, y, w, h, children }) => (
  <div style={{
    position: 'absolute', left: x, top: y, width: w, height: h,
    background: '#fff', border: '1px solid #ddd', borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)', overflow: 'hidden', zIndex: 5
  }}>
    <div style={{ 
      position: 'absolute', top: '8px', left: '12px', right: '12px',
      fontSize: '10px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase',
      display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: '4px',
      zIndex: 40
    }}>
      <span>{title}</span>
      <span>•••</span>
    </div>
    {children}
  </div>
);

/* =========================================
   3. MAIN APP
   ========================================= */

function App() {
  const topBarRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [swTemp, setSwTemp] = useState(13.5);

  useEffect(() => {
    const resize = () => {
      const scaleX = window.innerWidth / 1600;
      const scaleY = window.innerHeight / 900;
      setScale(Math.min(scaleX, scaleY)); 
    };
    window.addEventListener('resize', resize);
    resize();

    document.body.style.backgroundColor = '#e0e0e0';
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';

    if (topBarRef.current) {
      topBarRef.current.appTitle = "TEKNOTHERM SCADA";
      topBarRef.current.pageName = "Water System";
    }

    const interval = setInterval(() => {
      setSwTemp(prev => +(prev + (Math.random() * 0.1 - 0.05)).toFixed(1));
    }, 500);

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#333' }}>
      
      {/* 1600x900 CANVAS */}
      <div style={{ 
        width: '1600px', height: '900px', background: '#f2f2f2', position: 'relative',
        transform: `scale(${scale})`, transformOrigin: 'center center', boxShadow: '0 0 50px rgba(0,0,0,0.5)'
      }}>
        
        {/* Header */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 100 }}>
          <obc-top-bar ref={topBarRef}></obc-top-bar>
        </div>

        {/* --- GLOBAL PIPE LAYER (Z-INDEX 1: Behind Cards) --- */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
           <path d="M560 180 L1460 180" stroke={C.pipe} strokeWidth="3" fill="none" />
           <path d="M560 250 L1460 250" stroke={C.pipe} strokeWidth="3" fill="none" />
           <path d="M500 180 L560 180" stroke={C.pipe} strokeWidth="3" fill="none" />
           <path d="M500 250 L560 250" stroke={C.pipe} strokeWidth="3" fill="none" />
           <path d="M500 400 L560 400 L560 250" stroke={C.pipe} strokeWidth="3" fill="none" />
           <path d="M1000 180 L1000 350" stroke={C.pipe} strokeWidth="3" fill="none" />
        </svg>

        {/* --- COMPONENTS --- */}

        {/* 1. AUX HEAT AFT */}
        <Card title="Aux Heat Recovery AFT" x={40} y={120} w={460} h={180}>
           {/* Internal Pipe Layer (Z-INDEX 0: Strictly Background) */}
           <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
              <path d="M30 85 L460 85" stroke="#ccc" strokeWidth="3" />
           </svg>
           {/* Components (Z-Index 20+) */}
           <div style={{ position: 'absolute', top: '75px', left: '30px' }}><Sensor val="00" unit="°C" /></div>
           <div style={{ position: 'absolute', top: '65px', left: '140px' }}><HE label="HE-01" /></div>
           <div style={{ position: 'absolute', top: '75px', left: '230px' }}><Valve2 /></div>
           <div style={{ position: 'absolute', top: '65px', left: '320px' }}><HE label="HE-02" /></div>
           <div style={{ position: 'absolute', top: '75px', left: '400px' }}><Sensor val="00" unit="°C" /></div>
        </Card>

        {/* 2. AUX HEAT FWD */}
        <Card title="Aux Heat Recovery FWD" x={40} y={320} w={460} h={180}>
           <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
              <path d="M30 85 L460 85" stroke="#ccc" strokeWidth="3" />
           </svg>
           <div style={{ position: 'absolute', top: '75px', left: '30px' }}><Sensor val="45" unit="°C" /></div>
           <div style={{ position: 'absolute', top: '65px', left: '140px' }}><HE label="HE-03" /></div>
           <div style={{ position: 'absolute', top: '75px', left: '230px' }}><Valve3 /></div>
           <div style={{ position: 'absolute', top: '65px', left: '320px' }}><HE label="HE-04" /></div>
           <div style={{ position: 'absolute', top: '75px', left: '400px' }}><Sensor val="38" unit="°C" /></div>
        </Card>

        {/* 3. PUMPS */}
        <Card title="Secondary ... Primary Pump" x={40} y={520} w={460} h={160}>
           <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
              <path d="M40 85 L440 85" stroke="#ccc" strokeWidth="3" />
           </svg>
           <div style={{ position: 'absolute', top: '60px', left: '60px' }}><Pump label="SEC" /></div>
           <div style={{ position: 'absolute', top: '60px', left: '250px' }}><Pump label="PRI A" /></div>
           <div style={{ position: 'absolute', top: '60px', left: '350px' }}><Pump label="PRI B" /></div>
        </Card>

        {/* 4. CONTROLS */}
        <Card title="Controls" x={540} y={120} w={260} h={560}>
            <div style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', gap: '30px', zIndex: 20, position: 'relative' }}>
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '4px', border: '1px solid #eee' }}>
                    <div style={{ fontSize: '10px', color: '#999', fontWeight: 'bold', marginBottom: '10px' }}>TEMP READOUTS</div>
                    <div style={{ color: C.blue, fontWeight: 'bold', marginBottom: '5px' }}>{swTemp}° Seawater</div>
                    <div style={{ color: C.blue, fontWeight: 'bold', marginBottom: '5px' }}>08.2° Outdoor</div>
                    <div style={{ color: C.blue, fontWeight: 'bold' }}>45.0° Warm Water</div>
                </div>
                <div>
                    <div style={{ fontSize: '10px', color: '#999', fontWeight: 'bold', marginBottom: '10px' }}>OPERATIONS</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Enable System</span>
                        <div style={{ width: '36px', height: '20px', background: C.blue, borderRadius: '12px', position: 'relative' }}>
                            <div style={{ width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        {/* 5. MIXING */}
        <Card title="Mixing" x={840} y={120} w={280} h={160}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
               <path d="M20 72 L260 72" stroke="#ccc" strokeWidth="3" />
               <path d="M132 72 L132 140" stroke="#ccc" strokeWidth="3" />
            </svg>
            <div style={{ position: 'absolute', top: '60px', left: '120px' }}><Valve3 /></div>
        </Card>

        {/* 6. SECONDARY */}
        <Card title="Secondary" x={1140} y={120} w={280} h={160}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
               <path d="M20 80 L260 80" stroke="#ccc" strokeWidth="3" />
            </svg>
            <div style={{ position: 'absolute', top: '60px', left: '120px' }}><Pump label="SEC" /></div>
        </Card>

        {/* 7. PRIMARY PUMP & HE */}
        <Card title="Selection ... Primary Pump" x={840} y={300} w={580} h={200}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
               <path d="M40 90 L540 90" stroke="#ccc" strokeWidth="3" />
               <path d="M220 90 L220 50 L320 50 L320 90" stroke="#ccc" strokeWidth="3" fill="none" />
            </svg>
            <div style={{ position: 'absolute', top: '80px', left: '60px' }}><Valve2 /></div>
            <div style={{ position: 'absolute', top: '80px', left: '200px' }}><Pump label="PUMP A" /></div>
            <div style={{ position: 'absolute', top: '80px', left: '300px' }}><Pump label="PUMP B" /></div>
            <div style={{ position: 'absolute', top: '65px', left: '460px' }}><HE label="MAIN" /></div>
        </Card>

        {/* 8. FREE COOLING */}
        <Card title="Free Cooling and Heat Collection" x={840} y={520} w={580} h={160}>
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
               <path d="M40 80 L540 80" stroke="#ccc" strokeWidth="3" />
            </svg>
            <div style={{ position: 'absolute', top: '70px', left: '50px' }}><Sensor val="13" unit="°C" /></div>
            <div style={{ position: 'absolute', top: '70px', left: '200px' }}><Valve3 /></div>
            <div style={{ position: 'absolute', top: '70px', left: '350px' }}><Pump label="SW" /></div>
            <div style={{ position: 'absolute', top: '70px', left: '500px' }}><Sensor val="12" unit="°C" /></div>
        </Card>

      </div>
    </div>
  );
}

export default App;
