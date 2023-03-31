import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import { useAtom } from "jotai";
import { userDataAtom } from "../atoms";
import axios from "axios";
import Head from "next/head";

const MainLayout = ({ children, title, description }) => {
	const router = useRouter();
	const [userData, setUserData] = useAtom(userDataAtom);
	const [loading, setLoading] = useState(true);

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
					console.log(data);
				} else {
					router.push("/auth");
				}
			} catch (error) {
				localStorage.removeItem("user");
				setUserData(null);
				router.push("/auth");
			}
		} else {
			router.replace("/auth");
		}
	};

	useEffect(() => {
		if (userData) {
			setLoading(false);
		} else {
			getUserData();
		}
	}, []);

	if (!userData) {
		return null;
	}

	return (
		<>
			<Head>
				<title>{title ? `${title} | VibeUp` : `VibeUp`}</title>
				<meta charSet='UTF-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
				<meta name='description' content={`${description}`} />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div id='__almeyda'>
				<Navbar userData={userData} />
				<div className='content'>
					<Aside userData={userData} />
					<main>{children}</main>
				</div>
			</div>
		</>
	);
};

MainLayout.defaultProps = {
	description: "VibeUp description page",
};

export default MainLayout;
