import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const expectedUsername = process.env.ADMIN_USERNAME || "admin_xyrm";
    const expectedPassword = process.env.ADMIN_PASSWORD || "K9#mP2$xL5!vT8&qZ3*wY7";
    const sessionToken = process.env.ADMIN_SESSION_TOKEN || "xyrm_secure_session_token_2026_f4d9b3a0e1c2";

    if (username === expectedUsername && password === expectedPassword) {
      const response = NextResponse.json({ success: true, message: "Connexion réussie" });
      
      // Set the secure admin session cookie
      response.cookies.set("xyrm_admin_session", sessionToken, {
        path: "/admin",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Identifiant ou mot de passe incorrect" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { success: false, error: "Une erreur interne est survenue" },
      { status: 500 }
    );
  }
}
