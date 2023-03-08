import { FiMoreVertical } from 'react-icons/fi';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Options = () => {
	const menuLinks = [
		{
			id: 1,
			title: 'Edit',
			href: '',
			onclick: '',
		},
		{
			id: 2,
			title: 'Delete',
			href: '',
			onclick: '',
		},
	];

	return (
		<Menu>
			<div>
				<Menu.Button className="items-center text-xl cursor-pointer text-white">
					<FiMoreVertical />
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="flex flex-col cursor-pointer z-10 mt-1 text-white">
					{menuLinks.map((onelink) => (
						<div
							key={onelink.id}
							className="py-2 px-4 opacity-80 hover:opacity-90  bg-black "
						>
							<Menu.Item>
								<a onClick={onelink.onclick} href={onelink.href}>
									{onelink.title}
								</a>
							</Menu.Item>
						</div>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default Options;
