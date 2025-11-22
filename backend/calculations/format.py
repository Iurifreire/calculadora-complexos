import re
from calculations.binnary_tree import build_tree

def format_token(expression):
    expression = expression.replace(" ", "")

    
    token_pattern = re.compile(
        r'''
        (\d+i)|                 
        (\d+)|                  
        (sen|cos|tan|sqrt)|     
        ([+\-*/^()])           
        ''',
        re.VERBOSE
    )

    matches = token_pattern.findall(expression)

    tokens = []
    for group in matches:
        for item in group:
            if item != "":
                tokens.append(item)

    return tokens


def rpn(tokens):
    priority = {
        "u+": 5, "u-": 5,
        "sen": 4, "cos": 4, "tan": 4, "sqrt": 4,
        "^": 3,
        "*": 2, "/": 2,
        "+": 1, "-": 1
    }

    assoc = {
        "^": "right",
        "u+": "right", "u-": "right"
    }

    output, stack = [], []
    prev = None

    for token in tokens:

        if re.fullmatch(r"\d+", token) or re.fullmatch(r"\d+i", token):
            output.append(token)

        elif token in priority:
            if token in "+-" and (prev is None or prev in priority or prev == "("):
                token = "u" + token

            while stack and stack[-1] != "(":
                top = stack[-1]
                if (
                    (assoc.get(token, "left") == "left"  and priority[token] <= priority[top]) or
                    (assoc.get(token, "left") == "right" and priority[token] <  priority[top])
                ):
                    output.append(stack.pop())
                else:
                    break

            stack.append(token)

        elif token == "(":
            stack.append(token)

        elif token == ")":
            while stack and stack[-1] != "(":
                output.append(stack.pop())
            stack.pop()

        prev = token

    while stack:
        output.append(stack.pop())

    return output

# Finalmente formatando para LISP, continuando o estandarte de deixar tudo em inglês:
def format_lisp(tokens):
    # Formata tokens em RPN e constroe a árvore:
    rpn_tokens = rpn(tokens)
    tree = build_tree(rpn_tokens)

    # Vai transformando a árvore na Expressão S e depois retorna:
    return tree_to_lisp(tree)

# Função recursiva, vai de nó em nó:
def tree_to_lisp(node):

    # *PRIMEIRO*, formatando os números, que devem ser as folhas na árvore binária:
    # Se o nó for um número, separa os valores reais e imaginários:
    if node.type == "number":
        real = node.value["real"]
        imaginary = node.value["imag"]
        
        # O principal, a formatação em si:
        
        # Quando a parte imaginaria for 0, so retorna a parte real
        if imaginary == 0:
            return f"{real}"
    
        # Se a parte real for 0...
        elif real == 0:
            # Se a parte imaginaria tiver o valor de 1, retorna a unidade imaginaria. O contrário se for -1:
            if imaginary == 1:
                return "i"
            elif imaginary == -1:
                return "(-i)"
            # Se nenhum dois dois, retorna o número "escalado", bi -> (* b i):
            else:
                return f"(* {imaginary} i)"

        # Se o número for realmente complexo, ou seja tanto a parte real quanto a imaginaria for diferente de 0:
        else:
            # a + bi -> (+ a (* b i))
            return f"(+ {real} (* {imaginary} i))"
    

    # *SEGUNDO*, formatando os operadores unários, aquelas que só utilizam um operando:
    if node.value in ("u+", "u-", "sqrt", "sen", "cos", "tan"):
        # Formata o operando, que deve ser o nó na esquerda na árvore binária:
        operand = tree_to_lisp(node.left)

        # As condicionais para cada operando:
        if node.value == "u+":
            # a+ -> a
            return operand
        
        elif node.value == "u-":
            # a- -> -a
            return f"-{operand}"
        
        elif node.value == "sqrt":
            # Preciso dar uma olhada melhor na raiz quadrada....
            return f"(v {operand})"
        
        elif node.value == "sen":
            # sen a
            return f"(sen {operand})"
        elif node.value == "cos":
            # cos a
            return f"(cos {operand})"
        elif node.value == "tan":
            # tan a
            return f"(tan {operand})"
    
    # *TERCEIRO*, formatando os operadores binários:
    if node.value in ("+", "-", "*", "/", "^"):
        # Aplica a recursão, primeiro na esquerda depois na direita, obedecendo a hierarquia das árvores binárias:
        left = tree_to_lisp(node.left)
        right = tree_to_lisp(node.right)

        # A aplicação é a mesma para todos os operadores, a + b -> (+ a b):
        return f"({node.value} {left} {right})"