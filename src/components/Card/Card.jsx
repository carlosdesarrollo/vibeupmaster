import styles from "./styles/card.module.css";

const Card = ({ children, css, title, className }) => {
	return (
		<div className={className ? `card ${className}` : "card"} style={css}>
			{title && (
				<div className={styles.cardTitle}>
					<h3>{title}</h3>
				</div>
			)}
			{children}
		</div>
	);
};

export default Card;
