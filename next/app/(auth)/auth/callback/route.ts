import { createClient } from "@/utils/update/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) return NextResponse.redirect(`${origin}/sign-in`);

  const client = await createClient();
  const { error } = await client.auth.verifyAuthFlowCode(code);
  if (error) {
    return NextResponse.redirect(`${origin}/sign-in`);
  }

  return NextResponse.redirect(`${origin}/protected`);
}
