import IndexIcon from "../Icons/aside/IndexIcon";
import ArrowIcon from "../Icons/interfaz/ArrowIcon";
import styles from "./styles/aside.module.css";
import CircleButton from "../Buttons/CircleButton/CircleButton";
import HandIcon from "../Icons/aside/HandIcon";
import HomeIcon from "../Icons/aside/HomeIcon";
import CalendarIcon from "../Icons/aside/CalendarIcon";
import DocumentIcon from "../Icons/aside/DocumentIcon";
import PersonsIcon from "../Icons/aside/PersonsIcon";
import ProfilePersonIcon from "../Icons/aside/ProfilePersonIcon";
import UpArrowIcon from "../Icons/aside/UpArrowIcon";
import { useState, useEffect } from "react";

const Aside = () => {
	const [maxItems, setMaxItems] = useState(7);
	const [expand, setExpand] = useState(true);

	const circleMdStyle = {
		minWidth: "72px",
		minHeight: "72px",
	};

	const circleSmStyle = {
		minWidth: "55px",
		minHeight: "55px",
	};

	const listItems = [
		{
			icon: <HandIcon width={46} height={46} />,
			text: "hand",
		},
		{
			icon: <HomeIcon width={46} height={46} />,
			text: "home",
		},
		{
			icon: <CalendarIcon width={46} height={46} />,
			text: "calendar",
		},
		{
			icon: <div className={styles.document}></div>,
			text: "document",
		},
		{
			icon: <PersonsIcon width={46} height={46} />,
			text: "persons",
		},
		{
			icon: <ProfilePersonIcon width={46} height={46} />,
			text: "profile",
		},
		{
			icon: <div className={styles.altoParlante}></div>,
			text: "ofertas?",
		},
	];

	useEffect(() => {
		if (expand) {
			setMaxItems(7);
		} else {
			setMaxItems(3);
		}
	}, [expand]);

	return (
		<aside className={styles.aside}>
			<div className={styles.menu}>
				<button className={`${styles.menuItem} ${styles.active}`}>
					<IndexIcon width={50} />
					<div className={styles.arrow}>
						<ArrowIcon width={12} />
					</div>
				</button>
			</div>

			<ul className={styles.menuList}>
				<li className={styles.listItem}>
					<CircleButton style={{ padding: "5px 5px 3.5px 2.5px" }}>
						<div className={styles.orb}></div>
					</CircleButton>
				</li>

				{listItems.slice(0, maxItems).map((item, index) => (
					<li className={styles.listItem} key={index}>
						<CircleButton style={circleMdStyle}>
							{item.icon}
						</CircleButton>
					</li>
				))}

				<li className={styles.listItem}>
					<CircleButton
						style={circleSmStyle}
						onClick={() => {
							setExpand(!expand);
						}}
					>
						<UpArrowIcon
							width={31.11}
							height={40}
							style={{
								transform: expand
									? "rotate(0deg)"
									: "rotate(180deg)",
							}}
						/>
					</CircleButton>
				</li>
			</ul>
		</aside>
	);
};

export default Aside;
