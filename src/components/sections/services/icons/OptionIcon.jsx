const OptionIcon = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={22}
			height={8}
			fill='none'
			viewBox='0 0 22 8'
			{...props}
		>
			<path
				fill='#CFCFCF'
				stroke='#AEAEAE'
				strokeWidth={0.5}
				d='M3.424 7.25C4.948 7.25 6.1 5.743 6.1 4S4.949.75 3.424.75C1.9.75.75 2.257.75 4S1.9 7.25 3.424 7.25ZM11 7.25c1.524 0 2.674-1.507 2.674-3.25S12.524.75 10.999.75C9.476.75 8.325 2.257 8.325 4S9.475 7.25 11 7.25ZM18.576 7.25C20.1 7.25 21.25 5.743 21.25 4S20.1.75 18.576.75 15.9 2.257 15.9 4s1.15 3.25 2.675 3.25Z'
			/>
		</svg>
	);
};

export default OptionIcon;
