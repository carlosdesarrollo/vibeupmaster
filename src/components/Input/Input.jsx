import { useState } from "react";
import EyeIcon from "../Icons/interfaz/EyeIcon";
import css from "./styles/input.module.scss";

const Input = (props) => {
	const { error } = props;

	return (
		<div className={css.wrapper}>
			{props.textarea === 1 ? (
				<textarea
					data-is-textarea='true'
					{...props}
					className={error ? `${css.input} ${css.error}` : css.input}
				/>
			) : (
				<div className='relative flex items-center'>
					<input
						type={props.type || "text"}
						id={props.htmlFor}
						{...props}
						className={
							error ? `${css.input} ${css.error}` : css.input
						}
					/>
					{props.label && (
						<label
							htmlFor={props.htmlFor}
							className={
								error ? `${css.label} ${css.error}` : css.label
							}
						>
							{error ? `Corregir ${props.label}` : props.label}
						</label>
					)}
				</div>
			)}
			{error && (
				<span className='text-red-500 text-xs text-start ml-0'>
					{error}
				</span>
			)}
		</div>
	);
};

const Password = (props) => {
	const { error, style } = props;
	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className={css.wrapper}>
			<div className='relative items-center flex'>
				<input
					{...props}
					type={showPassword ? "text" : "password"}
					className={error ? `${css.input} ${css.error}` : css.input}
					style={{
						...style,
						paddingRight: "2.5rem",
					}}
				/>
				<button
					type='button'
					role='button'
					title='Mostrar contraseña'
					className='absolute w-8 h-8 hover:bg-[#f0f2f5] flex justify-center items-center rounded-full cursor-pointer right-2.5 text-gray-600'
					onClick={togglePassword}
				>
					<EyeIcon size={18} showeye={showPassword ? "show" : null} />
				</button>
			</div>
			{error && (
				<span className='text-red-500 text-xs text-start ml-0'>
					{error}
				</span>
			)}
		</div>
	);
};

Input.Password = Password;

export default Input;
