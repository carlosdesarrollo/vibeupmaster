import Image from "next/image";
import useMediaQuery from "../../hooks/useMediaQuery";
import {
	CollectiveKIcon,
	GridMenuIcon,
	HomeIcon,
	WalletIcon,
} from "../Icons/interface";
import css from "./styles/bottomNav.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userMenuAtom } from "../../atoms";

const BottomNavbar = ({ userData }) => {
	const router = useRouter();
	const isPhone = useMediaQuery("(max-width: 720px)");
	const [isMenuOpen, setIsMenuOpen] = useAtom(userMenuAtom);

	const imgPrincipal = userData?.usuarioEnt.images.find(
		(img) => img.principal === "0"
	);
	const imgPrincipalUrl = imgPrincipal?.ruta + imgPrincipal?.nombre;

	const ProfileUser = () => {
		return (
			<div className={css.profileUser}>
				<div className={css.profileUser__avatar}>
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
				</div>
			</div>
		);
	};

	const bottomNavItems = [
		{
			name: "Home",
			icon: <HomeIcon width={36} height={36} />,
			link: "/",
		},
		{
			name: "wallet",
			icon: <WalletIcon width={36} height={36} />,
			link: "/wallet",
		},
		{
			name: "collective knowledge",
			icon: <CollectiveKIcon width={36} height={36} />,
			link: "/collective-knowledge",
		},
		{
			name: "profile",
			icon: <ProfileUser />,
			link: "/profile",
			onClick: () => router.push(`/user/${userData?.usuarioEnt?.id}`),
		},
		{
			name: "menu",
			icon: <GridMenuIcon />,
			link: "/menu",
			onClick: () => setIsMenuOpen(!isMenuOpen),
		},
	];

	return (
		<AnimatePresence>
			{isPhone && (
				<motion.div
					className={css.bottombar}
					initial={{ y: 100 }}
					animate={{ y: 0 }}
					transition={{ duration: 0.5 }}
					exit={{ y: 100 }}
				>
					<div className={css.wrapper}>
						{bottomNavItems.map((item, index) => {
							return (
								<div className={css.item_wrapper} key={index}>
									<motion.button
										className={css.bottombar__item}
										whileTap={{ scale: 0.9 }}
										onTap={item.onClick}
									>
										{item.icon}
									</motion.button>
								</div>
							);
						})}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default BottomNavbar;
