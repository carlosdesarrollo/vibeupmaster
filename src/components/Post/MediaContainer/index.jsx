import { useEffect, useState } from "react";
import { HorizontalGrid, VerticalGrid } from "../GridMedias";

const MediaContainer = ({ medias }) => {
	// la ruta completa de la imagen o video es la siguiente
	// const mediaUrl = `${rutaimagen}${imagen}`
	// const type = imagen.includes(".mp4") ? "video" : "image";
	// const nombre = imagen.split(".")[0];

	// vamos a detectar si el primer elemento de medias es un video o una imagen
	// una vez que detectemos si es un video o imagen detectaremos si es vertical o horizontal
	// si es vertical entonces el video o imagen se mostrara en un contenedor de 100% de alto
	// si es horizontal entonces el video o imagen se mostrara en un contenedor de 100% de ancho
	const [orientation, setOrientation] = useState("");

	useEffect(() => {
		const getOrientation = async () => {
			if (medias.length > 0) {
				let aspectRatio;
				if (
					medias[0].imagen.endsWith(".jpg") ||
					medias[0].imagen.endsWith(".png")
				) {
					const image = new Image();
					image.src = medias[0].rutaimagen + medias[0].imagen;
					image.onload = () => {
						aspectRatio = image.width / image.height;
						if (aspectRatio > 1) {
							setOrientation("horizontal");
						} else {
							setOrientation("vertical");
						}
					};
				} else {
					const video = document.createElement("video");
					video.src = medias[0].rutaimagen + medias[0].imagen;
					video.onloadedmetadata = () => {
						aspectRatio = video.videoWidth / video.videoHeight;
						if (aspectRatio > 1) {
							setOrientation("horizontal");
						} else {
							setOrientation("vertical");
						}
					};
				}
			}
		};
		getOrientation();
	}, [medias]);

	return (
		<>
			{orientation === "horizontal" ? (
				<HorizontalGrid medias={medias} />
			) : (
				<VerticalGrid medias={medias} />
			)}
		</>
	);
};

export default MediaContainer;
