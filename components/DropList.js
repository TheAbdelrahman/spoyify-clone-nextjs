import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSession, signOut } from 'next-auth/react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';

const DropList = () => {
	const { data: session, status } = useSession();

	const menuLinks = [
		{
			id: 1,
			title: 'Account',
			href: 'https://www.spotify.com/eg-ar/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account',
			onclick: '',
		},
		{
			id: 2,
			title: 'Profile',
			href: '/library',
			onclick: '',
		},
		{
			id: 3,

			title: 'Upgrade To Premium',
			href: 'https://www.spotify.com/eg-ar/premium/?ref=web_loggedin_upgrade_menu',
			onclick: '',
		},
		{
			id: 4,
			title: 'Download',
			href: 'https://spotify.com/download',
			onclick: '',
		},
		{
			id: 5,
			title: 'Settings',
			href: 'https://open.spotify.com/preferences',
			onclick: '',
		},
		{
			id: 6,
			title: 'Support',
			href: 'https://support.spotify.com/',
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
		<Menu>
			<div>
				<Menu.Button className="flex items-center h-14 w-max ease-in-out duration-500 overflow-hidden bg-black opacity-90 space-x-3 hover:opacity-100 cursor-pointer rounded-full p-1 pr-2 text-white">
					<Image
						className="rounded-full"
						width={40}
						height={40}
						src={session?.user.image}
						alt="user image"
					/>
					<h2>{session?.user.name}</h2>
					<ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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

export default DropList;
