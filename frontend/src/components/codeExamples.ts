export const codeExamples = [
  {
    language: "Python", file: "similarity.py", command: "python similarity.py",
    code: `from math import sqrt

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
  },
  {
    language: "C#", file: "RankProjects.cs", command: "dotnet run",
    code: `using System;
using System.Linq;

var projects = new[] {
    new { Name = "Image API", Stars = 24, Days = 3 },
    new { Name = "Ski shop", Stars = 18, Days = 12 },
    new { Name = "Portfolio", Stars = 15, Days = 1 }
};

var trending = projects
    .OrderByDescending(p => p.Stars / (p.Days + 1.0))
    .Take(2);

foreach (var p in trending)
    Console.WriteLine($"Trending: {p.Name}");`,
    output: "Trending: Portfolio\nTrending: Image API",
  },
  {
    language: "JavaScript", file: "jobs.js", command: "node jobs.js",
    code: `const delay = ms => new Promise(resolve =>
  setTimeout(resolve, ms)
);

async function job(name, ms) {
  await delay(ms);
  console.log(\`Finished: \${name}\`);
  return name;
}

const results = await Promise.all([
  job("thumbnails", 300),
  job("search index", 100),
]);
console.log(\`Ready: \${results.length} jobs\`);`,
    output: "Finished: search index\nFinished: thumbnails\nReady: 2 jobs",
  },
];
