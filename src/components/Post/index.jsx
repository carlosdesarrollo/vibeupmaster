import { useEffect, useRef, useState } from "react";
import TextTruncate from "react-text-truncate";
import Avatar from "../Avatar";
import HeartIcon from "../Icons/interfaz/HeartIcon";
import MessageIcon from "../Icons/interfaz/MessageIcon";
import ShareIcon from "../Icons/interfaz/ShareIcon";
import TranslateIcon from "../Icons/TranslateIcon";
import styles from "./styles/post.module.css";
import { useInView, motion } from "framer-motion";
import relativeTime from "dayjs/plugin/relativeTime";
import MediaContainer from "./MediaContainer";
import ImageText from "./ImageText";
import FooterPost from "./FooterPost";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { publicacionesApi, seguridadApi } from "../../api";
import { SkeletonUI } from "../Loaders";
import PostLoading from "./PostLoading";

dayjs.extend(relativeTime);
dayjs.locale("es");

const Post = ({ post, imgPrincipalUrl }) => {
	const { id, fechacreacion, comentario, fotoperfil, usuarioid } = post || {};

	const [isImageText, setIsImageText] = useState(false);
	const [medias, setMedias] = useState([]);
	const [loading, setLoading] = useState(false);
	const [userPublicacion, setUserPublicacion] = useState({});
	const [loadingUser, setLoadingUser] = useState(true);
	const [moreText, setMoreText] = useState({
		text: "See more...",
		lines: 3,
	});

	const ref = useRef(null);
	const isInView = useInView(ref, {
		margin: "0px 0px -200px 0px",
	});

	useEffect(() => {
		if (isInView) {
			setTimeout(() => {
				setYaCargo(true);
			}, 500);
		}
	}, [isInView]);

	const [yaCargo, setYaCargo] = useState(false);

	useEffect(() => {
		const getPostDetail = async () => {
			try {
				setLoading(true);
				const response = await publicacionesApi.post(
					"?page=iListarPublicacionesDetalle",
					{
						publicacionid: id,
					}
				);
				const data = JSON.parse(response.data);
				setMedias(data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		getPostDetail();
	}, [id]);

	useEffect(() => {
		const getUserPublicacion = async () => {
			try {
				setLoadingUser(true);
				const response = await seguridadApi.post(
					"?page=iCargarDatosUsu",
					{
						id: usuarioid,
					}
				);
				const usuario = response.data.usuarioEnt.usuario;
				const nombreCompleto = response.data.personaEnt.nombrecompleto;
				setUserPublicacion({
					usuario,
					nombreCompleto,
				});
				setLoadingUser(false);
			} catch (error) {
				console.log(error);
			}
		};
		getUserPublicacion();
	}, [usuarioid]);

	useEffect(() => {
		if (
			medias?.length === 0 &&
			comentario?.length > 0 &&
			comentario?.length < 100
		) {
			setIsImageText(true);
		} else {
			setIsImageText(false);
		}
	}, [comentario, medias]);

	const getTimeAmigable = (fechaPost) => {
		const fechaCreacion = dayjs(fechaPost);
		const fechaActual = dayjs();
		const duration = fechaActual.diff(fechaCreacion);
		if (duration < 300000) {
			return "Hace un momento";
		} else if (duration < 3600000) {
			return `${Math.floor(duration / 60000)} m`;
		} else if (duration < 86400000) {
			return `${Math.floor(duration / 3600000)} h`;
		} else if (duration < 604800000) {
			return `${Math.floor(duration / 86400000)} d`;
		} else if (duration < 2592000000) {
			return `${Math.floor(duration / 86400000)} d`;
		} else if (duration < 7776000000) {
			return `${Math.floor(duration / 2592000000)} mes`;
		} else {
			return fechaCreacion.format("D [de] MMMM [de] YYYY");
		}
	};

	const handle = () => {
		if (moreText.text === "See more...") {
			setMoreText({
				text: "See less...",
				lines: 0,
			});
		} else {
			setMoreText({
				text: "See more...",
				lines: 3,
			});
		}
	};

	return (
		<>
			{yaCargo ? (
				<div className='card mb-4 p-0 max-[520px]:border-x-0 max-[520px]:rounded-none'>
					<motion.div
						className='flex items-center justify-between mb-4 pt-3 px-4'
						ref={ref}
					>
						<div
							className='grid gap-4 items-center'
							style={{ gridTemplateColumns: "auto 1fr" }}
						>
							<Avatar
								size={54}
								nombre={"foto"}
								url={
									fotoperfil === "SinFoto"
										? "/assets/images/sinfoto.png"
										: fotoperfil
								}
							/>
							<div className='w-full grid'>
								{loadingUser ? (
									<SkeletonUI width='200px' height='20px' />
								) : (
									<h3 className='text-base font-medium'>
										{userPublicacion.nombreCompleto
											? userPublicacion?.nombreCompleto
											: "Lorem Ipsum"}
									</h3>
								)}

								<div className={styles.subInfo}>
									{loadingUser ? (
										<SkeletonUI
											width='150px'
											height='19px'
											css={{ margin: "5px 0 0 0" }}
										/>
									) : (
										<>
											<p className={styles.span}>
												{"@" +
													userPublicacion.usuario ||
													"loremIpsum"}
											</p>
											<span className={styles.span}>
												{getTimeAmigable(fechacreacion)}
											</span>
										</>
									)}
								</div>
							</div>
						</div>

						<div className={styles.optionPost}>
							<button
								className={`${styles.optionPostBtn}`}
							></button>
						</div>
					</motion.div>
					<div className={styles.postBody}>
						{!isImageText && (
							<div className='px-4 my-4 mt-5'>
								<TextTruncate
									line={moreText.lines}
									element='p'
									truncateText={"..."}
									text={comentario}
								/>
								{comentario?.length > 120 && (
									<a
										onClick={handle}
										className={styles.showMore}
									>
										{moreText.text}
									</a>
								)}
							</div>
						)}
						{isImageText && <ImageText comentario={comentario} />}
						{medias?.length > 0 && (
							<MediaContainer medias={medias} />
						)}
					</div>
					<FooterPost imgPrincipalUrl={imgPrincipalUrl} post={post} />
				</div>
			) : (
				<div ref={ref}>
					<PostLoading />
				</div>
			)}
		</>
	);
};

export default Post;
