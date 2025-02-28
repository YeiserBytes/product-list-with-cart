import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Product } from "./lib/types";
import productsData from "./data/products.json";
import useCart from "./hook/useCart";
import cartIcon from "./assets/icon-add-to-cart.svg";
import carbonNeutralIcon from "./assets/icon-carbon-neutral.svg";
import illustrationEmptyCart from "./assets/illustration-empty-cart.svg";

export default function App() {
	const [products] = useState<Product[]>(productsData);
	const [isLoading] = useState(false);
	const [error] = useState<Error | null>(null);
	const {
		cart,
		orderConfirmed,
		setOrderConfirmed,
		totalQuantity,
		total,
		addToCart,
		decrementQuantity,
		removeFromCart,
		getItemQuantity,
		resetCart,
	} = useCart();

	if (isLoading) {
		return <div className="container mx-auto pt-15">Loading...</div>;
	}

	if (error) {
		return (
			<div className="container mx-auto pt-15">Error loading products</div>
		);
	}

	return (
		<main className="container flex flex-col lg:flex-row justify-between gap-8 mx-auto pt-15 pb-15 px-5">
			{/* Dessert products */}
			<section className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<h1 className="mb-4 text-4xl font-bold col-span-full text-rose-900">
					Desserts
				</h1>
				{products.map((product) => {
					const { id, name, price, image } = product;
					const quantity = getItemQuantity(id);

					return (
						<motion.section
							key={id}
							className="flex flex-col"
							animate={{ opacity: 1 }}
						>
							<picture className="relative flex justify-center w-full mb-4">
								<source
									srcSet={image.desktop}
									media="(min-width: 1024px)"
									className="rounded-lg"
								/>
								<source
									srcSet={image.tablet || image.desktop}
									media="(min-width: 768px)"
									className="rounded-lg"
								/>
								<img
									src={image.mobile || image.desktop}
									alt={name}
									className="rounded-lg"
									loading="lazy"
								/>
								{quantity === 0 ? (
									<button
										type="button"
										className="absolute flex items-center justify-center w-1/2 gap-2 px-4 py-2 mt-5 transition-colors border rounded-full justi -bottom-5 bg-rose-50 border-red cursor-pointer"
										onClick={() => addToCart(product)}
									>
										<img src={cartIcon} alt="" />
										Add to Cart
									</button>
								) : (
									<motion.div
										className="absolute flex items-center justify-between w-1/2 px-2 py-2 mt-5 border border-red-500 rounded-full bg-red -bottom-5"
										initial={{ scale: 0.8, opacity: 0 }}
										animate={{ scale: 1, opacity: 1 }}
										transition={{ type: "spring", stiffness: 300, damping: 25 }}
									>
										<motion.button
											type="button"
											className="flex items-center justify-center transition-colors duration-300 bg-transparent border rounded-full size-5 border-rose-50 hover:text-red text-rose-50 hover:bg-rose-50 cursor-pointer"
											onClick={() => decrementQuantity(id)}
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="10"
												height="2"
												fill="none"
												viewBox="0 0 10 2"
											>
												<path fill="currentColor" d="M0 .375h10v1.25H0V.375Z" />
												<title>decrement</title>
											</svg>
										</motion.button>
										<motion.span
											className="font-medium text-rose-50"
											key={quantity}
											initial={{ scale: 0.8 }}
											animate={{ scale: 1 }}
											transition={{ type: "spring", stiffness: 300 }}
										>
											{quantity}
										</motion.span>
										<motion.button
											type="button"
											className="flex items-center justify-center transition-colors duration-300 bg-transparent border rounded-full size-5 border-rose-50 hover:text-red text-rose-50 hover:bg-rose-50 cursor-pointer"
											onClick={() => addToCart(product)}
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="10"
												height="10"
												fill="none"
												viewBox="0 0 10 10"
											>
												<title>increment</title>
												<path
													fill="currentColor"
													d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
												/>
											</svg>
										</motion.button>
									</motion.div>
								)}
							</picture>
							<p className="text-xs text-rose-400 mt-5">{product.category}</p>
							<h4 className="font-medium text-rose-900">{name}</h4>
							<p className="font-medium text-red">${price.toFixed(2)}</p>
						</motion.section>
					);
				})}
			</section>

			{/* Cart */}
			<motion.aside
				className="sticky w-full lg:w-1/4 p-5 rounded-lg shadow-sm h-fit bg-rose-50 top-5"
				layout
				initial={{ opacity: 0, x: 50, scale: 0.9 }}
				animate={{ opacity: 1, x: 0, scale: 1 }}
				transition={{
					type: "spring",
					stiffness: 300,
					damping: 25,
					mass: 0.8,
					duration: 0.5,
				}}
				whileHover={{
					boxShadow: "0 8px 20px rgba(236, 72, 153, 0.1)",
					scale: 1.01,
					transition: { duration: 0.2 },
				}}
			>
				<motion.h4 nonce="" className="mb-4 text-xl font-bold text-red-700">
					Your Cart (
					<motion.span
						key={totalQuantity}
						initial={{ opacity: 0.5 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{
							duration: 0.5,
						}}
						className="inline-block"
					>
						{totalQuantity}
					</motion.span>
					)
				</motion.h4>

				{totalQuantity === 0 ? (
					<motion.div
						className="flex flex-col items-center justify-center gap-4 pb-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<img src={illustrationEmptyCart} alt="" />
						<p className="text-rose-500 text-xs">
							Your added items will appear here
						</p>
					</motion.div>
				) : (
					<>
						<div className="space-y-4 overflow-y-auto max-h-96">
							{Object.values(cart).map(({ product, quantity }) => (
								<AnimatePresence key={product.id}>
									<motion.div
										key={product.id}
										className="flex justify-between items-center gap-2 border-b border-rose-500/20 pb-5"
										initial={{ opacity: 0, y: 20, scale: 0.95 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{ opacity: 0, x: -20, scale: 0.95 }}
										transition={{
											type: "spring",
											stiffness: 300,
											damping: 20,
											mass: 0.8,
											duration: 0.4,
										}}
										layout
									>
										<section className="">
											<p className="pb-2 font-medium text-rose-900">
												{product.name}
											</p>
											<div className="flex gap-2">
												<span className="text-red pr-2 font-medium">
													{quantity}x
												</span>
												<span className="text-rose-300">
													@ ${product.price.toFixed(2)}
												</span>
												<span className="text-rose-500 font-medium">
													${(product.price * quantity).toFixed(2)}
												</span>
											</div>
										</section>
										<button
											type="button"
											onClick={() => removeFromCart(product.id)}
											className="text-rose-400 border border-rose-400 transition-color duration-300 hover:border-rose-900 rounded-full size-5 flex justify-center items-center hover:text-rose-900 cursor-pointer"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="10"
												height="10"
												fill="none"
												viewBox="0 0 10 10"
											>
												<title>close</title>
												<path
													fill="currentColor"
													d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
												/>
											</svg>
										</button>
									</motion.div>
								</AnimatePresence>
							))}
						</div>

						<div className="pt-2 mt-4">
							<div className="flex justify-between items-center text-rose-500">
								<span className="text-xs">Order Total</span>
								<span className="text-xl font-medium text-rose-900">
									${total.toFixed(2)}
								</span>
							</div>

							<div className="flex items-center justify-center bg-rose-100 p-3 rounded-lg gap-2 mt-2 text-xs text-rose-500">
								<img src={carbonNeutralIcon} alt="" />
								This is a <strong>carbon-neutral</strong> delivery
							</div>

							<button
								type="button"
								className="w-full p-3 mt-4 text-white transition-colors bg-red rounded-full hover:bg-red-900 cursor-pointer"
								onClick={() => setOrderConfirmed(true)}
							>
								Confirm Order
							</button>
						</div>
					</>
				)}
			</motion.aside>
			{orderConfirmed && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50">
					<div className="min-w-xl p-8 bg-white rounded-lg">
						<svg
							width="48"
							height="48"
							viewBox="0 0 48 48"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="mb-6"
						>
							<title>Confirm Order</title>
							<path
								d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z"
								fill="#1EA575"
							/>
							<path
								d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z"
								fill="#1EA575"
							/>
						</svg>

						<h3 className="mb-4 text-4xl font-bold">Order Confirmed</h3>
						<p className="text-rose-400 text-xs">
							We hope you enjoy your food!
						</p>
						<article className="p-7 bg-rose-100 my-8 rounded-lg flex flex-col gap-5">
							{Object.values(cart).map(({ product, quantity }, index) => (
								<motion.div
									key={product.id}
									className="flex items-center justify-between gap-2 border-b border-rose-500/10 pb-5"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										type: "spring",
										stiffness: 300,
										damping: 25,
										delay: 0.1 * index,
									}}
								>
									<div className="flex items-center gap-4">
										<motion.img
											src={product.image.thumbnail}
											alt=""
											className="rounded-lg size-16"
											whileHover={{ scale: 1.1 }}
											transition={{ type: "spring", stiffness: 400 }}
										/>
										<section>
											<motion.p
												className="pb-2 font-medium text-rose-900"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.2 * index }}
											>
												{product.name}
											</motion.p>
											<motion.div
												className="flex gap-2"
												initial={{ opacity: 0, x: -10 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: 0.3 * index }}
											>
												<span className="text-red pr-2 font-medium">
													{quantity}x
												</span>
												<span className="text-rose-300">
													@ ${product.price.toFixed(2)}
												</span>
											</motion.div>
										</section>
									</div>
									<motion.span
										className="text-rose-900 font-medium"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.4 * index }}
									>
										${(product.price * quantity).toFixed(2)}
									</motion.span>
								</motion.div>
							))}
							<div className="flex justify-between items-center text-rose-500 mt-2">
								<span className="text-xs">Order Total</span>
								<span className="text-xl font-medium text-rose-900">
									${total.toFixed(2)}
								</span>
							</div>
						</article>
						<button
							type="button"
							className="px-5 cursor-pointer py-3 text-white bg-red rounded-full flex w-full justify-center items-center"
							onClick={() => {
								setOrderConfirmed(false);
								resetCart();
							}}
						>
							Start New Order
						</button>
					</div>
				</div>
			)}
		</main>
	);
}
