import { useState } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import ResultBox from '../components/ResultBox.jsx'
import { calculateCarbon, MATERIALS, ITEM_TYPES } from '../data/carbonData.js'
import {
  IllustrationLogHero,
  IconTag,
  IconLayers,
  IconFabric,
  IconScale,
  IconHanger,
  IconStore,
  IconRecycle,
  IconLeaf,
} from '../components/PageMedia.jsx'

export default function LogItem() {
  const [name, setName] = useState('')
  const [type, setType] = useState('Other')
  const [material, setMaterial] = useState('')
  const [weightGrams, setWeightGrams] = useState('')
  const [purchaseType, setPurchaseType] = useState('new')
  const [result, setResult] = useState(null)

  function handleCalculate() {
    if (!material) {
      alert('Please select a material.')
      return
    }
    if (!weightGrams || Number(weightGrams) <= 0) {
      alert('Please enter the item\'s weight in grams.')
      return
    }

    const co2 = calculateCarbon(Number(weightGrams), material, purchaseType)
    setResult(co2)

    setTimeout(() => {
      document.getElementById('result-box')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const itemData = {
    name: name.trim() || 'Unnamed item',
    type,
    material,
    weightGrams: Number(weightGrams),
    purchaseType,
  }

  return (
    <>
      <Header />

      <main id="content">

        <div className="page-hero">
          <div className="page-hero__figure">
            <IllustrationLogHero />
          </div>
          <div className="page-hero__copy">
            <h2 className="section-heading">
              <span className="section-heading__icon" aria-hidden="true">
                <IconHanger size={26} />
              </span>
              LOG A NEW ITEM
            </h2>
            <p>
              Enter your item&apos;s details below. The calculator only needs three things —
              material, weight, and whether it&apos;s new or second-hand.
            </p>
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label htmlFor="item-name" className="form-label-row">
              <span className="form-label-row__icon" aria-hidden="true">
                <IconTag size={18} />
              </span>
              <span>
                Item Name <span style={{ fontWeight: 'normal', color: '#888' }}>(optional)</span>
              </span>
            </label>
            <input
              type="text"
              id="item-name"
              placeholder="e.g. Black denim jacket"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="item-type" className="form-label-row">
              <span className="form-label-row__icon" aria-hidden="true">
                <IconLayers size={18} />
              </span>
              <span>
                Item Type <span style={{ fontWeight: 'normal', color: '#888' }}>(optional)</span>
              </span>
            </label>
            <select id="item-type" value={type} onChange={e => setType(e.target.value)}>
              {ITEM_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="material" className="form-label-row">
              <span className="form-label-row__icon" aria-hidden="true">
                <IconFabric size={18} />
              </span>
              <span>Material *</span>
            </label>
            <select id="material" value={material} onChange={e => setMaterial(e.target.value)}>
              <option value="">Select material...</option>
              {MATERIALS.map(m => <option key={m}>{m}</option>)}
            </select>
            <p className="form-hint">Check the tag inside your clothing — it lists the fabric content.</p>
          </div>

          <div className="form-group">
            <label htmlFor="item-weight" className="form-label-row">
              <span className="form-label-row__icon" aria-hidden="true">
                <IconScale size={18} />
              </span>
              <span>Approx. Weight (grams) *</span>
            </label>
            <input
              type="number"
              id="item-weight"
              placeholder="e.g. 300"
              min="1"
              value={weightGrams}
              onChange={e => setWeightGrams(e.target.value)}
            />
            <p className="form-hint">
              Not sure? &nbsp;
              T-shirt ~200g &nbsp;&bull;&nbsp;
              Jeans ~600g &nbsp;&bull;&nbsp;
              Sweater ~500g &nbsp;&bull;&nbsp;
              Jacket ~900g
            </p>
          </div>

          <div className="form-group">
            <label className="form-label-row">
              <span className="form-label-row__icon" aria-hidden="true">
                <IconHanger size={18} />
              </span>
              <span>Purchase Type *</span>
            </label>
            <div className="radio-group">
              <input
                type="radio" id="type-new" name="purchase-type"
                value="new" checked={purchaseType === 'new'}
                onChange={() => setPurchaseType('new')}
              />
              <label htmlFor="type-new">
                <IconStore size={16} className="radio-label__icon" aria-hidden="true" />
                New / Retail
              </label>

              <input
                type="radio" id="type-used" name="purchase-type"
                value="used" checked={purchaseType === 'used'}
                onChange={() => setPurchaseType('used')}
              />
              <label htmlFor="type-used">
                <IconRecycle size={16} className="radio-label__icon" aria-hidden="true" />
                Second-hand / Thrifted
              </label>
            </div>
            <p className="form-hint">
              Second-hand items have a much lower footprint — the fabric already exists,
              so no new production emissions.
            </p>
          </div>

          <button type="button" className="btn-submit btn-with-icon" onClick={handleCalculate}>
            <IconLeaf size={18} aria-hidden="true" />
            Calculate Carbon Footprint →
          </button>
        </div>

        {result !== null && (
          <div id="result-box">
            <ResultBox co2={result} purchaseType={purchaseType} itemData={itemData} />
          </div>
        )}

      </main>

      <Footer />
    </>
  )
}
