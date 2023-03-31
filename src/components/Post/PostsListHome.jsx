import { useInView } from "framer-motion";
import Post from ".";
import PostLoading from "./PostLoading";
import ScrollInfinitoLoader from "./ScrollInfinito";
import { motion } from "framer-motion";

const PostsListHome = ({ posts, imgPrincipalUrl }) => {
	return (
		<motion.ul>
			{posts.map((post) => {
				return (
					<motion.li
						key={post.id}
						initial='hidden'
						animate='visible'
						viewport={{ once: true }}
						variants={{
							hidden: { opacity: 0, scale: 0.5, opacity: 0 },
							visible: { opacity: 1, scale: 1, opacity: 1 },
						}}
					>
						<Post imgPrincipalUrl={imgPrincipalUrl} post={post} />
					</motion.li>
				);
			})}
		</motion.ul>
	);
};

export default PostsListHome;
