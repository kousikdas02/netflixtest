import { Publish } from '@material-ui/icons'
import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  publicRequest,
  updateMovies,
} from '../../context/movieContext/apiCalls'
import { MovieContext } from '../../context/movieContext/MovieContext'
import './movie.css'
export default function Product() {
  const location = useLocation()
  const movie = location?.movie
  /*  ADDED by ikd endpoint */
  const id = location.pathname.split('/')[2]
  const [data, setData] = useState({
    title: '',
    year: '',
    genre: '',
    limit: '',
  })

  const { dispatch } = useContext(MovieContext)
  useEffect(() => {
    console.log(movie)
    if (movie) setData(movie)
    else {
      publicRequest
        .get(`/movies/find/${id}`)
        .then(({ data }) => setData(data))
        .catch((err) =>
          console.error('Error while fetching product in movie.jsx', err)
        )
    }
  }, [id, movie])

  const handleChange = (e) => {
    const { name, type, value, files } = e.target
    switch (type) {
      case files:
        setData({ ...data, [name]: files[0] })
        break
      default:
        setData({ ...data, [name]: value })
        break
    }
  }

  const handleCreate = (e) => {
    e.preventDefault()
    updateMovies(data, dispatch)
  }

  /* ADDED by ikd endpoint */

  return (
    <div className='product'>
      <div className='productTitleContainer'>
        <h1 className='productTitle'>Movie</h1>
        <Link to='/newmovie'>
          <button className='productAddButton'>Create</button>
        </Link>
      </div>
      <div className='productTop'>
        <div className='productTopRight'>
          <div className='productInfoTop'>
            <img src={data.img} alt='' className='productInfoImg' />
            <span className='productName'>{data.title}</span>
          </div>
          <div className='productInfoBottom'>
            <div className='productInfoItem'>
              <span className='productInfoKey'>id:</span>
              <span className='productInfoValue'>{data._id}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>genre:</span>
              <span className='productInfoValue'>{data.genre}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>year:</span>
              <span className='productInfoValue'>{data.year}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>limit:</span>
              <span className='productInfoValue'>{data.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='productBottom'>
        <form className='productForm' onSubmit={handleCreate}>
          <div className='productFormLeft'>
            <label>Movie Title</label>
            {/* updated by ikd */}
            <input
              name='title'
              type='text'
              value={data.title}
              onChange={handleChange}
            />
            <label>Year</label>
            <input
              name='year'
              type='text'
              value={data.year}
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              name='genre'
              type='text'
              value={data.genre}
              onChange={handleChange}
            />
            <label>Limit</label>
            <input
              name='limit'
              type='text'
              value={data.limit}
              onChange={handleChange}
            />
            {/* updated by ikd endpoint */}
            <label>Trailer</label>
            <input type='file' onChange={handleChange} />
            <label>Video</label>
            <input type='file' onChange={handleChange} />
          </div>
          <div className='productFormRight'>
            <div className='productUpload'>
              <img src={data.img} alt='' className='productUploadImg' />
              <label htmlFor='file'>
                <Publish />
              </label>
              <input type='file' id='file' style={{ display: 'none' }} />
            </div>
            <button type='submit' className='productButton'>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
