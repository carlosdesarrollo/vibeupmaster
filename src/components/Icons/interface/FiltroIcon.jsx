const FiltroIcon = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={14}
			height={15}
			fill='none'
			viewBox='0 0 14 15'
			{...props}
		>
			<path
				fill='#EEE'
				stroke='#929292'
				strokeWidth={0.8}
				d='m8.072 12.662.24-.104V6.922l5.058-5.017a.739.739 0 0 0 .219-.416.688.688 0 0 0-.048-.367C13.425.842 13.119.6 12.688.6H1.508c-.43 0-.736.242-.852.52a.682.682 0 0 0-.049.368.74.74 0 0 0 .218.416l.002.001 5.056 5.017v6.687l.56-.242 1.629-.705Z'
			/>
		</svg>
	);
};

export default FiltroIcon;
