const ShareIcon = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={22}
			height={22}
			fill='none'
			viewBox='0 0 22 22'
			{...props}
		>
			<path
				stroke='#6C6C6C'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={0.5}
				d='m7.66 9.668 6.898-3.553a3.584 3.584 0 1 0-.218-.45L7.442 9.218a3.582 3.582 0 1 0 0 3.564l6.898 3.553a3.583 3.583 0 1 0 .218-.45L7.66 12.332a3.582 3.582 0 0 0 0-2.664Z'
			/>
		</svg>
	);
};

export default ShareIcon;
