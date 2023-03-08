/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

const Featured = (content) => {
	return (
		<div>
			<div className="flex-col justify-center items-center rounded-lg bg-[#1a1a1a] ease-in-out duration-300 hover:bg-[#292929] p-4 space-y-2 h-full">
				<div className="w-full ">
					<Image
						src={content.images[0].url}
						alt="Track Image"
						width={128}
						height={128}
						className="rounded-md"
					/>
				</div>
				<div>
					<p
						onClick={() => setPlaylistId(content.id)}
						className="cursor-pointer"
					>
						{content.name}
					</p>
					<p className="text-gray-500 text-xs cursor-pointer">
						{`By ${content.owner.display_name}`}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Featured;
