import React from 'react';
import ReactDOM from 'react-dom';
import MyList from './MyList';
import './index.css';



// delete item DONE
// edit item DONE
// delete last item DONE
// create a single state with toDoItems and newItem DONE
// persist the list using local storage DONE
// style
// strike through item (optional)
// learn useReducer()

const toDos = ["Monthly Calendar", "Daily List", "Morning/Evening Routine written"];

ReactDOM.render(
  <MyList theList={toDos} />,
  document.getElementById('root')
);
