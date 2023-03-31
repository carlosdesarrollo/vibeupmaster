import { useState } from "react";
import styles from "./styles/imagetext.module.css";

const randomGradients = [
	"linear-gradient(to right, #bdc3c7, #2c3e50)",
	"linear-gradient(to right, #f85032, #e73827)",
	"linear-gradient(to right, #f79d00, #64f38c)",
	"linear-gradient(to right, #cb2d3e, #ef473a)",
	"linear-gradient(to right, #56ab2f, #a8e063)",
	"linear-gradient(to right, #000428, #004e92)",
	"linear-gradient(to right, #3a7bd5, #3a6073)",
	"linear-gradient(to right, #00d2ff, #928dab)",
	"linear-gradient(to right, #2196f3, #f44336)",
	"linear-gradient(to right, #ff5f6d, #ffc371)",
	"linear-gradient(to right, #ff4b1f, #ff9068)",
	"linear-gradient(to right, #16bffd, #cb3066)",
	"linear-gradient(to right, #e0eafc, #cfdef3)",
	"linear-gradient(to right, #4ca1af, #c4e0e5)",
	"linear-gradient(to right, #834d9b, #d04ed6)",
	"linear-gradient(to right, #0099f7, #f11712)",
	"linear-gradient(to right, #2980b9, #2c3e50)",
	"linear-gradient(to right, #fd746c, #ff9068)",
	"linear-gradient(to right, #457fca, #5691c8)",
];

const getRandomGradient = () => {
	const randomNumber = Math.floor(Math.random() * 18);
	return randomGradients[randomNumber];
};

const ImageText = ({ comentario }) => {
	const [randomGradient, setRandomGradient] = useState(getRandomGradient());

	return (
		<div className={`${styles.contain_media}`}>
			<div className={styles.media_padding} />
			<div
				className={styles.imageText_wrapper}
				style={{ background: randomGradient }}
			>
				<div className={styles.container_text}>
					<div className='w-full h-full mx-auto flex items-center'>
						<h2 className={styles.imageText_text}>{comentario}</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageText;
