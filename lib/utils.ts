import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isHtml(text: string): boolean {
  const htmlPattern = /<p|<h\d|<ul|<li|<strong|<em|<br/i;
  return htmlPattern.test(text);
}

export function convertPlaintextToHtml(text: string): string {
  if (!text) return "";
  if (isHtml(text)) return text;

  // Normalise les fins de ligne
  let formatted = text.replace(/\r\n/g, "\n").trim();

  // Convertit le gras **texte** en <strong>texte</strong> et l'italique *texte* en <em>texte</em>
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Découpe par blocs séparés par au moins deux retours à la ligne
  const blocks = formatted.split(/\n{2,}/);

  const htmlBlocks = blocks.map((block) => {
    const trimmedBlock = block.trim();
    if (!trimmedBlock) return "";

    const lines = trimmedBlock.split("\n");

    // Vérifie si c'est une liste à puces (lignes commençant par -, *, • ou des chiffres)
    const isList = lines.every(line => /^\s*([-*•]|\d+\.)\s+/.test(line));
    if (isList) {
      const listItems = lines.map(line => {
        const itemText = line.replace(/^\s*([-*•]|\d+\.)\s+/, "").trim();
        return `  <li>${itemText}</li>`;
      });
      return `<ul>\n${listItems.join("\n")}\n</ul>`;
    }

    // Vérifie si c'est un titre (commence par #, ##, ###)
    if (trimmedBlock.startsWith("###") || trimmedBlock.startsWith("##") || trimmedBlock.startsWith("#")) {
      const headerText = trimmedBlock.replace(/^#+\s+/, "").trim();
      return `<h3>${headerText}</h3>`;
    }

    // Si c'est une seule ligne, courte (< 80 caractères) et sans ponctuation finale, on en fait un titre h3
    if (lines.length === 1 && trimmedBlock.length < 80 && !/[.!?:]$/.test(trimmedBlock)) {
      return `<h3>${trimmedBlock}</h3>`;
    }

    // Par défaut, c'est un paragraphe
    // Si le bloc contient des retours à la ligne simples, on les remplace par des balises <br />
    const paragraphContent = lines.join("<br />");
    return `<p>${paragraphContent}</p>`;
  });

  return htmlBlocks.filter(Boolean).join("\n\n");
}
