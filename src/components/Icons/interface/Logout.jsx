const Logout = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={24}
			height={24}
			fill='none'
			{...props}
			viewBox='0 0 24 24'
		>
			<path
				stroke='#6C6C6C'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='m16 17 5-5-5-5M21 12H9M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'
			/>
		</svg>
	);
};

export default Logout;
