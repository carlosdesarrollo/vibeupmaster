import IndexIcon from "../Icons/aside/IndexIcon";
import ArrowIcon from "../Icons/interfaz/ArrowIcon";
import css from "./styles/aside.module.scss";
import {
	AdvertisingIcon,
	BrujulaIcon,
	CollectiveKIcon,
	EventsIcon,
	GroupsIcon,
	MarketPlaceIcon,
	MembersIcon,
	PageFlag,
	ServicesIcon,
} from "../Icons/interface";

import { useState, useEffect, Fragment } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

const Aside = () => {
	const router = useRouter();
	const [activeMenuList, setActiveMenuList] = useState(false);

	const onMouseEnter = () => {
		setActiveMenuList(true);
	};

	const onMouseLeave = () => {
		setActiveMenuList(false);
	};

	const listItems = [
		{
			icon: <CollectiveKIcon />,
			text: "Collective Knowledge",
		},
		{
			icon: <ServicesIcon />,
			text: "Services",
			href: "/services",
		},
		{
			icon: <MarketPlaceIcon />,
			text: "Marketplace",
		},
		{
			icon: <EventsIcon />,
			text: "Events",
		},
		{
			icon: <PageFlag />,
			text: "Pages",
		},
		{
			icon: <GroupsIcon />,
			text: "Groups",
		},
		{
			icon: <MembersIcon />,
			text: "Members",
		},
		{
			icon: <AdvertisingIcon />,
			text: "Advertising",
		},
	];

	const CircleButton = ({ children, icon, text, ...rest }) => {
		return (
			<motion.button
				title={text}
				className={css.circleButton}
				{...rest}
				whileTap={{ scale: 0.9 }}
			>
				{children ? children : icon}
			</motion.button>
		);
	};

	return (
		<aside className={css.aside}>
			<div className={css.wrapper}>
				<div className={css.menu}>
					<motion.button
						className={css.menuItem}
						whileTap={{ scale: 0.9 }}
					>
						<BrujulaIcon />
					</motion.button>
				</div>

				{/* <div className="">

				</div> */}
				<div
					className={
						activeMenuList
							? `${css.wrapper_menulist} ${css.active}`
							: css.wrapper_menulist
					}
				>
					<ul
						className={css.menuList}
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
					>
						{listItems.map((item, i) => {
							const { href } = item;

							const enlace = href ? href : "/";

							if (i === 0) {
								return (
									<Fragment key={i}>
										<li className={css.listItem}>
											<div className={css.button}>
												<CircleButton
													{...item}
													style={{
														"--size": "70px",
													}}
													onClick={() => {
														router.push(enlace);
													}}
												>
													{item.icon}
												</CircleButton>
											</div>
											{activeMenuList && (
												<Link
													className={css.text}
													href={enlace}
												>
													<p>{item.text}</p>
												</Link>
											)}
										</li>
									</Fragment>
								);
							}
							return (
								<Fragment key={i}>
									<li className={css.listItem}>
										<div className={css.button}>
											<CircleButton
												{...item}
												onClick={() => {
													router.push(enlace);
												}}
											>
												{item.icon}
											</CircleButton>
										</div>
										{activeMenuList && (
											<Link
												className={css.text}
												href={enlace}
											>
												<p>{item.text}</p>
											</Link>
										)}
									</li>
								</Fragment>
							);
						})}
					</ul>
				</div>
			</div>
		</aside>
	);
};

export default Aside;
