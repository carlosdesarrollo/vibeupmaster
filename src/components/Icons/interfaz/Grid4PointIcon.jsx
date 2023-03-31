const Grid4PointIcon = (props) => {
	return (
		<svg
			width={props.size || 26}
			height={props.size || 26}
			fill='none'
			viewBox='0 0 26 26'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<g filter='url(#agrid)'>
				<path
					d='M10.813 5.906a3.906 3.906 0 1 1-7.813 0 3.906 3.906 0 0 1 7.813 0ZM6.905 21.531a3.906 3.906 0 1 0 0-7.812 3.906 3.906 0 0 0 0 7.812ZM18.625 9.813a3.906 3.906 0 1 0 0-7.813 3.906 3.906 0 0 0 0 7.813Zm3.906 7.812a3.906 3.906 0 1 1-7.812 0 3.906 3.906 0 0 1 7.812 0Z'
					fill='#5AD4FF'
				/>
				<path
					d='M10.022 9.022a4.406 4.406 0 1 0-6.23-6.231 4.406 4.406 0 0 0 6.23 6.23Zm-3.116 13.01a4.406 4.406 0 1 0 0-8.813 4.406 4.406 0 0 0 0 8.812Zm11.719-11.72a4.406 4.406 0 1 0 0-8.812 4.406 4.406 0 0 0 0 8.813Zm3.116 10.429a4.406 4.406 0 1 0-6.232-6.232 4.406 4.406 0 0 0 6.232 6.232Z'
					stroke='#535353'
				/>
			</g>
			<defs>
				<filter
					id='agrid'
					x={0}
					y={0}
					width={25.531}
					height={25.531}
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity={0} result='BackgroundImageFix' />
					<feColorMatrix
						in='SourceAlpha'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy={1} />
					<feGaussianBlur stdDeviation={1} />
					<feComposite in2='hardAlpha' operator='out' />
					<feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0' />
					<feBlend
						in2='BackgroundImageFix'
						result='effect1_dropShadow_339_179392'
					/>
					<feBlend
						in='SourceGraphic'
						in2='effect1_dropShadow_339_179392'
						result='shape'
					/>
					<feColorMatrix
						in='SourceAlpha'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dx={0.7} dy={1.5} />
					<feGaussianBlur stdDeviation={1} />
					<feComposite
						in2='hardAlpha'
						operator='arithmetic'
						k2={-1}
						k3={1}
					/>
					<feColorMatrix values='0 0 0 0 0.724097 0 0 0 0 0.695833 0 0 0 0 1 0 0 0 1 0' />
					<feBlend
						in2='shape'
						result='effect2_innerShadow_339_179392'
					/>
				</filter>
			</defs>
		</svg>
	);
};

export default Grid4PointIcon;
