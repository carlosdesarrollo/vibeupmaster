const AccountIcon = (props) => {
	return (
		<svg
			width={props.size || 49}
			height={props.size || 49}
			fill='none'
			viewBox='0 0 49 49'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<g filter='url(#acount)'>
				<path
					d='M24.5 0C12.08 0 2 10.08 2 22.5S12.08 45 24.5 45 47 34.92 47 22.5 36.92 0 24.5 0Zm0 6.75a6.741 6.741 0 0 1 6.75 6.75 6.741 6.741 0 0 1-6.75 6.75 6.741 6.741 0 0 1-6.75-6.75 6.741 6.741 0 0 1 6.75-6.75Zm0 31.95c-5.625 0-10.598-2.88-13.5-7.245.068-4.477 9-6.93 13.5-6.93 4.477 0 13.432 2.453 13.5 6.93-2.903 4.365-7.875 7.245-13.5 7.245Z'
					fill='url(#bcount)'
				/>
			</g>
			<defs>
				<linearGradient
					id='bcount'
					x1={47}
					y1={0}
					x2={-4.267}
					y2={8.901}
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#70FFBA' />
				</linearGradient>
				<filter
					id='acount'
					x={0}
					y={0}
					width={49}
					height={49}
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
						result='effect1_dropShadow_339_179420'
					/>
					<feBlend
						in='SourceGraphic'
						in2='effect1_dropShadow_339_179420'
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
						result='effect2_innerShadow_339_179420'
					/>
				</filter>
			</defs>
		</svg>
	);
};

export default AccountIcon;
