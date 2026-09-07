import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import css from "highlight.js/lib/languages/css";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import go from "highlight.js/lib/languages/go";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import kotlin from "highlight.js/lib/languages/kotlin";
import markdown from "highlight.js/lib/languages/markdown";
import plaintext from "highlight.js/lib/languages/plaintext";
import powershell from "highlight.js/lib/languages/powershell";
import python from "highlight.js/lib/languages/python";
import ruby from "highlight.js/lib/languages/ruby";
import rust from "highlight.js/lib/languages/rust";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";

const languages = {
  bash, cpp, csharp, css, dockerfile, go, java, javascript, json, kotlin,
  markdown, plaintext, powershell, python, ruby, rust, sql, typescript, xml, yaml,
};

for (const [name, definition] of Object.entries(languages)) {
  hljs.registerLanguage(name, definition);
}

const aliases: Record<string, string> = {
  "c#": "csharp",
  docker: "dockerfile",
  "gitlab ci": "yaml",
  html: "xml",
  postgresql: "sql",
  text: "plaintext",
};

export const highlightCode = (code: string, language = "text") => {
  const name = language.trim().toLowerCase();
  const syntax = aliases[name] ?? name;
  return hljs.highlight(code, {
    language: hljs.getLanguage(syntax) ? syntax : "plaintext",
    ignoreIllegals: true,
  }).value;
};
