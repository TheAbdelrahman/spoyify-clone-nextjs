import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
	const token = await getToken({ req, secret: process.env.JWT_SECRET });

	const { pathname } = req.nextUrl;

	// ALlow the request if the following is true:
	// 1) it's a request to next-auth session
	// 2) the token exists

	if (pathname.includes('/api/auth') || token) {
		return NextResponse.next();
	}

	/* Redirect to login page if the user is not logged in 
	and they are requesting a protected routeing a protected route*/

	if (!token && pathname !== '/login') {
		return NextResponse.rewrite(
			new URL('https://spoyify-clone-nextjs.vercel.app/login'),
			/*Note : change url when working o localhost http://localhost:3000/login
			 * and change it again to your domain name before deploying
			 */
			req.url
		);
	}
}
export const config = {
	matcher: ['/'],
};
