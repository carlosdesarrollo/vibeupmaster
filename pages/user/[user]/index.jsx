import Post from "../../../src/components/Post";
import MainLayout from "../../../src/layouts/MainLayout";
import ProfileLayout from "../../../src/layouts/ProfileLayout/ProfileLayout";
import { useEffect, useState } from "react";
import { publicacionesApi } from "../../../src/api";
import { postsAtom, userDataAtom } from "../../../src/atoms";
import { useAtom } from "jotai";
import PostLoading from "../../../src/components/Post/PostLoading";

const UserPage = () => {
	const [userData] = useAtom(userDataAtom);
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useAtom(postsAtom);

	const getPosts = async () => {
		try {
			const response = await publicacionesApi("?page=iListarPub", {
				id: userData.usuarioEnt.id,
			});
			const data = JSON.parse(response.data);
			console.log(data);
			setPosts(data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!userData) return;
		if (posts.length > 0) return;
		setLoading(true);
		getPosts();
	}, [userData]);

	const imgPrincipal = userData?.usuarioEnt.images.find(
		(img) => img.principal === "0"
	);
	const imgPrincipalUrl = imgPrincipal?.ruta + imgPrincipal?.nombre;

	return (
		<MainLayout title={userData?.personaEnt.nombrecompleto}>
			<ProfileLayout getPosts={getPosts}>
				<div className='grid pt-4 gap-y-4'>
					{loading ? (
						<PostLoading />
					) : (
						posts.map((post) => (
							<Post
								key={post.id}
								post={post}
								imgPrincipalUrl={imgPrincipalUrl}
							/>
						))
					)}
				</div>
			</ProfileLayout>
		</MainLayout>
	);
};

export default UserPage;
