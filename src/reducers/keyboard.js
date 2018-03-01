const notes = (state = [], action) => {
  switch(action.type) {
    case 'ADD_NOTE_ON':
      return [
        ...state,
        {
          id: action.id,
          number: action.number,
          on: true,
          timestamp: action.timestamp
        }
      ]
    case 'ADD_NOTE_OFF':
      return [
        ...state,
        {
          id: action.id,
          number: action.number,
          on: false,
          timestamp: action.timestamp
        }
      ]
    default:
      return state
  }
}

export default notes

/*const todos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      case 'TOGGLE_TODO':
        return state.map(todo =>
          (todo.id === action.id)
            ? {...todo, completed: !todo.completed}
            : todo
        )
      default:
        return state
    }
  }
  ​
  export default todos
  */