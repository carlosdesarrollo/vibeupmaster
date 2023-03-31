import { useState } from "react";
import EyeIcon from "../Icons/interfaz/EyeIcon";

const Input = (props) => {
	const { error } = props;

	return (
		<div className='input_wrapper'>
			<input
				{...props}
				className={error ? `input error ${props.className}` : `input`}
			/>
			{error && (
				<span className='text-red-500 text-xs text-start ml-0'>
					{error}
				</span>
			)}
		</div>
	);
};

const Password = (props) => {
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className='input_wrapper'>
			<div className='relative items-center flex'>
				<input
					{...props}
					type={showPassword ? "text" : "password"}
					className={
						props.error ? "input error pr-10" : "input pr-10"
					}
				/>
				<button
					type='button'
					role='button'
					className='absolute cursor-pointer right-4 text-gray-600'
					onClick={toggleShowPassword}
				>
					<EyeIcon size={18} showeye={showPassword ? 1 : 0} />
				</button>
			</div>
			{props.error && (
				<span className='text-red-500 text-xs text-start ml-0'>
					{props.error}
				</span>
			)}
		</div>
	);
};

Input.Password = Password;

export default Input;
