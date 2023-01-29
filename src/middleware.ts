import { NextRequest, NextResponse } from 'next/server';
export const config = {
  matcher: ['/api/controle/:path*', '/controle/:path*'],
};

export function middleware(req: NextRequest) {
  // console.log('path', req.nextUrl.pathname, req.headers);
  if (req.nextUrl.pathname.startsWith('/api/controle')) {
    const authorization = req.headers.get('authorization');
    if (authorization) {
      const [_, token] = authorization.split(' ');
      if (!token) {
        return new Response(
          `{"message": "Auth required", "type": "missing.token"}`,
          {
            status: 401,
            headers: {
              'WWW-Authenticate': 'Basic realm="Secure Area"',
              'content-type': 'application/json',
            },
          }
        );
      }
    } else {
      return new Response(
        `{"message": "Auth required", "type": "missing.token"}`,
        {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
            'content-type': 'application/json',
          },
        }
      );
    }
  }
  if (req.nextUrl.pathname.startsWith('/controle')) {
    try {
      const existToken = req.cookies.get('vitaliza.token');
      if (!existToken) {
        return NextResponse.redirect(new URL('/', req.url));
        // console.log('sem cookie');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return NextResponse.next();
}
