import { Modal } from "../../Modal";
import Portal from "../../Portal";
import DropImages from "../DropImages";
import { useState, useEffect } from "react";
import { serviciosApi } from "../../../api";
import Loading from "./Loading";
import Formulario from "./Form";

const CreateServicio = ({ onClose, getPublicaciones }) => {
	const [loading, setLoading] = useState(false);
	const [categorias, setCategorias] = useState([]);
	const [subcategorias, setSubcategorias] = useState([]);
	const [error, setError] = useState(null);

	// const [servicio, setServicio] = useState({
	// 	id: 0,
	// 	titulo: "",
	// 	idsubcategoria: "",
	// 	usuarioid: userData.usuarioEnt.id,
	// 	idtipomoneda: 1,
	// 	precio: 0,
	// 	location: "",
	// 	latitud: 0,
	// 	longitud: 0,
	// 	estado: 1,
	// });

	// const newGaleria = {
	// 	id: 0,
	// 	idservicios: 1,
	// 	ruta: "",
	// 	estado: 1,
	// 	usuarioid: 1,
	// };

	const getData = async (endpoint) => {
		try {
			const response = await serviciosApi(endpoint);
			const data = JSON.parse(response.data);
			return data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	const getAllData = async () => {
		setLoading(true);
		try {
			Promise.all([
				getData("?page=iListarCategorias"),
				getData("?page=iListarSubcategorias"),
			])
				.then(([categorias, subcategorias]) => {
					setCategorias(categorias);
					setSubcategorias(subcategorias);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setLoading(false);
				});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!categorias.length && !subcategorias.length) {
			getAllData();
		}
	}, [categorias.length, subcategorias.length]);

	console.log("categorias", categorias);
	console.log("subcategorias", subcategorias);

	return (
		<Modal
			title={
				<div className='py-3 pb-3.5 w-full text-start flex justify-start flex-col items-start'>
					<h4 className='text-sm font-normal text-slate-500'>
						Servicios
					</h4>
					<h2 className=''>Publicar servicio</h2>
				</div>
			}
			onClose={onClose}
			style={{
				maxWidth: "590px",
			}}
		>
			{loading ? (
				<Loading />
			) : (
				<Formulario
					{...{
						categorias,
						subcategorias,
						onClose,
						getPublicaciones,
					}}
				/>
			)}
		</Modal>
	);
};

export default CreateServicio;
