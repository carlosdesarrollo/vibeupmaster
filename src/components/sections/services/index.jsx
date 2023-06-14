import { useEffect, useState } from "react";
import AsideSection from "./AsideSection";
import ServicePost from "./ServicePost";
import css from "./styles/services.module.scss";
import { serviciosApi } from "../../../api";

const ServicesSection = () => {
	const [loading, setLoading] = useState(false);
	const [publicaciones, setPublicaciones] = useState([]);

	const getPublicaciones = async () => {
		setLoading(true);
		try {
			const res = await serviciosApi("?page=iListarTodosServicios");
			setPublicaciones(JSON.parse(res.data));
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (publicaciones.length === 0) {
			getPublicaciones();
		}
	}, [publicaciones.length]);

	useEffect(() => {
		console.log(publicaciones);
	}, [publicaciones]);

	return (
		<section className={css.section}>
			<AsideSection getPublicaciones={getPublicaciones} />
			<div className={css.grid_services}>
				{loading ? (
					<div className='text-center'>Cargando...</div>
				) : (
					publicaciones.map((publicacion) => (
						<ServicePost
							key={publicacion.id}
							{...{ publicacion }}
						/>
					))
				)}
			</div>
		</section>
	);
};

export default ServicesSection;
