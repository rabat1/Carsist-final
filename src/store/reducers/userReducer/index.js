export default function userReducer(state = {}, action) {
    switch(action.type) {
      case 'UPDATE_USER': {
        console.log('reducer', action.data)
        return { ...state, user: action.data }
      }
      default: {
        return state
      }
    }
  }
  
  