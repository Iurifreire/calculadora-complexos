import "./Calculator.css";






export default function Calculadora({ expressao, handleButtonClick, clearDisplay, setResultado, calculateResult, display }) {


    return (
        <div className="calculator-wrapper wrapper-style">

            <div className="calculator-inner-wrapper">
                <div className="calculator-display-container">
                    <div className="calculator-input">
                        {(display !== "" ? display : expressao)
                            .split("")
                            .map((char, index) => (
                                <span
                                    key={index}
                                    className={
                                        char === "i"
                                            ? "char-i"
                                            : /[0-9]/.test(char)
                                                ? "char-digit"
                                                : "char-other"
                                    }
                                >
                                    {char === "i" ? "𝑖" : char}
                                </span>
                            ))}
                    </div>
                </div>

                <div className="buttons-container">
                    <div className="buttons-grid">
                        <button className="clear-btn" onClick={clearDisplay} data-clear >Clear</button>
                        <button className="num-btn" onClick={() => handleButtonClick("0")} data-number>0</button>
                        <button className="special" onClick={() => handleButtonClick("i")} data-number>i</button>
                        <button className="special" onClick={() => handleButtonClick("(")} data-operation>(</button>
                        <button className="special" onClick={() => handleButtonClick(")")} data-number>)</button>
                        <button className="num-btn" onClick={() => handleButtonClick("1")} data-number>1</button>
                        <button className="num-btn" onClick={() => handleButtonClick("2")} data-number>2</button>
                        <button className="num-btn" onClick={() => handleButtonClick("3")} data-operation>3</button>
                        <button className="op-btn" onClick={() => handleButtonClick("-")} data-number>-</button>
                        <button className="op-btn" onClick={() => handleButtonClick("+")} data-number>+</button>
                        <button className="num-btn" onClick={() => handleButtonClick("4")} data-number>4</button>
                        <button className="num-btn" onClick={() => handleButtonClick("5")} data-operation>5</button>
                        <button className="num-btn" onClick={() => handleButtonClick("6")} data-number>6</button>
                        <button className="op-btn" onClick={() => handleButtonClick("*")} data-number>*</button>
                        <button className="op-btn" onClick={() => handleButtonClick("/")} data-number>÷</button>
                        <button className="num-btn" onClick={() => handleButtonClick("7")} data-operation>7</button>
                        <button className="num-btn" onClick={() => handleButtonClick("8")} data-number>8</button>
                        <button className="num-btn" onClick={() => handleButtonClick("9")} data-number>9</button>
                        <button className="op-btn" onClick={() => handleButtonClick("√")} data-number>√</button>
                        <button className="op-btn" onClick={() => handleButtonClick("^")} data-number>^</button>
                        <button className="function" onClick={() => handleButtonClick("sen")} data-number>sen</button>
                        <button className="function" onClick={() => handleButtonClick("cos")} data-number>cos</button>
                        <button className="function" onClick={() => handleButtonClick("tan")} data-number>tan</button>
                        <button onClick={calculateResult} data-equals className="span-two result-btn">=</button>
                    </div>
                </div>
            </div>

        </div>
    )
}