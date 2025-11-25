import "./ResultDisplay.css";
import { useNavigate } from "react-router-dom";





export default function ResultDisplay({ notacaoLisp, notacaoLisp2, arvore, clearLispNotation, setIsOpen}) {
    const navigate = useNavigate();

    return (
        <div className="result-container">
            <span>Notação LISP 1a expressão:</span>

            <div className="notation-lisp" role="region" aria-label="Notação LISP" tabIndex="0">
                <h3>{notacaoLisp}</h3>
            </div>

              <span>Notação LISP 2a expressão:</span>

            <div className="notation-lisp" role="region" aria-label="Notação LISP" tabIndex="0">
                <h3>{notacaoLisp2}</h3>
            </div>


            <div className="buttons-result-container">
                <button type="button" onClick={clearLispNotation}>Limpar</button>
                <button 
                type="button" onClick={
                notacaoLisp2
                ? () => {setIsOpen(true)}   // coloque sua função aqui
                : () => navigate('/tree', { state: { arvore } })
            }>{notacaoLisp2 ? "Verificar igualdade":"Gerar Árvore"}</button>
            </div>
        </div>
    );
}
