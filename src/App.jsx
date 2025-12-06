// src/App.jsx

// Traigo el componente PortfolioContainer.jsx para poder usarlo en mi aplicación.
// Este es el 'cerebro' que decide qué proyecto se muestra.
import PortfolioContainer from './componets/portafolio/PortfolioContainer';
import './App.css'; // Esto carga todos los estilos (CSS) de mi proyecto.

// Esta es la función principal que define qué se va a ver en mi página.
function App() {
  return (
    // Todo mi contenido está dentro de este <div> principal.
    <div className="cv-interactiva">
      
      {/* Pongo un título grande para mi Hoja de Vida/Portafolio. */}
      <h1>Mi Hoja de Vida y Portafolio Modular</h1>
      
      {/* Aquí podría poner otros componentes de mi CV estática (ej: <Header />, <Skills />). */}
      
      {/* Mando a llamar al componente PortfolioContainer. 
          Todo el contenido interactivo y los módulos se pintarán aquí. */}
      <PortfolioContainer />
    </div>
  );
}

// Le digo a React que este componente es el principal que debe renderizar.
export default App;