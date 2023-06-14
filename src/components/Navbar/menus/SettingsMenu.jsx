import { Fragment } from "react";
import Link from "next/link";
import css from "./styles/settingsMenu.module.scss";
import CircleButton from "../../Buttons/CircleButton";
import SettingsIcon from "../../Icons/interface/SettingsIcon";
import PrivacyIcon from "../../Icons/interface/PrivacyIcon";
import MyActivityIcon from "../../Icons/interface/MyActivityIcon";
import FeedIcon from "../../Icons/interface/FeedIcon";
import LanguageIcon from "../../Icons/interface/LanguageIcon";
import Logout from "../../Icons/interface/Logout";

const SettingsMenu = ({ cerrarSesion, onCloseMenu }) => {
	const listItems = [
		{
			icon: <SettingsIcon />,
			text: "Settings",
		},
		{
			icon: <PrivacyIcon />,
			text: "Privacy",
		},
		{
			icon: <MyActivityIcon />,
			text: "My Activity",
		},
		{
			icon: <FeedIcon />,
			text: "Feed preferences",
		},
		{
			icon: <LanguageIcon />,
			text: "Language",
		},
	];

	return (
		<div className={css.settings}>
			<ul className={css.list_settings}>
				{listItems.map((item, index) => {
					return (
						<Fragment key={index}>
							<li className={css.listItem}>
								<div className={css.button}>
									<CircleButton {...item}>
										{item.icon}
									</CircleButton>
								</div>

								<Link
									href={"/"}
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
					<div className={css.button} onClick={cerrarSesion}>
						<CircleButton>
							<Logout />
						</CircleButton>
					</div>

					<div className={css.text} onClick={cerrarSesion}>
						<p>Logout</p>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default SettingsMenu;
