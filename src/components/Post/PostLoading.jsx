import { SkeletonUI } from "../Loaders";
import styles from "./styles/post.module.css";

const PostLoading = () => {
	return (
		<div className='card mb-4 p-0 max-[520px]:border-x-0 max-[520px]:rounded-none'>
			<div className='mb-4 pt-3 px-4'>
				<div
					className='grid gap-4 items-center'
					style={{ gridTemplateColumns: "auto 1fr" }}
				>
					<SkeletonUI width='54px' height='54px' radius='50%' />
					<div className='w-full grid gap-2'>
						<SkeletonUI
							width='100%'
							height='18px'
							css={{
								maxWidth: "200px",
							}}
						/>
						<SkeletonUI
							width='100%'
							height='15px'
							css={{
								maxWidth: "150px",
							}}
						/>
					</div>
				</div>
				<div className='h-80' />
				<div className=''>
					<div className='flex items-center justify-between gap-4'>
						{[1, 2, 3].map((item) => (
							<div
								key={item}
								className='w-full flex items-center justify-center'
							>
								<SkeletonUI
									width='100%'
									height='18px'
									css={{ maxWidth: "100px" }}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostLoading;
