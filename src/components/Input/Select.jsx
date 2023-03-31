const Select = (props) => {
	const { error, children, value } = props;

	return (
		<div className='input_wrapper'>
			<select
				{...props}
				className={error ? `input error ${props.className}` : `input`}
				value={value}
			>
				{children}
			</select>
			{error && (
				<span className='text-red-500 text-xs text-start ml-0'>
					{error}
				</span>
			)}
		</div>
	);
};

export default Select;
