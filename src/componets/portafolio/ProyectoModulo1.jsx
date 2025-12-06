// Traigo useState para que este componente recuerde los números y resultados.
import React, { useState } from 'react';

// Defino mi componente de calculadora completa.
function CalculadoraCompleta() {
  
  // input: Guarda lo que el usuario está escribiendo o la expresión matemática (ej: "5+3").
  const [input, setInput] = useState('0'); 
  // result: Guarda el resultado final de la última operación, se muestra pequeño.
  const [result, setResult] = useState('');

  // ----------------------------------------------------
  // FUNCIÓN para manejar clicks en números y operadores (+, -, *, /)
  // ----------------------------------------------------
  const handleButtonClick = (value) => {
    
    // Si la pantalla solo tiene '0', lo reemplazamos por el primer número que toque.
    if (input === '0' && value !== '.') {
      setInput(value);
      return;
    }

    // Lógica para evitar poner dos operadores seguidos (ej: 5++ )
    const lastChar = input.slice(-1); // Obtiene el último caracter.
    const isOperator = (char) => ['+', '-', '*', '/'].includes(char); // Revisa si es operador.
    
    if (isOperator(value) && isOperator(lastChar)) {
      // Si ya hay un operador y toco otro, reemplazo el viejo por el nuevo.
      setInput(input.slice(0, -1) + value);
      return;
    }

    // Si no hay reglas que romper, simplemente agregamos el nuevo valor al final.
    setInput(input + value);
  };

  // ----------------------------------------------------
  // FUNCIÓN para calcular (al presionar '=')
  // ----------------------------------------------------
  const handleCalculate = () => {
    try {
      // eval() toma el string de la expresión ("5+3*2") y lo calcula.
      const finalResult = eval(input);
      setResult(finalResult.toString()); // Guardo el resultado pequeño.
      setInput(finalResult.toString());  // Muestro el resultado en la pantalla principal.
    } catch (e) {
      // Si la expresión es inválida (ej: "5+"), muestro un error.
      setResult('Error');
      setInput('Error');
    }
  };

  // ----------------------------------------------------
  // FUNCIÓN para Limpiar (al presionar 'C')
  // ----------------------------------------------------
  const handleClear = () => {
    setInput('0'); // Vuelvo el input principal a cero.
    setResult(''); // Limpio el resultado secundario.
  };

  // -- Definición de Botones (Array) --
  // Este array define el orden de los botones en la cuadrícula 4x4.
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
        {/* Muestra la expresión que se está escribiendo (ej: 5*3+8) */}
        <div className="input-line">{input}</div> 
        {/* Muestra el resultado de la última operación si es diferente del input */}
        <div className="result-line">{result}</div>
      </div>
      
      {/* Botón de Limpieza (C) - Siempre va al inicio */}
      <button onClick={handleClear} className="clear-button">C</button>

      {/* ÁREA DE BOTONES - Se usa el CSS grid para organizarlos */}
      <div className="buttons-grid">
        {/* Usamos 'map' de JavaScript para dibujar cada botón del array 'buttons'. */}
        {buttons.map((btn) => (
          <button
            key={btn} // React necesita una clave única para cada elemento en la lista.
            // Lógica para saber qué función llamar al click:
            onClick={() => 
              // Si el botón es '=', llamamos a handleCalculate.
              // Si es cualquier otro valor, llamamos a handleButtonClick.
              btn === '=' ? handleCalculate() : handleButtonClick(btn)
            }
            // Asigna la clase CSS para el color y el diseño:
            className={
              // Si es operador, clase 'operator'.
              ['+', '-', '*', '/'].includes(btn) ? 'operator' : 
              // Si es '=', clase 'equals'.
              btn === '=' ? 'equals' : 'number' // Si no, es un número normal.
            }
          >
            {btn} {/* El texto visible del botón */}
          </button>
        ))}
      </div>

    </div>
  );
}

// Exporto para que el componente padre (PortfolioContainer) pueda importarlo y dibujarlo.
export default CalculadoraCompleta;