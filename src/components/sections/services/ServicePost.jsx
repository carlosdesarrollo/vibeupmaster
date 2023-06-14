import Image from "next/image";
import css from "./styles/servicePost.module.scss";
import { ExpandIcon, OptionIcon } from "./icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageSwiper from "./ImageSwiper";
import { MessagesIcon } from "../../Icons/interface";
import ShareIcon from "./icons/ShareIcon";
import { useEffect, useState } from "react";
import { serviciosApi } from "../../../api";

const ServicePost = ({ publicacion }) => {
	const [loading, setLoading] = useState(false);
	const [galeria, setGaleria] = useState([]);

	const getGaleria = async () => {
		setLoading(true);
		try {
			const res = await serviciosApi(
				"?page=iListargaleriaserviciosXservicio",
				{
					idservicios: publicacion.id,
				}
			);
			setGaleria(JSON.parse(res.data));
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (galeria.length === 0 && publicacion.id) {
			getGaleria();
		}
	}, [galeria.length, publicacion.id]);

	useEffect(() => {
		console.log("galeria", galeria);
	}, [galeria]);

	const post = {
		id: 1,
		title: "Sesión alineacion postural",
		description:
			"Lorem ipsum dolor s sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
		price: 100,
		category: "Medicina Alternativa",
		sub_category: "Salud - Terapias",
		location: "Buenos Aires, Argentina",
		tags: [
			"English",
			"Español",
			"Portugues",
			"Deutsch",
			"Français",
			"Italiano",
		],
		images: [
			{
				id: 1,
				url: "https://res.cloudinary.com/dro4ur0kq/image/upload/f_auto,q_auto/v1673375567/ccd-web/servicios/estudios_economicos_reom3a.jpg",
			},
			{
				id: 2,
				url: "https://res.cloudinary.com/dro4ur0kq/image/upload/f_auto,q_auto/v1673375567/ccd-web/servicios/estudios_economicos_reom3a.jpg",
			},
			{
				id: 3,
				url: "https://res.cloudinary.com/dro4ur0kq/image/upload/f_auto,q_auto/v1673375567/ccd-web/servicios/estudios_economicos_reom3a.jpg",
			},
			{
				id: 4,
				url: "https://res.cloudinary.com/dro4ur0kq/image/upload/f_auto,q_auto/v1673375567/ccd-web/servicios/estudios_economicos_reom3a.jpg",
			},
			{
				id: 5,
				url: "https://res.cloudinary.com/dro4ur0kq/image/upload/f_auto,q_auto/v1673375567/ccd-web/servicios/estudios_economicos_reom3a.jpg",
			},
			{
				id: 6,
				url: "https://res.cloudinary.com/dro4ur0kq/image/upload/f_auto,q_auto/v1673375567/ccd-web/servicios/estudios_economicos_reom3a.jpg",
			},
		],
		user: {
			id: 1,
			name: "Nombre de usuario",
			username: "@username",
			location: "Buenos Aires, Argentina",
			date: "19/09/2021",
			time: "12:00",
			avatar: "/assets/images/sinfoto.png",
		},
	};

	const {
		id,
		title,
		description,
		price,
		category,
		sub_category,
		location,
		tags,
		images,
		user,
	} = post;

	// factorizar el precio
	const formatearPrecio = (precio) => {
		const precioRedondeado = Math.round(Number(precio));
		const numberFormat = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
		});

		return numberFormat.format(precioRedondeado).replace("$", "");
	};

	const obtenerExtensionArchivo = (nombreArchivo) => {
		return nombreArchivo?.split(".").pop();
	};

	const imagenesValidas = galeria.filter((item) => {
		const extension = obtenerExtensionArchivo(item?.ruta);
		return extension && extension.match(/(jpg|jpeg|png)$/i);
	});

	return (
		<div className={css.servicePost} key={id}>
			<div className={css.head}>
				<div className={css.user}>
					<div className={css.avatar}>
						<Image src={user.avatar} fill alt='imagen de usuario' />
					</div>
					<div className={css.info}>
						<h3 className={css.nombre}>
							{publicacion.nombrecompleto}
						</h3>
						<span className={css.username}>
							{publicacion.usuario}
						</span>
						<h4 className={css.user_location}>{user.location}</h4>
						<div className={css.datepost}>
							<span className={css.date}>{user.date}</span>
							<span className={css.time}>{user.time} hs</span>
						</div>
					</div>
					<div className={css.options}>
						<motion.button
							className={css.btn}
							whileTap={{ scale: 0.9 }}
						>
							<ExpandIcon />
						</motion.button>
						<motion.button
							className={css.btn}
							whileTap={{ scale: 0.9 }}
						>
							<OptionIcon />
						</motion.button>
					</div>
				</div>
			</div>
			<div className={css.body}>
				<h2 className={css.titulo}>{publicacion.descripcion}</h2>
				<div className={css.descripcion}>
					<div className={css.labels}>
						<div className={css.price}>
							<span className={css.label}>Price:</span>
						</div>
						<div className={css.category}>
							<span className={css.label}>Category:</span>
						</div>
						<div className={css.sub_category}>
							<span className={css.label}>Sub-Category:</span>
						</div>
						<div className={css.location}>
							<span className={css.label}>Location:</span>
						</div>
					</div>
					<div className={css.values}>
						<div className={css.price}>
							<span className={css.value}>
								{publicacion.simbolo}{" "}
								{formatearPrecio(publicacion.precio)}
							</span>
						</div>
						<div className={css.category}>
							<span className={css.value}>
								{publicacion.catedescripcion}
							</span>
						</div>
						<div className={css.sub_category}>
							<span className={css.value}>
								{publicacion.subcatedescripcion}
							</span>
						</div>
						<div className={css.location}>
							<Link
								target='_blank'
								className={css.value}
								href={`https://www.google.com/maps/@4.6482975,-74.107807,11z`}
							>
								{publicacion.locacion || "Colombia, Bogotá"}
							</Link>
						</div>
					</div>
				</div>
				<div className={css.tags}>
					<div className={css.label}>Tags:</div>
					<Swiper
						className={css.tag_list}
						slidesPerView={"auto"}
						spaceBetween={10}
					>
						{tags.map((tag, index) => {
							return (
								<SwiperSlide key={index} className={css.tag}>
									{tag}
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
				{galeria.length > 0 && <ImageSwiper images={imagenesValidas} />}
			</div>
			<div className={css.footer}>
				<div className={css.wrapper}>
					<div className={css.btns}>
						<div className={css.btn_wrapper}>
							<motion.button
								className={css.footer_btn}
								whileTap={{ scale: 0.9 }}
							>
								<MessagesIcon width={20} />
								Message
							</motion.button>
						</div>
						<div className={css.btn_wrapper}>
							<motion.button
								className={css.footer_btn}
								whileTap={{ scale: 0.9 }}
							>
								Hire
							</motion.button>
						</div>
						<div className={css.btn_wrapper}>
							<motion.button
								className={css.footer_btn}
								whileTap={{ scale: 0.9 }}
							>
								<div className={css.icon}>
									<Image
										src={"/assets/images/flip.png"}
										width={20}
										height={20}
										alt='flip icon'
									/>
								</div>
								Flip
							</motion.button>
						</div>
						<div className={css.btn_wrapper}>
							<motion.button
								className={css.share_btn}
								whileTap={{ scale: 0.9 }}
							>
								<ShareIcon width={20} />
							</motion.button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServicePost;
