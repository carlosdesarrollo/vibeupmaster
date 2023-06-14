import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import css from "./styles/portal.module.scss";

const Portal = ({ children, onClose, cssOverlay, target }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		document.documentElement.style.overflow = "hidden";
		return () => {
			setMounted(false);
			// eliminar todo el style
			document.documentElement.style.overflow = "";
		};
	}, []);

	const handleOverlayClick = () => {
		if (onClose) {
			onClose();
		}
	};

	if (!mounted) {
		return null;
	}

	return createPortal(
		children,
		document.getElementById(target || "vibeup-portals")
	);
};

export default Portal;
