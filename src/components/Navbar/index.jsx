import styles from "./styles/navbar.module.css";
import Link from "next/link";
import VibeLogo from "../Svgs/Logos/VibeLogo";
import CircleButton from "../Buttons/CircleButton/CircleButton";
import {
	CarteraIcon,
	GridMenuIcon,
	MessageIcon,
	NotifyIcon,
	SearchIcon,
} from "../Icons/controls";
import Avatar from "../Avatar";
import { useState, useEffect } from "react";
import SpaceMenu from "./SpaceMenu";
import { useRouter } from "next/router";
import useMediaQuery from "../../hooks/useMediaQuery";
import { motion } from "framer-motion";
import ArrowIcon from "../Icons/interfaz/ArrowIcon";
import axios from "axios";

const Navbar = ({ userData }) => {
	const router = useRouter();
	const [showSpacesMenu, setShowSpacesMenu] = useState(false);
	const isPhone = useMediaQuery("(max-width: 500px)");

	useEffect(() => {
		if (isPhone && showSpacesMenu) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [isPhone, showSpacesMenu]);

	const listControls = [
		{
			icon: (
				<CarteraIcon
					width={48}
					height={40.74}
					style={{ transform: "translateY(-2px)" }}
				/>
			),
			name: "Cartera",
		},
		{
			icon: <MessageIcon width={40} height={40} />,
			name: "Mensajes",
		},
		{
			icon: <NotifyIcon width={40} height={40} />,
			name: "Notificaciones",
		},
	];

	const handleShowMenu = () => {
		setShowSpacesMenu(!showSpacesMenu);
	};

	const conditionalRender = () => {
		let renderMenu = {
			menuPhone: (
				<div className={styles.menuWrappPhone}>
					<SpaceMenu setShowSpacesMenu={setShowSpacesMenu} />
				</div>
			),
			menuDesktop: (
				<div className={styles.menuWrappDesktop}>
					<SpaceMenu setShowSpacesMenu={setShowSpacesMenu} />
				</div>
			),
		};

		if (isPhone) {
			return renderMenu.menuPhone;
		}
		return renderMenu.menuDesktop;
	};

	const primeraLetra = userData?.usuarioEnt.usuario.charAt(0);
	const imgPrincipal = userData?.usuarioEnt.images.find(
		(img) => img.principal === "0"
	);
	const imgPrincipalUrl = imgPrincipal?.ruta + imgPrincipal?.nombre;

	return (
		<div className={styles.navbar}>
			<div className={styles.left}>
				<Link href={"/"}>
					<VibeLogo width={100} />
				</Link>
				<CircleButton
					style={{
						minWidth: "55px",
						minHeight: "55px",
					}}
				>
					<SearchIcon width={28} height={28} />
				</CircleButton>
			</div>
			<div className={styles.controls}>
				<div className={styles.controlsWrapper}>
					<div className={styles.listControls}>
						{listControls.map((control, index) => (
							<CircleButton
								key={index}
								icon={control.icon}
								name={control.name}
							/>
						))}
					</div>
					<button
						className={styles.avatarTrigger}
						onClick={() => {
							handleShowMenu();
						}}
					>
						<Avatar
							size={85}
							nombre={
								<p className='font-semibold text-5xl leading-none -mt-3 colorPrimary'>
									{primeraLetra}
								</p>
							}
							url={
								(userData?.usuarioEnt?.images?.length &&
									`${imgPrincipalUrl}`) ||
								"/assets/images/sinfoto.png"
							}
						/>
						<div className={styles.accountDesign}>
							<ArrowIcon
								width={10}
								style={{
									transform: "translateY(1px)rotate(90deg)",
								}}
							/>
						</div>
					</button>
					{/* <CircleButton>
						<GridMenuIcon width={40} height={40} />
					</CircleButton> */}
				</div>
				{/* <button className={styles.menu}>
					<div className={styles.line}></div>
					<div className={styles.line}></div>
					<div className={styles.line}></div>
				</button> */}
			</div>
			{showSpacesMenu && conditionalRender()}
		</div>
	);
};

export default Navbar;
