import { useEffect, useRef, useState } from 'react'
import logo from '../assets/icons/logo.svg'
import search_icon from '../assets/icons/search.svg'
import cart from '../assets/icons/cart.svg'
import '../css/header.css'

export default ({ searchFn }) => {

    const [search, setSearch] = useState(false)
    const searchBar = useRef(null)

    useEffect(() => {

        if (search === true) {
            searchBar.current.classList.add('search-bar--active')
            searchBar.current[0].focus()
        } else {
            searchBar.current.classList.remove('search-bar--active')
        }

    }, [search])

    const [menuOpen, setMenuOpen] = useState(false)
    const header = useRef(null)

    useEffect(() => {
        
        if (menuOpen) {
            header.current.classList.add('menu--open')
        } else {
            header.current.classList.remove('menu--open')
        }

    }, [menuOpen])

    return (
        <header ref={header} className="header">
            <div className="header__inner">
                <div className="header__branding">
                    <a href="">
                        <img src={logo} alt="" />
                    </a>
                </div>
                <nav className="nav">
                    <div className="nav-item">paintings</div>
                    <div className="nav-item">drawings</div>
                    <div className="nav-item">sculpture</div>
                    <div className="nav-item">artists</div>
                    <div className="nav-item search" onClick={() => setSearch(prev => !prev)}><button><img src={search_icon} alt="" /></button></div>
                    <div className="nav-item"><img src={cart} alt="" /></div>
                    <form ref={searchBar} className="search-bar" action="" onSubmit={e => {
                        e.preventDefault()
                        const inputValue = searchBar.current[0].value
                        searchFn(inputValue)
                    }}>
                        <input type="text" />
                    </form>
                </nav>
                <button className="menu-button" onClick={() => setMenuOpen(prev => !prev)}>Menu</button>
            </div>
        </header>
    )
}