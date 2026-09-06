export const typescriptExample = {
    language: "TypeScript", file: "annotations.ts", command: "npx tsx annotations.ts",
    code: `// Rename an image annotation and undo the edit.

interface BoundingBox {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

let box: BoundingBox = {
  label: "person", x: 20, y: 40, width: 80, height: 160,
};
// Keep earlier versions so edits can be undone.
const history: BoundingBox[] = [];

const rename = (label: string): void => {
  // Save a copy before replacing the current label.
  history.push({ ...box });
  box = { ...box, label };
};

const undo = (): void => {
  // Restore the latest saved version, if one exists.
  const previous = history.pop();
  if (previous) box = previous;
};

console.log(\`Original label: \${box.label}\`);
rename("skier");
console.log(\`Changed label: \${box.label}\`);
undo();
console.log(\`Undo: \${box.label}\`);`,
    output: "Original label: person\nChanged label: skier\nUndo: person",
  };
