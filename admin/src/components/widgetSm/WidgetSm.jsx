import './widgetSm.css'
import { Visibility } from '@material-ui/icons'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([])

  useEffect(() => {
    const getNewUser = async () => {
      try {
        const res = await axios.get('/users?new=true', {
          headers: {
            token:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDgwZGUyMzYyOWMwOGFiODY5MWVjNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTg3OTM0NiwiZXhwIjoxNjQyMzExMzQ2fQ.PkMqEyC4T9mKUEEMeq3cYSOTxKltvaIm3MrdjSLumXE',
          },
        })
        setNewUsers(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getNewUser()
  }, [])
  return (
    <div className='widgetSm'>
      <span className='widgetSmTitle'>New Joined Members</span>
      <ul className='widgetSmList'>
        {newUsers.map((user, index) => (
          <li className='widgetSmListItem' key={index}>
            <img
              src={
                user.profilePic ||
                'https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg'
              }
              alt=''
              className='widgetSmImg'
            />
            <div className='widgetSmUser'>
              <span className='widgetSmUsername'>{user.username}</span>
            </div>
            <button className='widgetSmButton'>
              <Visibility className='widgetSmIcon' />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
