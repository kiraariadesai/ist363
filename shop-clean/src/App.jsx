import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import LogItem from './pages/LogItem.jsx'
import MyCloset from './pages/MyCloset.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/log-item"   element={<LogItem />} />
        <Route path="/my-closet"  element={<MyCloset />} />
      </Routes>
    </BrowserRouter>
  )
}
