const SavedIcon = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={36}
			height={38}
			fill='none'
			viewBox='0 0 36 38'
			{...props}
		>
			<g filter='url(#asavedicon)'>
				<path
					fill='#5AD4FF'
					d='M4.822 1C2.712 1 1 2.8 1 5v28c0 2.2 1.711 4 3.822 4h26.754c2.113 0 3.823-1.8 3.823-4V11.015A10.016 10.016 0 0 0 25.383 1H4.823Z'
				/>
			</g>
			<path
				stroke='#616161'
				strokeWidth={0.6}
				d='M4.822.7C2.532.7.7 2.648.7 5v28c0 2.352 1.832 4.3 4.122 4.3h26.754c2.291 0 4.123-1.948 4.123-4.3V11.015A10.316 10.316 0 0 0 25.383.7H4.823Z'
			/>
			<path
				fill='#6C6C6C'
				stroke='#616161'
				strokeWidth={0.1}
				d='M8.714.95h-.05V11.653c0 .916.868 1.825 1.936 1.825h15.085c1.068 0 1.936-.909 1.936-1.825V.95H8.714Z'
			/>
			<path
				fill='#FAFAFB'
				stroke='#616161'
				strokeWidth={0.2}
				d='M8.644.9h-.1V11c0 1.155.896 2.1 2.01 2.1h15.29c1.113 0 2.01-.945 2.01-2.1V.9H8.644Z'
			/>
			<path
				fill='#FAFAFB'
				stroke='#616161'
				strokeWidth={0.5}
				d='M4.878 36.279v.25h26.644v-15.61c0-1.291-.95-2.17-2.118-2.17H6.995c-1.168 0-2.117.879-2.117 2.17v15.36Z'
			/>
			<path
				fill='#AEAEAE'
				stroke='#616161'
				strokeWidth={0.2}
				d='M31.6 36.28v-.1H4.9V37.1H31.6v-.82ZM27.739 23v-.1H8.419v2.2H27.739V23ZM27.738 26.998v-.1H8.418v2.2H27.738v-2.1ZM25.945 2.999v-.1H20.01v8.2H25.944v-8.1Z'
			/>
			<path
				fill='#929292'
				stroke='#616161'
				strokeWidth={0.1}
				d='M25.895 2.999v-.05H20.06V5.049H25.894v-2.05Z'
			/>
			<defs>
				<filter
					id='asavedicon'
					width={35.599}
					height={38.2}
					x={0.4}
					y={-0.6}
					colorInterpolationFilters='sRGB'
					filterUnits='userSpaceOnUse'
				>
					<feFlood floodOpacity={0} result='BackgroundImageFix' />
					<feBlend
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'
					/>
					<feColorMatrix
						in='SourceAlpha'
						result='hardAlpha'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
					/>
					<feOffset dy={-1} />
					<feGaussianBlur stdDeviation={1} />
					<feComposite
						in2='hardAlpha'
						k2={-1}
						k3={1}
						operator='arithmetic'
					/>
					<feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
					<feBlend
						in2='shape'
						result='effect1_innerShadow_887_21682'
					/>
				</filter>
			</defs>
		</svg>
	);
};

export default SavedIcon;
