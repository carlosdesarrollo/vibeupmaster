import { use, useEffect, useRef, useState } from "react";
import { SectionsMenu, SettingsMenu } from "./menus";
import css from "./styles/userMenu.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { textoPublicacionAtom, userDataAtom } from "../../atoms";
import { useRouter } from "next/router";

const UserMenu = ({ onCloseMenu }) => {
	const router = useRouter();
	const [, setUserData] = useAtom(userDataAtom);
	const [isSettings, setIsSettings] = useState(false);
	// const menuRef = useRef(null);

	const [, setText] = useAtom(textoPublicacionAtom);

	const cerrarSesion = () => {
		localStorage.removeItem("user");
		router.replace("/auth/login");
		setUserData(null);
		setText("");
	};

	const btns = [
		{
			name: "Sections",
			onClick: () => setIsSettings(false),
		},
		{
			name: "Settings",
			onClick: () => setIsSettings(true),
		},
	];

	// const handleClickOutside = (e) => {
	// 	if (menuRef.current && !menuRef.current.contains(e.target)) {
	// 		onCloseMenu();
	// 	}
	// };

	// useEffect(() => {
	// 	document.addEventListener("mousedown", handleClickOutside);
	// 	const handleEsc = (e) => {
	// 		if (e.key === "Escape") {
	// 			onCloseMenu();
	// 		}
	// 	};
	// 	window.addEventListener("keydown", handleEsc);

	// 	return () => {
	// 		window.removeEventListener("keydown", handleEsc);
	// 		document.removeEventListener("mousedown", handleClickOutside);
	// 	};
	// }, [onCloseMenu]);

	return (
		<div className={css.userMenu}>
			<div className={css.header}>
				{btns.map((btn, i) => {
					return (
						<div className={css.btnGroup} key={i}>
							<button
								type='button'
								role='button'
								onClick={btn.onClick}
								data-active={
									isSettings === (i === 1) ? "true" : "false"
								}
							>
								{btn.name}
							</button>
							{i === 0 && !isSettings && (
								<motion.span layoutId='underline' />
							)}
							{i === 1 && isSettings && (
								<motion.span layoutId='underline' />
							)}
						</div>
					);
				})}
			</div>
			<div className={css.body}>
				{isSettings ? (
					<SettingsMenu {...{ setIsSettings, cerrarSesion }} />
				) : (
					<SectionsMenu {...{ setIsSettings }} />
				)}
			</div>
		</div>
	);
};

export default UserMenu;
