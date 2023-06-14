import Input from "../../Input/Input";
import DropImages from "../DropImages";
import PrecioInput from "./PrecioInput";
import CustomSelect from "./CustomSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Button from "../../Buttons/Button";
import { serviciosApi } from "../../../api";
import { useAtom } from "jotai";
import { userDataAtom } from "../../../atoms";
import axios from "axios";

const Formulario = ({
	categorias,
	subcategorias,
	onClose,
	getPublicaciones,
}) => {
	const [userData, setUserData] = useAtom(userDataAtom);
	const [imagesAndVideos, setImagesAndVideos] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const initialValues = {
		titulo: "",
		idsubcategoria: "",
		precio: "",
	};

	const validationSchema = Yup.object({
		titulo: Yup.string()
			.trim()
			.notOneOf([""])
			.min(3, "El nombre debe tener al menos 3 caracteres")
			.max(70, "El nombre debe tener como máximo 70 caracteres")
			.matches(
				/^(?!.*\d{3}[\s.-]?\d{3}[\s.-]?\d{3}).*$/,
				"El título debe ser valido"
			)
			.matches(
				/^(?!.*<[^>]+>).*$/,
				"El título no debe contener contenido HTML"
			)
			.matches(
				/^(?!.*\b(www|http)\b).*$/,
				"El título no debe contener enlaces"
			)
			.required("El título es requerido"),
		idsubcategoria: Yup.string().required("La subcategoria es requerida"),
		precio: Yup.number().required("El precio es requerido"),
	});

	const onSubmit = async (values) => {
		setLoading(true);
		try {
			// crear servicio
			const newServicio = {
				id: 0,
				descripcion: values.titulo,
				idsubcategoria: Number(values.idsubcategoria),
				usuarioid: Number(userData.usuarioEnt.id),
				idtipomoneda: 1,
				precio: Number(values.precio),
				location: "Colombia, Bogota",
				latitud: "4.6097",
				longitud: "-74.0817",
				estado: 1,
			};
			console.log(newServicio);
			// respuesta del servicio
			const createServicio = await serviciosApi(
				"?page=iRegistrarServicio",
				newServicio
			);
			console.log("se creo servicio", createServicio);
			// si se creo el servicio
			if (createServicio.data.status === "200") {
				// obtener el id del servicio creado
				// si hay imagenes o videos
				if (imagesAndVideos.length > 0) {
					// crear un form data
					const formData = new FormData();
					// llenar el form data con las imagenes y videos
					imagesAndVideos.forEach((image) => {
						formData.append("file", image.file);
					});
					// enviar las imagenes y videos a la api de upload
					const uploadImages = await axios.post(
						"api/publicaciones/upload",
						formData
					);
					console.log(uploadImages);
					// si se subieron las imagenes y videos
					if (uploadImages.status === 200) {
						const { rutaimagen, imagenes } = uploadImages.data;
						// suibirlo a la api de galeria de servicios
						const createGaleria = imagenes.map(async (imagen) => {
							const newImagen = {
								id: 0,
								idservicios: createServicio.data.data,
								ruta: `${rutaimagen}${imagen}`,
								estado: 1,
								usuarioid: Number(userData.usuarioEnt.id),
							};
							console.log(
								"enviando este cuerpo a la api de galeria",
								newImagen
							);
							const createImagen = await serviciosApi(
								"?page=iRegistrarGaleriaServicio",
								newImagen
							);
							console.log("se creo una imagen", createImagen);
							return createImagen;
						});

						await Promise.all(createGaleria);
						// cerrar el modal
						onClose();
						setLoading(false);
						getPublicaciones();
						console.log("se creo galeria con todas las imagenes");
					} else {
						// si no se subieron las imagenes y videos
						// mostrar un mensaje de error
						setError("No se pudieron subir las imagenes y videos");
						setLoading(false);
					}
				} else {
					// si no hay imagenes o videos
					// cerrar el modal
					onClose();
					setLoading(false);
					getPublicaciones();
					// recargar la pagina
				}
			} else {
				// si no se creo el servicio
				// mostrar un mensaje de error
				setError("No se pudo crear el servicio, intentelo de nuevo");
				setLoading(false);
			}
		} catch (error) {
			// si hay un error
			// mostrar un mensaje de error
			setError("No se pudo crear el servicio, intentelo de nuevo");
			setLoading(false);
			console.log(error);
		}
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});

	const setValueChange = (key, value) => {
		formik.setFieldValue(key, value);
	};

	return (
		<div className='grid gap-3'>
			<DropImages
				{...{
					error,
					loading,
					setError,
					imagesAndVideos,
					setImagesAndVideos,
				}}
			/>
			<form className='grid gap-3' onSubmit={formik.handleSubmit}>
				<div className='grid gap-3'>
					<Input
						type='text'
						label='Titulo'
						placeholder='Titulo'
						htmlFor='nombre'
						name='titulo'
						value={formik.values.titulo}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.errors.titulo}
						disabled={loading}
					/>
					<PrecioInput
						type='text'
						prefix='$'
						maxLength={999999999}
						name='precio'
						value={formik.values.precio}
						onChange={setValueChange}
						onBlur={formik.handleBlur}
						error={formik.errors.precio}
						disabled={loading}
					/>
					<CustomSelect
						{...{
							categorias,
							subcategorias,
						}}
						name='idsubcategoria'
						onChange={setValueChange}
						onBlur={formik.handleBlur}
						error={formik.errors.idsubcategoria}
						valueFormik={formik.values.idsubcategoria}
						disabled={loading}
					/>
				</div>
				<div className='flex'>
					<Button type='submit' loading={loading ? 1 : 0}>
						{loading ? "Cargando..." : "Crear Servicio"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Formulario;
