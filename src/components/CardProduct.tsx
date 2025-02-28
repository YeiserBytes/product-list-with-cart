import type { Product } from "../lib/types";

export default function CardProduct({ product, quantity }: { product: Product, quantity: number }) {
    const { id, name, price, image } = product;
    const { addToCart, decrementQuantity } = useCartStore((state) => state);

	return (
		<section key={id} className="flex flex-col">
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
					<div className="absolute flex items-center justify-between w-1/2 px-2 py-2 mt-5 border border-red-500 rounded-full bg-red -bottom-5 ">
						<button
							type="button"
							className="flex items-center justify-center transition-colors duration-300 bg-transparent border rounded-full size-5 border-rose-50 hover:text-red text-rose-50 hover:bg-rose-50 cursor-pointer"
							onClick={() => decrementQuantity(id)}
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
						</button>
						<span className="font-medium text-rose-50">{quantity}</span>
						<button
							type="button"
							className="flex items-center justify-center transition-colors duration-300 bg-transparent border rounded-full size-5 border-rose-50 hover:text-red text-rose-50 hover:bg-rose-50 cursor-pointer"
							onClick={() => addToCart(product)}
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
						</button>
					</div>
				)}
			</picture>
			<p className="text-xs text-rose-400 mt-5">{product.category}</p>
			<h4 className="font-medium text-rose-900">{name}</h4>
			<p className="font-medium text-red">${price.toFixed(2)}</p>
		</section>
	);
}
