import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import css from "./styles/imageSwiper.module.scss";
import "swiper/css/pagination";

import { Pagination } from "swiper";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ArrowIcon from "../../Publicity/styles/icons/ArrowIcon";

const ImageSwiper = ({ images }) => {
	const [swiper, setSwiper] = useState(null);
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);

	useEffect(() => {
		if (swiper) {
			swiper.update();
		}
	}, [swiper]);

	const goPrev = () => {
		if (swiper) {
			swiper.slidePrev();
			console.log("anterior");
		}
	};

	const goNext = () => {
		if (swiper) {
			swiper.slideNext();
			console.log("siguiente");
		}
	};

	const onSlideChange = () => {
		if (swiper) {
			setIsBeginning(swiper.isBeginning);
			setIsEnd(swiper.isEnd);
		}
	};

	return (
		<Swiper
			className={`${css.gallery} custom-swiper-gallery`}
			pagination={{
				dynamicBullets: true,
			}}
			modules={[Pagination]}
			onSwiper={setSwiper}
			onSlideChange={onSlideChange}
		>
			{images?.map((image, index) => {
				console.log("imagen", image);
				return (
					<SwiperSlide key={index} className={css.swiperSlide}>
						<Image
							src={image?.ruta || image.url}
							fill
							alt='Imagen de la galeria'
							data-initial={index === 0 ? true : false}
							data-end={
								index === images.length - 1 ? true : false
							}
							sizes='500px'
						/>
					</SwiperSlide>
				);
			})}

			{images?.length > 1 && (
				<>
					{!isBeginning && (
						<motion.button
							type='button'
							role='button'
							className={css.left}
							onClick={goPrev}
							disabled={swiper?.isBeginning}
							whileTap={{ scale: 0.9 }}
						>
							<ArrowIcon />
						</motion.button>
					)}
					{!isEnd && (
						<motion.button
							type='button'
							role='button'
							className={css.right}
							onClick={goNext}
							disabled={swiper?.isEnd}
							whileTap={{ scale: 0.9 }}
						>
							<ArrowIcon />
						</motion.button>
					)}
				</>
			)}
		</Swiper>
	);
};

export default ImageSwiper;
