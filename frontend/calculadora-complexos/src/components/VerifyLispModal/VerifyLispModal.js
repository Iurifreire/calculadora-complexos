import { useEffect, useState } from "react";
import "./VerifyLispModal.css";

export default function VerifyLispModal({ onClose, notacaoLisp, notacaoLisp2, notacaoIguais, verifyNotationLisp, iguaisFlag }) {

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
                {!notacaoIguais || notacaoIguais == "" ? (
                    <div className="modal-body">
                        <p><strong>Expressão 1:</strong> {notacaoLisp}</p>
                        <p><strong>Expressão 2:</strong> {notacaoLisp2}</p>
                    </div>
                ) :
                    <div className={`modal-body-result ${iguaisFlag ? "green-text" : "red-text"}`}>
                        <div className="result-style">
                            <h3>{notacaoIguais}</h3>
                        </div>
                    </div>
                }


                <div className="modal-actions">
                    <button onClick={handleClose}>Fechar</button>
                    <button className="compare-btn" onClick={() => verifyNotationLisp(notacaoLisp, notacaoLisp2)}>Igualdade</button>
                </div>

            </div>
        </div>
    );
}
