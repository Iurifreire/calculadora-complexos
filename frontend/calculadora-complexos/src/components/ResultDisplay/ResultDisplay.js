import "./ResultDisplay.css";
import { useNavigate } from "react-router-dom";





export default function ResultDisplay({ resultado, arvore }) {
    const navigate = useNavigate();

    return (
        <div className="result-container">
            <span>Notação em LISP: </span>

            <div className="notation-lisp" role="region" aria-label="Notação LISP" tabIndex="0">
                <h3>{resultado}</h3>
            </div>

            <div className="buttons-result-container">
                <button type="button" onClick={() => { }}>Limpar</button>
                <button type="button" onClick={() => navigate('/tree', { state: { arvore } })}>Gerar Árvore</button>
            </div>
        </div>
    );
}
