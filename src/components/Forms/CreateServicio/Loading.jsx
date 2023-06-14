import { SkeletonUI } from "../../Loaders";

const Loading = () => {
	return (
		<div className='grid gap-3'>
			<SkeletonUI radius={"8px"} width={"100%"} height={"156px"} />
			<SkeletonUI radius={"8px"} width={"100%"} height={"24px"} />
			<SkeletonUI radius={"8px"} width={"100%"} height={"24px"} />
			<SkeletonUI radius={"8px"} width={"100%"} height={"24px"} />
			<SkeletonUI radius={"8px"} width={"100%"} height={"24px"} />
		</div>
	);
};

export default Loading;
