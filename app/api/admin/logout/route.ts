import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Déconnexion réussie" });
  
  // Clear the admin session cookie by setting its maxAge to 0 and date in the past
  response.cookies.set("xyrm_admin_session", "", {
    path: "/admin",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}
