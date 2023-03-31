import Avatar from "../Avatar";
import PersonsIcon from "../Icons/aside/PersonsIcon";
import SaveIcon from "../Icons/interfaz/SaveIcon";
import styles from "./styles/spaceMenu.module.css";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { textoPublicacionAtom, userDataAtom } from "../../atoms";
import LogoutIcon from "../Icons/interfaz/LogoutIcon";

const SpaceMenu = ({ setShowSpacesMenu }) => {
	const [userData, setUserData] = useAtom(userDataAtom);
	const router = useRouter();
	const [text, setText] = useAtom(textoPublicacionAtom);

	const cerrarSesion = () => {
		localStorage.removeItem("user");
		router.replace("/auth/login");
		setUserData(null);
		setText("");
	};

	const spacesButtons = [
		{
			icon: "/assets/icons/galaxy.png",
			name: "Collective Knowledge",
		},
		{
			icon: "/assets/icons/socios.png",
			name: "Services",
		},
		{
			icon: "/assets/icons/marketplace.png",
			name: "Marketplace",
		},
		{
			name: "Groups",
			svg: <PersonsIcon width={40} height={40} />,
		},
		{
			name: "Saved Posts",
			svg: <SaveIcon width={30} height={40} />,
		},
		{
			name: "Menbers",
			icon: "/assets/icons/carnet.png",
		},
		{
			name: "Events",
			icon: "/assets/icons/calendar.png",
		},
		{
			name: "Advertising",
			icon: "/assets/icons/altoparlante.png",
		},
		{
			name: "Pages",
			icon: "/assets/icons/file.png",
		},
		{
			name: "Settings",
			icon: "/assets/icons/settings.png",
		},
		{
			name: "Logout",
			svg: <LogoutIcon width={40} height={40} />,
			onClick: () => cerrarSesion(),
		},
	];

	const obtenerSettAndSaved = spacesButtons.filter(
		(item) => item.name === "Settings" || item.name === "Logout"
	);

	const SpaceButton = (props) => {
		const { icon, name, style, svg, colored } = props;
		return (
			<button
				className={
					colored === "true"
						? `${styles.item} ${styles.coloreado}`
						: `${styles.item}`
				}
				style={style}
				{...props}
			>
				<div className={styles.item_icon}>
					{icon ? (
						<div
							className={styles.icon}
							style={{
								backgroundImage: `url(${icon})`,
							}}
						/>
					) : (
						<div className={styles.icon}>{svg}</div>
					)}
				</div>
				<div className={styles.item_name}>
					<h4>{name}</h4>
				</div>
			</button>
		);
	};

	const imgPrincipal = userData?.usuarioEnt.images.find(
		(img) => img.principal === "0"
	);
	const imgPrincipalUrl = imgPrincipal?.ruta + imgPrincipal?.nombre;

	return (
		<div className={styles.spacesMenu}>
			<div className={styles.profileGroup}>
				<div className={styles.profileMenu_body}>
					<button
						className={styles.profileItem}
						onClick={() => {
							router.push(`/user/${userData?.usuarioEnt?.id}`);
							setShowSpacesMenu(false);
						}}
					>
						<div className='flex gap-4 items-center'>
							<Avatar
								size={45}
								nombre={"foto"}
								url={
									(userData?.usuarioEnt?.images?.length &&
										`${imgPrincipalUrl}`) ||
									"/assets/images/sinfoto.png"
								}
							/>

							<h4 className='text-slate-600 text-xl font-bold'>
								{userData?.personaEnt?.nombrecompleto ||
									"cuenta obsoleta"}
							</h4>
						</div>
					</button>
				</div>
			</div>
			<div className={styles.spacesGroup}>
				<div className={styles.group_header}>
					<h3 className='text-slate-500 text-xl font-semibold'>
						Spaces
					</h3>
				</div>
				<div className={styles.spacesMenu_body}>
					{spacesButtons.slice(0, 1).map((space, index) => (
						<SpaceButton
							key={index}
							icon={space.icon}
							name={space.name}
							svg={space.svg}
							style={{
								display: "flex",
								justifyContent: "center",
							}}
						/>
					))}
					<div className={styles.gridItems}>
						{spacesButtons
							.slice(1, spacesButtons.length - 2)
							.map((space, index) => (
								<SpaceButton
									key={index}
									icon={space.icon}
									name={space.name}
									svg={space.svg}
								/>
							))}
					</div>
				</div>
			</div>
			<div className={styles.spacesMenu_foot}>
				<div className={styles.foot_header}>
					<h3 className='text-slate-500 text-xl font-semibold'>
						Settings / Personal
					</h3>
				</div>
				<div className={styles.foot_body}>
					{obtenerSettAndSaved.map((space, index) => (
						<SpaceButton
							key={index}
							icon={space.icon}
							name={space.name}
							svg={space.svg}
							colored={"true"}
							onClick={space.onClick}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default SpaceMenu;
