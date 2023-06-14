import { motion } from "framer-motion";
import css from "./styles/modal.module.scss";
import CloseIcon from "../Icons/interface/CloseIcon";

const Modal = ({
	children,
	footer,
	title,
	onClose,
	stylebody,
	prevButton,
	...rest
}) => {
	return (
		<motion.div className={css.container_modal}>
			<motion.div
				className={css.modal}
				initial={{ y: 900 }}
				animate={{ y: 0 }}
				exit={{ y: 900 }}
				onClick={(e) => e.stopPropagation()}
				{...rest}
			>
				{title && (
					<div className={css.modal_header}>
						{prevButton && (
							<div className={css.prev}>prevButton</div>
						)}
						<motion.button
							whileTap={{ scale: 0.9 }}
							onClick={() => onClose()}
						>
							<CloseIcon size={32} />
						</motion.button>
						<div className='text-center w-full font-medium text-[18px]'>
							{title}
						</div>
					</div>
				)}
				<div className={css.modal_body} style={stylebody}>
					{children}
				</div>
				{footer && <div className={css.modal_footer}>{footer}</div>}
			</motion.div>
		</motion.div>
	);
};

export default Modal;
