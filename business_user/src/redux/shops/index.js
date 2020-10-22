// CONSTANTS
export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

export const SHOP_LOADING = 'SHOP_LOADING'
export const SHOP_LOADED = 'SHOP_LOADED'
export const SHOP_GETALL = 'SHOP_GETALL'

export const SHOP_COUNTER = 'SHOP_COUNTER'

// ACTIONS
export const addStore = (cred) => dispatch => {
  dispatch({type: SHOP_LOADING})
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cred)
  }
  fetch('/shop/register', options)
  .then(res => res.json())
  .then(res => {
    let id = res.id
    dispatch({
      type: SHOP_LOADED,
      payload: {
        ...cred,
        id: id
      }
    })
  })
  .catch(err => console.error('sad', err))
}

export const getAllShops = () => dispatch => {
  dispatch({type: SHOP_LOADING})
  fetch('/shop/getall')
  .then(res => res.json())
  .then(res => {
    dispatch({
      type: SHOP_GETALL,
      payload: {
        shops: res.shops || []
      }
    })
  })
}

export const openSse = () => dispatch => {
  const source = new EventSource('/shop/counter')
  
  source.onopen = () => {
    console.log('sse established');
  }

  source.onmessage = (event) => {
    const data = event.data
    console.log(data);
    // dispatch({
    //   type: SHOP_COUNTER,
    //   payload: ''
    // })
  }

  source.addEventListener('please', (e) => {
    console.log(e);
  }, false)
  
  source.onerror = (e) => {
    console.error(e);
  }
  console.log(source.readyState, '-- initial');
  setTimeout(() => {
    console.log(source.readyState, ' -- after');
  },3000)
}

// shape for one shop
// {
//   storeName: "text",
//   user: "",
//   location: "",
//   op: "",
//   closing: "",
//   count: 0,  
// }

// REDUCERS
const initialState = {
  loading: false,
  shops: []
}

const shopReducer = (state = initialState, action) => {
  switch(action.type) {
    case SHOP_LOADING:
      return {
        ...state,
        loading: true
      }
    case SHOP_LOADED:
      return {
        ...state,
        loading: false,
        shops: [...state.shops, action.payload]
      }
    case SHOP_GETALL:
      return {
        ...state,
        loading: false,
        shops: [...state.shops, ...action.payload.shops]
      }
    case SHOP_COUNTER:
      return {
        ...state,
        shops: [...state, ...action.payload.shops]
      }
    default:
      return state
  }
}

export default shopReducer;