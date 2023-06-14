import Link from "next/link";
import Button from "../Buttons/Button";
import { useEffect, useState } from "react";
import { Input } from "../Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import axios from "axios";
import { useAtom } from "jotai";
import { userDataAtom, userRegistradoAtom } from "../../atoms";
import ReactConfetti from "react-confetti";
import { motion } from "framer-motion";
import { seguridadApi } from "../../api";
import Head from "next/head";

const LoginForm = () => {
	const router = useRouter();
	const [userData, setUserData] = useAtom(userDataAtom);
	const [loading, setLoading] = useState(false);
	const [userRegistrado, setUserRegistrado] = useAtom(userRegistradoAtom);
	// const [userRegistrado, setUserRegistrado] = useState("userRegistrado Atom");
	const [windowDimensions, setWindowDimensions] = useState({
		width: 0,
		height: 0,
	});

	const [numberOfPieces, setNumberOfPieces] = useState(200);

	const [error, setError] = useState(false);

	const getPrimerNombre = (nombre) => {
		const nombres = nombre.split(" ");
		return nombres[0];
	};

	const formik = useFormik({
		initialValues: {
			usuario: userRegistrado ? userRegistrado : "",
			contrasena: "",
		},
		validationSchema: Yup.object({
			usuario: Yup.string()
				.trim()
				.notOneOf([""])
				.required("El usuario es obligatorio"),
			contrasena: Yup.string()
				.trim()
				.notOneOf([""])
				.required("La contraseña es obligatoria"),
		}),
		onSubmit: async (values, { setErrors }) => {
			setLoading(true);
			setError(false);
			try {
				const response = await seguridadApi("?page=iLogin", values);
				if (response.data.status == 200) {
					setUserRegistrado(null);
					const data = response.data.usuarioEnt;
					console.log(data);

					// obtener la información completa del usuario
					const responseUserData = await seguridadApi(
						"?page=iCargarDatosUsu",
						{
							id: Number(data.id),
						}
					);
					console.log(responseUserData);
					if (responseUserData.data.status == 200) {
						const userData = responseUserData.data;
						const { usuarioEnt, personaEnt } = userData;

						const responseImgUser = await seguridadApi(
							"?page=iCargarUsuImg",
							{
								id: Number(usuarioEnt.id),
							}
						);
						const user = {
							personaEnt,
							usuarioEnt: {
								...usuarioEnt,
								images: JSON.parse(responseImgUser.data),
							},
						};
						setUserData(user);
						const encryptedData = await axios.post("/api/crypto", {
							texto: JSON.stringify(user),
						});
						localStorage.setItem(
							"user",
							encryptedData.data.encrypted
						);
						setLoading(false);
						router.replace("/");
					}
				}
				if (response.data.status == 500) {
					setErrors({
						usuario: "Usuario o contraseña incorrectos",
						contrasena: "Usuario o contraseña incorrectos",
					});
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		},
	});

	const handleResize = () => {
		setWindowDimensions({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	useEffect(() => {
		setWindowDimensions({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}, []);

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [windowDimensions]);

	const animarConfetti = async () => {
		// un setTimeout
	};

	useEffect(() => {
		if (userRegistrado) {
			setTimeout(() => {
				setNumberOfPieces(0);
			}, 3500);
		}
	}, [userRegistrado]);

	const handleChangePassword = (e) => {
		formik.handleChange(e);
		setUserRegistrado("");
	};

	return (
		<>
			<Head>
				<title>Iniciar Sesión | VibeUp</title>
			</Head>
			<form className='form' onSubmit={formik.handleSubmit}>
				{userRegistrado && (
					<div className='text-green-500 text-xs font-medium bg-green-100 p-4 rounded-md relative flex items-center'>
						Felicidades {getPrimerNombre(userRegistrado)}! Ya puedes
						iniciar sesión.
						<motion.div
							className='cursor-pointer top-0 right-1 rounded-full  bg-green-200 w-5 h-5 flex justify-center items-center leading-none'
							onClick={() => {
								setUserRegistrado("");
								formik.setFieldValue("usuario", "");
							}}
							whileTap={{ scale: 0.85 }}
						>
							<div className='absolute w-3 h-0.5 bg-green-500 transform rotate-45' />
							<div className='absolute w-3 h-0.5 bg-green-500 transform -rotate-45' />
						</motion.div>
					</div>
				)}
				<Input
					type='text'
					name='usuario'
					id='email'
					placeholder='Ingrese su usuario'
					value={formik.values.usuario}
					onChange={formik.handleChange}
					error={formik.errors.usuario}
				/>
				<Input.Password
					name='contrasena'
					id='password'
					placeholder='Contraseña'
					value={formik.values.contrasena}
					onChange={handleChangePassword}
					error={formik.errors.contrasena}
				/>
				{error && (
					<div className='text-red-500 text-sm font-medium'>
						Usuario o contraseña incorrectos
					</div>
				)}
				{/* {userRegistrado && (
					<div className='text-gray-500 text-xs font-medium my-2'>
						Felicidades {getPrimerNombre(userRegistrado)}! Ya puedes
						iniciar sesión.
					</div>
				)} */}
				<div className='pb-2 grid gap-4'>
					<Button type='submit' loading={loading ? 1 : 0}>
						INICIAR SESIÓN
					</Button>
					<Link className='navlink' href='/auth/forgot-password'>
						Olvidaste tu contraseña?
					</Link>
				</div>
			</form>

			{userRegistrado && (
				<ReactConfetti
					width={windowDimensions.width - 5}
					height={windowDimensions.height - 5}
					numberOfPieces={numberOfPieces}
				/>
			)}
		</>
	);
};

export default LoginForm;
