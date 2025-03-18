import { createServerClient } from "@updatedev/ssr/supabase";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const client = createServerClient(
    process.env.NEXT_PUBLIC_UPDATE_PUBLIC_KEY!,
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      billing: {
        environment: process.env.NODE_ENV === "production" ? "live" : "test",
      },
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const user = await client.auth.getUser();

  if (request.nextUrl.pathname.startsWith("/protected") && user.error) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (request.nextUrl.pathname === "/" && !user.error) {
    return NextResponse.redirect(new URL("/protected", request.url));
  }

  return response;
}
