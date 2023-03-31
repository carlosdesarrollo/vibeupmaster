import HeartIcon from "../Icons/interfaz/HeartIcon";
import styles from "./styles/post.module.css";
import { motion } from "framer-motion";
import { MessageIcon } from "../Icons/controls";
import ShareIcon from "../Icons/interfaz/ShareIcon";
import { useState } from "react";
import { publicacionesApi } from "../../api";
import { SpinnerLoader } from "../Loaders";
import Avatar from "../Avatar";
import CommentsPost from "./CommentsPost";

const FooterPost = ({ post, imgPrincipalUrl }) => {
	const { cantcomentarios, megusta } = post || {};

	const [cantidadComentarios, setCantidadComentarios] =
		useState(cantcomentarios);
	const [isLiked, setIsLiked] = useState(megusta);
	const [loadingLike, setLoadingLike] = useState(false);
	const [showComments, setShowComments] = useState(false);

	const handleLike = async () => {
		setLoadingLike(true);
		try {
			const response = await publicacionesApi.post("?page=iRegLike", {
				publicacionid: post.id,
			});
			console.log(response);
			if (response.data.status == 200) {
				setIsLiked(Number(isLiked) + 1);
			}
			setLoadingLike(false);
		} catch (error) {
			console.log(error);
			setLoadingLike(false);
		}
	};

	return (
		<div className={styles.postFooter}>
			<div className={styles.reactionsInfo}>
				<div className={styles.reactionsInfo_left}>
					<HeartIcon width={18} />
					{loadingLike ? (
						<SpinnerLoader
							size={16}
							style={{
								"--color": "#818482",
							}}
						/>
					) : (
						<p>{isLiked ? isLiked : 200}</p>
					)}
				</div>
				<div className={styles.reactionsInfo_right}>
					<span>
						{cantidadComentarios ? cantidadComentarios : 200}{" "}
						comments
					</span>
					<span>5 shares</span>
				</div>
			</div>
			<div className={styles.postFooterActions}>
				<motion.button
					className={styles.postFooterAction}
					whileTap={{ scale: 0.9 }}
					onClick={handleLike}
				>
					<div className={styles.icono}>
						<HeartIcon
							width={22}
							style={{
								transform: "translateY(1px)",
							}}
						/>
					</div>
					{loadingLike ? (
						<SpinnerLoader
							size={18}
							style={{
								"--color": "#818482",
							}}
						/>
					) : (
						<p>{isLiked ? isLiked : 200}</p>
					)}
				</motion.button>
				<motion.button
					className={styles.postFooterAction}
					whileTap={!showComments && { scale: 0.9 }}
					onClick={() => setShowComments(true)}
				>
					<div className={styles.icono}>
						<MessageIcon width={22} />
					</div>
					<p>Comentar</p>
				</motion.button>
				<motion.button
					className={styles.postFooterAction}
					whileTap={{ scale: 0.9 }}
				>
					<div className={styles.icono}>
						<ShareIcon width={22} />
					</div>
					<p>Share</p>
				</motion.button>
			</div>
			{showComments && (
				<CommentsPost
					post={post}
					setCantidadComentarios={setCantidadComentarios}
					imgPrincipalUrl={imgPrincipalUrl}
				/>
			)}
		</div>
	);
};

export default FooterPost;
