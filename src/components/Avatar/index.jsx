import styles from "./styles/avatar.module.css";

const Avatar = ({ size, onClick, nombre, style, styletext, url }) => {
	return (
		<div
			onClick={onClick}
			className={styles.avatar}
			style={{
				"--size": `${size}px`,
				...style,
				backgroundImage: `url(${url})`,
			}}
		>
			{nombre && !url && nombre}
		</div>
	);
};

Avatar.defaultProps = {
	size: 60,
};

export default Avatar;
