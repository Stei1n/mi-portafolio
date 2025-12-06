// src/components/Portafolio/ProyectoModulo1.jsx

import React, { useState } from 'react';

function CalculadoraCompleta() {
  
  const [input, setInput] = useState('0'); 
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    
    // 1. Manejo del cero inicial
    if (input === '0' && value !== '.' && !['+', '-', '*', '/'].includes(value)) {
      setInput(value);
      return;
    }

    // 2. Evitar múltiples operadores seguidos
    const lastChar = input.slice(-1);
    const isOperator = (char) => ['+', '-', '*', '/'].includes(char);
    
    if (isOperator(value) && isOperator(lastChar)) {
      // Reemplaza el operador anterior por el nuevo (ej: 5*- se convierte en 5* )
      setInput(input.slice(0, -1) + value);
      return;
    }

    // 3. Agregar el valor
    setInput(input + value);
  };

  const handleCalculate = () => {
    try {
      // eval() ejecuta la operación matemática del string.
      const finalResult = eval(input);
      setResult(finalResult.toString()); 
      setInput(finalResult.toString());  
    } catch (e) {
      setResult('Error');
      setInput('Error');
    }
  };

  const handleClear = () => {
    setInput('0');
    setResult('');
  };

  // El orden de los botones importa para el grid 4x4
  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
  ];


  return (
    <div className="modulo-calculadora">
      <h4>Módulo 1: Calculadora Funcional</h4>
      
      {/* PANTALLA DE LA CALCULADORA */}
      <div className="calculator-display">
        <div className="input-line">{input}</div> 
        <div className="result-line">{result}</div>
      </div>
      
      {/* Botón de Limpieza (independiente del grid) */}
      <button onClick={handleClear} className="clear-button">C</button>

      {/* ÁREA DE BOTONES (Grid) */}
      <div className="buttons-grid">
        {buttons.map((btn) => (
          <button
            key={btn}
            // Lógica para saber qué función llamar
            onClick={() => 
              btn === '=' ? handleCalculate() : handleButtonClick(btn)
            }
            // Asigna la clase CSS para el color
            className={
              ['+', '-', '*', '/'].includes(btn) ? 'operator' : 
              btn === '=' ? 'equals' : 'number'
            }
          >
            {btn}
          </button>
        ))}
      </div>

    </div>
  );
}

export default CalculadoraCompleta;