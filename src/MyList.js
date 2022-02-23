import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './App.css';
import ListItem from './ListItem';

const MyList = ({ theList }) => {
  const [toDoItems, setToDoItems] = useState(() => {
    const savedItems = localStorage.getItem("toDoItems");
    const initialValue = JSON.parse(savedItems);
    return initialValue || theList;
  });

  const [input, setInput] = useState({
    newTask: '',
    title: '',
  });

  useEffect(() => {
    localStorage.setItem("toDoItems", JSON.stringify(toDoItems));
    // localStorage.setItem("title", JSON.stringify(title));
    console.log(toDoItems);
  }, [toDoItems]);

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      }
    });
  };

  const clearList = (event) => {
    event.preventDefault();
    setToDoItems([]);
  };

  const deleteLastItemHandler = (event) => {
    event.preventDefault();
    const newItemsList = [...toDoItems];
    newItemsList.pop()
    setToDoItems(newItemsList);
  };

  const deleteItemHandler = (e, item) => {
    e.stopPropagation();
    const filteredItems = toDoItems.filter(toDoItem => toDoItem !== item);
    setToDoItems(filteredItems);
  };

  const addItemHandler = (event) => {
    event.preventDefault();
    if (input.newTask === "") return;
    if (!toDoItems
      .find(toDoItem => toDoItem === input.newTask)) {
      setToDoItems([
        ...toDoItems,
        input.newTask
      ]);
    };
    setInput((prevValue) => {
      return {
        ...prevValue,
        newTask: ''
      }
    });
  };

  const editItemHandler = (e, item) => {
    e.stopPropagation();
    const foundItem = toDoItems.find(toDoItem => toDoItem === item);
    const input = prompt(`Edit "${foundItem}" to:`);

    if (input) {
      const newItems = [...toDoItems]
      const updatedItems = newItems.map(toDoItem => {
        if (toDoItem === item) {
          toDoItem = input;
        }
        return toDoItem;
      })
      setToDoItems(updatedItems);
    };
  };

  const toDoItemsArray = toDoItems.map((item, index) => {
    return (
      <ListItem
        toDoItem={item}
        id={index}
        key={index}
        deleteItem={deleteItemHandler}
        editItem={editItemHandler}
      />
    )
  });

  return (
    <div>
      <div className="title-wrapper">
        <i className="fa-solid fa-list-check fa-2xl header-logo"></i>
        <h1 style={{ fontWeight: "bold" }}>To Do List</h1>
      </div>
      <ListGroup className="list-wrapper" as="ol" numbered>
        {toDoItemsArray}
      </ListGroup>
      <Form style={{ width: "60%", margin: "0 auto 0 auto", marginTop: "1rem" }}>
        <div className="input-group mb-3">
          <input
            className="form-control"
            placeholder='Enter Task'
            name="newTask"
            value={input.newTask}
            onChange={inputHandler}>
          </input>
          <Button variant="primary" id="button-addon2" type="submit" onClick={addItemHandler}>
            <span className="item-btn">Add Item</span>
          </Button>
        </div>
        <div>
          <Button
            className="clear-all-btn"
            variant="secondary"
            size="sm"
            onClick={clearList}><span className="item-btn">Clear list</span> <i className="fa-solid fa-ghost"></i>
          </Button>
          <Button
            className="delete-last-btn"
            variant="secondary"
            size="sm"
            onClick={deleteLastItemHandler}><span className="item-btn">Delete last item</span> <i className="fa-solid fa-square-minus"></i>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default MyList;
