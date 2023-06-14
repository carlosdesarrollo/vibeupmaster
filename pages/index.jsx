import Avatar from "../src/components/Avatar";
import MainLayout from "../src/layouts/MainLayout";
import styles from "../styles/Pages/HomePage.module.scss";
import FilterIcon from "../src/components/Icons/interfaz/FilterIcon";
import Post from "../src/components/Post";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
	modalPublicacionAtom,
	postsPrincipalAtom,
	textoPublicacionAtom,
	userDataAtom,
} from "../src/atoms";
import Card from "../src/components/Card/Card";
import { AnimatePresence, motion } from "framer-motion";
import ModalPost from "../src/components/Post/Modal";
import { useRouter } from "next/router";
import Head from "next/head";
import TextTruncate from "react-text-truncate";
import { publicacionesApi } from "../src/api";
import PostsListHome from "../src/components/Post/PostsListHome";
import ScrollInfinitoLoader from "../src/components/Post/ScrollInfinito";
import { Publicity } from "../src/components/Publicity";

const HomePage = () => {
	const router = useRouter();
	const [userData] = useAtom(userDataAtom);
	const [showPostModal, setShowPostModal] = useAtom(modalPublicacionAtom);
	const [text, setText] = useAtom(textoPublicacionAtom);

	// estados de las publicaciones
	const NUMERO_POSTS = 10;
	const [posts, setPosts] = useAtom(postsPrincipalAtom);
	const [postsCargados, setPostsCargados] = useState(NUMERO_POSTS);
	const [cargando, setCargando] = useState(false);

	const activarModal = () => {
		setShowPostModal(true);
		document.body.style.overflow = "hidden";
	};

	const desactivarModal = () => {
		setShowPostModal(false);
		document.body.style.overflow = "auto";
	};

	// const primerNombre = userData?.usuario.split(" ")[0];
	const nombreCompleto = userData?.personaEnt.nombrecompleto;

	useEffect(() => {
		if (text.length > 0) {
			const handleBeforeUnload = (e) => {
				e.preventDefault();
				e.returnValue = "";
			};

			window.addEventListener("beforeunload", handleBeforeUnload);

			return () => {
				window.removeEventListener("beforeunload", handleBeforeUnload);
			};
		}
	}, [text.length]);

	const getPosts = async () => {
		setCargando(true);
		const posts = await publicacionesApi("?page=iListarTodPub", {
			numero: postsCargados,
		});
		const postParse = JSON.parse(posts.data);
		setPosts(postParse);
		console.log(postParse);
		setCargando(false);
	};

	useEffect(() => {
		getPosts();
	}, []);

	const getMorePosts = async () => {
		setCargando(true);
		const posts = await publicacionesApi("?page=iListarTodPub", {
			numero: postsCargados + NUMERO_POSTS,
		});
		const postsNuevos = JSON.parse(posts.data);
		setPosts((posts) => [...posts, ...postsNuevos]);
		setPostsCargados(postsCargados + NUMERO_POSTS);
		setCargando(false);
	};

	const imgPrincipal = userData?.usuarioEnt.images.find(
		(img) => img.principal === "0"
	);
	const imgPrincipalUrl = imgPrincipal?.ruta + imgPrincipal?.nombre;

	return (
		<MainLayout>
			<section className={styles.section}>
				<div className={styles.postSection}>
					<Card
						className={
							"mb-4 pt-3 py-4 pb-5 max-[520px]:border-x-0 max-[520px]:rounded-none"
						}
					>
						<div className={`${styles.inputPostContainer}`}>
							<Avatar
								size={60}
								nombre={<p className=' -mt-0.5'>foto</p>}
								url={
									(userData?.usuarioEnt?.images?.length &&
										`${imgPrincipalUrl}`) ||
									"/assets/images/sinfoto.png"
								}
							/>
							<motion.button
								className={styles.inputPost}
								whileTap={{
									scale: 0.95,
								}}
								onClick={activarModal}
							>
								<TextTruncate
									line={1}
									element='p'
									truncateText={"..."}
									text={
										text.length > 0 && !showPostModal
											? text
											: `¿Qué estás pensando, ${
													nombreCompleto || "usuario"
											  }?`
									}
								/>
							</motion.button>
						</div>
					</Card>
					<PostsListHome
						posts={posts}
						imgPrincipalUrl={imgPrincipalUrl}
					/>
					<div className=''>
						{posts.length > 0 && (
							<ScrollInfinitoLoader getMorePosts={getMorePosts} />
						)}
					</div>
				</div>
				<Publicity />
			</section>
			<AnimatePresence>
				{showPostModal && (
					<ModalPost
						userData={userData}
						desactivarModal={desactivarModal}
						getPosts={getPosts}
					/>
				)}
			</AnimatePresence>
		</MainLayout>
	);
};

export default HomePage;
