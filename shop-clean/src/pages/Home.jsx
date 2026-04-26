import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { FASHION_COUNTRIES } from '../data/carbonData.js'

export default function Home() {
  // useState stores the data we get back from the APIs.
  // It starts empty/loading, then fills in when the fetch completes.
  const [countries,  setCountries]  = useState([])
  const [emissions,  setEmissions]  = useState([])
  const [loadingC,   setLoadingC]   = useState(true)
  const [loadingE,   setLoadingE]   = useState(true)
  const [errorC,     setErrorC]     = useState(false)
  const [errorE,     setErrorE]     = useState(false)

  // useEffect runs the API calls once when the page loads.
  // The empty [] at the end means "only run once, on mount".
  useEffect(() => {
    fetchCountries()
    fetchEmissions()
  }, [])

  /* ── REST COUNTRIES API ── */
  async function fetchCountries() {
    try {
      const results = await Promise.all(
        FASHION_COUNTRIES.map(async (c) => {
          const res  = await fetch(`https://restcountries.com/v3.1/name/${c.name}?fullText=true`)
          const data = await res.json()
          return { ...data[0], context: c.context }
        })
      )
      setCountries(results)
    } catch {
      setErrorC(true)
    } finally {
      setLoadingC(false)
    }
  }

  /* ── WORLD BANK API ── */
  async function fetchEmissions() {
    try {
      const results = await Promise.all(
        FASHION_COUNTRIES.map(async (c) => {
          const res  = await fetch(
            `https://api.worldbank.org/v2/country/${c.code}/indicator/EN.GHG.CO2.PC.CE.AR5?format=json&mrv=1`
          )
          const data = await res.json()
          const rows  = Array.isArray(data[1]) ? data[1] : []
          const entry = rows.find(r => r.value != null)
          return { name: c.name, co2: entry?.value?.toFixed(2) ?? 'N/A' }
        })
      )
      setEmissions(results)
    } catch {
      setErrorE(true)
    } finally {
      setLoadingE(false)
    }
  }

  return (
    <>
      <Header />

      <main id="content">

        <h2>WELCOME</h2>
        <p>Welcome to a sneak peek into your future wardrobe.</p>
        <p>
          Tired of cycling through new cheap clothes every month, keeping up with micro-trends,
          contributing to the rise in global warming, wearing shirts made in sweatshops, and the
          increasing size of textile waste in landfills? Well look no further than where you are right now.
        </p>
        <p>
          This step-by-step guide will enhance your knowledge on fast fashion and microtrends while
          helping you find your own personal style, saving money, and throwing away the next
          meaningless aesthetic social media pushes.
        </p>
        <p>
          According to <a href="https://earth.org" target="_blank" rel="noreferrer">earth.org</a>,
          more than $500 billion are lost yearly due to garment waste, 20% of global wastewater
          comes from textile dyeing, and fast fashion generated more carbon emissions than aviation
          and shipping combined in 2022.
        </p>

        <div className="intro-images">
          <img src="/images/thriftshop.jpeg"  alt="Thrift shop with clothes and decor." />
          <img src="/images/textilewaste.jpeg" alt="Textile waste." />
          <img src="/images/sweatshop.jpeg"    alt="Sweatshop workers." />
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/log-item" className="btn-submit">Start Tracking Your Closet →</Link>
        </p>

        {/* ── REST COUNTRIES API ── */}
        <h2>FAST FASHION'S GLOBAL IMPACT</h2>
        <p>
          These countries are among the world's largest textile and garment producers, powering
          the fast fashion industry at enormous human and environmental cost.
        </p>

        <div id="countries-grid">
          {loadingC && <p className="loading">Loading country data...</p>}
          {errorC   && <p className="error-msg">Could not load country data. Please try again later.</p>}
          {countries.map((country) => (
            <div key={country.name.common} className="country-card">
              <img src={country.flags?.png} alt={`Flag of ${country.name.common}`} />
              <div className="country-card-body">
                <h3>{country.name.common}</h3>
                <p>Capital: {country.capital?.[0] ?? 'N/A'}</p>
                <p>Population: {country.population.toLocaleString()}</p>
                <p>{country.context}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── WORLD BANK API ── */}
        <h2>CO&#8322; EMISSIONS IN TEXTILE-PRODUCING COUNTRIES</h2>
        <p>
          The countries that manufacture our clothes are among the most affected by industrial
          carbon emissions. All data sourced from the World Bank.
        </p>

        <div id="worldbank-section">
          {loadingE && <p className="loading">Loading emissions data...</p>}
          {errorE   && <p className="error-msg">Could not load emissions data. Please try again later.</p>}
          {emissions.map((e) => (
            <p key={e.name}>
              <strong>{e.name}</strong> &mdash; {e.co2} metric tons of CO&#8322; per capita
            </p>
          ))}
        </div>

      </main>

      <Footer />
    </>
  )
}
