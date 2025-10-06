import { useEffect, useState } from "react"
import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import api from "../api/axios" // Ensure this is the correct path to your API instance

type CartItemProps = {
    product_id: string
    quantity: number
}

type Product = {
    id: string
    name: string
    price: number
    imgUrl: string
}

export function CartItem({ product_id, quantity }: CartItemProps) {
    const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart()
    const [product, setProduct] = useState<Product | null>(null)

    useEffect(() => {
        let mounted = true
        api.get(`/products/${product_id}`).then(res => {
            if (mounted) setProduct(res.data)
        })
        return () => { mounted = false }
    }, [product_id])

    if (!product) return null

    return (
        <Stack direction="horizontal" gap={3} className="d-flex align-items-center">
            <img
                src={process.env.PUBLIC_URL + product.imgUrl}
                style={{ width: "124px", height: "74px", objectFit: "cover" }}
                alt={product.name}
            />
            <div className="w-100 d-flex flex-column" style={{ gap: ".5rem" }}>
                <div className="w-100 d-flex flex-column">
                    {product.name}
                    {quantity > 1 && <span className="text-muted" style={{ fontSize: ".9rem" }}> x{quantity}</span>}
                </div>
                <div className="text-muted" style={{ fontSize: ".85rem" }}>
                    ${product.price.toFixed(2)} each
                </div>
            </div>
            <div className="d-flex align-items-center" style={{ gap: ".5rem" }}>
                <Button variant="light" size="sm" onClick={() => decreaseCartQuantity(product_id)}>-</Button>
                <span>{quantity}</span>
                <Button variant="light" size="sm" onClick={() => increaseCartQuantity(product_id)}>+</Button>
            </div>
            {/* <div style={{ width: "80px", textAlign: "right" }}>
                ${(product.price * quantity).toFixed(2)}
            </div> */}
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeFromCart(product_id)}
            >
                &times;
            </Button>
        </Stack>
    )
}