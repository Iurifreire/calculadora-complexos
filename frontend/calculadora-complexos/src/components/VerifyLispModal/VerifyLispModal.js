import { useEffect, useState } from "react";
import "./VerifyLispModal.css";

export default function VerifyLispModal({ onClose, notacaoLisp, notacaoLisp2 }) {

    const [closing, setClosing] = useState(false);

    function handleClose() {
        setClosing(true);
        setTimeout(() => onClose(), 280); 
    }

    return (
        <div className={`modal-overlay ${closing ? "closing" : ""}`} onClick={handleClose}>
            <div className={`modal-container ${closing ? "closing" : ""}`}
                 onClick={(e) => e.stopPropagation()}>

                <button className="close-btn" onClick={handleClose}>×</button>

                <h2>Comparar Expressões</h2>

                <div className="modal-body">
                    <p><strong>Expressão 1:</strong> {notacaoLisp}</p>
                    <p><strong>Expressão 2:</strong> {notacaoLisp2}</p>
                </div>

                
                <div className="modal-actions">
                    <button onClick={handleClose}>Fechar</button>
                    <button className="compare-btn">Igualdade</button>
                </div>
                

            </div>
        </div>
    );
}
