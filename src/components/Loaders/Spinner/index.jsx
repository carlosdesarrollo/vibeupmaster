import styles from "./styles/styles.module.css";

const SpinnerLoader = (props) => {
	return (
		<svg
			className={styles.spinner}
			viewBox='0 0 50 50'
			width={props.size || 50}
			height={props.size || 50}
			fill='none'
			{...props}
		>
			<circle
				className={styles.path}
				cx={25}
				cy={25}
				r={20}
				strokeWidth={7}
			/>
		</svg>
	);
};

export default SpinnerLoader;
