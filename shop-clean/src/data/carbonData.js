/* ============================================================
   carbonData.js
   All the lookup tables the calculator uses.
   Kept in one file so they're easy to find and update.
   ============================================================ */

// kg CO2e produced per kg of fabric — source: Higg MSI
export const materialFactors = {
  'Cotton':             5.9,
  'Organic Cotton':     3.0,
  'Polyester':          9.5,
  'Recycled Polyester': 3.8,
  'Nylon':              7.9,
  'Wool':               17.0,
  'Linen':              1.5,
  'Silk':               35.0,
  'Rayon / Viscose':    4.3,
  'Denim':              6.5,
  'Synthetic Blend':    8.5,
  'Other':              6.0,
}

// New = full footprint. Second-hand = 10% (item already exists).
export const purchaseMultipliers = {
  new:  1.0,
  used: 0.1,
}

// THE FORMULA: weight(kg) x material factor x purchase multiplier
export function calculateCarbon(weightGrams, material, purchaseType) {
  const weightKg           = weightGrams / 1000
  const materialFactor     = materialFactors[material] ?? 6.0
  const purchaseMultiplier = purchaseMultipliers[purchaseType] ?? 1.0
  return parseFloat((weightKg * materialFactor * purchaseMultiplier).toFixed(2))
}

export const MATERIALS = Object.keys(materialFactors)

export const ITEM_TYPES = [
  'Tops', 'Bottoms', 'Outerwear', 'Dress / Jumpsuit', 'Footwear', 'Accessories', 'Other',
]

// Countries for the REST Countries + World Bank APIs on the homepage
export const FASHION_COUNTRIES = [
  { name: 'Bangladesh', code: 'BGD', context: "World's 2nd largest garment exporter. Over 4 million workers in textile factories." },
  { name: 'China',      code: 'CHN', context: 'Produces ~65% of the world\'s clothing. Home to Shein and Temu supply chains.' },
  { name: 'India',      code: 'IND', context: 'Major producer of cotton and textiles, but faces severe water pollution from dyeing.' },
  { name: 'Vietnam',    code: 'VNM', context: 'Rapidly growing garment sector supplying major global fast fashion brands.' },
]
