import css from "./styles/buttonNav.module.scss";
import { motion } from "framer-motion";

const ButtonNav = ({ children, size, ...rest }) => {
	// size puede ser "sm" , "md" o "lg"
	// si no se especifica, se toma como "md"
	// si se especifica un valor no válido, se toma como "md"
	let sizeClass = 40;
	if (size === "sm") {
		sizeClass = 36;
	} else if (size === "lg") {
		sizeClass = 48;
	}

	return (
		<motion.button
			className={css.btnShadow}
			style={{
				"--size": `${sizeClass}px`,
			}}
			{...rest}
			whileTap={{ scale: 0.9 }}
		>
			<div className={css.icon}>{children}</div>
		</motion.button>
	);
};

export default ButtonNav;
