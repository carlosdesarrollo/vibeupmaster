import { SpinnerLoader } from "../../Loaders";
import { motion } from "framer-motion";

const Button = (props) => {
	const { children, className } = props;

	return (
		<>
			{props.loading ? (
				<button className='btn btnBlocked' {...props} disabled>
					<span className='btn__text'>
						<SpinnerLoader size={20} />
						{/* {children} */}
					</span>
				</button>
			) : (
				<motion.button
					className={
						className
							? `btn btnPrimary ${className}`
							: "btn btnPrimary"
					}
					whileTap={{ scale: 0.975 }}
					{...props}
				>
					<span className='btn__text'>{children}</span>
				</motion.button>
			)}
		</>
	);
};

export default Button;
