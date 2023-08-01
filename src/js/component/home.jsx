import React, { useState } from 'react';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const itemsLeft = todos.length;

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { title: newTodo }]);
      setNewTodo('');
    }
  };

  const handleRemoveTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
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
          <li key={index}>
            {todo.title}
            <button onClick={() => handleRemoveTodo(index)}>X</button>
          </li>
        ))}
      </ul>
      <p>{itemsLeft} item{itemsLeft !== 1 ? 's' : ''} left</p>
    </div>
  );
};

export default Home;