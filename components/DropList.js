import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSession, signOut } from 'next-auth/react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';

const DropList = () => {
	const { data: session, status } = useSession();

	const menuLinks = [
		{
			id: 1,
			title: 'Home',
			href: '/',
			onclick: '',
		},
		{
			id: 2,
			title: 'Profile',
			href: '/findTrack',
			onclick: '',
		},
		{
			id: 3,
			title: 'Search',
			href: '/library',
			onclick: '',
		},
		{
			id: 4,
			title: 'Saved Tracks',
			href: '/savedTracks',
			onclick: '',
		},
		{
			id: 5,
			title: 'Account',
			href: 'https://www.spotify.com/eg-ar/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account',
			onclick: '',
		},
		{
			id: 6,
			title: 'Settings',
			href: 'https://open.spotify.com/preferences',
			onclick: '',
		},
		{
			id: 7,
			title: 'Log out',
			href: '/login',
			onclick: () => signOut({ callbackUrl: '/login' }),
		},
	];

	return (
		<div className="z-100">
			<Menu>
				<div>
					<Menu.Button className="flex items-center h-10 w-40 ease-in-out duration-500 overflow-hidden bg-black opacity-90 space-x-3 hover:opacity-100 cursor-pointer rounded-full p-1 pr-2 text-white">
						<Image
							src={session?.user.image}
							className="w-8 h-8 rounded-full"
							width={40}
							height={40}
							alt="user image"
						/>
						<Link className="w-1/2 truncate overflow-hidden" href="/library">
							{session?.user.name}
						</Link>
						<ChevronDownIcon
							className="-mr-1 ml-2 h-5 w-5"
							aria-hidden="true"
						/>
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
								className="text-xs py-1 px-4 opacity-80 hover:opacity-90  bg-black "
							>
								<Menu.Item className="z-50">
									<a onClick={onelink.onclick} href={onelink.href}>
										{onelink.title}
									</a>
								</Menu.Item>
							</div>
						))}
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
};

export default DropList;
