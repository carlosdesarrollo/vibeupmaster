const PlusIcon = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={14}
			height={14}
			fill='none'
			viewBox='0 0 14 14'
			{...props}
		>
			<path
				stroke='#AEAEAE'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={0.9}
				d='M7 4v3m0 0v3m0-3h3M7 7H4m9 0A6 6 0 1 1 1 7a6 6 0 0 1 12 0Z'
			/>
		</svg>
	);
};

export default PlusIcon;
