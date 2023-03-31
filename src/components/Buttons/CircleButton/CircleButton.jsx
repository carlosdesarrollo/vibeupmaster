import styles from "./styles/circleButton.module.css";

const CircleButton = ({ children, icon, name, style, onClick }) => {
	return (
		<button
			onClick={onClick}
			title={name}
			className={styles.circleButton}
			style={style}
		>
			{children ? children : icon}
		</button>
	);
};

export default CircleButton;
