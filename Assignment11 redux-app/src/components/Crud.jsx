import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, updateItem, deleteItem } from '../redux/Slice';
import './CRUD.css';


const CRUD = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [editId, setEditId] = useState(null);
  const items = useSelector((state) => state.data.items);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!name || !age) {
      alert('Please fill out both fields!');
      return;
    }

    if (editId) {
      dispatch(
        updateItem({
          id: editId,
          newItem: { id: editId, name, age },
        })
      );
      setEditId(null);
    } else {
      dispatch(
        addItem({
          id: Date.now(),
          name,
          age,
        })
      );
    }

    setName('');
    setAge('');
  };

  const handleEdit = (id, name, age) => {
    setName(name);
    setAge(age);
    setEditId(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div className="crud-container">
      <h1>CRUD with Name and Age</h1>
      <div className="input-group">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter age"
        />
        <button onClick={handleAdd}>{editId ? 'Update' : 'Add'}</button>
      </div>
      <ul className="crud-list">
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.name} ({item.age} years old)</span>
            <div>
              <button className="edit" onClick={() => handleEdit(item.id, item.name, item.age)}>
                Edit
              </button>
              <button className="delete" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default CRUD;
