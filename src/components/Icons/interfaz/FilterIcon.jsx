const FilterIcon = (props) => {
	return (
		<svg
			width={37}
			height={38}
			fill='none'
			viewBox='0 0 37 38'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<g filter='url(#afilter)' shapeRendering='crispEdges'>
				<path
					d='M30.958 1H5.924c-2.394 0-3.755 2.752-2.1 4.526l11.09 11.539v15.29c.005.584.592 1.1 1.19.823l5.352-2.428a.891.891 0 0 0 .516-.823V17.065L33.058 5.526C34.733 3.773 33.463 1 30.958 1Zm.896 3.251L20.52 16.056a.915.915 0 0 0-.253.637v12.65l-3.648 1.651v-14.3a.925.925 0 0 0-.253-.638L5.033 4.25c-.653-.722.086-1.503.896-1.46h25.029c.896-.027 1.513.87.896 1.46Z'
					fill='#70FFBA'
				/>
				<path
					d='m3.568 5.765.004.004 10.992 11.437v15.151c.004.406.207.781.512 1.011.313.236.745.325 1.173.128h.001l5.347-2.426h.002a1.24 1.24 0 0 0 .723-1.143V17.206L33.31 5.769v-.001c1.911-2 .427-5.118-2.352-5.118H5.924c-2.66 0-4.246 3.088-2.356 5.115Zm28.044-1.767-.006.005-.005.006-11.33 11.801-.002.002c-.23.234-.352.557-.352.881v12.423l-2.948 1.336V16.693c0-.328-.124-.643-.349-.879h-.001L5.289 4.012c-.116-.13-.151-.24-.156-.32a.387.387 0 0 1 .082-.253c.13-.177.4-.316.695-.3h25.058c.33-.01.59.152.71.339.06.091.08.182.073.26a.407.407 0 0 1-.14.26Z'
					stroke='#535353'
					strokeOpacity={0.6}
					strokeWidth={0.7}
				/>
			</g>
			<defs>
				<filter
					id='afilter'
					x={0.386}
					y={0.3}
					width={36.14}
					height={37.655}
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
						result='effect1_dropShadow_105_41855'
					/>
					<feBlend
						in='SourceGraphic'
						in2='effect1_dropShadow_105_41855'
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
						result='effect2_innerShadow_105_41855'
					/>
				</filter>
			</defs>
		</svg>
	);
};

export default FilterIcon;
