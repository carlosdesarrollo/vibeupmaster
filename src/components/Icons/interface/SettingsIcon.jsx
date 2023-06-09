const SettingsIcon = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={28}
			height={28}
			fill='none'
			{...props}
			viewBox='0 0 28 28'
		>
			<path
				fill='#EEE'
				stroke='#929292'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={0.5}
				d='M22.745 17.546a1.95 1.95 0 0 0 .39 2.15l.071.071a2.364 2.364 0 1 1-3.344 3.345l-.071-.071a1.95 1.95 0 0 0-2.151-.39 1.95 1.95 0 0 0-1.182 1.785v.2a2.364 2.364 0 0 1-4.727 0v-.106a1.95 1.95 0 0 0-1.277-1.785 1.95 1.95 0 0 0-2.15.39l-.071.071a2.364 2.364 0 1 1-3.345-3.344l.071-.071a1.95 1.95 0 0 0 .39-2.151 1.95 1.95 0 0 0-1.784-1.182h-.201a2.364 2.364 0 1 1 0-4.727h.106a1.95 1.95 0 0 0 1.785-1.277 1.95 1.95 0 0 0-.39-2.15l-.071-.071a2.363 2.363 0 0 1 1.672-4.038 2.364 2.364 0 0 1 1.672.693l.071.071a1.95 1.95 0 0 0 2.151.39h.095a1.95 1.95 0 0 0 1.181-1.784v-.201a2.364 2.364 0 1 1 4.728 0v.106a1.95 1.95 0 0 0 1.181 1.785 1.95 1.95 0 0 0 2.151-.39l.071-.071a2.363 2.363 0 0 1 4.038 1.672 2.364 2.364 0 0 1-.693 1.672l-.071.071a1.95 1.95 0 0 0-.39 2.151v.095a1.95 1.95 0 0 0 1.785 1.181h.2a2.364 2.364 0 0 1 0 4.728h-.106a1.95 1.95 0 0 0-1.785 1.181v0Z'
			/>
			<path
				fill='#FAFAFB'
				stroke='#929292'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={0.6}
				d='M13.764 17.309a3.545 3.545 0 1 0 0-7.09 3.545 3.545 0 0 0 0 7.09Z'
			/>
		</svg>
	);
};

export default SettingsIcon;
