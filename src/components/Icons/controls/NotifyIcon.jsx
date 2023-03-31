const NotifyIcon = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 46.4 53.6'
			{...props}
		>
			<g data-name='Capa 2'>
				<g data-name='Capa 1'>
					<path
						d='M23.2 52.9a5.51 5.51 0 0 0 5.62-5.35H17.57a5.5 5.5 0 0 0 5.63 5.35Zm16.87-16.06V23.45c0-8.21-4.61-15.09-12.65-16.91V4.72a4.22 4.22 0 0 0-8.44 0v1.82C10.91 8.36 6.32 15.21 6.32 23.45v13.39L.7 42.19v2.68h45v-2.68Z'
						style={{
							fill: "#70ffba",
						}}
					/>
					<path
						d='M29.18 47.55v-.35h-12v.35a5.85 5.85 0 0 0 6 5.7 5.86 5.86 0 0 0 6-5.7ZM.46 41.94.35 42v3.18h45.7V42l-.11-.1-5.52-5.25v-13.2c0-8.26-4.59-15.24-12.65-17.19V4.72a4.57 4.57 0 0 0-9.14 0v1.54C10.54 8.21 6 15.17 6 23.45v13.24Z'
						style={{
							fill: "none",
							stroke: "#535353",
							strokeOpacity: 0.6,
							strokeWidth: ".7px",
						}}
					/>
				</g>
			</g>
		</svg>
	);
};

export default NotifyIcon;
