import {
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  deleteMoviesFailure,
  deleteMoviesStart,
  deleteMoviesSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  updateMoviesFailure,
  updateMoviesStart,
  updateMoviesSuccess,
} from './MovieActions'
import axios from 'axios'

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart())
  try {
    const res = await axios.get('/movies', {
      headers: {
        token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
      },
    })
    dispatch(getMoviesSuccess(res.data))
  } catch (err) {
    dispatch(getMoviesFailure())
  }
}

// CREATE
export const createMovies = async (movie, dispatch) => {
  dispatch(createMovieStart())
  try {
    const res = await axios.post('/movies', movie, {
      headers: {
        token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
      },
    })
    dispatch(createMovieSuccess(res.data))
  } catch (err) {
    dispatch(createMovieFailure())
  }
}

// DELETE
export const deleteMovies = async (id, dispatch) => {
  dispatch(deleteMoviesStart())
  try {
    await axios.delete('/movies/' + id, {
      headers: {
        token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
      },
    })
    dispatch(deleteMoviesSuccess(id))
  } catch (err) {
    dispatch(deleteMoviesFailure())
  }
}

export const publicRequest = axios.create({
  baseURL: 'http://localhost:8800/api',
  headers: {
    token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
  },
})
// UPDATE
export const updateMovies = async (movie, dispatch) => {
  console.log(movie)
  dispatch(updateMoviesStart())
  try {
    const { data } = await publicRequest.put('/movies/' + movie._id, movie)
    dispatch(updateMoviesSuccess(data))
  } catch (err) {
    dispatch(updateMoviesFailure())
  }
}
