import { useEffect, useState } from "react";
import Button from "../Buttons/Button";
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "../Input";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userRegistradoAtom } from "../../atoms";
import { seguridadApi } from "../../api";
import Head from "next/head";

const RegisterForm = () => {
	const router = useRouter();

	const anioActual = new Date().getFullYear();
	const [loading, setLoading] = useState(false);
	const [, setUserRegistrado] = useAtom(userRegistradoAtom);

	const formik = useFormik({
		initialValues: {
			rolid: 2,
			personaid: null,
			usuario: "",
			contrasena: "",
			tipologin: 1,
			nombre: "",
			apellido: "",
			year: `${anioActual}`,
			mes: "01",
			dia: "01",
			fechanacimiento: "",
			sexo: "",
		},
		validationSchema: Yup.object().shape({
			nombre: Yup.string()
				.trim()
				.notOneOf([""])
				.required("El nombre es obligatorio")
				.matches(/^[a-zA-Z ]*$/, "El nombre no debe tener números"),
			apellido: Yup.string()
				.trim()
				.notOneOf([""])
				.required("El apellido es obligatorio")
				.matches(/^[a-zA-Z ]*$/, "El apellido no debe tener números"),
			usuario: Yup.string()
				.trim()
				.notOneOf([""])
				.required("El usuario es obligatorio"),
			contrasena: Yup.string()
				.trim()
				.notOneOf([""])
				.required("La contraseña es obligatoria")
				.matches(
					/^(?=.*[A-Z]).*$/,
					"La contraseña debe tener al menos una letra en mayúscula"
				)

				.matches(
					/^(?=.*[a-z]).*$/,
					"La contraseña debe tener al menos una letra en minúscula"
				)
				.matches(
					/^(?=.*[0-9]).*$/,
					"La contraseña debe tener al menos un número"
				)

				.min(6, "La contraseña debe tener al menos 6 caracteres")
				.max(16, "La contraseña no puede tener más de 16 caracteres")
				.matches(
					/^(?=.*[!@#$%^&*]).*$/,
					"La contraseña debe tener al menos un caracter especial (@,#,$,%,&,*)"
				),

			// .max(16, "La contraseña no puede tener más de 16 caracteres"),
			dia: Yup.string().required("El dia es obligatorio"),
			mes: Yup.string().required("El mes es obligatorio"),
			year: Yup.string()
				.required("El año es obligatorio")
				.test(
					"test-name",
					"Debes ser mayor de 10 años",
					function (value) {
						const { createError, path, resolve } = this;
						const year = resolve(Yup.ref("year"));
						const fechaActual = new Date();
						const anioActual = fechaActual.getFullYear();
						const anioNacimiento = parseInt(year);
						const edad = anioActual - anioNacimiento;
						if (edad < 10) {
							return createError({
								path,
								message:
									"Asegúrate de que tu fecha de nacimiento sea correcta",
							});
						}
						return true;
					}
				),
			// sexo es un radio y es requerido
			sexo: Yup.string().required("El sexo es obligatorio"),
		}),
		onSubmit: async (
			{
				rolid,
				personaid,
				usuario,
				contrasena,
				tipologin,
				nombre,
				apellido,
				year,
				mes,
				dia,
				sexo,
			},
			{ setErrors }
		) => {
			setLoading(true);
			try {
				const usuarioEnt = await seguridadApi(
					"?page=iRegistroUsuario",
					{
						rolid,
						personaid,
						usuario,
						contrasena,
						tipologin,
					}
				);
				console.log(usuarioEnt);
				if (usuarioEnt.data.status === "200") {
					const idUsuarioEnt = usuarioEnt.data.usuarioEnt.id;
					const usernameEnt = usuarioEnt.data.usuarioEnt.usuario;
					console.log(idUsuarioEnt);
					const personaEnt = await seguridadApi(
						"?page=iRegistrarPersona",
						{
							personaid: null,
							nombrecompleto: `${nombre} ${apellido}`,
							fechanacimiento: `${year}-${mes}-${dia}`,
							ciudad: "",
							direccion: "",
							telefono: "",
							telefvis: 0,
							usuario: idUsuarioEnt,
							tipo: 1,
							apodo: "",
							acudiente: "",
							parentesco: "",
							acudientendocumento: "",
							acudientetelf: "",
							acudientecorreo: "",
							sexo: sexo,
							nacionalidad: "",
						}
					);
					console.log(personaEnt);
					if (personaEnt.data.status === "200") {
						setLoading(false);
						setUserRegistrado(usernameEnt);
						router.push("/auth/login");
					} else {
						setLoading(false);
					}
				}
				if (
					usuarioEnt.data.message ===
					"La clave debe tener al menos una letra mayúscula"
				) {
					setErrors({
						contrasena:
							"La contraseña debe tener al menos una letra en mayúscula",
					});
				}
				if (usuarioEnt.data.message === "Ya existe ese usuario") {
					setErrors({ usuario: "Este usuario ya existe" });
				}
				if (
					usuarioEnt.data.message ===
					"La clave debe tener al menos un caracter numérico"
				) {
					setErrors({
						contrasena:
							"La contraseña debe tener al menos un caracter numérico",
					});
				}
				if (
					usuarioEnt.data.message ===
					"La clave no puede tener más de 16 caracteres"
				) {
					setErrors({
						contrasena:
							"La contraseña no puede tener más de 16 caracteres",
					});
				}
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		},
	});

	const meses = [
		{ value: "01", label: "Enero" },
		{ value: "02", label: "Febrero" },
		{ value: "03", label: "Marzo" },
		{ value: "04", label: "Abril" },
		{ value: "05", label: "Mayo" },
		{ value: "06", label: "Junio" },
		{ value: "07", label: "Julio" },
		{ value: "08", label: "Agosto" },
		{ value: "09", label: "Septiembre" },
		{ value: "10", label: "Octubre" },
		{ value: "11", label: "Noviembre" },
		{ value: "12", label: "Diciembre" },
	];

	return (
		<>
			<Head>
				<title>Registro | VibeUp</title>
			</Head>
			<form className='form' onSubmit={formik.handleSubmit}>
				<div className='flex gap-2'>
					<Input
						type='text'
						name='nombre'
						placeholder='Nombre'
						onChange={formik.handleChange}
						value={formik.values.nombre}
						error={formik.errors.nombre}
					/>
					<Input
						type='text'
						name='apellido'
						placeholder='Apellidos'
						onChange={formik.handleChange}
						value={formik.values.apellido}
						error={formik.errors.apellido}
					/>
				</div>
				<Input
					type='text'
					name='usuario'
					placeholder='Nombre de usuario'
					onChange={formik.handleChange}
					value={formik.values.usuario}
					error={formik.errors.usuario}
				/>
				<Input.Password
					name='contrasena'
					placeholder='Cree una contraseña nueva'
					onChange={formik.handleChange}
					value={formik.values.contrasena}
					error={formik.errors.contrasena}
				/>
				<div className=''>
					<div className='text-start text-gray-500 font-medium text-xs'>
						Fecha de nacimiento
					</div>
					<div className='flex gap-2.5 mt-2 mb-1'>
						<div className='input_wrapper'>
							<select
								name='dia'
								className={
									formik.errors.year
										? "inputselect error"
										: "inputselect"
								}
								value={formik.values.dia}
								onChange={formik.handleChange}
							>
								{Array.from({ length: 31 }, (_, i) => (
									<option
										key={i}
										value={i + 1 < 10 ? `0${i + 1}` : i + 1}
									>
										{i + 1}
									</option>
								))}
							</select>
						</div>
						<div className='input_wrapper'>
							<select
								className={
									formik.errors.year
										? "inputselect error"
										: "inputselect"
								}
								name='mes'
								value={formik.values.mes}
								onChange={formik.handleChange}
							>
								{meses.map((mes) => (
									<option key={mes.value} value={mes.value}>
										{mes.label}
									</option>
								))}
							</select>
						</div>
						<div className='input_wrapper'>
							<select
								name='year'
								className={
									formik.errors.year
										? "inputselect error"
										: "inputselect"
								}
								value={formik.values.year}
								onChange={formik.handleChange}
							>
								{Array.from({ length: 101 }, (_, i) => (
									<option key={i} value={`${anioActual - i}`}>
										{anioActual - i}
									</option>
								))}
							</select>
						</div>
					</div>
					{formik.errors.year && (
						<p className='text-red-500 text-xs text-start'>
							{formik.errors.year}
						</p>
					)}
					<div className='flex gap-5 mt-2 mb-1 items-center'>
						<div className='text-start text-gray-500 font-medium text-sm'>
							Género:
						</div>
						<div className='w-full grid grid-cols-2 gap-2.5'>
							<label
								htmlFor='hombre'
								className={
									formik.errors.sexo ? "radio error" : "radio"
								}
							>
								<span className='text-[15px] text-gray-600'>
									Hombre
								</span>
								<input
									type='radio'
									name='sexo'
									value='H'
									id='hombre'
									className='w-[18px] h-[18px]'
									onChange={formik.handleChange}
									checked={formik.values.sexo === "H"}
								/>
							</label>
							<label
								htmlFor='mujer'
								className={
									formik.errors.sexo ? "radio error" : "radio"
								}
							>
								<span className='text-[15px] text-gray-600'>
									Mujer
								</span>
								<input
									type='radio'
									name='sexo'
									value='M'
									id='mujer'
									className='w-[18px] h-[18px]'
									onChange={formik.handleChange}
									checked={formik.values.sexo === "M"}
								/>
							</label>
						</div>
					</div>
				</div>
				<Button type='submit' loading={loading ? 1 : 0}>
					REGISTRARSE
				</Button>
			</form>
		</>
	);
};

export default RegisterForm;
