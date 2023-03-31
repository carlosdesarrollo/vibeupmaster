import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import PostLoading from "./PostLoading";

const ScrollInfinitoLoader = ({ getMorePosts }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		// margin: "0px 0px -100px 0px",
	});

	useEffect(() => {
		if (isInView) {
			getMorePosts();
			console.log("Estoy en el scroll infinito");
		}
	}, [isInView]);

	return (
		<div ref={ref}>
			{/* <Loading type='points' color='currentColor' size='sm' /> */}
			<div className=''>
				<PostLoading />
			</div>
		</div>
	);
};

export default ScrollInfinitoLoader;
