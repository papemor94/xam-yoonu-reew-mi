import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return new NextResponse("Identifiant d'image manquant", { status: 400 });
  }

  try {
    // URL directe de téléchargement Google Drive (ou via lh3)
    const googleDriveUrl = `https://lh3.googleusercontent.com/d/${id}`;
    
    // Le serveur effectue la requête (contournant les restrictions de cookies/CORS des navigateurs)
    const response = await fetch(googleDriveUrl);

    if (!response.ok) {
      console.error(`Erreur de récupération Google Drive pour l'ID ${id} : ${response.status}`);
      return new NextResponse(`Erreur Google Drive: ${response.status}`, { status: response.status });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        // Cache l'image pendant 1 jour pour éviter les limites de requêtes (rate limiting) de Google
        "Cache-Control": "public, max-age=86400, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Erreur dans le proxy d'image Google Drive:", error);
    return new NextResponse("Erreur Interne du Serveur", { status: 500 });
  }
}
