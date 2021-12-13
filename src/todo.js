// Importing React and stylesheet

import React, { useState, useEffect } from "react";
import "./style.css";

// fetching data from localStorage, and converting it to array as it was stored in form of string
// in case nothing was stored in localStorage an empty array will be passsed

const getLocalData = () => {
  const lists = localStorage.getItem("list");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

// Defining the Todo component

const Todo = () => {
  // creating state variable for entry
  const [inputData, setInputData] = useState("");

  // for storing data to local storage
  const [items, setItems] = useState(getLocalData());

  // IN edit 1 this will be used to edit the list item
  // const [toEditItem, setToEditItem] = useState("");

  // adding item to list
  const addItem = () => {
    if (!inputData) {
      alert("Can't add empty item");
    } else {
      // storing the data in form of an object with id as the current time and name as the input

      const myInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
        completed: false,
      };
      setItems([...items, myInputData]);
      setInputData("");
    }
  };

  // for deleting the list item

  const deleteItem = (id) => {
    const updatedItem = items.filter((curElem) => {
      return curElem.id !== id;
    });
    setItems(updatedItem);
  };

  // in version 3 I will add a checkbox or tick item line
  // const changeStatus = (id) => {
  //   const updatedItem = items.map((curElem) => {
  //     if (curElem.id === id) {
  //       console.log("hi");

  //       return {
  //         ...items,
  //       };
  //     }
  //   });
  // };

  // Delete all entries button

  const removeAll = () => {
    setItems([]);
  };

  // using to store data to local Storage, converting the entiries to a long string

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(items));
  }, [items]);

  // Work for update 1
  // const editItem = (id) => {
  //   const editedItem = items.find((curElem) => {
  //     return curElem.id === id;
  //   });
  //   setInputData(editedItem.name);
  //   setToEditItem(id);
  // };

  // Following is the structure of the list
  return (
    <>
      <div className="main-container">
        <div className="image">
          <img className="check" src="./images/bg1.gif" alt="image will" />
          <h2 className="heading">Ayush's To-Do List:</h2>

          <div className="items">
            <input
              type="text"
              placeholder="Enter List Item"
              className="list"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            <i class="fas fa-plus" onClick={addItem}></i>
          </div>

          <div className="allitems">
            {items.map((curElem) => {
              return (
                <div className="eachitem" key={curElem.id}>
                  <p>{curElem.name}</p>
                  <div className="btngrp">
                    {/* <i
                      class="fas fa-pencil-alt"
                      onClick={() => editItem(curElem.id)}
                    ></i> */}
                    {/* <i
                      class="fas fa-check"
                      onClick={() => changeStatus(curElem.id)}
                    ></i> */}
                    <i
                      class="fas fa-trash-alt"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}

            <div></div>
          </div>

          <div className="showitems">
            <button className="btn" onClick={removeAll}>
              <span>Remove All</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
