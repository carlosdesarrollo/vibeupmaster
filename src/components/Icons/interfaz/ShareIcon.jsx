const ShareIcon = (props) => {
	return (
		<svg
			width={29}
			height={29}
			fill='none'
			viewBox='0 0 29 29'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<g filter='url(#ashare)'>
				<path
					d='M22.833 17.6a4.3 4.3 0 0 0-2.722.962l-9.903-5.187c.07-.287.125-.575.125-.875 0-.3-.055-.588-.125-.875L20 6.487A4.407 4.407 0 0 0 22.833 7.5C25.14 7.5 27 5.825 27 3.75S25.139 0 22.833 0c-2.305 0-4.166 1.675-4.166 3.75 0 .3.055.588.125.875L9 9.762A4.407 4.407 0 0 0 6.167 8.75C3.86 8.75 2 10.425 2 12.5s1.861 3.75 4.167 3.75A4.407 4.407 0 0 0 9 15.238l9.889 5.2a3.19 3.19 0 0 0-.111.812c0 2.012 1.82 3.65 4.055 3.65 2.236 0 4.056-1.637 4.056-3.65 0-2.012-1.82-3.65-4.056-3.65Z'
					fill='url(#bshare)'
				/>
			</g>
			<defs>
				<linearGradient
					id='bshare'
					x1={27}
					y1={0}
					x2={-1.475}
					y2={4.963}
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#70FFBA' />
				</linearGradient>
				<filter
					id='ashare'
					x={0}
					y={0}
					width={29}
					height={28.9}
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
						result='effect1_dropShadow_105_41778'
					/>
					<feBlend
						in='SourceGraphic'
						in2='effect1_dropShadow_105_41778'
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
						result='effect2_innerShadow_105_41778'
					/>
				</filter>
			</defs>
		</svg>
	);
};

export default ShareIcon;
