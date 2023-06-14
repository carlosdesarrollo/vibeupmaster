import Link from "next/link";
import { useState, useRef } from "react";
import Avatar from "../../components/Avatar";
import CarteraIcon from "../../components/Icons/controls/CarteraIcon";
import AccountIcon from "../../components/Icons/interfaz/AccountIcon";
import Grid4PointIcon from "../../components/Icons/interfaz/Grid4PointIcon";
import styles from "./styles/profileLayout.module.css";
import { useRouter } from "next/router";
import HandIcon from "../../components/Icons/aside/HandIcon";
import HomeIcon from "../../components/Icons/aside/HomeIcon";
import TextTruncate from "react-text-truncate";
import { CardPlegable, Card } from "../../components/Card";
import { SkeletonUI } from "../../components/Loaders";
import { useAtom } from "jotai";
import { userDataAtom } from "../../atoms";
import { AnimatePresence } from "framer-motion";
import CameraIcon from "../../components/Icons/interfaz/CameraIcon";
import { motion } from "framer-motion";
import { CloseIcon } from "../../components/Icons/interfaz";
import useMediaQuery from "../../hooks/useMediaQuery";
import Button from "../../components/Buttons/Button";
import { seguridadApi } from "../../api";
import TrashIcon from "../../components/Icons/interfaz/TrashIcon";
import axios from "axios";

