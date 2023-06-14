import { useEffect, useRef, useState } from "react";
import css from "./styles/input.module.scss";
const Select = ({ error, onChange, errorMsg = true, ...props }) => {
	const [hasValue, setHasValue] = useState(false);
	const selectRef = useRef(null);

	const handleSelectChange = (e) => {
		const { value } = e.target;
		setHasValue(value !== "");
		if (onChange) onChange(e);
	};

	useEffect(() => {
		if (selectRef.current) {
			setHasValue(selectRef.current.value !== "");
		}
	}, []);

	return (
		<div className={css.wrapper}>
			<div className='relative flex items-center'>
				<select
					ref={selectRef}
					id={props.name}
					onChange={handleSelectChange}
					{...props}
					className={
						error ? `${css.select} ${css.error}` : css.select
					}
					data-has-value={hasValue}
				>
					{props.children}
				</select>
				{props.label && (
					<label
						htmlFor={props.name}
						className={
							error ? `${css.label} ${css.error}` : css.label
						}
					>
						{error ? `${props.label}` : props.label}
					</label>
				)}
			</div>
			{error && errorMsg && (
				<span className='text-red-500 text-xs text-start ml-0'>
					{error}
				</span>
			)}
		</div>
	);
};

export default Select;
