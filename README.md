# Spotify Clone

A full functioning Spotify clone usine Nextjs, Tailwind CSS & Spotify web API

[Live Demo](https://spoyify-clone-nextjs.vercel.app/)

## Features :

- Search for track and add them to your playlists
- Get current playing track on other devices
- Get New raleases.
- Recommendations based on your library.
- Your top Artists.
- Browse Categories.
- Browse your library.
- Read & Update playlists.
- Play/pause any track (Must have a premium spotify account).

- **there are some features that spotify might require a premium account to use.**

## Wanna try this code ?

### First

- Go to spotify web api webiste and create an app.
- open app page and add redirect url

```
http://localhost:3000/api/auth/callback/spotify
```

- open app settings and get the ID and secret

- update them your .env.local file like this

```bash
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_CLIENT_SECRET= <get this from spotify>
NEXT_PUBLIC_CLIENT_ID=get <this from spotify>
JWT_SECRET= <any random secret you write>
NEXTAUTH_SECRET= <your next auth secret>
```

### All set ?

open terminal and install packages

```bash
npm install
```

Or use nvm.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Change the url in middlware.js to http://localhost:3000/login

```
	if (!token && pathname !== '/login') {
		return NextResponse.rewrite(
			new URL('https://spoyify-clone-nextjs.vercel.app/login'),
			req.url
		);
	}
```

Open [http://localhost:3000/login](http://localhost:3000/login) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Notes :

- This project is for educational purposes.
- it`s still in development stage and there is always room for improvment
- This isn't a private code. it's open for anyone to clone or leave advice or file an issue.

**Happy coding**

#### Abdelrahman Abdullah
