// import Image from "next/image";
import { useEffect, useState } from "react";
// import styles from "./styles/horizontalGrid.module.css";

const HorizontalGrid = ({ medias }) => {
	// const medias = [
	// 	{
	// 		id: 1,
	// 		imagen: "1674901990056milk.jpg",
	// 		rutaimagen: "https://vibeup-post-images.s3.amazonaws.com/",
	// 	},
	// 	{
	// 		id: 2,
	// 		imagen: "1674901990056milk.jpg",
	// 		rutaimagen: "https://vibeup-post-images.s3.amazonaws.com/",
	// 	},
	// 	{
	// 		id: 3,
	// 		imagen: "1674901990056milk.jpg",
	// 		rutaimagen: "https://vibeup-post-images.s3.amazonaws.com/",
	// 	},
	// 	{
	// 		id: 4,
	// 		imagen: "1674901990056milk.jpg",
	// 		rutaimagen: "https://vibeup-post-images.s3.amazonaws.com/",
	// 	},
	// 	{
	// 		id: 5,
	// 		imagen: "1674901990056milk.jpg",
	// 		rutaimagen: "https://vibeup-post-images.s3.amazonaws.com/",
	// 	},
	// {
	// 	id: 6,
	// 	imagen: "1674901990056milk.jpg",
	// 	rutaimagen: "https://vibeup-post-images.s3.amazonaws.com/",
	// },
	// {
	// 	id: 7,
	// 	imagen: "1674901990056milk.jpg",
	// 	rutaimagen: "https://vibeup-post-images.s3.amazonaws.com/",
	// },
	// {
	// 	id: 8,
	// 	imagen: "1674901990056milk.jpg",
	// 	rutaimagen: "https://vibeup-post-images.s3.amazonaws.com/",
	// },
	// {
	// 	id: 9,
	// 	imagen: "1674901990056milk.jpg",
	// 	rutaimagen: "https://vibeup-post-images.s3.amazonaws.com/",
	// },
	// ];

	const [typeGrid, setTypeGrid] = useState("");

	useEffect(() => {
		// si medias tiene mas de 1 objeto, entonces typeGrid es doble
		// y si tiene mas de 2 objetos, entonces typeGrid es triple
		// y si tiene mas de 3 objetos, entonces typeGrid es cuadruple
		// si tiene mas de 4 objetos, entonces typeGrid es quintuple y es el final
		if (medias.length > 0) {
			setTypeGrid("simple");
			if (medias.length > 1) {
				setTypeGrid("doble");
				if (medias.length > 2) {
					setTypeGrid("triple");
					if (medias.length > 3) {
						setTypeGrid("cuadruple");
						if (medias.length > 4) {
							setTypeGrid("quintuple");
						}
					}
				}
			}
		}
	}, [medias]);

	return (
		<div className='grid_horizontal'>
			<div className={`padding_contain ${typeGrid}`} />
			<div className={`contain_media ${typeGrid}`}>
				<div className='grid_horizontal_wrapper'>
					<div className={`grid_horizontal_container ${typeGrid}`}>
						{medias
							.slice(0, 5)
							.map(({ imagen, rutaimagen }, index) => {
								const mediaUrl = `${rutaimagen}${imagen}`;
								const type = imagen.includes(".mp4")
									? "video"
									: "image";
								const nombre = imagen.split(".")[0];
								// si el array es mayor de 5 index === 4
								const isLast = index === 4;
								return (
									<div
										key={index}
										className={"grid_horizontal_item"}
									>
										{type === "image" ? (
											<img
												src={mediaUrl}
												alt={nombre}
												draggable={false}
											/>
										) : (
											<video
												src={mediaUrl}
												controls
												controlsList='nodownload nofullscreen noremoteplayback'
											/>
										)}
										{isLast && medias.length > 5 && (
											<div className='absolute w-full h-full flex text-center justify-center items-center bg-black bg-opacity-[45%] top-0 left-0'>
												<h2 className='select-none font-semibold text-3xl md:text-4xl lg:text-5xl text-white'>
													+{medias.length - 5}
												</h2>
											</div>
										)}
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HorizontalGrid;
