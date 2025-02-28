import { useCallback, useState } from "react";
import type { Product } from "../lib/types";

export default function useCart() {
	const [cart, setCart] = useState<{
		[key: string]: { product: Product; quantity: number };
	}>({});
	const [orderConfirmed, setOrderConfirmed] = useState(false);

	const totalQuantity = Object.values(cart).reduce(
		(sum, item) => sum + item.quantity,
		0,
	);

	const total = Object.values(cart).reduce(
		(sum, item) => sum + item.product.price * item.quantity,
		0,
	);

	const addToCart = useCallback((product: Product) => {
		setCart((prevCart) => {
			const { [product.id]: existingItem, ...rest } = prevCart;
			const currentQuantity = existingItem?.quantity || 0;

			return {
				...rest,
				[product.id]: {
					product,
					quantity: currentQuantity + 1,
				},
			};
		});
	}, []);

	const decrementQuantity = useCallback((productId: number) => {
		setCart((prevCart) => {
			const currentItem = prevCart[productId];
			if (!currentItem) return prevCart;

			if (currentItem.quantity === 1) {
				const updatedCart = { ...prevCart };
				delete updatedCart[productId];
				return updatedCart;
			}

			return {
				...prevCart,
				[productId]: {
					...currentItem,
					quantity: currentItem.quantity - 1,
				},
			};
		});
	}, []);

	const removeFromCart = useCallback((productId: number) => {
		setCart((prevCart) => {
			const updatedCart = { ...prevCart };
			delete updatedCart[productId];
			return updatedCart;
		});
	}, []);

	const getItemQuantity = useCallback(
		(productId: number) => {
			return cart[productId]?.quantity || 0;
		},
		[cart],
	);

	const resetCart = useCallback(() => {
		setCart({});
	}, []);

	return {
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
	};
}
