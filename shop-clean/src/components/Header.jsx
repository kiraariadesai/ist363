import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <h1>SHOP CLEAN SAVE YOUR GREEN</h1>
      <nav>
        <NavLink to="/" end>HOME</NavLink>
        <NavLink to="/log-item">LOG ITEM</NavLink>
        <NavLink to="/my-closet">MY CLOSET</NavLink>
      </nav>
    </header>
  )
}
