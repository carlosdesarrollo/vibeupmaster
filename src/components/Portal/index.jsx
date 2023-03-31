import { useAtom } from "jotai";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import Overlay from "../Overlay";

const Portal = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return createPortal(<Overlay />, document.getElementById("vibeup-portals"));
};

export default Portal;
