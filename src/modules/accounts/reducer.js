import { LOAD, SET_ACCOUNT } from './actionTypes'

const initialState = {
  active: 0,
  list: []
}

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return { ...state, list: action.payload }

    case SET_ACCOUNT:
      return { ...state, active: action.payload }

    default:
      return state;
  }
}
