import SearchBar from '@/components/SearchBar';
import Sidebar from '@/components/Sidebar';
import Player from '@/components/Player';

const findTrack = () => {
	return (
		<div className="flex bg-[#121212]  h-screen overflow-hidden p-0">
			<div>
				<Sidebar />
			</div>
			<div className="flex-col w-full">
				<main className="ml-0 ">
					<section className="flex flex-col">
						<div className="h-screen">
							<div>
								<SearchBar />
							</div>
						</div>
					</section>
				</main>
				<div className="sticky bottom-0 w-full">
					<Player />
				</div>
			</div>
		</div>
	);
};

export default findTrack;
