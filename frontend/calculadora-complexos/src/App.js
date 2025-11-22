import './App.css';
import Calculadora from './components/Calculator/Calculator';
import ResultDisplay from './components/ResultDisplay/ResultDisplay';
import { useState } from 'react';

function App() {

  const [expressao, setExpressao] = useState("");
  const [resultado, setResultado] = useState("");
  const [display, setDisplay] = useState("")
  const [arvore, setArvore] = useState(null);

  const handleButtonClick = (value) => {
    setExpressao((prev) => prev + value);
  }

  const clearDisplay = () => {
    setExpressao("");
    setResultado("");
    setDisplay("");
    setArvore(null);
  }

  async function calculateResult() {
    try {
      const response = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression: expressao }),
      });

      const data = await response.json();

      if (response.ok) {


        setResultado(`(${data.result})`);
        setDisplay(`(${data.result})`)
        setArvore(data.tree);
        console.log(data.result);

      } else {
        setResultado("Erro: " + data.error);
      }

    } catch (error) {
      setResultado("Erro na conexão com o servidor.");
    }
  }


  return (
    <div className="page-container">
      <div className="calculator-container">

        <Calculadora
          expressao={expressao}
          display={display}
          handleButtonClick={handleButtonClick}
          clearDisplay={clearDisplay}
          calculateResult={calculateResult}
        />

        <div className='calc-result-info'>
          <h4>Calculadora de Números Complexos</h4>

          {resultado !== "" && (
            <ResultDisplay
              resultado={resultado}
              arvore={arvore}
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
