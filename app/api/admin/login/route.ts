import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Identifiant et mot de passe requis" },
        { status: 400 }
      );
    }

    let isAuthenticated = false;

    // 1. Attempt verification via Supabase admins table
    if (supabase) {
      try {
        const { data: admin, error } = await supabase
          .from("admins")
          .select("*")
          .eq("username", username.trim())
          .maybeSingle();

        if (!error && admin && admin.password === password) {
          isAuthenticated = true;
        }
      } catch (dbError) {
        console.error("Supabase admins query exception:", dbError);
      }
    }

    // 2. Fallback to environment variables
    if (!isAuthenticated) {
      const expectedUsername = process.env.ADMIN_USERNAME || "admin_xyrm";
      const expectedPassword = process.env.ADMIN_PASSWORD || "xyrm&2026";

      if (username.trim() === expectedUsername && password === expectedPassword) {
        isAuthenticated = true;
      }
    }

    if (isAuthenticated) {
      const sessionToken = process.env.ADMIN_SESSION_TOKEN || "xyrm_secure_session_token_2026_f4d9b3a0e1c2";
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
