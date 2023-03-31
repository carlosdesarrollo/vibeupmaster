import styles from "./styles/overlay.module.css";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { overlayAtom } from "../../atoms";

const Overlay = (props) => {
	// const [overlay, setOverlay] = useAtom(overlayAtom);

	// useEffect(() => {
	// 	if (overlay) {
	// 		document.body.style.overflow = "hidden";
	// 	} else {
	// 		document.body.style.overflow = "auto";
	// 	}
	// }, [overlay]);

	// const handleClick = () => {
	// 	setOverlay(false);
	// };

	// if (overlay) {
	return (
		<div
			className={styles.overlay}
			// onClick={handleClick}
		/>
	);
	// }
};

export default Overlay;
