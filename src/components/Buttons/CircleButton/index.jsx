import styles from "./styles/circleButton.module.scss";
import { motion } from "framer-motion";

const CircleButton = ({ children, icon, name, ...rest }) => {
	return (
		<motion.button
			title={name}
			className={styles.circleButton}
			{...rest}
			whileTap={{ scale: 0.9 }}
		>
			{children ? children : icon}
		</motion.button>
	);
};

export default CircleButton;
