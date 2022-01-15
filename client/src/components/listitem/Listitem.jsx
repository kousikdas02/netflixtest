import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from '@material-ui/icons'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import './listItem.scss'

const Listitem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [movie, setMovie] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get('/movies/find/' + item, {
          headers: {
            token:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDgwZGUyMzYyOWMwOGFiODY5MWVjNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MjI1MTc2NCwiZXhwIjoxNjQyNjgzNzY0fQ.ksXHC0SWkHl3zMsDyF_IKn1OvisTu42AznftPOXL-Vg',
          },
        })
        setMovie(res.data)
        // console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getMovie()
  }, [item])

  const handleClick = (e) => {
    e.preventDefault()
    navigate('/watch', { state: { movie } })
  }

  return (
    <Link to={{ pathname: '/watch' }} onClick={handleClick}>
      <div
        className='listItem'
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt='' />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className='itemInfo'>
              <div className='icons'>
                <PlayArrow className='icon' />
                <Add className='icon' />
                <ThumbUpAltOutlined className='icon' />
                <ThumbDownOutlined className='icon' />
              </div>
              <div className='itemInfoTop'>
                <span className='duration'>{movie.duration}</span>
                <span className='ageLimit'>+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className='desc'>{movie.desc}</div>
              <div className='genre'>{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  )
}

export default Listitem
