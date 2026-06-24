import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Mapping of document filenames to Google Drive / Docs IDs
const DRIVE_DOCS: Record<string, { id: string; type: "doc" | "pdf" }> = {
  "charte.pdf": {
    id: "1Es0cPxcjdEjmapXv4ls-RK3GuqP3VigMo3nWZLjPpxc",
    type: "doc",
  },
  "fdrtriennale.pdf": {
    id: "1n9pdxKAG-GmAiQK-TWzhRk32Ni5OJ_SI",
    type: "pdf",
  },
  "reglement.pdf": {
    id: "1nD64UwyEf6uva2GCXVtJ4Mk1iDL2TPuK",
    type: "pdf",
  },
  "statuts.pdf": {
    id: "1sJ3saX856umkcoK5a5uDzslUPjXDwW4J",
    type: "pdf",
  },
  "rapport.pdf": {
    id: "1uUEtfXxYOe9GawLaKHe94ChVTGqlHf2d",
    type: "pdf",
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename;

  // 1. Check if the file is mapped to a Google Drive / Docs ID
  const config = DRIVE_DOCS[filename];

  if (config) {
    try {
      const url =
        config.type === "doc"
          ? `https://docs.google.com/document/d/${config.id}/export?format=pdf`
          : `https://drive.google.com/uc?export=download&id=${config.id}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Google Drive API returned status ${response.status}`);
      }

      // Check if response is actually HTML (which means it's asking to sign in because the file is private)
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        console.error(`Error: Google Drive returned HTML instead of PDF for ID ${config.id}. The file is likely private/not shared publicly.`);
        
        // Try fallback to local file
        const filePath = path.join(process.cwd(), "public", "docs", filename);
        if (fs.existsSync(filePath)) {
          try {
            const fileBuffer = fs.readFileSync(filePath);
            return new NextResponse(fileBuffer, {
              headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `inline; filename="${filename}"`,
              },
            });
          } catch (e) {
            console.error(`Error reading local fallback file ${filename}:`, e);
          }
        }

        // Return a premium, beautiful instruction page guiding the user to make the file public on Google Drive
        const htmlContent = `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Configuration du Document — Xam Yoonu Reew Mi</title>
            <style>
              body {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                background-color: #0f172a;
                color: #f1f5f9;
                margin: 0;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
              }
              .card {
                background-color: #1e293b;
                border: 1px solid #334155;
                border-radius: 16px;
                padding: 2.5rem;
                max-width: 600px;
                width: 90%;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
                border-top: 4px solid #D4AF37;
                animation: fadeIn 0.4s ease-out;
              }
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
              h1 {
                font-size: 1.5rem;
                margin-top: 0;
                color: #f8fafc;
                display: flex;
                align-items: center;
                gap: 0.75rem;
              }
              p {
                color: #94a3b8;
                line-height: 1.6;
              }
              .alert {
                background-color: rgba(239, 68, 68, 0.1);
                border-left: 4px solid #ef4444;
                padding: 1rem;
                border-radius: 0 8px 8px 0;
                margin: 1.5rem 0;
                color: #fca5a5;
                font-size: 0.95rem;
              }
              ol {
                margin: 1.5rem 0;
                padding-left: 1.25rem;
                color: #e2e8f0;
              }
              li {
                margin-bottom: 0.75rem;
                line-height: 1.5;
              }
              li strong {
                color: #fff;
              }
              .code-block {
                background-color: #0f172a;
                padding: 0.75rem;
                border-radius: 6px;
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                font-size: 0.9rem;
                color: #38bdf8;
                word-break: break-all;
                margin: 0.5rem 0;
                border: 1px solid #1e293b;
              }
              .btn-container {
                text-align: center;
                margin-top: 2rem;
              }
              .btn {
                display: inline-block;
                background-color: #0F5B47;
                color: white;
                text-decoration: none;
                padding: 0.75rem 2.0rem;
                border-radius: 8px;
                font-weight: 600;
                transition: all 0.2s;
                border: 1px solid #168468;
                cursor: pointer;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              }
              .btn:hover {
                background-color: #168468;
                transform: translateY(-1px);
              }
              .btn:active {
                transform: translateY(0);
              }
            </style>
          </head>
          <body>
            <div class="card">
              <h1>
                <span>⚠️ Document non accessible publiquement</span>
              </h1>
              <p>Le document <strong>${filename}</strong> est lié à l'identifiant Google Drive suivant, mais cet identifiant requiert une connexion (accès privé) :</p>
              <div class="code-block">${config.id}</div>
              
              <div class="alert">
                <strong>Pourquoi ce message ?</strong><br>
                Google Drive redirige la demande vers un écran de connexion car le fichier n'est pas partagé publiquement. Le site ne peut donc pas le récupérer de manière anonyme pour l'afficher en PDF natif.
              </div>

              <p><strong>Pour rendre ce document accessible instantanément :</strong></p>
              <ol>
                <li>Ouvrez ce fichier dans votre <strong>Google Drive</strong>.</li>
                <li>Cliquez sur le bouton <strong>Partager</strong> en haut à droite.</li>
                <li>Dans la section <em>Accès général</em>, remplacez <strong>Accès limité</strong> par <strong>Tous les utilisateurs disposant du lien</strong>.</li>
                <li>Assurez-vous que le rôle associé est bien réglé sur <strong>Lecteur</strong>.</li>
                <li>Cliquez sur <strong>Terminé</strong> puis rechargez cette page.</li>
              </ol>

              <div class="btn-container">
                <button class="btn" onclick="window.location.reload()">Actualiser la page</button>
              </div>
            </div>
          </body>
          </html>
        `;
        return new NextResponse(htmlContent, {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        });
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="${filename}"`,
          "Cache-Control": "public, max-age=60", // cache for 1 minute to avoid rate limits while remaining fresh
        },
      });
    } catch (error) {
      console.error(`Error fetching document ${filename} from Google Drive:`, error);
      // fallback to local file if available, otherwise return error
    }
  }

  // 2. Fallback to local public file
  const filePath = path.join(process.cwd(), "public", "docs", filename);
  if (fs.existsSync(filePath)) {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="${filename}"`,
        },
      });
    } catch (e) {
      console.error(`Error reading local file ${filename}:`, e);
    }
  }

  return new NextResponse("Document non trouvé", { status: 404 });
}
