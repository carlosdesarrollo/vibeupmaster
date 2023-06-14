import { CloseIcon, ImageIcon, MediaIcon } from "../../Icons/interfaz";
import styles from "./styles/modal.module.css";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Avatar from "../../Avatar";
import {
	imagenPublicacionAtom,
	imagenPublicacionPreviewAtom,
	textoPublicacionAtom,
} from "../../../atoms";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { useDropzone } from "react-dropzone";
import axios from "axios";
import { publicacionesApi } from "../../../api";
import Button from "../../Buttons/Button";

const ModalPost = ({ desactivarModal, userData, getPosts }) => {
	// datos del usuario
	const { usuario, id } = userData.usuarioEnt;
	const { nombrecompleto } = userData.personaEnt;
	// ref para el textarea
	const textareaRef = useRef(null);
	// font size del texto inicial
	const [textSize, setTextSize] = useState("text-2xl");
	// estado para el boton de publicar
	const [activeBtn, setActiveBtn] = useState(false);
	// estado para mostrar el input de imagenes
	const [showMedia, setShowMedia] = useState(false);
	// estado para el texto del textarea
	const [text, setText] = useAtom(textoPublicacionAtom);
	// estado imagenes o videos seleccionadas
	const [originalMedia, setOriginalMedia] = useAtom(imagenPublicacionAtom);
	// estado para mostrar el preview de las imagenes
	const [previewMedia, setPreviewMedia] = useAtom(
		imagenPublicacionPreviewAtom
	);
	const [orientation, setOrientation] = useState("");
	const [subiendo, setSubiendo] = useState(false);

	// obtengo el primer nombre del usuario
	const primerNombre = usuario?.split(" ")[0];
	// funcion para obtener el texto del textarea
	const obtenerTexto = () => {
		const texto = textareaRef.current.innerText;
		const textoSinSaltosExtra = texto.replace(/(\r\n|\n|\r){2,}/gm, "$1");
		setText(textoSinSaltosExtra.trim());
		console.log(textoSinSaltosExtra.trim());
	};

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.innerText = text;
		}
		const handlePaste = (e) => {
			e.preventDefault();
			const text = e.clipboardData.getData("text/plain");
			document.execCommand("insertHTML", false, text);
		};
		textareaRef.current.addEventListener("paste", handlePaste);
		return () => {
			if (textareaRef.current) {
				textareaRef.current.removeEventListener("paste", handlePaste);
			}
		};
	}, []);

	// funcion para publicar el post por el momento solo mostrar el texto y las medias seleccionadas
	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubiendo(true);
		try {
			// creamos la rica publicacion
			const createPostRes = await publicacionesApi("?page=iRegPub", {
				comentario: text,
				usuario: Number(id),
			});
			console.log(createPostRes);
			// obtenemos el id de la publicacion
			const postId = createPostRes.data.data;
			if (originalMedia.length > 0) {
				// subimos las imagenes y videos a s3
				const formData = new FormData();
				originalMedia.forEach((media) => {
					formData.append("file", media.file);
				});
				const uploadMediaRes = await axios.post(
					"/api/publicaciones/upload",
					formData
				);
				console.log(uploadMediaRes);
				// obtenemos la rutaimagen y las imagenes o videos
				const { rutaimagen, imagenes } = uploadMediaRes.data;
				// creamos las publicaciones detalle por cada imagen de imagenes
				const postDetailPromises = imagenes.map(async (imagen) => {
					const createPostDetailRes = await publicacionesApi(
						"?page=iRegistrarPublicacionDetalle",
						{
							publicacionid: Number(postId),
							rutaimagen,
							imagen,
						}
					);
					console.log(createPostDetailRes);
					return createPostDetailRes;
				});
				await Promise.all(postDetailPromises);
				eliminarTodasLasMedias();
				console.log("Todas las imágenes han sido subidas");
			}
			// limpiamos el estado del texto
			setText("");
			// cerramos el modal
			desactivarModal();
			setSubiendo(false);
			getPosts();
		} catch (error) {
			console.log(error);
		}
	};

	// maximo tamaño de las imagenes y videos 8MB
	const MAX_SIZE = 100 * 1024 * 1024;
	// const MAX_IMAGE_SIZE = 16 * 1024 * 1024; // 16MB
	// const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB
	// cantidad maxima de imagenes y videos
	const MAX_MEDIAS = 10;
	const ACCEPTED_TYPES = [
		"image/jpeg",
		"image/png",
		"video/mp4",
		"video/avi",
	];

	const imagesAndVideosHandler = (acceptedFiles) => {
		const validFiles = [];
		for (let i = 0; i < acceptedFiles.length; i++) {
			const file = acceptedFiles[i];
			const random = Math.random().toString(36).substring(2);
			const date = Date.now().toString(36);
			if (file.size <= MAX_SIZE && ACCEPTED_TYPES.includes(file.type)) {
				validFiles.push({
					file,
					id: `${random}${date}`,
					name: file.name,
					type: file.type,
				});
			}
		}
		setOriginalMedia([...originalMedia, ...validFiles]);
	};

	useEffect(() => {
		if (!showMedia) {
			if (text.length > 0 && text.length <= 100) {
				setTextSize("text-2xl");
			} else if (text.length > 100 && text.length <= 150) {
				setTextSize("text-xl");
			} else if (text.length > 150 && text.length <= 200) {
				setTextSize("text-lg");
			} else if (text.length > 200) {
				setTextSize("text-base");
			} else {
				setTextSize("text-2xl");
			}
		} else {
			setTextSize("text-base");
		}
	}, [text, showMedia]);

	useEffect(() => {
		if (text.length > 0 || originalMedia.length > 0) {
			setActiveBtn(true);
		} else {
			setActiveBtn(false);
		}
	}, [text, originalMedia]);

	useEffect(() => {
		if (originalMedia.length > 0) {
			setPreviewMedia(
				originalMedia.map((media) => {
					return {
						id: media.id,
						preview: URL.createObjectURL(media.file),
						name: media.file.name,
						type: media.file.type,
					};
				})
			);
			setShowMedia(true);
			if (originalMedia[0].file.type.includes("image")) {
				const image = new Image();
				image.src = URL.createObjectURL(originalMedia[0].file);
				image.onload = () => {
					if (image.width > image.height) {
						setOrientation("horizontal");
					} else {
						setOrientation("vertical");
					}
				};
			} else {
				const video = document.createElement("video");
				video.src = URL.createObjectURL(originalMedia[0].file);
				video.onloadedmetadata = () => {
					if (video.videoWidth > video.videoHeight) {
						setOrientation("horizontal");
					} else {
						setOrientation("vertical");
					}
				};
			}
		} else {
			setShowMedia(false);
		}
	}, [originalMedia]);

	const eliminarTodasLasMedias = () => {
		liberarMemoria();
		setOriginalMedia([]);
		setPreviewMedia([]);
		setOrientation("");
	};

	const liberarMemoria = () => {
		previewMedia.forEach((media) => URL.revokeObjectURL(media.preview));
	};

	const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
		noClick: true,
		accept: {
			"image/*": [".jpeg", ".png", ".jpg"],
			"video/*": [".mp4", ".avi"],
		},
		onDrop: imagesAndVideosHandler,
	});

	const imgPrincipal = userData?.usuarioEnt.images.find(
		(img) => img.principal === "0"
	);
	const imgPrincipalUrl = imgPrincipal?.ruta + imgPrincipal?.nombre;

	return (
		<motion.div className={styles.container} layout>
			<motion.div
				onClick={desactivarModal}
				className={styles.overlay}
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.5 }}
				exit={{ opacity: 0 }}
			/>
			<motion.div
				className={styles.modal}
				initial={{ y: 1000, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 1000, opacity: 0 }}
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
				<div className={styles.header}>
					<h3 className='text-xl font-bold text-center'>
						Crear Publicación
					</h3>
					<motion.button
						onClick={desactivarModal}
						className={styles.closeBtn}
						whileTap={{ scale: 0.85 }}
					>
						<CloseIcon className='absolute mt-[1px]' size={30} />
					</motion.button>
				</div>
				<form onSubmit={handleSubmit}>
					<div className={styles.body}>
						<div className='flex items-start gap-4 p-4'>
							<Avatar
								size={55}
								url={
									(userData?.usuarioEnt?.images?.length &&
										`${imgPrincipalUrl}`) ||
									"/assets/images/sinfoto.png"
								}
							/>
							<div className=''>
								<h4 className='text-[17px] font-semibold'>
									{nombrecompleto}
								</h4>
								<h5 className='text-[15px] text-gray-500'>
									@{usuario}
								</h5>
							</div>
						</div>
						<div className={styles.textarea_wrapper}>
							{/* mi textarea que es un span contentEditable */}
							<span
								ref={textareaRef}
								style={{
									"--username":
										usuario?.length > 0 &&
										`"${primerNombre}"`,
								}}
								className={styles.textarea + " " + textSize}
								role='textbox'
								contentEditable='true'
								onInput={obtenerTexto}
							/>
							{showMedia && (
								<div className='relative rounded-lg border border-gray-300 mt-4 p-2 min-h-full w-full overflow-hidden '>
									<div className='relative w-full h-full customRound flex items-center justify-center overflow-hidden'>
										{showMedia && (
											<div
												className={`${
													styles.controls
												} flex ${
													previewMedia.length > 0
														? "justify-between"
														: "justify-end"
												} items-center gap-2`}
											>
												{previewMedia.length > 0 && (
													<div className='flex gap-2'>
														<button
															type='button'
															aria-label='editar fotos y videos'
															role={"button"}
															className='flex items-center rounded py-1 h-8 px-3 bg-white hover:bg-gray-200 text-sm font-semibold pointer-events-auto'
														>
															{previewMedia.length >
															1
																? "Editar todo"
																: "Editar"}
														</button>
														<button
															type='button'
															aria-label='Añadir más fotos o videos'
															role={"button"}
															className='flex items-center rounded py-1 h-8 px-3 bg-white hover:bg-gray-200 text-sm font-semibold pointer-events-auto'
															onClick={open}
														>
															Añadir más fotos o
															videos
														</button>
													</div>
												)}
												<button
													type='button'
													aria-label='eliminar todas las fotos y videos'
													role={"button"}
													className='bg-white hover:bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full pointer-events-auto'
													title='Eliminar todas las fotos y videos'
													onClick={
														eliminarTodasLasMedias
													}
												>
													<CloseIcon size={26} />
												</button>
											</div>
										)}
										{previewMedia.length > 0 ? (
											<div className={`grid`}>
												{previewMedia.map((media) => {
													const nombreSinExtension =
														media.name.split(
															"."
														)[0];

													return (
														<div
															key={media.id}
															className={
																"w-full h-full"
															}
														>
															{media.type.includes(
																"video"
															) ? (
																<video
																	src={
																		media.preview
																	}
																	controls
																	controlsList='nodownload nofullscreen'
																	alt={`preview ${nombreSinExtension}`}
																	className='w-full h-full object-cover'
																/>
															) : (
																<img
																	draggable='false'
																	className='w-full h-full object-cover'
																	src={
																		media.preview
																	}
																	alt='preview'
																/>
															)}
														</div>
													);
												})}
											</div>
										) : (
											<button
												type='button'
												aria-label='Añadir una foto o video'
												role={"button"}
												className='w-full h-full bg-[#F7F8FA] hover:bg-[#EAEBED] flex items-center justify-center flex-col py-14'
												onClick={open}
											>
												<input
													className='hidden'
													{...getInputProps()}
												/>
												<div className='w-11 h-11 rounded-full mx-auto bg-gray-200 flex items-center justify-center '>
													<MediaIcon size='24' />
												</div>
												<h5 className='font-medium mt-0.5'>
													Añadir fotos/vídeos
												</h5>
												<p className='text-xs opacity-50 mt-0.5'>
													Añade fotos y videos dando
													clic
												</p>
											</button>
										)}
									</div>
								</div>
							)}
						</div>
					</div>
					<div className={styles.footer}>
						<div className={styles.mediacontainer}>
							<span>Añadir a tu publicación</span>
							<motion.button
								className={
									showMedia
										? `${styles.btnMedia} ${styles.active}`
										: `${styles.btnMedia}`
								}
								whileTap={{
									scale: !showMedia ? 0.85 : 1,
								}}
								type='button'
								aria-label='Añadir una foto o video'
								role={"button"}
								onTap={() => setShowMedia(true)}
							>
								<ImageIcon size={25} />
								Foto / Video
							</motion.button>
						</div>
						{activeBtn ? (
							<Button type='submit' loading={subiendo ? 1 : 0}>
								Publicar
							</Button>
						) : (
							<div
								className='btn text-gray-400 text-center select-none cursor-not-allowed'
								role={"button"}
							>
								Publicar
							</div>
						)}
					</div>
				</form>
			</motion.div>
		</motion.div>
	);
};

export default ModalPost;
