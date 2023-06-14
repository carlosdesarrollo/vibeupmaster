import { Fragment } from "react";
import {
	AdvertisingIcon,
	CollectiveKIcon,
	EventsIcon,
	GroupsIcon,
	MarketPlaceIcon,
	MembersIcon,
	PageFlag,
	SavedIcon,
	ServicesIcon,
} from "../../Icons/interface";
import CircleButton from "../../Buttons/CircleButton";
import css from "./styles/sectionsMenu.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const SectionsMenu = ({ onCloseMenu }) => {
	const router = useRouter();
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

	return (
		<div className={css.sections}>
			<ul className={css.list_sections}>
				{listItems.map((item, index) => {
					const { href } = item;
					const enlace = href ? href : "/";
					return (
						<Fragment key={index}>
							<li className={css.listItem}>
								<div className={css.button}>
									<CircleButton
										{...item}
										onClick={() => {
											router.push(enlace);
											// onCloseMenu();
										}}
									>
										{item.icon}
									</CircleButton>
								</div>

								<Link
									href={enlace}
									className={css.text}
									// onClick={onCloseMenu}
								>
									<p>{item.text}</p>
								</Link>
							</li>
						</Fragment>
					);
				})}
				<li className={css.listItem}>
					<div className={css.button}>
						<CircleButton>
							<SavedIcon />
						</CircleButton>
					</div>

					<div className={css.text}>
						<p>Saved Posts</p>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default SectionsMenu;
