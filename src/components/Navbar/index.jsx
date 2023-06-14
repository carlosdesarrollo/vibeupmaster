import css from "./styles/navbar.module.scss";
import Link from "next/link";
import VibeLogo from "../Svgs/Logos/VibeLogo";
import { SearchIcon } from "../Icons/controls";
import { AnimatePresence, motion } from "framer-motion";
import VibeLogotipo from "../Svgs/Logos/VibeLogotipo";
import ButtonNav from "./ButtonNav";
import {
	MessagesIcon,
	NotifyIcon,
	BrujulaIcon,
	ServicesIcon,
	EventsIcon,
	PreferencesIcon,
	WalletIcon,
	GridMenuIcon,
} from "../Icons/interface";
import MarketPlaceIcon from "../Icons/interface/MarketPlaceIcon";
import { useEffect, useRef, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import Image from "next/image";
import UserMenu from "./UserMenu";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userMenuAtom } from "../../atoms";

const Navbar = ({ userData }) => {
	const router = useRouter();
	const [isHeadbarVisible, setIsHeadbarVisible] = useState(true);
	const [prevScrollY, setPrevScrollY] = useState(0);
	const isPhone = useMediaQuery("(max-width: 720px)");
	const [activeMenu, setActiveMenu] = useAtom(userMenuAtom);

	const imgPrincipal = userData?.usuarioEnt.images.find(
		(img) => img.principal === "0"
	);
	const imgPrincipalUrl = imgPrincipal?.ruta + imgPrincipal?.nombre;
	useEffect(() => {
		function handleScroll() {
			if (isPhone) {
				const currentScrollY = window.scrollY;
				if (
					currentScrollY > prevScrollY &&
					currentScrollY > 50 &&
					currentScrollY - prevScrollY > 10
				) {
					setIsHeadbarVisible(false);
				}
				if (
					currentScrollY < prevScrollY &&
					prevScrollY - currentScrollY >= 10
				) {
					setIsHeadbarVisible(true);
				}

				setPrevScrollY(currentScrollY);
			} else {
				setIsHeadbarVisible(true);
			}
		}
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isHeadbarVisible, prevScrollY, isPhone]);

	const menuItems = [
		{
			icon: <BrujulaIcon />,
			name: "Explorar",
			link: "/",
		},
		{
			icon: <ServicesIcon />,
			name: "Services",
			link: "/services",
		},
		{
			icon: <MarketPlaceIcon />,
			name: "Marketplace",
			link: "/marketplace",
		},
		{
			icon: <EventsIcon />,
			name: "Events",
			link: "/events",
		},
		{
			icon: <PreferencesIcon />,
			name: "Preferences",
			link: "/preferences",
		},
	];

	const onCloseMenu = () => {
		setActiveMenu(false);
	};

	const userMenuRef = useRef(null);

	// const handleClickOutside = (e) => {
	// 	if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
	// 		setActiveMenu(false);
	// 	}
	// };

	// useEffect(() => {
	// 	document.addEventListener("mousedown", handleClickOutside);
	// 	return () => {
	// 		document.removeEventListener("mousedown", handleClickOutside);
	// 	};
	// }, []);

	return (
		<>
			<div
				className={
					isHeadbarVisible
						? `${css.navbar} ${css.visible}`
						: css.navbar
				}
			>
				<motion.div className={css.headbar}>
					<div className={css.left}>
						<Link className={css.logo} href={"/"}>
							<VibeLogo />
							<VibeLogotipo />
						</Link>
						<ButtonNav>
							<SearchIcon />
						</ButtonNav>
					</div>
					<div className={css.right}>
						<motion.button
							className={css.right_item}
							whileTap={{ scale: 0.9 }}
						>
							<WalletIcon />
						</motion.button>
						<motion.button
							className={css.right_item}
							whileTap={{ scale: 0.9 }}
						>
							<NotifyIcon />
						</motion.button>
						<motion.button
							className={css.right_item}
							whileTap={{ scale: 0.9 }}
						>
							<MessagesIcon />
						</motion.button>
						<div className={css.assets}>
							<motion.button
								className={css.user}
								whileTap={{ scale: 0.9 }}
								onClick={() => {
									router.push(
										`/user/${userData?.usuarioEnt?.id}`
									);
									onCloseMenu();
								}}
							>
								<Image
									src={
										(userData?.usuarioEnt?.images?.length &&
											`${imgPrincipalUrl}`) ||
										"/assets/images/sinfoto.png"
									}
									alt={`foto de Perfil de ${userData?.usuarioEnt?.usuario}`}
									fill
									sizes='50px'
								/>
							</motion.button>

							<motion.button
								className={css.btnmenu}
								whileTap={{ scale: 0.9 }}
								onClick={() => setActiveMenu(!activeMenu)}
							>
								<GridMenuIcon />
							</motion.button>
						</div>
					</div>
				</motion.div>
				<AnimatePresence>
					{isPhone && (
						<motion.div
							className={css.topbar}
							initial={{ height: 0, y: -1000 }}
							animate={{ height: 60, y: 0 }}
							exit={{ height: 0, y: -1000 }}
							transition={{ duration: 0.35, delay: 0.2 }}
						>
							<motion.nav
								className={css.navigation}
								initial={{ scale: 0.5, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ delay: 0.5 }}
							>
								{menuItems.map((item, i) => {
									return (
										<motion.button
											key={i}
											className={css.nav_item}
											whileTap={{ scale: 0.9 }}
											onClick={() => {
												router.push(item.link);
												// onCloseMenu();
											}}
										>
											{item.icon}
										</motion.button>
									);
								})}
							</motion.nav>
						</motion.div>
					)}
				</AnimatePresence>

				{activeMenu && (
					<motion.div className='bg-white' ref={userMenuRef}>
						<UserMenu {...{ userData }} />
					</motion.div>
				)}
			</div>
		</>
	);
};

export default Navbar;
