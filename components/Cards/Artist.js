import Link from 'next/link';
import Image from 'next/image';

export const Artist = ({ content }) => {
	return (
		<Link href="/">
			<div className="flex-col justify-center items-center rounded-lg bg-[#1a1a1a] ease-in-out duration-300 hover:bg-[#292929] p-4 space-y-2 h-full w-max overflow-y-hide">
				<div>
					<Image
						src={content.images[0].url}
						alt="Artist Image"
						width={128}
						height={128}
						className="rounded-md"
					/>
				</div>
				<div className="w-32">
					<p className="cursor-pointer text-white truncate">{content.name}</p>
				</div>
			</div>
		</Link>
	);
};
