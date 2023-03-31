import Image from "next/image";
import { useEffect, useState } from "react";

const VerticalGrid = ({ medias }) => {
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
					}
				}
			}
		}
	}, [medias]);

	return (
		<div className='grid_vertical'>
			<div className={`padding_vertical_contain ${typeGrid}`} />
			<div className={`contain_media ${typeGrid}`}>
				<div className='grid_vertical_wrapper'>
					<div className={`grid_vertical_container ${typeGrid}`}>
						{medias
							.slice(0, 4)
							.map(({ imagen, rutaimagen }, index) => {
								const mediaUrl = `${rutaimagen}${imagen}`;
								const type = imagen.includes(".mp4")
									? "video"
									: "image";
								const nombre = imagen.split(".")[0];
								const isLast = index === 3;
								return (
									<div
										key={index}
										className={"grid_vertical_item"}
									>
										{type === "image" ? (
											<img
												src={mediaUrl}
												alt={nombre}
												draggable={false}
												// fill
											/>
										) : (
											<video
												src={mediaUrl}
												controls
												controlsList='nodownload nofullscreen noremoteplayback'
											/>
										)}
										{isLast && medias.length > 4 && (
											<div className='absolute w-full h-full flex text-center justify-center items-center bg-black bg-opacity-[45%] top-0 left-0'>
												<h2 className='select-none font-semibold text-3xl md:text-4xl lg:text-5xl text-white'>
													+{medias.length - 4}
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

export default VerticalGrid;
