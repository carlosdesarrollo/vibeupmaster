import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MediaIcon } from "../../Icons/interfaz";
import CloseIcon from "../../Icons/interface/CloseIcon";
import css from "./css/dropimages.module.css";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const DropImages = ({
	error,
	loading,
	setError,
	imagesAndVideos,
	setImagesAndVideos,
}) => {
	// estado de las imagenes y videos seleccionados para mostrar en el preview
	const [imagesAndVideosPreview, setImagesAndVideosPreview] = useState([]);
	// estado de subida de imagenes y videos
	const [uploading, setUploading] = useState(false);
	// estado de progreso de subida de imagenes y videos
	const [progress, setProgress] = useState(0);
	// tamaño maximo de los archivos a subir (10mb)
	const maxSize = 10 * 1024 * 1024;
	// cantidad maxima de archivos a subir
	const maxFiles = 6;
	// tipos de archivos permitidos
	const acceptedTypes = [
		"image/jpeg",
		"image/png",
		"image/jpg",
		"video/mp4",
		"video/avi",
	];
	// funcion para agregar imagenes y videos al estado
	const imagesAndVideosHandler = (acceptedFiles) => {
		setError(null);
		const validFiles = [];
		for (let i = 0; i < acceptedFiles.length; i++) {
			const file = acceptedFiles[i];
			const random = Math.random().toString(36).substring(2);
			const date = Date.now().toString(36);
			// si el archivo es menor al tamaño maximo y es de un tipo aceptado y la cantidad de archivos es menor a la cantidad maxima
			if (
				file.size <= maxSize &&
				acceptedTypes.includes(file.type) &&
				imagesAndVideos.length < maxFiles
			) {
				// validar que el archivo no este en el estado
				const fileExists = imagesAndVideos.some(
					(image) => image.name === file.name
				);
				// si el archivo no esta en el estado
				if (!fileExists) {
					// agregar el archivo al estado
					validFiles.push({
						file,
						id: `${random}${date}`,
						name: file.name,
						type: file.type,
					});
				} else {
					// mostrar error
					setError(`El archivo ya esta en la lista`);
				}
			} else {
				// si el archivo no es menor al tamaño maximo
				if (file.size > maxSize) {
					// mostrar error
					setError(`El archivo ${file.name} es muy grande`);
				}
				// si el archivo no es de un tipo aceptado
				if (!acceptedTypes.includes(file.type)) {
					// mostrar error
					setError(`El archivo ${file.name} no es un tipo aceptado`);
				}
				// si la cantidad de archivos es mayor a la cantidad maxima
				if (imagesAndVideos.length >= maxFiles) {
					// mostrar error
					setError(`Solo puedes subir ${maxFiles} archivos a la vez`);
				}
			}
		}
		// agregar los archivos validos al estado
		setImagesAndVideos([...imagesAndVideos, ...validFiles]);
	};

	const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
		noClick: true,
		accept: {
			"image/*": [".jpeg", ".png", ".jpg"],
			// "video/*": [".mp4", ".avi"],
		},
		onDrop: imagesAndVideosHandler,
	});

	useEffect(() => {
		if (imagesAndVideos.length > 0) {
			const imagesAndVideosUrls = imagesAndVideos.map((image) => {
				return {
					id: image.id,
					image: URL.createObjectURL(image.file),
					name: image.name,
					type: image.type,
				};
			});
			setImagesAndVideosPreview(imagesAndVideosUrls);
		} else {
			setImagesAndVideosPreview([]);
		}
	}, [imagesAndVideos]);

	return (
		<div className='grid gap-1'>
			{error && (
				<div className='relative flex items-center text-red-500 hover:bg-red-100 justify-center py-2 rounded bg-red-50'>
					<p className=' text-xs font-semibold'>{error}</p>
					<button
						type='button'
						aria-label='Cerrar error'
						role={"button"}
						className='absolute right-2 hover:bg-red-200 rounded-full'
						onClick={() => setError(null)}
					>
						<CloseIcon size={22} />
					</button>
				</div>
			)}
			<div
				className={
					error ? `${css.dropImages} ${css.error}` : css.dropImages
				}
				{...getRootProps()}
			>
				<div
					className={
						isDragActive
							? "flex justify-center items-center bg-white absolute top-0 left-0 w-full h-full z-10 opacity-90 pointer-events-none"
							: "flex justify-center items-center bg-white absolute top-0 left-0 w-full h-full -z-10 opacity-0 pointer-events-none"
					}
				>
					<p className='text-xl'>Soltar fotos o videos</p>
				</div>
				<div className='relative w-full h-full  flex items-center justify-center'>
					{imagesAndVideosPreview.length > 0 ? (
						<div className='w-full grid gap-2'>
							<div className='flex gap-2 items-center justify-between'>
								{/* <motion.button
								type='button'
								aria-label='Añadir más fotos o videos'
								role={"button"}
								className='flex items-center rounded py-1 h-8 px-3 bg-gray-50 hover:bg-gray-200 text-sm font-semibold pointer-events-auto '
								onClick={open}
								whileTap={{ scale: 0.9 }}
							>
								Añadir más fotos
							</motion.button> */}
								<p className='text-xs font-medium text-slate-500'>
									Fotos {imagesAndVideosPreview.length}/
									{maxFiles} Puedes añadir un máximo de{" "}
									{maxFiles} fotos
								</p>
								<motion.button
									type='button'
									aria-label='Eliminar todas las fotos o videos'
									role={"button"}
									className='flex flex-nowrap whitespace-nowrap items-center rounded py-1 h-8 px-3 bg-gray-50 hover:bg-red-100 text-sm font-semibold pointer-events-auto text-red-500'
									onClick={() => setImagesAndVideos([])}
									whileTap={{ scale: 0.9 }}
								>
									Eliminar todo
								</motion.button>
							</div>
							<div className={css.grid}>
								{imagesAndVideosPreview.map((image, index) => (
									<div
										key={index}
										className='relative h-44 w-full overflow-hidden rounded'
									>
										<div className='relative w-full h-full'>
											<AnimatePresence>
												{loading && (
													<motion.div
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														exit={{ opacity: 0 }}
														className={css.charging}
													/>
												)}
											</AnimatePresence>
											<Image
												className='w-full h-full object-cover object-center rounded hover:filter hover:brightness-75 transition duration-100 ease'
												src={image.image}
												alt='imagen'
												fill
												sizes='100%'
											/>
										</div>
										<AnimatePresence>
											{!loading && (
												<motion.button
													initial={{ scale: 0 }}
													animate={{ scale: 1 }}
													exit={{ scale: 0 }}
													type='button'
													role='button'
													className='absolute top-1.5 right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md'
													whileTap={{ scale: 0.9 }}
													onClick={() => {
														const newImagesAndVideos =
															imagesAndVideos.filter(
																(
																	imageAndVideo
																) =>
																	imageAndVideo.id !==
																	image.id
															);
														setImagesAndVideos(
															newImagesAndVideos
														);
													}}
												>
													<CloseIcon size='24' />
												</motion.button>
											)}
										</AnimatePresence>
									</div>
								))}
								{imagesAndVideosPreview.length < maxFiles && (
									<button
										type='button'
										aria-label='Añadir una foto o video'
										role={"button"}
										className='relative h-44 w-full overflow-hidden rounded'
										onClick={open}
									>
										<div className='w-full h-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center flex-col'>
											<MediaIcon size='24' />
											<h5 className='font-medium mt-3.5 text-sm'>
												Añade una foto
											</h5>
										</div>
									</button>
								)}
							</div>
						</div>
					) : (
						<button
							type='button'
							aria-label='Añadir una foto o video'
							role={"button"}
							className='w-full h-full bg-[#F7F8FA] hover:bg-[#EAEBED] flex items-center justify-center flex-col py-8 customRound'
							onClick={open}
						>
							<input className='hidden' {...getInputProps()} />
							<div className='w-11 h-11 rounded-full mx-auto bg-gray-200 flex items-center justify-center '>
								<MediaIcon size='24' />
							</div>
							<h5 className='font-medium mt-0.5'>Añadir fotos</h5>
							<p className='text-sm opacity-50 mt-0.5'>
								o arrastra y suelta
							</p>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default DropImages;
