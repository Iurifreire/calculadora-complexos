import './VariableInputModal.css'
import { useState, useMemo } from 'react';

export default function VariableInputModal({ onClose, onConfirm, tokens, clearVariables }) {

    const [valores, setValores] = useState({});

    const uniqueVars = useMemo(() => {
        const vars = [];
        for (const token of tokens) {
            if ("abcd".includes(token) && !vars.includes(token)) vars.push(token);
        }
        return vars;
    }, [tokens]);


    function handleCloseAndClear() {
        onClose();
        clearVariables();
    }

    function updateValue(variavel, valor) {
        setValores(prev => ({ ...prev, [variavel]: valor }));
    }

    function handleConfirm() {

        const confirmarVar = uniqueVars.filter(v => valores[v] === undefined || valores[v] === "");
        if (confirmarVar.length > 0) {
            return alert(`Preencha as variáveis: ${confirmarVar.join(", ")}`)
        }

        onConfirm(valores);
        handleCloseAndClear();
    }

    return (
        <div className='modal-overlay'>
            <div className='modal-container'>
                <div className='modal-header'>
                    <h3>Variáveis encontradas</h3>
                    <h1>{uniqueVars}</h1>
                </div>

                <div className='variable-grid'>
                    {uniqueVars.length === 0 && <p>Nenhuma variável válida encontrada.</p>}

                    {uniqueVars.map((variavel) => (
                        <div key={variavel} className='variable-row'>
                            <label style={{ display: 'block', marginBottom: 6, marginRight: 10 }}>{`${variavel.toUpperCase()}=`}</label>
                            <input
                                placeholder={`${variavel}`}
                                type='text'
                                pattern="[0-9+\-*/^() (i)]*"
                                value={valores[variavel] || ""}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (/^[0-9+\-*/^() (i)]*$/.test(val)) {
                                        setValores(prev => ({ ...prev, [variavel]: val }));
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div className='btns-container'>
                    <button onClick={handleCloseAndClear}>Fechar</button>
                    <button onClick={handleConfirm}>Confirmar</button>
                </div>
            </div>
        </div>
    );
}
