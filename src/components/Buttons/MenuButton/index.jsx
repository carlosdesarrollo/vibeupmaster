import Link from "next/link";
import css from "./styles/menubutton.module.scss";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
const MenuButton = ({ icon, text, children, href, onClick }) => {
	const router = useRouter();

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
		<li className={css.listItem}>
			<div className={css.button}>
				<CircleButton
					onClick={() => {
						onClick ? onClick() : router.push(href || "/");
					}}
				>
					{icon || children}
				</CircleButton>
			</div>
			{onClick ? (
				<div
					className={css.text}
					onClick={() => {
						onClick();
					}}
				>
					<p>{text || "texto"}</p>
				</div>
			) : (
				<Link className={css.text} href={href || "/"}>
					<p>{text || "texto"}</p>
				</Link>
			)}
		</li>
	);
};

export default MenuButton;
