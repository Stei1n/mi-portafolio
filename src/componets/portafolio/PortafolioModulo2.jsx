// src/components/Portafolio/ProyectoModulo2.jsx

import React, { useState } from 'react';

function ListaDeTareas() {
  
  // 1. Estado principal: Un arreglo de objetos para guardar la lista de tareas.
  // Cada tarea tendrá un ID único, el texto, y si está completada (true/false).
  const [todos, setTodos] = useState([]); 
  
  // 2. Estado para el input: Guarda el texto que el usuario está escribiendo.
  const [newTask, setNewTask] = useState('');
  
  // 3. Contador para IDs únicos: Es crucial para que React sepa qué elemento es cuál.
  const [idCounter, setIdCounter] = useState(0); 

  // ----------------------------------------------------
  // FUNCIÓN 1: Agregar Nueva Tarea (al presionar el botón o Enter)
  // ----------------------------------------------------
  const handleAddTask = () => {
    // Si el campo está vacío o solo tiene espacios, no hago nada.
    if (newTask.trim() === '') return;

    // Creo el nuevo objeto de tarea.
    const newTodo = {
      id: idCounter, // Uso el contador actual como ID.
      text: newTask.trim(),
      completed: false,
    };

    // Actualizo el estado 'todos': agrego la nueva tarea al arreglo existente.
    setTodos([...todos, newTodo]); // Uso el operador spread (...) para no borrar las viejas.
    
    // Limpio el campo de entrada y aumento el contador de ID.
    setNewTask(''); 
    setIdCounter(idCounter + 1);
  };

  // ----------------------------------------------------
  // FUNCIÓN 2: Marcar Tarea como Completada
  // ----------------------------------------------------
  const handleToggleComplete = (idToToggle) => {
    // Mapeo (recorro) la lista de tareas para encontrar la tarea que quiero cambiar.
    const updatedTodos = todos.map((todo) => {
      // Si el ID coincide, creo una COPIA del objeto y cambio 'completed'.
      if (todo.id === idToToggle) {
        return { ...todo, completed: !todo.completed };
      }
      // Si el ID no coincide, devuelvo la tarea sin cambios.
      return todo;
    });
    
    // Actualizo la lista con el nuevo arreglo.
    setTodos(updatedTodos);
  };

  // ----------------------------------------------------
  // FUNCIÓN 3: Eliminar Tarea
  // ----------------------------------------------------
  const handleDeleteTask = (idToDelete) => {
    // Uso el método 'filter' de JavaScript: crea un nuevo arreglo
    // que incluye solo las tareas cuyo ID *no* coincide con el que queremos borrar.
    const filteredTodos = todos.filter((todo) => todo.id !== idToDelete);
    
    // Actualizo el estado con el nuevo arreglo filtrado.
    setTodos(filteredTodos);
  };


  return (
    <div className="modulo-todo-list">
      <h4>Módulo 2: Lista de Tareas (To-Do List)</h4>
      
      {/* -------------------- Área de Entrada -------------------- */}
      <div className="todo-input-area">
        <input
          type="text"
          placeholder="Escribe una nueva tarea..."
          value={newTask} // El valor del input está atado al estado 'newTask'.
          onChange={(e) => setNewTask(e.target.value)} // Al escribir, actualizo 'newTask'.
          // Esto permite agregar con la tecla Enter
          onKeyPress={(e) => { 
            if (e.key === 'Enter') handleAddTask(); 
          }}
        />
        <button onClick={handleAddTask}>Agregar</button>
      </div>

      {/* -------------------- Lista de Tareas -------------------- */}
      <ul className="todo-list">
        {/* Uso el método 'map' para recorrer el arreglo 'todos' 
            y dibujar un <li> por cada tarea en el estado. */}
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            
            {/* Texto de la tarea, que cambia de estilo si está completada */}
            <span 
              onClick={() => handleToggleComplete(todo.id)}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {todo.text}
            </span>
            
            {/* Botón para eliminar la tarea */}
            <button onClick={() => handleDeleteTask(todo.id)} className="delete-btn">
              Eliminar
            </button>
          </li>
        ))}
        
        {/* Mensaje si la lista está vacía */}
        {todos.length === 0 && <p>¡No tienes tareas pendientes!</p>}
      </ul>
    </div>
  );
}

export default ListaDeTareas;