import { useNavigate } from 'react-router-dom'

export default function ResultBox({ co2, purchaseType, itemData }) {
  const navigate = useNavigate()
  const miles = Math.round(co2 / 0.404)

  function saveItem() {
    // Read whatever's already in localStorage, add this item, save back
    const existing = JSON.parse(localStorage.getItem('closet-items') || '[]')
    existing.push({ ...itemData, co2, date: new Date().toLocaleDateString() })
    localStorage.setItem('closet-items', JSON.stringify(existing))
    navigate('/my-closet')
  }

  return (
    <div className="result-box">
      <h3>Carbon Footprint Result</h3>

      <div className="result-total">
        {co2} <span>kg CO₂e</span>
      </div>

      <p style={{ fontSize: '0.85rem', color: '#555', marginTop: '0.5rem' }}>
        Roughly equivalent to driving <strong>{miles} miles</strong> in a gas-powered car.
      </p>

      {/* Extra note for second-hand items explaining why the number is low */}
      {purchaseType === 'used' && (
        <div className="secondhand-note">
          <strong>Why so low?</strong> Because this item already existed, no new fabric
          had to be produced — and production is where most of a garment's carbon comes from.
          Choosing second-hand is one of the most impactful choices you can make.
        </div>
      )}

      {/* Show what the second-hand version would cost, if they bought new */}
      {purchaseType === 'new' && (
        <p style={{ fontSize: '0.85rem', color: '#555', marginTop: '0.75rem' }}>
          The same item bought second-hand would be roughly{' '}
          <strong>{(co2 * 0.1).toFixed(2)} kg CO₂e</strong>.
        </p>
      )}

      <p style={{ marginTop: '1.25rem', marginBottom: 0 }}>
        <button className="btn-submit" onClick={saveItem}>
          Save to My Closet →
        </button>
      </p>
    </div>
  )
}
