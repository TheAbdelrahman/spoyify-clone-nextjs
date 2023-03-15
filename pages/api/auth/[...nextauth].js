import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import SpotifyAPI, { LOGIN_URL } from '../../../lib/Spotify';

//async function refreshAccessToken(token) {}

export default NextAuth({
	providers: [
		SpotifyProvider({
			clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
			authorization: LOGIN_URL,
		}),
	],
	secret: process.env.JWT_SECRET,
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async jwt({ token, account, user }) {
			// Initil Sign In
			if (account && user) {
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires:
						Math.floor(Date.now()) / 1000 + account.expires_at,
				};
			}

			// Return previous token if the access token hasn't expired yet
			else if (Date.now() < token.accessTokenExpires) {
				console.log('Token is valid ...');
				return token;
			} else {
				try {
					// Access Token expired, so refresh it...token
					console.log('Token expired, refreshing...');

					SpotifyAPI.setAccessToken(token.accessToken);
					SpotifyAPI.setRefreshToken(token.refreshToken);

					const { body: refreshedToken } =
						await SpotifyAPI.refreshAccessToken();

					console.log('Refreshed token is', refreshedToken);

					return {
						...token,
						accessToken: refreshedToken.access_token,
						accessTokenExpires:
							Math.floor(Date.now()) / 1000 + refreshedToken.expires_in,
						refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
					};
				} catch (error) {
					console.error('Error refreshing access token', error);

					return {
						...token,
						error: 'RefreshAccessTokenError',
					};
				}
			}

			//return await refreshAccessToken(token);
		},

		async session({ session, token }) {
			session.user.accessToken = token.accessToken;
			session.user.refreshToken = token.refreshToken;
			session.user.username = token.username;

			return session;
		},
	},
});
