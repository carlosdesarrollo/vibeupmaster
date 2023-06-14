import { useState } from "react";
import { MenuButton } from "../../Buttons";
import CloseIcon from "../../Icons/interfaz/CloseIcon";
import DateRangeComponent from "./DateRangeComponent";
import PriceRangeComponent from "./PriceRangeComponent";

import {
	FavoritesIcon,
	GotoIcon,
	InboxAction,
	MegafonoAction,
	PorfileServiceAction,
	SaveIcon,
	SearchIcon,
} from "./icons";
import css from "./styles/asideSection.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import CreateServicio from "../../Forms/CreateServicio";
import Portal from "../../Portal";
import { Modal } from "../../Modal";

const AsideSection = ({ getPublicaciones }) => {
	const [showCreateServicio, setShowCreateServicio] = useState(false);

	const CircleButton = ({ children }) => {
		return (
			<motion.button
				type='button'
				role='button'
				className={css.circleButton}
				whileTap={{ scale: 0.9 }}
			>
				{children}
			</motion.button>
		);
	};

	const SearchInput = () => {
		return (
			<div className={css.search}>
				<SearchIcon />
				<input type='text' placeholder='Buscar en Servicios' />
			</div>
		);
	};

	const Tags = [
		{
			id: 1,
			name: "Carpintería",
		},
		{
			id: 2,
			name: "Casa Rodante",
		},
		{
			id: 3,
			name: "Fontanería",
		},
		{
			id: 4,
			name: "Electricidad",
		},
		{
			id: 5,
			name: "Jardinería ",
		},
		{
			id: 6,
			name: "Limpieza",
		},
		// {
		// 	id: 7,
		// 	name: "Mudanza",
		// },
		// {
		// 	id: 8,
		// 	name: "Pintura",
		// },
	];

	const SortButton = ({ text, icon, ...rest }) => {
		return (
			<motion.button
				type='button'
				role='button'
				className={css.sortButton}
				{...rest}
				whileTap={{ scale: 0.9 }}
			>
				{text}
				{icon}
			</motion.button>
		);
	};

	const sortOptions = [
		{
			id: 1,
			name: "Sort By",
		},
		{
			id: 2,
			name: "Category",
		},
		{
			id: 3,
			name: "Sub Category",
		},
		{
			id: 6,
			name: "Price",
			component: <PriceRangeComponent />,
		},
		{
			id: 7,
			name: "Date",
			component: <DateRangeComponent />,
		},
		{
			id: 4,
			name: "Location",
		},
		{
			id: 5,
			name: "Language",
		},
	];

	const closeModal = () => {
		setShowCreateServicio(false);
	};

	return (
		<>
			<div className={css.asideMenu}>
				<div className={css.menu_mobile}>
					<div className={css.buttons_mobile}>
						<motion.button
							type='button'
							role='button'
							whileTap={{ scale: 0.9 }}
						>
							Todas las categorías
						</motion.button>
						<motion.button
							type='button'
							role='button'
							whileTap={{ scale: 0.9 }}
							onClick={() => setShowCreateServicio(true)}
						>
							Publish Service
						</motion.button>
					</div>
					<SearchInput />
				</div>
				<div className={css.menu_desktop}>
					<div className={css.header}>
						<div className={css.wrapper}>
							<h2 className={css.title}>Services</h2>
							<div className={css.head_assets}>
								<CircleButton>
									<FavoritesIcon width={20} />
								</CircleButton>
								<CircleButton>
									<SaveIcon width={16} />
								</CircleButton>
							</div>
						</div>
						<div className='mt-[10px]'>
							<SearchInput />
						</div>
					</div>
					<div className={css.body}>
						<div className={css.actions}>
							<div>
								<MenuButton
									icon={<MegafonoAction />}
									text='Publish Service'
									onClick={() => setShowCreateServicio(true)}
								/>
							</div>
							<div className='mt-[5px]'>
								<MenuButton
									icon={<InboxAction />}
									text='Inbox messages'
									onClick={""}
								/>
							</div>
							<div className='mt-[5px]'>
								<MenuButton
									icon={<PorfileServiceAction />}
									text='My Services profile'
									onClick={""}
								/>
							</div>
						</div>
						<div className={css.tags}>
							<div className='flex items-center justify-center gap-2'>
								<h2>Tags</h2>
								<motion.button
									className='hover:bg-gray-100 rounded-full p-1'
									whileTap={{ scale: 0.9 }}
								>
									<SearchIcon />
								</motion.button>
							</div>
							<div className={css.tags_body}>
								{Tags.map((tag) => {
									return (
										<div key={tag.id} className={css.tag}>
											{tag.name}
											<button className='hover:bg-gray-200 rounded-full'>
												<CloseIcon size={20} />
											</button>
										</div>
									);
								})}
							</div>
						</div>
						<div className={css.sorts}>
							{sortOptions.map((option) => {
								return (
									<div
										key={option.id}
										className={css.sort_group}
									>
										<SortButton
											text={option.name}
											icon={<GotoIcon />}
										/>
										{option.component && (
											<div className='mt-2'>
												{option.component}
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<AnimatePresence>
				{showCreateServicio && (
					<Portal>
						<div className='fixed top-0 left-0 w-full h-full z-[2000]'>
							<motion.div
								className='absolute top-0 left-0 w-full h-full bg-[#101010] z-[2000]'
								initial={{ opacity: 0 }}
								animate={{ opacity: 0.45 }}
								exit={{ opacity: 0 }}
								onClick={closeModal}
							/>
							<CreateServicio
								onClose={closeModal}
								getPublicaciones={getPublicaciones}
							/>
						</div>
					</Portal>
				)}
			</AnimatePresence>
		</>
	);
};

export default AsideSection;
