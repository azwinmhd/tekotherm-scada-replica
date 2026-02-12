import React, { useEffect, useRef, useState } from 'react';
import './TeknothermWaterSystem.css';

const TeknothermWaterSystem = () => {
  const gridRef = useRef(null);
  const [cp, setCp] = useState(null);

  // ---------- DYNAMIC PIPE COORDINATES ----------
  useEffect(() => {
    if (!gridRef.current) return;

    const updateCoords = () => {
      const grid = gridRef.current;
      const cards = grid.querySelectorAll('.grid-item');
      if (cards.length < 10) return;

      const gridRect = grid.getBoundingClientRect();
      const relX = (el) => el.getBoundingClientRect().left - gridRect.left;
      const relY = (el) => el.getBoundingClientRect().top - gridRect.top;
      const w = (el) => el.getBoundingClientRect().width;
      const h = (el) => el.getBoundingClientRect().height;

      setCp({
        aquilairOut: [relX(cards[0]) + w(cards[0]) / 2, relY(cards[0]) + h(cards[0]) - 6],
        avislairOut: [relX(cards[1]) + w(cards[1]) / 2, relY(cards[1]) + h(cards[1]) - 6],
        pumpIn:      [relX(cards[2]) + w(cards[2]) / 2, relY(cards[2]) + 12],
        pumpOut:     [relX(cards[2]) + w(cards[2]) - 12, relY(cards[2]) + h(cards[2]) / 2],
        heatIn:      [relX(cards[3]) + 12, relY(cards[3]) + h(cards[3]) / 2],
        heatOut:     [relX(cards[3]) + w(cards[3]) - 12, relY(cards[3]) + h(cards[3]) / 2],
        tempIn:      [relX(cards[4]) + 12, relY(cards[4]) + h(cards[4]) / 2],
        tempOut:     [relX(cards[4]) + w(cards[4]) / 2, relY(cards[4]) + h(cards[4]) - 6],
        warmIn:      [relX(cards[5]) + w(cards[5]) / 2, relY(cards[5]) + 12],
        coldIn:      [relX(cards[6]) + w(cards[6]) / 2, relY(cards[6]) + 12],
        setPointIn:  [relX(cards[7]) + w(cards[7]) / 2, relY(cards[7]) + 12],
        opsIn:       [relX(cards[8]) + w(cards[8]) / 2, relY(cards[8]) + 12],
      });
    };

    updateCoords();
    window.addEventListener('resize', updateCoords);
    return () => window.removeEventListener('resize', updateCoords);
  }, []);

  return (
    <div className="openbridge-panel">
      {/* ---------- HEADER – exactly as Figma ---------- */}
      <div className="challenge-header">
        <h1>
          <i className="fas fa-display"></i> AUTOMATION CASES
        </h1>
        <div className="challenge-badge">
          <i className="fas fa-water"></i> Teknotherm · Water system
        </div>
      </div>

      {/* ---------- DIAGRAM LAYER ---------- */}
      <div className="diagram-layer">
        <div className="scada-grid" ref={gridRef}>
          {/* ----- ROW 1 – HEAT RECOVERY (RECOVERY footer) ----- */}
          <div className="grid-item" style={{ gridColumn: '1', gridRow: '1' }}>
            <div className="ob-card">
              <div className="ob-card-header">
                <span className="ob-title">AUXILIARY HEAT RECOVER AFT</span>
                <div className="ob-icon"><i className="fas fa-heat-exchanger"></i></div>
              </div>
              <div className="main-digital">+100<span>%</span></div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-temperature-low"></i> 60°C</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">0%</span>
              </div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-valve"></i> Open</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">100%</span>
              </div>
              <div className="card-footer">RECOVERY</div>
            </div>
          </div>
          <div className="grid-item" style={{ gridColumn: '2', gridRow: '1' }}>
            <div className="ob-card">
              <div className="ob-card-header">
                <span className="ob-title">AUXILIARY HEAT RECOVER AFT</span>
                <div className="ob-icon"><i className="fas fa-heat-exchanger"></i></div>
              </div>
              <div className="main-digital">+100<span>%</span></div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-temperature-low"></i> 60°C</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">0%</span>
              </div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-valve"></i> Open</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">100%</span>
              </div>
              <div className="card-footer">RECOVERY</div>
            </div>
          </div>

          {/* ----- ROW 2 – PUMP / HEAT DUMPING / TEMPERATURE RECOVERY (SELECTION footer) ----- */}
          <div className="grid-item" style={{ gridColumn: '1', gridRow: '2' }}>
            <div className="ob-card">
              <div className="ob-card-header">
                <span className="ob-title">SECONDARY / PRIMARY PUMP</span>
                <div className="ob-icon"><i className="fas fa-water-pump"></i></div>
              </div>
              <div className="main-digital">+10<span>%</span></div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-temperature-low"></i> 60°C</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">0%</span>
              </div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-valve"></i> Open</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">100%</span>
              </div>
              <div className="card-footer">SELECTION</div>
            </div>
          </div>
          <div className="grid-item" style={{ gridColumn: '2', gridRow: '2' }}>
            <div className="ob-card">
              <div className="ob-card-header">
                <span className="ob-title">HEAT DUMPING</span>
                <div className="ob-icon"><i className="fas fa-temperature-arrow-up"></i></div>
              </div>
              <div className="main-digital">+30<span>°C</span></div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-temperature-low"></i> 60°C</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">0%</span>
              </div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-valve"></i> Open</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">100%</span>
              </div>
              <div className="card-footer">SELECTION</div>
            </div>
          </div>
          <div className="grid-item" style={{ gridColumn: '3', gridRow: '2' }}>
            <div className="ob-card">
              <div className="ob-card-header">
                <span className="ob-title">TEMPERATURE RECOVERY</span>
                <div className="ob-icon"><i className="fas fa-arrow-up-wide-short"></i></div>
              </div>
              <div className="main-digital">+20<span>°C</span></div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-temperature-low"></i> 60°C</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">0%</span>
              </div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-valve"></i> Open</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">100%</span>
              </div>
              <div className="card-footer">SELECTION</div>
            </div>
          </div>

          {/* ----- ROW 3 – WARM WATER / COLD WATER (SELECTION footer) ----- */}
          <div className="grid-item" style={{ gridColumn: '2', gridRow: '3' }}>
            <div className="ob-card">
              <div className="ob-card-header">
                <span className="ob-title">WARM WATER S.C.</span>
                <div className="ob-icon"><i className="fas fa-droplet" style={{ color: '#ffb86b' }}></i></div>
              </div>
              <div className="main-digital">+100<span>%</span></div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-temperature-low"></i> 60°C</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">0%</span>
              </div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-valve"></i> Open</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">100%</span>
              </div>
              <div className="card-footer">SELECTION</div>
            </div>
          </div>
          <div className="grid-item" style={{ gridColumn: '3', gridRow: '3' }}>
            <div className="ob-card">
              <div className="ob-card-header">
                <span className="ob-title">COLD WATER S.C.</span>
                <div className="ob-icon"><i className="fas fa-snowflake"></i></div>
              </div>
              <div className="main-digital">+100<span>%</span></div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-temperature-low"></i> 60°C</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">0%</span>
              </div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-valve"></i> Open</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">100%</span>
              </div>
              <div className="card-footer">SELECTION</div>
            </div>
          </div>

          {/* ----- ROW 4 – SET POINTS / OPERATIONS (SELECTION footer) ----- */}
          <div className="grid-item" style={{ gridColumn: '1', gridRow: '4' }}>
            <div className="ob-card setpoints-card">
              <div className="ob-card-header">
                <span className="ob-title">SET POINTS</span>
                <div className="ob-icon"><i className="fas fa-sliders-h"></i></div>
              </div>
              <div className="main-digital">+100<span>%</span></div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-temperature-low"></i> 60°C</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">0%</span>
              </div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-valve"></i> Open</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">100%</span>
              </div>
              <div className="card-footer">SELECTION</div>
            </div>
          </div>
          <div className="grid-item" style={{ gridColumn: '2', gridRow: '4' }}>
            <div className="ob-card operations-card">
              <div className="ob-card-header">
                <span className="ob-title">OPERATIONS</span>
                <div className="ob-icon"><i className="fas fa-gears"></i></div>
              </div>
              <div className="main-digital">+100<span>%</span></div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-temperature-low"></i> 60°C</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">0%</span>
              </div>
              <div className="param-row">
                <span className="param-label"><i className="fas fa-valve"></i> Open</span>
                <i className="fas fa-arrow-right" style={{ color: '#67e6e6' }}></i>
                <span className="param-value">100%</span>
              </div>
              <div className="card-footer">SELECTION</div>
            </div>
          </div>
        </div>

        {/* ---------- SVG PIPES – dynamic, only when coords ready ---------- */}
        {cp && (
          <svg className="svg-pipes">
            <defs>
              <marker id="flowArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <polygon points="0 0, 8 4, 0 8" fill="#32e6e6" stroke="#0f9ca3" strokeWidth="0.5" />
              </marker>
              <marker id="dashControl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#a3e0e6" stroke="#2c7a7b" strokeWidth="0.5" />
              </marker>
            </defs>

            <path d={`M ${cp.aquilairOut[0]} ${cp.aquilairOut[1]} V ${cp.aquilairOut[1] + 28} H ${cp.pumpIn[0]} V ${cp.pumpIn[1]}`} stroke="#3ad4d4" strokeWidth="2.2" fill="none" markerEnd="url(#flowArrow)" />
            <path d={`M ${cp.avislairOut[0]} ${cp.avislairOut[1]} V ${cp.avislairOut[1] + 28} H ${cp.pumpIn[0]} V ${cp.pumpIn[1]}`} stroke="#3ad4d4" strokeWidth="2.2" fill="none" markerEnd="url(#flowArrow)" />
            <path d={`M ${cp.pumpOut[0]} ${cp.pumpOut[1]} H ${cp.heatIn[0] - 8} V ${cp.heatIn[1]} H ${cp.heatIn[0]}`} stroke="#3ad4d4" strokeWidth="2.2" fill="none" markerEnd="url(#flowArrow)" />
            <path d={`M ${cp.heatOut[0]} ${cp.heatOut[1]} H ${cp.tempIn[0] - 8} V ${cp.tempIn[1]} H ${cp.tempIn[0]}`} stroke="#3ad4d4" strokeWidth="2.2" fill="none" markerEnd="url(#flowArrow)" />
            <path d={`M ${cp.tempOut[0]} ${cp.tempOut[1]} V ${cp.tempOut[1] + 36} H ${cp.warmIn[0]}`} stroke="#3ad4d4" strokeWidth="2.2" fill="none" markerEnd="url(#flowArrow)" />
            <path d={`M ${cp.warmIn[0]} ${cp.tempOut[1] + 36} V ${cp.warmIn[1]}`} stroke="#3ad4d4" strokeWidth="2.2" fill="none" markerEnd="url(#flowArrow)" />
            <path d={`M ${cp.tempOut[0]} ${cp.tempOut[1]} V ${cp.tempOut[1] + 36} H ${cp.coldIn[0]}`} stroke="#3ad4d4" strokeWidth="2.2" fill="none" markerEnd="url(#flowArrow)" />
            <path d={`M ${cp.coldIn[0]} ${cp.tempOut[1] + 36} V ${cp.coldIn[1]}`} stroke="#3ad4d4" strokeWidth="2.2" fill="none" markerEnd="url(#flowArrow)" />
            <path d={`M ${cp.setPointIn[0] - 50} ${cp.setPointIn[1] - 30} H ${cp.setPointIn[0]} V ${cp.setPointIn[1]}`} stroke="#60bbc4" strokeWidth="1.6" fill="none" strokeDasharray="6 6" markerEnd="url(#dashControl)" />
            <path d={`M ${cp.opsIn[0] - 50} ${cp.opsIn[1] - 40} H ${cp.opsIn[0]} V ${cp.opsIn[1]}`} stroke="#60bbc4" strokeWidth="1.6" fill="none" strokeDasharray="6 6" markerEnd="url(#dashControl)" />

            <circle cx={cp.aquilairOut[0]} cy={cp.aquilairOut[1]} r="4.5" fill="#28e6e6" stroke="#fff" strokeWidth="1" />
            <circle cx={cp.avislairOut[0]} cy={cp.avislairOut[1]} r="4.5" fill="#28e6e6" stroke="#fff" strokeWidth="1" />
            <circle cx={cp.pumpIn[0]} cy={cp.pumpIn[1]} r="4.5" fill="#28e6e6" stroke="#fff" strokeWidth="1" />
            <circle cx={cp.pumpOut[0]} cy={cp.pumpOut[1]} r="4.5" fill="#28e6e6" stroke="#fff" strokeWidth="1" />
            <circle cx={cp.heatIn[0]} cy={cp.heatIn[1]} r="4.5" fill="#28e6e6" stroke="#fff" strokeWidth="1" />
            <circle cx={cp.heatOut[0]} cy={cp.heatOut[1]} r="4.5" fill="#28e6e6" stroke="#fff" strokeWidth="1" />
            <circle cx={cp.tempIn[0]} cy={cp.tempIn[1]} r="4.5" fill="#28e6e6" stroke="#fff" strokeWidth="1" />
            <circle cx={cp.tempOut[0]} cy={cp.tempOut[1]} r="4.5" fill="#28e6e6" stroke="#fff" strokeWidth="1" />
            <circle cx={cp.warmIn[0]} cy={cp.warmIn[1]} r="4.5" fill="#28e6e6" stroke="#fff" strokeWidth="1" />
            <circle cx={cp.coldIn[0]} cy={cp.coldIn[1]} r="4.5" fill="#28e6e6" stroke="#fff" strokeWidth="1" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default TeknothermWaterSystem;