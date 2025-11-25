import math
import cmath


def complex_expression(real, imag):
    return {"real": real, "imag": imag}


def add(a, b):
    return complex_expression(a["real"] + b["real"], a["imag"] + b["imag"])

def sub(a, b):
    return complex_expression(a["real"] - b["real"], a["imag"] - b["imag"])

def mul(a, b):
    real = a["real"] * b["real"] - a["imag"] * b["imag"]
    imag = a["real"] * b["imag"] + a["imag"] * b["real"]
    return complex_expression(real, imag)

def div(a, b):
    denom = b["real"]**2 + b["imag"]**2
    real = (a["real"] * b["real"] + a["imag"] * b["imag"]) / denom
    imag = (a["imag"] * b["real"] - a["real"] * b["imag"]) / denom
    return complex_expression(real, imag)


def pot(a, b):
    
    ca = complex(a["real"], a["imag"])
    cb = complex(b["real"], b["imag"])
    result = ca ** cb
    return complex_expression(result.real, result.imag)

def sqrt(a):
    c = complex(a["real"], a["imag"])
    r = math.sqrt(abs(c))
    theta = math.atan2(a["imag"], a["real"]) / 2
    return complex_expression(r * math.cos(theta), r * math.sin(theta))


def sin(a):
    c = complex(a["real"], a["imag"])
    res = cmath.sin(c)
    return complex_expression(res.real, res.imag)

def cos(a):
    c = complex(a["real"], a["imag"])
    res = cmath.cos(c)
    return complex_expression(res.real, res.imag)

def tan(a):
    c = complex(a["real"], a["imag"])
    res = cmath.tan(c)
    return complex_expression(res.real, res.imag)

def conjugate(a):
    return complex_expression(a["real"], -a["imag"])


def format_entry(expression):
    real = expression["real"]
    imag = expression["imag"]

    real = round(real, 2)
    imag = round(imag, 2)

    if imag == 0:
        return str(real)

    if real == 0:
        if imag == 1:
            return "i"
        if imag == -1:
            return "-i"
        return f"{imag}i"


    operator = "+" if imag > 0 else "-"
    imag_abs = abs(imag)

    if imag_abs == 1:
        imag_part = "i"
    else:
        imag_part = f"{imag_abs}i"

    return f"{real} {operator} {imag_part}"
