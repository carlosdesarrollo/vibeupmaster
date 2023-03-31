import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { publicacionesApi } from "../../api";
import { userDataAtom } from "../../atoms";
import Avatar from "../Avatar";
import { SpinnerLoader } from "../Loaders";
import styles from "./styles/post.module.css";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.extend(relativeTime);
dayjs.locale("es");

const CommentsPost = ({ post, setCantidadComentarios, imgPrincipalUrl }) => {
	const [userData, setUserData] = useAtom(userDataAtom);
	const [comments, setComments] = useState([]);
	const [loadingComments, setLoadingComments] = useState(true);
	const [comentario, setComentario] = useState("");
	const [acceptComment, setAcceptComment] = useState(true);

	const handleComentario = (e) => {
		const { value } = e.target;
		const capitalized = value.charAt(0).toUpperCase() + value.slice(1);

		setComentario(value);
	};

	useEffect(() => {
		setLoadingComments(true);
		const getComments = async () => {
			try {
				const resComments = await publicacionesApi.post(
					"?page=iListarComentarios",
					{
						idpub: post.id,
					}
				);
				const resParsed = JSON.parse(resComments.data);
				setComments(resParsed);
				setLoadingComments(false);
			} catch (error) {
				console.log(error);
				setLoadingComments(false);
			}
		};
		getComments();
	}, []);

	const handleSubmit = async () => {
		if (comentario.trim() === "") return;
		const capitalized =
			comentario.charAt(0).toUpperCase() + comentario.slice(1);
		try {
			const newComment = {
				comentario: capitalized.trim(),
				nombre: userData?.personaEnt?.nombrecompleto,
				fechacreacion: dayjs().format("YYYY-MM-DD HH:mm:ss"),
			};
			setComments([...comments, newComment]);
			setAcceptComment(false);
			setComentario("");
			const res = await publicacionesApi.post("?page=iRegComentarios", {
				publicacionid: post?.id,
				comentario: capitalized.trim(),
				usuario: userData?.usuarioEnt?.id,
			});
			if (res.data.status == 200) {
				setCantidadComentarios(comments.length + 1);
				setAcceptComment(true);
			}
		} catch (error) {
			// eliminar el comentario agregado en el estado
			setComments(comments.slice(0, comments.length - 1));
			console.log(error);
		}
	};

	const getTimeAmigable = (fechaPost) => {
		const fechaCreacion = dayjs(fechaPost);
		const fechaActual = dayjs();
		const duration = fechaActual.diff(fechaCreacion);
		if (duration < 300000) {
			return "1min";
		} else if (duration < 3600000) {
			return `${Math.floor(duration / 60000)}min`;
		} else if (duration < 86400000) {
			return `${Math.floor(duration / 3600000)}h`;
		} else if (duration < 604800000) {
			return `${Math.floor(duration / 86400000)}d`;
		} else if (duration < 2592000000) {
			return `${Math.floor(duration / 86400000)}d`;
		} else if (duration < 7776000000) {
			return `${Math.floor(duration / 2592000000)}m`;
		} else {
			return fechaCreacion.format("D [de] MMMM [de] YYYY");
		}
	};

	return (
		<>
			{loadingComments ? (
				<div className='flex justify-center py-4 pb-1'>
					<SpinnerLoader
						size={30}
						style={{
							"--color": "#10c7f0",
						}}
					/>
				</div>
			) : (
				<div className={styles.comments_container}>
					<div className={styles.comment_input}>
						<Avatar
							size={36}
							url={
								(userData?.usuarioEnt?.images?.length &&
									`${imgPrincipalUrl}`) ||
								"/assets/images/sinfoto.png"
							}
						/>
						<input
							className={styles.input_post}
							aria-label='Comentar...'
							type='text'
							placeholder='Comentar...'
							value={comentario}
							onChange={handleComentario}
							onKeyDown={(e) => {
								if (
									comentario.length > 0 &&
									e.key === "Enter"
								) {
									handleSubmit();
								}
							}}
						/>
					</div>
					<div className={styles.comments}>
						{comments.map((comment, i) => {
							if (i === comments.length - 1 && !acceptComment) {
								return (
									<div
										key={i}
										className='flex items-start gap-2'
									>
										<Avatar size={36} />
										<div className='px-3 py-2 pb-[12px] rounded-[18px] bg-[#f0f2f5] max-w-[90%] ml-0 opacity-40'>
											<div className='flex items-center justify-between gap-2'>
												<span className='text-[13px] font-semibold'>
													{comment.nombre}
												</span>
												<span className='text-[11px] tracking-wide text-gray-500'>
													{getTimeAmigable(
														comment.fechacreacion
													)}
												</span>
											</div>
											<p className='text-[13px] tracking-wide text-gray-600'>
												{comment.comentario}
											</p>
										</div>
									</div>
								);
							}
							return (
								<div key={i} className='flex items-start gap-2'>
									<Avatar size={36} />
									<div className='px-3 py-2 pb-[12px] rounded-[18px] bg-[#f0f2f5] max-w-[90%] ml-0 '>
										<div className='flex items-center justify-between gap-2'>
											<span className='text-[13px] font-semibold'>
												{comment.nombre}
											</span>
											<span className='text-[11px] tracking-wide text-gray-500 ml-2'>
												{getTimeAmigable(
													comment.fechacreacion
												)}
											</span>
										</div>
										<div className='text-sm tracking-wide'>
											{comment.comentario}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
};

export default CommentsPost;
