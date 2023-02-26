import { useEffect, useState, useRef, forwardRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import Header from './components/Header'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import './css/variables.css'
import './css/base.css'

function App() {

  const baseUrl = 'https://api.artic.edu/api/v1/artworks'
  const searchUrl = 'https://api.artic.edu/api/v1/artworks/search?q='

  const [artworks, setArtworks] = useState([])
  const [page, setPage] = useState(1)

  const fetchArtworks = url => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setArtworks(data.data)
        setPage(data.pagination)
      })
  }

  useEffect(() => {

    fetchArtworks(baseUrl)

  }, [])

  const changePage = (newPage) => {
    
    if (newPage === 'next' && page.next_url) {
      fetchArtworks(page.next_url)
    } else if (newPage === 'prev' && page.prev_url) {
      fetchArtworks(page.prev_url)
    }

  }

  const fetchSearchArtworks = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const fetchPromises = data.data.map(artwork => {
          return fetch(artwork.api_link)
            .then(response => response.json())
            .then(data => data.data)
        })
  
        return Promise.all(fetchPromises)
      })
      .then(searchArtworksResults => {
        setArtworks(searchArtworksResults)
      })
  }
  
  const title = useRef(null)

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const search = (inputValue) => {
    const searchQuery = searchUrl + inputValue.toLowerCase()
    fetchSearchArtworks(searchQuery)

    title.current.textContent = capitalizeFirstLetter(inputValue)
  }


  return (
    <div className="App">
      <Header searchFn={search}></Header>
      <Gallery artworks={artworks} changePage={changePage} ref={title}></Gallery>
      <Footer></Footer>
    </div>
  )
}

export default App
