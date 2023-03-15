/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';

const Release = ({ content }) => {
	const id = content.id;
	return (
		<Link href={`/release/${id}`}>
			<div className="flex-col justify-center items-center rounded-lg bg-[#1a1a1a] ease-in-out duration-300 hover:bg-[#292929] p-4 space-y-2 h-full w-max overflow-y-hide">
				<div>
					<Image
						src={content.images[0].url}
						alt="Track Image"
						width={128}
						height={128}
						className="rounded-md"
					/>
				</div>
				<div className="w-32">
					<p className="cursor-pointer text-white truncate">{content.name}</p>
					<p className="text-gray-500 text-xs cursor-pointer truncate">
						{`By ${content.artists[0].name}`}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default Release;
