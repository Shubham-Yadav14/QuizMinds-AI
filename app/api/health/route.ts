import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ health: "server running" });
}