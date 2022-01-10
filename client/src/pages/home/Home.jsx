import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import './home.scss'

const Home = ({ type }) => {
  const [lists, setLists] = useState([])
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? '?type=' + type : ''}${
            genre ? '&genre=' + genre : ''
          }`,
          {
            headers: {
              token:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDgwZGUyMzYyOWMwOGFiODY5MWVjNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTgwMDE4MCwiZXhwIjoxNjQyMjMyMTgwfQ.FsKdYJKDvtiKyyIFLWz-OT4Cg1_IzPiZ5Bx4mI6yU7U',
            },
          }
        )
        setLists(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getRandomLists()
  }, [type, genre])

  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  )
}

export default Home
