import re
from calculations.complex_numbers import (
    add, sub, mul, div, pot, sqrt,
    sin, cos, tan, conjugate, complex_expression)


class Node:
    def __init__(self, type, value, left=None, right=None):
        self.type = type       
        self.value = value    
        self.left = left
        self.right = right


def build_tree(tokens):
    stack = []

    for token in tokens:
        
        if re.fullmatch(r"[+-]?\d+i", token):
            imag = int(token[:-1])
            stack.append(Node("number", complex_expression(0, imag)))

     
        elif token in ("i", "+i"):
            stack.append(Node("number", complex_expression(0, 1)))

    
        elif token == "-i":
            stack.append(Node("number", complex_expression(0, -1)))


        elif re.fullmatch(r"[+-]?\d+", token):
            stack.append(Node("number", complex_expression(int(token), 0)))


        elif token in ("sqrt", "√", "sen", "cos", "tan", "conj"):
            val = stack.pop()
            stack.append(Node("op", token, val, None))


        elif token == "u+":
            val = stack.pop()
            stack.append(Node("op", "u+", val, None))

        elif token == "u-":
            val = stack.pop()
            stack.append(Node("op", "u-", val, None))


        elif token in "+-*/^":
            
            if len(stack) < 2:
                raise ValueError(f"Operador '{token}' recebeu operandos insuficientes. Pilha: {stack}")

            right = stack.pop()
            left = stack.pop()

            if token == "+":
                stack.append(Node("op", "+", left, right))
            elif token == "-":
                stack.append(Node("op", "-", left, right))
            elif token == "*":
                stack.append(Node("op", "*", left, right))
            elif token == "/":
               stack.append(Node("op", "/", left, right))
            elif token == "^":
               stack.append(Node("op", "^", left, right))
               
        elif re.fullmatch(r"[a-d]", token):
            stack.append(Node("variable", token))
    

    return stack[0]


def evaluate(node):
    if node.type == "number":
        return node.value


    if node.value == "u+":
        return evaluate(node.left)
    if node.value == "u-":
        val = evaluate(node.left)
        return complex_expression(-val["real"], -val["imag"])

    if node.value == "sqrt":
        return sqrt(evaluate(node.left))
    if node.value == "sen":
        return sin(evaluate(node.left))
    if node.value == "cos":
        return cos(evaluate(node.left))
    if node.value == "tan":
        return tan(evaluate(node.left))
    
    if node.value == "conj":
        return conjugate(evaluate(node.left))

    left = evaluate(node.left)
    right = evaluate(node.right)

    if node.value == "+":
        return add(left, right)
    if node.value == "-":
        return sub(left, right)
    if node.value == "*":
        return mul(left, right)
    if node.value == "/":
        return div(left, right)
    if node.value == "^":
        return pot(left, right)




def serialize(node):
    if node is None:
        return None

    if node.type == "number":
        real = node.value["real"]
        imag = node.value["imag"]

        if imag == 0:
            name = f"{real}"
        elif real == 0:
            name = f"{imag}i"
        else:
            sign = "+" if imag > 0 else ""
            name = f"{real}{sign}{imag}i"

        return {"name": name}


    if node.value in ("u+", "u-", "sqrt", "sen", "cos", "tan"):
        return {
            "name": node.value,
            "children": [serialize(node.left)]  
        }

    return {
        "name": node.value,
        "children": [
            serialize(node.left),
            serialize(node.right)
        ]
    }
   