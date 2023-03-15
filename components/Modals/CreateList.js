import { useState } from 'react';
import useSpotify from '@/hooks/useSpotify';

//to be fixed
// this frature is blocked by spotify due to a bug in state that sends too manyy requests
/*const CreateList = () => {
	const spotifyAPI = useSpotify();

	const [showModal, setShowModal] = useState(false);
	const [state, setState] = useState({
		name: '',
		description: '',
	});
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setState((prevProps) => ({
			...prevProps,
			[name]: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setShowModal(false);

		if (state.name.length > 4) {
			if (spotifyAPI.getAccessToken()) {
				spotifyAPI.createPlaylist(state.name).then(setState(''));
				console.log(state.name, state.description);
			}
		}
	};

	return (
		<>
			<button
				type="button"
				onClick={() => setShowModal(true)}
				className="flex items-center space-x-2 hover:text-white"
			>
				<div className="bg-white  p-1 ">
					<svg
						role="img"
						height="12"
						width="12"
						aria-hidden="true"
						viewBox="0 0 16 16"
						data-encore-id="icon"
					>
						<path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path>
					</svg>
				</div>
				<p>Create Playlist</p>
			</button>

			{showModal ? (
				<>
					<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-3/4 my-6 mx-auto max-w-3xl">
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#121212] outline-none focus:outline-none">
								<div className="flex items-start justify-between p-5 border-b border-solid ">
									<h3 className="text-3xl text-white">Create Playlist</h3>
								</div>
								<div className="relative p-2 flex-col">
									<form
										className="bg-[#121212] shadow-md rounded px-8 pt-6 pb-8 w-full"
										//onSubmit={handleSubmit}
									>
										<div className="form-control">
											<label className="block text-white text-sm font-bold mb-3">
												Playlist Name
											</label>
											<input
												className="shadow bg-[#252525] appearance-none rounded w-full py-2 px-1 mb-5 text-white"
												type="text"
												name="name"
												maxLength={10}
												//value={state.name}
												//onChange={handleInputChange}
											/>
										</div>
										<div className="form-control">
											<label className="block text-white text-sm font-bold mb-3">
												Description
											</label>
											<input
												className="shadow bg-[#252525] appearance-none rounded w-full py-2 px-1 mb-5 text-white"
												type="text"
												name="description"
												//value={state.description}
												maxLength={10}
												//onChange={handleInputChange}
											/>
										</div>
										<div className="form-control">
											<label></label>
											<button
												className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
												type="submit"
											>
												Submit
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</>
			) : null}
		</>
	);
};*/

function CreateList() {
	const spotifyAPI = useSpotify();

	const [showModal, setShowModal] = useState(false);

	const [inputs, setInputs] = useState({});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputs);
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI.createPlaylist(inputs.name, {
				description: inputs.description,
			});
		}

		setShowModal(false);
	};
	const handleClose = (event) => {
		event.preventDefault();
		setInputs({});
		setShowModal(false);
	};

	return (
		<>
			<button
				type="button"
				onClick={() => setShowModal(true)}
				className="flex items-center space-x-2 hover:text-white"
			>
				<div className="bg-white  p-1 ">
					<svg
						role="img"
						height="12"
						width="12"
						aria-hidden="true"
						viewBox="0 0 16 16"
						data-encore-id="icon"
					>
						<path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path>
					</svg>
				</div>
				<p>Create Playlist</p>
			</button>

			{showModal ? (
				<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
					<div className="relative w-3/4 my-6 mx-auto max-w-3xl">
						<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#121212] outline-none focus:outline-none">
							<div className="flex items-start justify-between p-5 border-b border-solid ">
								<h3 className="text-3xl text-white">Create Playlist</h3>
							</div>
							<div className="relative p-2 flex-col">
								<form
									className="bg-[#121212] shadow-md rounded px-8 pt-6 pb-8 w-full"
									onSubmit={handleSubmit}
								>
									<label className="block text-white text-sm font-bold mb-3">
										Playlist Name:
										<input
											maxLength={10}
											className="shadow bg-[#252525] appearance-none rounded w-full py-2 px-1 mb-5 text-white"
											type="text"
											name="name"
											value={inputs.name || ''}
											onChange={handleChange}
											required
										/>
									</label>
									<label className="block text-white text-sm font-bold mb-3">
										Description:
										<input
											maxLength={10}
											className="shadow bg-[#252525] appearance-none rounded w-full py-2 px-1 mb-5 text-white"
											type="text"
											name="description"
											value={inputs.description || ''}
											onChange={handleChange}
										/>
									</label>
									<div className="flex space-x-5">
										<input
											className="w-full text-white bg-green-500 active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
											type="submit"
										/>
										<button
											className="w-full text-white bg-red-500 active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
											onClick={handleClose}
										>
											Close
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
}

export default CreateList;
