import './App.css';
import Calculadora from './components/Calculator/Calculator';
import ResultDisplay from './components/ResultDisplay/ResultDisplay';
import VerifyLispModal from './components/VerifyLispModal/VerifyLispModal';
import VariableInputModal from './components/VariableInputModal/VariableInputModal';
import { useState } from 'react';

function App() {

  const [expressao, setExpressao] = useState("");
  const [notacaoLisp, setNotacaoLisp] = useState("");
  const [notacaoLisp2, setNotacaoLisp2] = useState("");
  const [notacaoIguais, setNotacaoIguais] = useState("");
  const [iguaisFlag, setIguaisFlag] = useState(null);
  const [display, setDisplay] = useState("")
  const [variaveis, setVariaveis] = useState(['a', 'b', 'c', 'd'])
  const [variavelEncontrada, setVariavelEncontrada] = useState(false);
  const [tokensFormatados, setTokensFormatados] = useState([]);
  const [arvore, setArvore] = useState(null);
  const [isOpen, setIsOpen] = useState(false);




  const handleButtonClick = (value) => {
    setExpressao((prev) => prev + value);
  }

  const clearDisplay = () => {
    setExpressao("");
    setDisplay("");
    setArvore(null);
    setTokensFormatados([]);
  }

  const clearVariables = () => {
    setTokensFormatados([]);
  }

  const clearLispNotation = () => {
    setNotacaoLisp("");
    setNotacaoLisp2("");
    setNotacaoIguais("");
  }


  const verifyNotationLisp = (notacaoLisp, notacaoLisp2) => {
    if (notacaoLisp === notacaoLisp2) {
      setIguaisFlag(true)
      setNotacaoIguais("As expresões são IGUAIS!")
    } else {
      setIguaisFlag(false)
      setNotacaoIguais("As expressões são DIFERENTES...")
    }
  }


  // Basicamente é o format_token, porém adaptado para ser utilizado no frontend com JS. A razão para tanto é que
  // o format_token vem via fetch da api, pela variavel data, e devemos analizar as varáveis antes de acionar a API.
  function formatTokenJS(expression) {
    expression = expression
      .replace(/\s+/g, "")
      .replace(/z̄/g, "conj")
      .replace(/√/g, "sqrt");

    const tokenPattern = /(\d+(\.\d+)?i)|(i)|(\d+(\.\d+)?)|(sen|cos|tan|sqrt|conj)|([a-d])|([+\-*/^()])/g;
    const tokens = [...expression.matchAll(tokenPattern)].map(m => m[0]);

    return tokens.map(token => token === "i" ? "1i" : token);
  }

  // É a mesma função do backend, para implementar multiplicação implícita, mas adaptada para o React/Node.js
  function implicit_multiJS(tokens) {
    const isNumber = token => /^\d+(\.\d+)?$/.test(token);
    const isImag = token => /^\d+(\.\d+)?i$/.test(token);
    const isVar = token => /^[a-d]$/.test(token);
    const isFunc = token => /^(sen|cos|tan|sqrt|conj)$/.test(token);
    const isLPar = token => token === "(";
    const isRPar = token => token === ")";

    const saida = [];
    for (let i = 0; i < tokens.length; i++) {
      const atual = tokens[i];

      if (i > 0) {
        const anterior = saida[saida.length - 1];
        const anteriorIsValue = isNumber(anterior) || isImag(anterior) || isVar(anterior) || isRPar(anterior);
        const atualIsValue = isNumber(atual) || isImag(atual) || isVar(atual) || isLPar(atual);

        if (anteriorIsValue && atualIsValue) {
          saida.push("*");
        }
      }

      saida.push(atual);
    }

    return saida;
  }


  function handleVariablesResolved(valores) {

    let tokens = formatTokenJS(expressao);

    const substituicao = tokens.map(valor =>
      (/^[a-d]$/.test(valor) && valores[valor] !== undefined)
        ? String(valores[valor])
        : valor
    );

    const comMulti = implicit_multiJS(substituicao);

    const novaExpressao = comMulti.join("");
    setExpressao(novaExpressao);
    setDisplay(novaExpressao);
    setVariavelEncontrada(false);

    calculateResult();
  }




  async function calculateResult() {
    try {

      const tokens = formatTokenJS(expressao)
      const variaveisEncontradas = tokens.filter(token => variaveis.includes(token))


      if (variaveisEncontradas.length > 0) {
        setTokensFormatados(tokens)
        setVariavelEncontrada(true)
      }

      const response = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression: expressao }),
      });

      const data = await response.json();



      if (variaveisEncontradas.length > 0) {
        return console.log(`A expressão contém variáveis! Favor dar o tratamento adequado. ${variaveisEncontradas}`)
      }

      if (response.ok) {


        console.log("PRINT DO OBJETO DATA: ")
        console.log(data)
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
            verifyNotationLisp={verifyNotationLisp}
            notacaoLisp={notacaoLisp}
            notacaoLisp2={notacaoLisp2}
            notacaoIguais={notacaoIguais}
            expressao={expressao}
            iguaisFlag={iguaisFlag}
          />
        )}
        {tokensFormatados.length > 0 && (
          <VariableInputModal
            onClose={() => setVariavelEncontrada(false)}
            clearVariables={clearVariables}
            tokens={tokensFormatados}
            onConfirm={handleVariablesResolved}
          />
        )}

        <div className='calc-result-info'>
          <h4>Calculadora de Números Complexos</h4>

          {(notacaoLisp !== "" || notacaoLisp2 !== "") && (
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
