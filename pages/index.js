import Sidebar from '@/components/Sidebar';
import { getSession } from 'next-auth/react';
import Player from '@/components/Player';
import HomeContent from '@/components/HomeContent';

export default function Home() {
	return (
		<div className="flex bg-[#121212] w-full h-screen overflow-hidden">
			<Sidebar />

			<main className="flex flex-col w-4/5">
				<div>
					<HomeContent />
				</div>
				<div className="sticky bottom-0 w-full">
					<Player />
				</div>
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	return {
		props: {
			session,
		},
	};
}
