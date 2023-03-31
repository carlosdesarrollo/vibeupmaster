const HeartIcon = (props) => {
	return (
		<svg
			width={22}
			height={22}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 22 22'
			{...props}
		>
			<g filter='url(#aheart)'>
				<path
					d='m11 18-1.305-1.295C5.06 12.125 2 9.103 2 5.395 2 2.374 4.178 0 6.95 0 8.516 0 10.019.795 11 2.05 11.981.795 13.484 0 15.05 0 17.822 0 20 2.374 20 5.395c0 3.708-3.06 6.73-7.695 11.32L11 18Z'
					fill='url(#bheart)'
				/>
			</g>
			<defs>
				<linearGradient
					id='bheart'
					x1={20}
					y1={0}
					x2={-0.507}
					y2={3.56}
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#70FFBA' />
				</linearGradient>
				<filter
					id='aheart'
					x={0}
					y={0}
					width={22}
					height={22}
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity={0} result='BackgroundImageFix' />
					<feColorMatrix
						in='SourceAlpha'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy={2} />
					<feGaussianBlur stdDeviation={1} />
					<feComposite in2='hardAlpha' operator='out' />
					<feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
					<feBlend
						in2='BackgroundImageFix'
						result='effect1_dropShadow_105_41769'
					/>
					<feBlend
						in='SourceGraphic'
						in2='effect1_dropShadow_105_41769'
						result='shape'
					/>
					<feColorMatrix
						in='SourceAlpha'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy={0.5} />
					<feGaussianBlur stdDeviation={0.5} />
					<feComposite
						in2='hardAlpha'
						operator='arithmetic'
						k2={-1}
						k3={1}
					/>
					<feColorMatrix values='0 0 0 0 0 0 0 0 0 0.641667 0 0 0 0 0.333815 0 0 0 1 0' />
					<feBlend
						in2='shape'
						result='effect2_innerShadow_105_41769'
					/>
				</filter>
			</defs>
		</svg>
	);
};

export default HeartIcon;
