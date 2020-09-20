import axios from 'axios'

const initialState = []
const GET_LIST = 'GET_LIST'
const CHANGE_SELECT_STATE = 'CHANGE_SELECT_STATE'
const SELECT_ALL = 'SELECT_ALL'
const DESELECT_ALL = 'DESELECT_ALL'

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST:
      return action.list
    case CHANGE_SELECT_STATE:
      return state.map((user) =>
        user.id === action.id ? { ...user, isChecked: !user.isChecked } : user
      )
    case SELECT_ALL:
      return state.map((user) => ({ ...user, isChecked: true }))
    case DESELECT_ALL:
      return state.map((user) =>({ ...user, isChecked: false }))

    default:
      return state
  }
}

export function changeSelectState(id) {
  return { type: CHANGE_SELECT_STATE, id }
}

export function selectAll() {
  return { type: SELECT_ALL }
}

export function deselectAll() {
  return {type: DESELECT_ALL}
}

export function getList() {
  return (dispatch) => {
    axios('/api/v1/users').then(({ data }) => {
      dispatch({ type: GET_LIST, list: data })
    })
  }
}
