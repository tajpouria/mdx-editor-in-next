// app/api/login/route.ts

import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const expectedEmail = process.env.AUTH_EMAIL;
    const expectedPassword = process.env.AUTH_PASSWORD;

    if (!expectedEmail || !expectedPassword) {
      console.error("Missing authentication environment variables.");
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }

    if (email === expectedEmail && password === expectedPassword) {
      const token = btoa(`${email}:${password}`);
      return NextResponse.json(
        { message: "Login successful", token, email },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
