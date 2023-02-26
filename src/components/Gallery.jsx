import { forwardRef } from 'react'
import '../css/gallery.css'
import arrow from '../assets/icons/arrow.svg'

const Gallery = forwardRef(({ artworks, changePage }, ref) => {

    return(
        <section className="gallery">
            <div className="gallery__header">
                <h2 ref={ref} className="gallery__title">Featured Paintings</h2>
                {/* <button className="gallery__prev" onClick={() => changePage('prev')}>
                    <img src={arrow} alt="" />
                </button> */}
                <button className="gallery__next" onClick={() => changePage('next')}>
                    <img src={arrow} alt="" />
                </button>
            </div>
            <div className="gallery__artworks">
                {artworks.map(({ id, image_id, artist_title, medium_display, title, date_end }) => {
                    return image_id !== null ? (
                        <div className="artwork" key={id}>
                            <img className="artwork__image" src={'https://www.artic.edu/iiif/2/' + image_id + '/full/843,/0/default.jpg'} alt="" />
                            <h3 className="artwork__title">{title}</h3>
                            <div className="artwork__artist">{artist_title}</div>
                            <div className="artwork__meta">{medium_display}, {date_end}</div>
                        </div>
                    ) : null
                })}
            </div>
        </section>
    )
})

export default Gallery