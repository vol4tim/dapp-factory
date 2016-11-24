import { SET_TEMPLATE, LOAD, SET_RESULT } from './actionTypes'

const initialState = {
  active: 0,
  list: []
}

export default function templates(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return { ...state, list: action.payload }

    case SET_TEMPLATE:
      return { ...state, active: action.payload }

    case SET_RESULT: {
      const list = state.list.map((item, index) => {
        const template = { ...item }
        if (index === action.payload.templateId) {
          template.result = {
            address: action.payload.address,
            abi: action.payload.abi
          }
        }
        return template
      })
      return { ...state, list }
    }

    default:
      return state;
  }
}
