import styles from "./styles/skeletonui.module.css";

const SkeletonUI = ({
	css,
	width,
	height,
	loading = true,
	children,
	radius,
}) => {
	const sizeStyle = {
		width: width,
		height: height,
		borderRadius: radius,
		...css,
	};

	return (
		<>
			{loading ? (
				<div className={styles.skeleton} style={sizeStyle}></div>
			) : (
				children
			)}
		</>
	);
};

export default SkeletonUI;
