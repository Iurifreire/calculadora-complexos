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
    # sin(a+ib) = sin(a)cosh(b) + i cos(a)sinh(b)
    real = math.sin(a["real"]) * math.cosh(a["imag"])
    imag = math.cos(a["real"]) * math.sinh(a["imag"])
    return complex_expression(real, imag)

def cos(a):
    # cos(x+iy) = cos(x)cosh(y) - i sin(x)sinh(y)
    real = math.cos(a["real"]) * math.cosh(a["imag"])
    imag = -math.sin(a["real"]) * math.sinh(a["imag"])
    return complex_expression(real, imag)

def tan(a):
    return div(sin(a), cos(a))

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
