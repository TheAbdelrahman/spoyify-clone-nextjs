/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';

const Playlist = ({ content, href, onClick }) => {
	return (
		<Link
			className="flex items-center min-w-full min-h-full justify-center rounded-lg p-4  bg-[#1a1a1a] ease-in-out duration-300 hover:bg-[#292929]"
			onClick={onClick}
			href={href}
		>
			<div className="flex-col justify-center items-center p-4  space-y-2">
				<Image
					src={content.images[0]?.url}
					alt="Playlist Image"
					width={128}
					height={128}
					className="w-full rounded-md"
				/>
				<div>
					<p className="cursor-pointer">{content.name}</p>
					<p className="text-gray-500 text-xs cursor-pointer">
						{`By ${content.owner.display_name}`}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default Playlist;
