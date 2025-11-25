from flask import Flask, request, jsonify
from flask_cors import CORS
from calculations.format import format_token, rpn, format_lisp
from calculations.binnary_tree import build_tree, serialize, evaluate
from calculations.complex_numbers import format_entry

app = Flask(__name__)
CORS(app)


@app.route("/api/calculate", methods=["POST"])
def calculate():
    try:
        data = request.get_json()
        expression = data.get("expression")

        if not expression:
            return jsonify({"error": "Nenhuma expressão recebida"}), 400

       
        tokens = format_token(expression)
        rpn_tokens = rpn(tokens)

        print("=== DEBUG EXPRESSÃO ===")
        print("Expressão:", expression)
        print("Tokens:", tokens)
        print("RPN:", rpn_tokens)
        
        print("=======================")

        tree = build_tree(rpn_tokens)

        result = evaluate(tree)
        formated = format_entry(result)
        
        print("=== ÁRVORE ===")
        print("Arvore: " , tree)
        print("Resultado: ", result)
        print("Formatado:", formated)
        print("=======================")

        # Adicionando a notação LISP:
        print("== NOTAÇÃO LISP ==")
        lisp_notation = format_lisp(tokens)

        print(lisp_notation)

        return jsonify({
            "tokens":tokens,
            "postfix": rpn_tokens,
            "tree": serialize(tree),
            "result": formated,
            "lisp_notation": lisp_notation
        })

    except Exception as e:
        print("ERRO NO SERVIDOR:", e)  
        return jsonify({"error": "Erro interno"}), 500


if __name__ == "__main__":
    app.run(debug=True)
