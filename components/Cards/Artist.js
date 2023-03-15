import Image from 'next/image';
import Link from 'next/link';

export const Artist = ({ content }) => {
	return (
		<Link href={`/artist/${content.id}`}>
			<div
				onClick={() => {
					console.log(content);
				}}
				className="flex-col cursor-pointer justify-center items-center rounded-lg bg-[#1a1a1a] ease-in-out duration-300 hover:bg-[#292929] p-4 space-y-2 h-full w-full overflow-y-hide"
			>
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
					<p className="text-white truncate">{content.name}</p>
				</div>
			</div>
		</Link>
	);
};
