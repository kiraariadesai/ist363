import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import PieChart from '../components/PieChart.jsx'

export default function MyCloset() {
  // Load items from localStorage into React state
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem('closet-items') || '[]')
  })

  // Whenever items changes, save the updated list back to localStorage
  useEffect(() => {
    localStorage.setItem('closet-items', JSON.stringify(items))
  }, [items])

  /* ── DERIVED STATS ──────────────────────────────────────────
     These are calculated from the items array on every render.
     No need to store them in state — they're always derived.
  ─────────────────────────────────────────────────────────── */
  const totalCO2  = items.reduce((sum, item) => sum + item.co2, 0)
  const avgCO2    = items.length > 0 ? totalCO2 / items.length : 0
  const usedCount = items.filter(i => i.purchaseType === 'used').length
  const usedPct   = items.length > 0 ? Math.round((usedCount / items.length) * 100) : 0

  /* ── MATERIAL BAR CHART DATA ────────────────────────────────
     Build an object like { Cotton: 12.4, Polyester: 5.2, ... }
     by looping through all items and summing CO2 per material.
  ─────────────────────────────────────────────────────────── */
  const materialTotals = {}
  items.forEach(item => {
    if (!materialTotals[item.material]) materialTotals[item.material] = 0
    materialTotals[item.material] += item.co2
  })

  // Sort by highest CO2 first so the bars go biggest to smallest
  const materialEntries = Object.entries(materialTotals)
    .sort((a, b) => b[1] - a[1])

  const maxMaterialCO2 = materialEntries.length > 0 ? materialEntries[0][1] : 1

  /* ── DELETE ONE ITEM ─────────────────────────────────────── */
  function deleteItem(index) {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  /* ── CLEAR ALL ───────────────────────────────────────────── */
  function clearAll() {
    if (window.confirm('Remove all logged items? This cannot be undone.')) {
      setItems([])
    }
  }

  return (
    <>
      <Header />

      <main id="content">

        <h2>MY CLOSET OVERVIEW</h2>
        <p>Here's a breakdown of the carbon footprint of everything you've logged.</p>

        {/* ── STAT CARDS ── */}
        <div className="stats-strip">
          <div className="stat-card">
            <div className="stat-number">{items.length || '—'}</div>
            <div className="stat-label">Items logged</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{items.length > 0 ? totalCO2.toFixed(1) : '—'}</div>
            <div className="stat-label">kg CO₂e total</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{items.length > 0 ? avgCO2.toFixed(1) : '—'}</div>
            <div className="stat-label">kg CO₂e per item</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{items.length > 0 ? usedPct + '%' : '—'}</div>
            <div className="stat-label">Second-hand items</div>
          </div>
        </div>

        {/* ── CHARTS — only shown when there are items ── */}
        {items.length > 0 && (
          <>

            {/* D3 PIE CHART — new vs. second-hand */}
            <h2>NEW VS. SECOND-HAND</h2>
            <p>How much of your closet was thrifted or bought second-hand?</p>
            <div className="chart-wrap" style={{ maxWidth: '360px' }}>
              {/* PieChart is a React component that uses D3 internally */}
              <PieChart items={items} />
            </div>

            {/* MATERIAL BAR CHART — built with plain CSS bars in React */}
            <h2>CO₂ BY MATERIAL</h2>
            <p>Which fabrics in your closet are contributing most to your total carbon footprint?</p>
            <div className="chart-wrap">
              {materialEntries.map(([material, co2]) => (
                <div key={material} className="bar-row">
                  <div className="bar-row-label">{material}</div>
                  <div className="bar-track">
                    {/* Width is a % of the highest value, so the biggest bar = 100% */}
                    <div
                      className="bar-fill"
                      style={{ width: `${(co2 / maxMaterialCO2) * 100}%` }}
                    />
                  </div>
                  <div className="bar-value">{co2.toFixed(1)} kg</div>
                </div>
              ))}
            </div>

          </>
        )}

        {/* ── LOGGED ITEMS TABLE ── */}
        <h2>LOGGED ITEMS</h2>

        {items.length === 0 ? (
          <p className="loading">
            No items logged yet. <Link to="/log-item">Log your first item!</Link>
          </p>
        ) : (
          <table className="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Type</th>
                <th>Material</th>
                <th>Purchase</th>
                <th>CO₂e</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.material}</td>
                  <td>
                    <span className={item.purchaseType === 'used' ? 'badge badge-used' : 'badge badge-retail'}>
                      {item.purchaseType === 'used' ? 'Second-hand' : 'New'}
                    </span>
                  </td>
                  <td className="co2-value">{item.co2} kg</td>
                  <td style={{ color: '#888', fontSize: '0.8rem' }}>{item.date}</td>
                  <td>
                    <button
                      onClick={() => deleteItem(index)}
                      style={{
                        background: 'none', border: 'none', color: '#721c24',
                        cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem', padding: 0
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <p style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/log-item" className="btn-submit">+ Log Another Item</Link>
          {items.length > 0 && (
            <button className="btn-danger" onClick={clearAll}>Clear All Items</button>
          )}
        </p>

      </main>

      <Footer />
    </>
  )
}
