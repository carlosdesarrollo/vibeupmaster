const FavoritesIcon = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={24}
			height={23}
			fill='none'
			viewBox='0 0 24 23'
			{...props}
		>
			<path
				fill='#5AD4FF'
				stroke='#929292'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={0.7}
				d='m12 1 3.399 6.886L23 8.997l-5.5 5.357 1.298 7.568L12 18.347l-6.798 3.575L6.5 14.354 1 8.997l7.601-1.111L12 1Z'
			/>
		</svg>
	);
};

export default FavoritesIcon;
