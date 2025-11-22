import re

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
