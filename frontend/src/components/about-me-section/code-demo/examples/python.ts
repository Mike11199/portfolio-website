export const pythonExample = {
    language: "Python", file: "similarity.py", command: "python similarity.py",
    code: `"""
Image similarity search using cosine similarity.
Uses short, made-up embeddings for demonstration.
"""

from math import sqrt

def cosine(a, b):
    """Compare embeddings: closer to 1 means more similar."""
    dot_product = 0
    a_squared_length = 0
    b_squared_length = 0

    for i in range(len(a)):
        dot_product += a[i] * b[i]
        a_squared_length += a[i] ** 2
        b_squared_length += b[i] ** 2

    a_length = sqrt(a_squared_length)
    b_length = sqrt(b_squared_length)

    return dot_product / (a_length * b_length)

# Tiny example embeddings; real ones have many more numbers.
query = [0.9, 0.1, 0.8]
images = {
    "snowy trail": [0.8, 0.2, 0.9],
    "city street": [0.1, 0.9, 0.2],
}

# Image search compares the query embedding with each image.
for name, vector in images.items():
    score = cosine(query, vector)
    print(f"{name}: {score:.3f} similarity")`,
    output: "snowy trail: 0.990 similarity\ncity street: 0.303 similarity",
  };
