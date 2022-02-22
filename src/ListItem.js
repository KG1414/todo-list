import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const ListItem = (props) => {
    const { toDoItem, deleteItem, editItem } = props;
    const [isChecked, setIsChecked] = useState(false);

    const checkedItem = () => {
        setIsChecked(!isChecked);
    };

    return (
        <ListGroup.Item as="li" action variant="light" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <label>
                    <input
                        style={{ marginRight: "10px" }}
                        type="checkbox"
                        checked={isChecked}
                        onChange={checkedItem}>
                    </input>
                </label>
                {toDoItem}
            </div>
            <i
                style={{ cursor: "pointer" }}
                className="fa-solid fa-pen-to-square pen"
                onClick={(e) => editItem(e, toDoItem)}>
            </i>
            <i
                className="fa-solid fa-delete-left circle"
                style={{ cursor: "pointer" }}
                onClick={(e) => deleteItem(e, toDoItem)}>
            </i>
        </ListGroup.Item>
    )
};

export default ListItem;