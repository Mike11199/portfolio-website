export const codeExamples = [
  {
    language: "C#", file: "Projects.cs", command: "dotnet run",
    code: `using System;
using System.Linq;

var projects = new[] { "Portfolio", "Ski shop", "Image classifier" };
var matches = projects.Where(name => name.Contains("shop"));

foreach (var name in matches)
    Console.WriteLine($"Built: {name}");`,
    output: "Built: Ski shop",
  },
  {
    language: "Python", file: "projects.py", command: "python projects.py",
    code: `projects = ["Portfolio", "Ski shop", "Image classifier"]

matches = [
    name for name in projects
    if "shop" in name
]

for name in matches:
    print(f"Built: {name}")`,
    output: "Built: Ski shop",
  },
  {
    language: "JavaScript", file: "projects.js", command: "node projects.js",
    code: `const projects = ["Portfolio", "Ski shop", "Image classifier"];

const matches = projects.filter(name => name.includes("shop"));

for (const name of matches) {
  console.log(\`Built: \${name}\`);
}`,
    output: "Built: Ski shop",
  },
];
