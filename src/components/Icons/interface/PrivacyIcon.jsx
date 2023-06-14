const PrivacyIcon = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={20}
			height={26}
			fill='none'
			{...props}
			viewBox='0 0 20 26'
		>
			<path
				fill='#EEE'
				stroke='#929292'
				strokeWidth={0.5}
				d='M6.875 8.818h8.75c.968 0 1.891.41 2.57 1.133a3.975 3.975 0 0 1 1.056 2.717v8.4a3.976 3.976 0 0 1-1.056 2.717 3.522 3.522 0 0 1-2.57 1.134H4.376c-.967 0-1.89-.41-2.569-1.134A3.976 3.976 0 0 1 .75 21.068v-8.4c0-1.016.378-1.994 1.056-2.717a3.536 3.536 0 0 1 2.32-1.124v-2.16c0-1.231.342-2.437.985-3.463A5.97 5.97 0 0 1 7.743.898a5.55 5.55 0 0 1 3.4-.36c1.143.24 2.19.837 3.011 1.71v.001a6.468 6.468 0 0 1 1.534 2.859 1.531 1.531 0 0 1-.144 1.091 1.43 1.43 0 0 1-.356.424 1.309 1.309 0 0 1-1.54.091 1.405 1.405 0 0 1-.399-.38 1.49 1.49 0 0 1-.229-.508M6.875 8.818l6.388-3.05m-6.388 3.05V6.667a3.524 3.524 0 0 1 .527-1.87 3.184 3.184 0 0 1 1.403-1.234 2.93 2.93 0 0 1 1.799-.191c.603.127 1.16.442 1.598.91M6.875 8.817l5.51-4.707m.635 1.715.243-.059m-.243.06.243-.06m-.243.06a3.516 3.516 0 0 0-.818-1.546m1.061 1.486a3.765 3.765 0 0 0-.877-1.656m-.184.17.001.001.183-.17m-.184.17V4.28l.184-.169m-8.01 4.707v.25-.25Zm5.625 4.8c-.37 0-.722.157-.978.43s-.398.64-.398 1.02v3.6c0 .38.142.747.398 1.02s.607.43.978.43c.37 0 .721-.157.977-.43s.398-.64.398-1.02v-3.6c0-.38-.142-.747-.398-1.02a1.34 1.34 0 0 0-.977-.43Zm6.5 7.45c0 .257-.096.5-.262.678a.84.84 0 0 1-.613.272H4.376a.84.84 0 0 1-.614-.272.992.992 0 0 1-.262-.678v-8.4c0-.257.096-.5.262-.678a.84.84 0 0 1 .613-.272h11.25a.84.84 0 0 1 .614.272c.166.177.262.42.262.678v8.4Z'
			/>
		</svg>
	);
};

export default PrivacyIcon;
