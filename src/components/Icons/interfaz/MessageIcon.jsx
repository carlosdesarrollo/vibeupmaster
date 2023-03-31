const MessageIcon = (props) => {
	return (
		<svg
			width={29}
			height={29}
			fill='none'
			viewBox='0 0 29 29'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<g filter='url(#amessage)'>
				<path
					d='M24.5 0h-20a2.497 2.497 0 0 0-2.487 2.5L2 25l5-5h17.5c1.375 0 2.5-1.125 2.5-2.5v-15C27 1.125 25.875 0 24.5 0ZM7 8.75h15v2.5H7v-2.5ZM17 15H7v-2.5h10V15Zm5-7.5H7V5h15v2.5Z'
					fill='url(#bmessage)'
				/>
			</g>
			<defs>
				<linearGradient
					id='bmessage'
					x1={27}
					y1={0}
					x2={-1.482}
					y2={4.945}
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#70FFBA' />
				</linearGradient>
				<filter
					id='amessage'
					x={0}
					y={0}
					width={29}
					height={29}
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
						result='effect1_dropShadow_105_41774'
					/>
					<feBlend
						in='SourceGraphic'
						in2='effect1_dropShadow_105_41774'
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
						result='effect2_innerShadow_105_41774'
					/>
				</filter>
			</defs>
		</svg>
	);
};

export default MessageIcon;
