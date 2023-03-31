import styles from "./styles/styles.module.css";
import Card from "../../components/Card/Card";
import VibeLogo from "../../components/Svgs/Logos/VibeLogo";
import { SkeletonUI } from "../../components/Loaders";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userDataAtom } from "../../atoms";
import { useEffect } from "react";
import axios from "axios";

const LoginRegister = ({ children }) => {
	const router = useRouter();
	const year = new Date().getFullYear();

	const isLogin = router.pathname === "/auth/login";

	const [userData, setUserData] = useAtom(userDataAtom);

	const getUserData = async () => {
		const encryptedData = localStorage.getItem("user");
		if (encryptedData) {
			const response = await axios.post("/api/decrypt", {
				texto: encryptedData,
			});
			try {
				const data = JSON.parse(response.data.decrypted);
				if (data.usuarioEnt.usuario) {
					setUserData(data);
					router.push("/");
				} else {
					router.push("/auth");
				}
			} catch (error) {
				localStorage.removeItem("user");
				setUserData(null);
				router.push("/auth");
			}
		}
	};

	useEffect(() => {
		if (!userData) {
			getUserData();
		}
	}, []);

	if (userData) {
		return null;
	}

	return (
		<section className={styles.auth}>
			<main>
				<article className={styles.auth__container}>
					<div className='authPerson'>
						<SkeletonUI height={"100%"} radius={0} />
					</div>
					<div className={`${styles.authInfo}`}>
						<Card className={styles.authCard}>
							<div className={styles.head}>
								<VibeLogo width={70} />
								<h2>VibeUp</h2>
							</div>
							<div className={styles.body}>{children}</div>
						</Card>
						<Card className='loginCardBottom'>
							{isLogin ? (
								<>
									<p>¿No tienes una cuenta?</p>
									<button
										className='text-[#1CB1D3] font-bold'
										onClick={() =>
											router.push("/auth/registro")
										}
									>
										Regístrate
									</button>
								</>
							) : (
								<>
									<p>¿Ya tienes una cuenta?</p>
									<button
										className='text-[#1CB1D3] font-bold'
										onClick={() =>
											router.push("/auth/login")
										}
									>
										Inicia sesión
									</button>
								</>
							)}
						</Card>
					</div>
				</article>
			</main>
			<footer className='py-6 pb-11'>
				<p className='text-gray-500 font-light text-xs text-center'>
					© {year} VibeUp Project
				</p>
			</footer>
		</section>
	);
};

export default LoginRegister;
