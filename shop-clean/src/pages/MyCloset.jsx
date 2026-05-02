import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import PieChart from '../components/PieChart.jsx'
import {
  IllustrationClosetHero,
  IconCloset,
  IconShirt,
  IconLeaf,
  IconBars,
  IconRecycle,
  IconPie,
  IconFabric,
  IconHanger,
  IconPlus,
} from '../components/PageMedia.jsx'

export default function MyCloset() {
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem('closet-items') || '[]')
  })

  useEffect(() => {
    localStorage.setItem('closet-items', JSON.stringify(items))
  }, [items])

  const totalCO2 = items.reduce((sum, item) => sum + item.co2, 0)
  const avgCO2 = items.length > 0 ? totalCO2 / items.length : 0
  const usedCount = items.filter(i => i.purchaseType === 'used').length
  const usedPct = items.length > 0 ? Math.round((usedCount / items.length) * 100) : 0

  const materialTotals = items.reduce((totals, item) => {
    totals[item.material] = (totals[item.material] || 0) + item.co2
    return totals
  }, {})

  const materialEntries = Object.entries(materialTotals)
    .sort((a, b) => b[1] - a[1])

  const maxMaterialCO2 = materialEntries.length > 0 ? materialEntries[0][1] : 1

  function deleteItem(index) {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  function clearAll() {
    if (window.confirm('Remove all logged items? This cannot be undone.')) {
      setItems([])
    }
  }

  return (
    <>
      <Header />

      <main id="content">

        <div className="page-hero">
          <div className="page-hero__figure">
            <IllustrationClosetHero />
          </div>
          <div className="page-hero__copy">
            <h2 className="section-heading">
              <span className="section-heading__icon" aria-hidden="true">
                <IconCloset size={26} />
              </span>
              MY CLOSET OVERVIEW
            </h2>
            <p>Here&apos;s a breakdown of the carbon footprint of everything you&apos;ve logged.</p>
          </div>
        </div>

        <div className="stats-strip">
          <div className="stat-card">
            <div className="stat-card__icon-wrap" aria-hidden="true">
              <IconShirt size={22} />
            </div>
            <div className="stat-number">{items.length || '—'}</div>
            <div className="stat-label">Items logged</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon-wrap" aria-hidden="true">
              <IconLeaf size={22} />
            </div>
            <div className="stat-number">{items.length > 0 ? totalCO2.toFixed(1) : '—'}</div>
            <div className="stat-label">kg CO₂e total</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon-wrap" aria-hidden="true">
              <IconBars size={22} />
            </div>
            <div className="stat-number">{items.length > 0 ? avgCO2.toFixed(1) : '—'}</div>
            <div className="stat-label">kg CO₂e per item</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon-wrap" aria-hidden="true">
              <IconRecycle size={22} />
            </div>
            <div className="stat-number">{items.length > 0 ? usedPct + '%' : '—'}</div>
            <div className="stat-label">Second-hand items</div>
          </div>
        </div>

        {items.length > 0 && (
          <>
            <h2 className="section-heading">
              <span className="section-heading__icon" aria-hidden="true">
                <IconPie size={24} />
              </span>
              NEW VS. SECOND-HAND
            </h2>
            <p>How much of your closet was thrifted or bought second-hand?</p>
            <div className="chart-wrap" style={{ maxWidth: '360px' }}>
              <PieChart items={items} />
            </div>

            <h2 className="section-heading">
              <span className="section-heading__icon" aria-hidden="true">
                <IconFabric size={24} />
              </span>
              CO₂ BY MATERIAL
            </h2>
            <p>Which fabrics in your closet are contributing most to your total carbon footprint?</p>
            <div className="chart-wrap">
              {materialEntries.map(([material, co2]) => (
                <div key={material} className="bar-row">
                  <div className="bar-row-label">
                    <span className="bar-row-label__icon" aria-hidden="true">
                      <IconFabric size={14} />
                    </span>
                    {material}
                  </div>
                  <div className="bar-track">
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

        <h2 className="section-heading">
          <span className="section-heading__icon" aria-hidden="true">
            <IconHanger size={24} />
          </span>
          LOGGED ITEMS
        </h2>

        {items.length === 0 ? (
          <p className="closet-empty-msg">
            <span className="closet-empty-msg__icon" aria-hidden="true">
              <IconHanger size={28} />
            </span>
            <span>
              No items logged yet.{' '}
              <Link to="/log-item">Log your first item!</Link>
            </span>
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
                      type="button"
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
          <Link to="/log-item" className="btn-submit btn-with-icon">
            <IconPlus size={18} aria-hidden="true" />
            Log Another Item
          </Link>
          {items.length > 0 && (
            <button type="button" className="btn-danger" onClick={clearAll}>Clear All Items</button>
          )}
        </p>

      </main>

      <Footer />
    </>
  )
}
