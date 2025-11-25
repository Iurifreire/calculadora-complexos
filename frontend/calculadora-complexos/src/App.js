import './App.css';
import Calculadora from './components/Calculator/Calculator';
import ResultDisplay from './components/ResultDisplay/ResultDisplay';
import VerifyLispModal from './components/VerifyLispModal/VerifyLispModal';
import { useState } from 'react';

function App() {

  const [expressao, setExpressao] = useState("");
  const [notacaoLisp, setNotacaoLisp] = useState("");
  const [notacaoLisp2, setNotacaoLisp2] = useState("");
  const [display, setDisplay] = useState("")
  const [arvore, setArvore] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [closed, setClosed] = useState(true);

  const handleButtonClick = (value) => {
    setExpressao((prev) => prev + value);
  }

  const clearDisplay = () => {
    setExpressao("");
    setDisplay("");
    setArvore(null);
  }

  const clearLispNotation = () => {
      setNotacaoLisp("");
      setNotacaoLisp2("");
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

        // setResultado pra notação LISP:

        if (!notacaoLisp) {
            setNotacaoLisp(data.lisp_notation);
        } else {
            setNotacaoLisp2(data.lisp_notation)
        }


        
        
        setDisplay(`(${data.result})`)
        setArvore(data.tree);
        console.log(data.result);

      } else {
        setNotacaoLisp("Erro: " + data.error);
      }

    } catch (error) {
      setNotacaoLisp("Erro na conexão com o servidor.");
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

        {isOpen && (
        <VerifyLispModal
        onClose={() => setIsOpen(false)}
        notacaoLisp={notacaoLisp}
        notacaoLisp2={notacaoLisp2}
        />
)}



        <div className='calc-result-info'>
          <h4>Calculadora de Números Complexos</h4>

          {(notacaoLisp !== "" || notacaoLisp2 !== "")  && (
            <ResultDisplay
              notacaoLisp={notacaoLisp}
              notacaoLisp2={notacaoLisp2}
              clearLispNotation={clearLispNotation}
              setIsOpen={setIsOpen}
              arvore={arvore}
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
