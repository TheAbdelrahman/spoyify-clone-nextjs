import Image from 'next/image';
import { getProviders, signIn } from 'next-auth/react';
import Link from 'next/link';

function Login({ providers }) {
	return (
		<div>
			{Object.values(providers).map((provider) => (
				<div
					onClick={() => signIn(provider.id, { callbackUrl: '/' })}
					key={provider.name}
					className="flex flex-col items-center bg-black min-h-screen w-full justify-center"
				>
					<Image
						width={100}
						height={100}
						className="cursor-pointer "
						src="/Spotify_Icon_RGB_Green.png"
						alt="spotify logo"
					/>
					<button className=" h-4 text-white p-5 rounded-full">
						Login With {provider.name}
					</button>
				</div>
			))}
		</div>
	);
}

export default Login;

export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}
