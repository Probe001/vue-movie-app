
import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  // module!
  namespaced: true,
  // data!
  state: () => ({
      movies: [],
      message: 'Search for the movie title!',
      loading: false,
      theMovie: {}
    }),
  // computed!
  getters: {},
  // methods!
  // 변이. state의 데이터는 mutations에서만 수정 가능하다.
  mutations: {
    updateState(state, payload) {
      // ['movies','message','loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
      state.message = 'Search for the movie title!'
      state.loading = false
    }
  },
  // 비동기 동작.
  actions: {
    async searchMovies(context, payload) {
      if (context.state.loading) return

      context.commit('updateState', {
        message: "",
        loading: true
      })

      try {
         // Search movies..
      const res = await _fetchMovie({
        ...payload,
        page: 1
      })
      
      const {Search, totalResults} = res.data
      context.commit('updateState', {
        movies: _uniqBy(Search, 'imdbID')
      })
      console.log(totalResults)
      console.log(typeof totalResults)

      const total = parseInt(totalResults, 10) // 10진법의 숫자로 바꿔준다.
      const pageLength = Math.ceil(total/10) // 하나의 페이지는 10개의 값을 가지고 있으므로, 총 검색해야 하는 페이지의 개수를 나타낸다.

      // 추가 요청 전송!
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            if (page > payload.number / 10) break 
            // if문에서 내용이 한줄이라면 중괄호를 생략할 수 있다.
            const res = await _fetchMovie({
              ...payload,
              page: page
            })
            const { Search } = res.data
            console.log(res)
            context.commit('updateState', {
              movies: [
                ...context.state.movies,
                ..._uniqBy(Search, 'imdbID')
              ]
            })
          }
        }
      
      } catch (message) {
        console.log(message)
        context.commit('updateState', {
          movies: [],
          message
        })
      } finally {
        context.commit('updateState', {
          loading: false
        })
      }
    },

    async searchMovieWithId(context, payload) {
      if (context.state.loading) return
      
      context.commit('updateState', {
        theMovie: {},
        loading: true
      })

      try {
        const res = await _fetchMovie(payload)
        context.commit('updateState', {
          theMovie: res.data
        })
      } catch(error) {
        context.commit('updateState', {
          theMovie: {}
        })
      } finally {
        context.commit('updateState', {
          loading: false
        })
      }
    }
  },
}

function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '7035c60c'
  const url = id
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}
  &i=${id}`
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}
  &s=${title}&type=${type}&y=${year}&page=${page}`
  
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res=> {
        if (res.data.Error) {
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}