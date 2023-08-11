import React, { useState, useEffect } from 'react';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const itemsLeft = todos.filter(todo => !todo.done).length;

  useEffect(() => {
    fetch('https://playground.4geeks.com/apis/fake/todos/user/francisco')
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      fetch('https://playground.4geeks.com/apis/fake/todos/user/francisco', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          label: newTodo,
          done: false,
          username: 'francisco'
        })
      })
      .then(response => response.json())
      .then(data => setTodos([...todos, data]))
      .catch(error => console.error('Error adding todo:', error));
      
      setNewTodo('');
    }
  };

  const handleToggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;

    fetch(`https://playground.4geeks.com/apis/fake/todos/user/francisco${updatedTodos[index].id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTodos[index])
    })
    .then(response => response.json())
    .then(data => setTodos(updatedTodos))
    .catch(error => console.error('Error updating todo:', error));
  };

  const handleRemoveTodo = (index) => {
    fetch(`https://playground.4geeks.com/apis/fake/todos/user/francisco${todos[index].id}`, {
      method: 'DELETE'
    })
    .then(() => {
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
    })
    .catch(error => console.error('Error removing todo:', error));
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && newTodo.trim() !== '') {
      handleAddTodo();
    }
  };

  return (
    <div className="container">
      <h1>todos</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleInputKeyPress}
        />
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.done ? 'completed' : ''}>
            <span onClick={() => handleToggleTodo(index)}>{todo.label}</span>
            <button onClick={() => handleRemoveTodo(index)}>X</button>
          </li>
        ))}
      </ul>
      <p>{itemsLeft} item{itemsLeft !== 1 ? 's' : ''} left</p>
    </div>
  );
};

export default Home;