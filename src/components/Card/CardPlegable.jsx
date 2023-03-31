import styles from "./styles/card.module.css";
import { useState } from "react";
import TextTruncate from "react-text-truncate";

const CardPlegable = ({ children, title, css }) => {
	const numberLines = 3;
	const [moreText, setMoreText] = useState({
		text: "See more...",
		lines: numberLines,
	});

	const handle = () => {
		if (moreText.text === "See more...") {
			setMoreText({
				text: "See less...",
				lines: 0,
			});
		} else {
			setMoreText({
				text: "See more...",
				lines: numberLines,
			});
		}
	};

	return (
		<div className={styles.card} style={css}>
			<div className={styles.cardTitle}>
				<h3>{title}</h3>
			</div>
			<div className={styles.cardBody}>
				<TextTruncate
					line={moreText.lines}
					element='p'
					truncateText='...'
					text={children}
				/>
				<a onClick={handle} className={styles.showMore}>
					{moreText.text}
				</a>
			</div>
		</div>
	);
};

CardPlegable.defaultProps = {
	title: "About me",
	children: `Lorem ipsum dolor sit amet consectetur adipisicing
    elit. Ipsam doloribus consequuntur soluta, odit eius
    iusto tempore nulla in veritatis atque laudantium
    dolore quaerat quas, cum vel accusantium amet
    dolorum itaque?`,
};

export default CardPlegable;
