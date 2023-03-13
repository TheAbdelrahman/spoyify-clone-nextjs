import Sidebar from '@/components/Sidebar';
import { getSession } from 'next-auth/react';
import Player from '@/components/Player';
import HomeContent from '@/components/HomeContent';

export default function Home() {
	return (
		<div className="flex h-screen bg-[#121212] w-full overflow-x-hidden ">
			<Sidebar />

			<main className="flex flex-col w-full">
				<HomeContent />
				<div className="sticky bottom-0">
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
