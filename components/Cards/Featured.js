/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

const Featured = (name, description, image) => {
	return (
		<div>
			<div className="flex-col justify-center items-center rounded-lg bg-[#1a1a1a] ease-in-out duration-300 hover:bg-[#292929] p-4 space-y-2 h-full">
				<div className="w-full ">
					<Image
						src={image}
						alt="Track Image"
						width={128}
						height={128}
						className="rounded-md"
					/>
				</div>
				<div>
					<p className="cursor-pointer">{name}</p>
					<p className="text-gray-500 text-xs cursor-pointer">{description}</p>
				</div>
			</div>
		</div>
	);
};

export default Featured;
