Note : This project is for educational purposes. it`s still in development state.

### Features :

- create, read, update, and delete playlists. (there is an issue in the creating playlist feature that i'm working on)
- Get current playing track on other devices
- Play/pause any track (if you have a premium spotify account)
- search for any track
- there are some features that spotify might require a premium account to get access to them.

## Getting Started

First,

- Go to spotify web api webiste and create an app.
- open app page and add redirect url

```
http://localhost:3000/api/auth/callback/spotify
```

- open app setting and get the ID and secret

- update your .env file

```
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_CLIENT_SECRET= get this from spotify
NEXT_PUBLIC_CLIENT_ID=get this from spotify
JWT_SECRET= any random secret you write
NEXTAUTH_SECRET= your next auth secret


```

# all set, now open your ide

open terminal and install packages

```
npm install

```

or use nvm if you can.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000/login](http://localhost:3000/login) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

This isn't a private code. it's open for anyone to clone or leave advice or file an issue.

Happy coding.
