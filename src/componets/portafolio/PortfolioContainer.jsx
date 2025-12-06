// Necesito 'useState' de React. Esta es la herramienta que me permite 
// que el componente 'recuerde' qué botón he presionado (el estado).
import React, { useState } from 'react';

// Traigo el código de mi primer proyecto (la calculadora).
import ProyectoModulo1 from './ProyectoModulo1'; 

// Objeto que me sirve de diccionario para mapear nombres a componentes.
// Si elijo 'calculadora', obtengo el componente ProyectoModulo1.
const projectMap = {
  'calculadora': ProyectoModulo1,
  // Aquí pondría 'lista-de-tareas': ProyectoModulo2, si tengo otro proyecto.
  'otro-proyecto': () => <h2>¡Este proyecto está en desarrollo!</h2>,
};

// Componente que maneja la lógica de la navegación.
function PortfolioContainer() {
  // Inicializo el estado. 'activeProject' guarda el nombre del módulo actual.
  // Empieza en 'calculadora' para que ese sea el primer módulo visible.
  const [activeProject, setActiveProject] = useState('calculadora'); 

  // Función que se encarga de revisar el estado y dibujar el componente correcto.
  const renderProject = () => {
    // Busco en mi diccionario 'projectMap' qué componente corresponde al nombre guardado.
    const Component = projectMap[activeProject];
    
    // Si encontré el componente (es decir, no es nulo/vacío), lo renderizo.
    // Si no lo encuentro, muestro un mensaje simple.
    return Component ? <Component /> : <h2>Selecciona un proyecto</h2>;
  };

  return (
    <div className="portfolio-section">
      <h3>Mi Portafolio Interactivo</h3>
      
      {/* -- Controles de Navegación (Botones) -- */}
      <div className="project-navigation">
        
        {/* Botón para la Calculadora. Al hacer click, guardo 'calculadora' en el estado. */}
        <button onClick={() => setActiveProject('calculadora')}>
          Mini-Calculadora
        </button>
        
        {/* Botón para el proyecto futuro. Al hacer click, guardo 'otro-proyecto'. */}
        <button onClick={() => setActiveProject('otro-proyecto')}>
          Otro Proyecto (Próximamente)
        </button>
      </div>

      <hr /> {/* Línea separadora simple */}

      {/* -- Área donde se pinta el Módulo Activo -- */}
      
      {/* Llamo a renderProject, y el resultado de esa función (el módulo) se dibuja aquí. */}
      <div className="project-display">
        {renderProject()}
      </div>
    </div>
  );
}

// Exporto para que App.jsx pueda usarlo.
export default PortfolioContainer;