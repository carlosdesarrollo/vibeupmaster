import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import FiltroIcon from "../Icons/interface/FiltroIcon";
import css from ".//styles/publicity.module.scss";
import { SkeletonUI } from "../Loaders";
import Link from "next/link";
import PlusIcon from "./styles/icons/PlusIcon";
import { useEffect, useState } from "react";
import ArrowIcon from "./styles/icons/ArrowIcon";
import { motion } from "framer-motion";

const PublicityItem = ({ data, title }) => {
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
		<div className={css.publicy}>
			<div className={css.head}>
				<h2>{title || "Titulo"}</h2>
				<FiltroIcon />
			</div>
			<div className={css.body}>
				{!data ? (
					<Swiper
						slidesPerView={1}
						spaceBetween={10}
						className={css.swiper}
						onSwiper={setSwiper}
						onSlideChange={onSlideChange}
						breakpoints={{
							1000: {
								slidesPerView: "auto",
								spaceBetween: 10,
							},
						}}
					>
						{Array(5)
							.fill()
							.map((_, i) => (
								<SwiperSlide
									key={i}
									className={css.swiperSlide}
								>
									<Item />
								</SwiperSlide>
							))}
						{!isBeginning && (
							<motion.button
								type='button'
								className={`${css.btn} ${css.left}`}
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
								className={`${css.btn} ${css.right}`}
								onClick={goNext}
								disabled={swiper?.isEnd}
								whileTap={{ scale: 0.9 }}
							>
								<ArrowIcon />
							</motion.button>
						)}
					</Swiper>
				) : (
					<div className={css.swiper}>
						<SkeletonUI width={"100%"} height={"100%"} radius={0} />
					</div>
				)}
			</div>
		</div>
	);
};

const Item = ({ title, desc, price, money, url, children }) => {
	return (
		<div className={css.item}>
			<div className={css.head}>
				<SkeletonUI
					width={"100%"}
					height={"100%"}
					css={{ position: "absolute", top: 0, left: 0 }}
					radius={0}
				/>
			</div>
			<div className={css.body}>
				<Link href={url || "/"}>
					<h3>{title}</h3>
				</Link>
				<p>{desc || children}</p>
				<div className={css.price}>
					<div className={css.money}>
						<span>{money}</span>
						<span>{price}</span>
					</div>
					<PlusIcon />
				</div>
			</div>
		</div>
	);
};

Item.defaultProps = {
	title: "Title",
	desc: "Description",
	price: 0,
	money: "$",
};

export default PublicityItem;
