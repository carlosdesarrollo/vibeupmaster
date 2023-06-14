const GotoIcon = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={18}
			height={18}
			fill='none'
			viewBox='0 0 18 18'
			{...props}
		>
			<path
				fill='#70FFBA'
				stroke='#929292'
				strokeWidth={0.5}
				d='M17.25 1V.75h-6.409a1.48 1.48 0 0 0 0 2.962h1.353L7.348 8.558a1.48 1.48 0 1 0 2.094 2.094l4.847-4.846v1.346a1.48 1.48 0 1 0 2.961 0V1ZM6.173 3.462a1.48 1.48 0 0 0-1.48-1.481H3.461A2.712 2.712 0 0 0 .75 4.692v9.846a2.712 2.712 0 0 0 2.712 2.712h9.846a2.711 2.711 0 0 0 2.711-2.711v-1.231a1.48 1.48 0 1 0-2.961 0v.98H3.712V4.943h.98a1.48 1.48 0 0 0 1.481-1.48Z'
			/>
		</svg>
	);
};

export default GotoIcon;
