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

  // Normalise les fins de ligne et découpe par ligne après nettoyage des extrémintés
  const lines = text.trim().replace(/\r\n/g, "\n").split("\n");
  
  let html = "";
  let inList = false;
  let currentParagraph = "";

  const closeParagraph = () => {
    if (currentParagraph) {
      const trimmed = currentParagraph.trim();
      // Si c'est court, sans ponctuation et sans retour chariot interne, on en fait un titre h3
      if (trimmed.length < 80 && !/[.!?:]$/.test(trimmed) && !trimmed.includes("<br />")) {
        html += `<h3>${trimmed}</h3>\n\n`;
      } else {
        html += `<p>${currentParagraph}</p>\n\n`;
      }
      currentParagraph = "";
    }
  };

  const closeList = () => {
    if (inList) {
      html += "</ul>\n\n";
      inList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Ligne vide : respecte l'espace
    if (trimmedLine === "") {
      closeList();
      if (currentParagraph) {
        closeParagraph();
      } else {
        // Ligne vide consécutive : on ajoute un <br /> pour respecter l'espacement
        html += "<br />\n";
      }
      continue;
    }

    // Convertit le gras **texte** et l'italique *texte*
    const formattedLine = trimmedLine
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Vérifie si c'est une puce de liste
    const isListItem = /^\s*([-*•]|\d+\.)\s+/.test(line);
    if (isListItem) {
      closeParagraph();
      if (!inList) {
        html += "<ul>\n";
        inList = true;
      }
      const itemText = formattedLine.replace(/^\s*([-*•]|\d+\.)\s+/, "").trim();
      html += `  <li>${itemText}</li>\n`;
      continue;
    }

    // Ferme la liste si on en sort
    closeList();

    // Vérifie si c'est un titre explicite (commence par #, ##, ###)
    if (formattedLine.startsWith("###") || formattedLine.startsWith("##") || formattedLine.startsWith("#")) {
      closeParagraph();
      const headerText = formattedLine.replace(/^#+\s+/, "").trim();
      html += `<h3>${headerText}</h3>\n\n`;
      continue;
    }

    // Ajoute au paragraphe courant
    if (currentParagraph) {
      currentParagraph += "<br />" + formattedLine;
    } else {
      currentParagraph = formattedLine;
    }
  }

  // Clôture des blocs restants
  closeList();
  closeParagraph();

  return html.trim();
}

export function getGoogleDriveImageUrl(idOrUrl: string): string {
  if (!idOrUrl) return "";
  if (idOrUrl.startsWith("/api/drive-image/")) return idOrUrl;
  
  if (idOrUrl.startsWith("https://lh3.googleusercontent.com/d/")) {
    const id = idOrUrl.replace("https://lh3.googleusercontent.com/d/", "");
    return `/api/drive-image/${id}`;
  }

  // Extrait l'identifiant du fichier Drive
  const match = idOrUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || idOrUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `/api/drive-image/${match[1]}`;
  }
  
  // Si c'est un identifiant brut (sans protocole http)
  if (idOrUrl.length > 15 && !idOrUrl.startsWith("http")) {
    return `/api/drive-image/${idOrUrl}`;
  }
  
  return idOrUrl;
}