const ProfileLayout = ({ children, getPosts }) => {
	const fileRef = useRef(null);
	const router = useRouter();
	const [userData, setUserData] = useAtom(userDataAtom);
	// extraer el ultimo elemento del path
	const lastPath = router.asPath.split("/").pop();

	const isTablet = useMediaQuery("(min-width: 768px)");
	const [widthUserImage, setWidthUserImage] = useState(160);
	const [modalPerfilImage, setModalPerfilImage] = useState(false);
	const [hoverPerfilImage, setHoverPerfilImage] = useState(false);

	const [subiendo, setSubiendo] = useState(false);
	const [activeBtn, setActiveBtn] = useState(false);
	const [originalMedia, setOriginalMedia] = useState(null);
	// estado para mostrar el preview de las imagenes
	const [previewMedia, setPreviewMedia] = useState(null);

	const menuRouter = [
		{
			name: "Posts",
			path: "",
			basePath: userData?.usuarioEnt.id,
		},
		{
			name: "Information",
			path: "information",
			basePath: "information",
		},
		{
			name: "Photos",
			path: "photos",
			basePath: "photos",
		},
		{
			name: "Friends",
			path: "friends",
			basePath: "friends",
		},
	];

	const infoAside = [
		{
			label: "Location",
			value: "xxxxxxx xxxxxxxxxxxxx",
		},
		{
			label: "Job",
			value: "xxxxxxx xxxxxxxxxxxxx",
		},
		{
			label: "Hobbies",
			value: "xxxxxxx xxxxxxxxxxxxx",
		},
		{
			label: "Phone",
			value: "+51 927 974 418",
		},
	];

	const collection = Array.from({ length: 5 }, (item, i) => i + 1);

	const handleFileChange = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		console.log(file);
		if (file) {
			setOriginalMedia(file);
			setPreviewMedia(URL.createObjectURL(file));
			setActiveBtn(true);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubiendo(true);
		try {
			// crear un formData para enviar la imagen
			const formData = new FormData();
			// agregar la imagen al formData
			formData.append("file", originalMedia);
			// subir a s3 y obtener la url de las imagenes
			const responseS3 = await axios.post("/api/perfil/upload", formData);
			// extraer la imagen y la ruta de la imagen
			const { imagen, rutaimagen } = responseS3.data;
			// fecha en formato yyyy-mm-dd
			const fecha = new Date().toISOString().slice(0, 10);
			// si la imagen se subio correctamente
			if (responseS3.status === 200) {
				// pasar la imagen a la base de datos por medio de la api
				const responseUsuarioImg = await seguridadApi(
					"?page=iRegistroUsuarioImg",
					{
						principal: 0,
						nombre: imagen,
						descripcion: "FOTO_PERFIL",
						ruta: rutaimagen,
						usuario: userData?.usuarioEnt.id,
					}
				);
				// console.log(responseUsuarioImg);
				const responseImgUser = await seguridadApi(
					"?page=iCargarUsuImg",
					{
						id: userData.usuarioEnt.id,
					}
				);
				// console.log(responseImgUser);
				const user = {
					...userData,
					usuarioEnt: {
						...userData.usuarioEnt,
						images: JSON.parse(responseImgUser.data),
					},
				};
				setUserData(user);
				getPosts();
				const encryptedData = await axios.post("/api/crypto", {
					texto: JSON.stringify(user),
				});
				localStorage.setItem("user", encryptedData.data.encrypted);
				// console.log(newData);
			}
			setSubiendo(false);
			setActiveBtn(false);
			setModalPerfilImage(false);
			limpiarTodoPreview();
		} catch (error) {
			console.log(error);
			setSubiendo(false);
			setActiveBtn(false);
			setModalPerfilImage(false);
			limpiarTodoPreview();
		}
	};

	const limpiarTodoPreview = () => {
		setOriginalMedia(null);
		setPreviewMedia(null);
		setActiveBtn(false);
		URL.revokeObjectURL(previewMedia);
	};

	const imgPrincipal = userData?.usuarioEnt.images.find(
		(img) => img.principal === "0"
	);

	const imgPrincipalUrl = imgPrincipal?.ruta + imgPrincipal?.nombre;

	return (
		<>
			<section className={styles.section}>
				<div className={styles.profileWrapper}>
					<div className={styles.profileContainer}>
						<div className={styles.profileBackgroundContainer}>
							<img src={"/assets/images/bgprofile.png"} alt='' />
							<div
								className={styles.profileImageContainer}
								style={{
									top: `calc(100% - ${widthUserImage / 2}px)`,
								}}
							>
								<span
									className={styles.border_profile}
									style={{
										background: hoverPerfilImage
											? "rgb(243 244 246)"
											: "#fff",
									}}
									onMouseEnter={() =>
										setHoverPerfilImage(true)
									}
									onMouseLeave={() =>
										setHoverPerfilImage(false)
									}
								/>
								<Avatar
									size={widthUserImage}
									nombre={"Foto"}
									url={
										(userData?.usuarioEnt?.images?.length &&
											`${imgPrincipalUrl}`) ||
										"/assets/images/sinfoto.png"
									}
									onClick={() => {
										setModalPerfilImage(true);
									}}
								/>
								<motion.button
									className='absolute -bottom-0.5 hover:bg-gray-200 right-0.5 bg-gray-100 shadow w-10 h-10 flex justify-center items-center rounded-full'
									onMouseEnter={() =>
										setHoverPerfilImage(true)
									}
									onMouseLeave={() =>
										setHoverPerfilImage(false)
									}
									onClick={() => {
										setModalPerfilImage(true);
									}}
								>
									<CameraIcon size={28} />
								</motion.button>
							</div>
						</div>
						<div
							className={styles.profileInfoContainer}
							style={{
								marginTop: `calc(${
									widthUserImage / 2
								}px + 1rem)`,
							}}
						>
							<div className={styles.profileInfo}>
								<h1 className={styles.infoName}>
									{/* {userData?.name} {userData?.lastname} */}
									{userData?.personaEnt.nombrecompleto}{" "}
									{/* {userData?.usuarioEnt.id} */}
								</h1>
								<p className={styles.infoShortName}>
									@{userData?.usuarioEnt.usuario}
								</p>
								<p className={styles.infoFriends}>
									1350 friends
								</p>
								<a
									target={"_blank"}
									href='https://goo.gl/maps/hK6yk4sf5gZZJ1X2A'
									rel='noreferrer'
									className={styles.infoLocation}
								>
									Location: xxxxxxx xxxxxxxxxxxxxx
								</a>
							</div>
							<div className={styles.quickOptions}>
								<button className={styles.quickOption}>
									<AccountIcon size={45} />
								</button>
								<button
									className={styles.quickOption}
									style={{
										border: "1px solid rgba(255, 204, 0, 0.5)",
										boxShadow:
											"-1px -1px 3px rgba(255, 204, 0, 0.5), 1.5px 1.5px 3px rgba(255, 204, 0, 0.7), inset -1px -1px 3px rgba(255, 255, 0, 0.5)",
									}}
								>
									<CarteraIcon
										size={40}
										style={{
											transform: "translateY(-3px)",
										}}
									/>
								</button>
								<button className={styles.quickMenu}>
									<Grid4PointIcon size={35} />
								</button>
							</div>
						</div>
						<div className={styles.menuProfile}>
							<ul className={styles.menuProfileList}>
								{menuRouter.map((item, index) => (
									<li
										key={index}
										className={
											lastPath === item.basePath
												? styles.menuProfileItemActive
												: styles.menuProfileItem
										}
									>
										<Link
											className={styles.menuProfileLink}
											href={{
												pathname: `/user/[user]/${item.path}`,
												query: {
													user: userData?.usuarioEnt
														.id,
												},
											}}
										>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
					{children}
				</div>
				<div className={styles.asideContainer}>
					<div className={styles.asideQuickOptions}>
						<button className={styles.asideQuickOption}>
							<Avatar size={60} />
						</button>
						<button className={styles.asideQuickOption}>
							<div className={styles.orb}></div>
						</button>
						<button className={styles.asideQuickOption}>
							<HandIcon width={50} />
						</button>
						<button className={styles.asideQuickOption}>
							<HomeIcon width={46} />
						</button>
					</div>
					<Card>
						<div className={styles.cardTitle}>
							<h3>Information</h3>
						</div>
						<div className={styles.cardBody}>
							{infoAside.map((item, index) => (
								<div key={index} className={styles.infoGroup}>
									<span className={styles.label}>
										{item.label}
									</span>
									<p className={styles.value}>{item.value}</p>
								</div>
							))}
						</div>
					</Card>
					<Card title={"My Collective Interest"}>
						{/* <div className={styles.interests_top}>
						{collection.slice(0, 3).map((item, index) => (
							<div key={index}>{item}</div>
						))}
					</div>
					<div className={styles.interests_bottom}>
						{collection.slice(3, 5).map((item, index) => (
							<div key={index}>{item}</div>
						))}
					</div> */}
						<div className={styles.interests_grid}>
							{collection.map((item, index) => (
								<div
									className={styles.interest_wrapper}
									key={index}
								>
									<div className={styles.interest}>
										<SkeletonUI
											width={64}
											height={64}
											radius={50}
											css={{
												cursor: "pointer",
											}}
										/>
									</div>
								</div>
							))}
						</div>
					</Card>
					<CardPlegable title={"About me"}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Reprehenderit fugit ut maiores culpa eius, accusamus
						quis eligendi tempore minus facere incidunt placeat
						corporis eos assumenda officia commodi repudiandae
						deserunt illum? Lorem ipsum dolor sit amet consectetur
						adipisicing elit. assumenda officia commodi repudiandae
						deserunt illum?
					</CardPlegable>
					<Card title={"Photos"}>
						<div className={styles.third_grid}>
							<SkeletonUI
								width={"100%"}
								height={70}
								radius={10}
							/>
							<SkeletonUI
								width={"100%"}
								height={70}
								radius={10}
							/>
							<SkeletonUI
								width={"100%"}
								height={70}
								radius={10}
							/>
						</div>
					</Card>
					<Card title={"Videos"}>
						<div className={styles.third_grid}>
							<SkeletonUI
								width={"100%"}
								height={70}
								radius={10}
							/>
							<SkeletonUI
								width={"100%"}
								height={70}
								radius={10}
							/>
							<SkeletonUI
								width={"100%"}
								height={70}
								radius={10}
							/>
						</div>
					</Card>
				</div>
			</section>
			<AnimatePresence>
				{modalPerfilImage && (
					<motion.div className={styles.profileModalContainer}>
						<motion.div
							className={styles.overlay}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setModalPerfilImage(false)}
						/>
						<motion.div
							className={styles.modal}
							initial={
								isTablet
									? { opacity: 0, scale: 0.9 }
									: { y: 1000, opacity: 0 }
							}
							animate={
								isTablet
									? { opacity: 1, scale: 1 }
									: { y: 0, opacity: 1 }
							}
							exit={
								isTablet
									? { opacity: 0, scale: 0 }
									: { y: 1000, opacity: 0 }
							}
						>
							<div className={styles.modal_header}>
								<h2 className='text-lg font-semibold'>
									Actualizar perfil de usuario
								</h2>
								<motion.button
									onClick={() => setModalPerfilImage(false)}
									className={styles.closeBtn}
									whileTap={{ scale: 0.85 }}
								>
									<CloseIcon
										className='absolute mt-[1px]'
										size={30}
									/>
								</motion.button>
							</div>
							<div className={styles.modal_body}>
								<form
									className='grid justify-center gap-4 w-full'
									onSubmit={handleSubmit}
								>
									<div className='relative'>
										<Avatar
											size={210}
											nombre={"CLICK PARA CAMBIAR"}
											url={previewMedia}
											style={{ margin: "0 auto" }}
											onClick={() =>
												fileRef.current.click()
											}
										/>
										<AnimatePresence>
											{originalMedia && (
												<motion.button
													type='button'
													className='absolute top-1 hover:bg-gray-200 right-2 bg-gray-200 shadow w-10 h-10 flex justify-center items-center rounded-full'
													whileTap={{ scale: 0.85 }}
													onClick={() => {
														limpiarTodoPreview();
													}}
													initial={{
														opacity: 0,
														scale: 0,
													}}
													animate={{
														opacity: 1,
														scale: 1,
													}}
													exit={{
														opacity: 0,
														scale: 0,
													}}
												>
													<TrashIcon size={24} />
												</motion.button>
											)}
										</AnimatePresence>
									</div>
									{activeBtn ? (
										<Button
											type='submit'
											loading={subiendo ? 1 : 0}
										>
											Guardar cambios
										</Button>
									) : (
										<div
											className='btn text-gray-400 text-center select-none cursor-not-allowed'
											role={"button"}
										>
											Guardar cambios
										</div>
									)}
									<input
										ref={fileRef}
										type='file'
										accept='image/*'
										className='hidden'
										onChange={handleFileChange}
									/>
								</form>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default ProfileLayout;
