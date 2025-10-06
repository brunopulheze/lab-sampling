import { Card, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
    id: string;
    name: string;
    price: number;
    imgUrl: string;
    description: string;
    stock: number;
    category: string;
    onImageClick?: () => void;
    isVersionB?: boolean;
};

export function StoreItem({
    id,
    name,
    price,
    imgUrl,
    description,
    stock,
    onImageClick,
    isVersionB = false,
}: StoreItemProps) {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart
    } = useShoppingCart();
    const quantity = getItemQuantity(id);

    const availableStock = stock - quantity;

    const handleAddToCart = () => {
        if (availableStock > 0) {
            increaseCartQuantity(id);
        }
    };

    const handleDecreaseCartQuantity = () => {
        if (quantity > 0) {
            decreaseCartQuantity(id);
        }
    };

    // Choose button color and style based on version
    const buttonClass = isVersionB
        ? "btn-outline-dark text-black custom-b-btn w-100"
        : "bg-dark border border-dark w-100";
    const buttonVariant = isVersionB
        ? "outline-dark"
        : "dark";

    const incDecClass = isVersionB
        ? "btn-outline-dark text-black custom-b-btn"
        : "bg-dark border border-dark";
    const incDecVariant = isVersionB
        ? "outline-dark"
        : "dark";

    return (
        <Card className="h-100" style={{ minHeight: '400px', maxHeight: '400px', display: 'flex', flexDirection: 'column' }}>
            <div
                className="overflow-hidden"
                style={{ height: '180px', cursor: "pointer" }}
                onClick={onImageClick}
            >
                <Card.Img
                    className="hover transition"
                    variant="top"
                    src={process.env.PUBLIC_URL + imgUrl}
                    height="180px"
                    style={{ objectFit: "cover" }}
                />
            </div>
            <Card.Body className="d-flex flex-column" style={{ flex: 1, minHeight: "0", overflow: "hidden" }}>
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-2">
                    <span className="fs-5 fw-light">{name}</span>
                    <span className="ms-2 text-muted fw-light">${price.toFixed(2)}</span>
                </Card.Title>
                <div className="mb-2 fw-light">
                    {availableStock === 0 ? 'Out of Stock' : `Stock: ${availableStock}`}
                </div>
                {/* Description with fixed height and ellipsis */}
                <div
                    className="mb-2 fw-light"
                    style={{
                        height: '40px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {description}
                </div>
                <div style={{ marginTop: "auto" }}>
                    {quantity === 0 ? (
                        <Button
                            className={buttonClass}
                            onClick={handleAddToCart}
                            disabled={availableStock === 0}
                            variant={availableStock === 0 ? "secondary" : buttonVariant}
                        >
                            {availableStock === 0 ? "Out of Stock" : "Add To Cart"}
                        </Button>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center" style={{ gap: ".5rem" }}>
                            <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                                <Button
                                    className={incDecClass}
                                    variant={incDecVariant}
                                    onClick={handleDecreaseCartQuantity}
                                    disabled={quantity === 0}
                                >
                                    -
                                </Button>
                                <div>
                                    <span className="fs-6">{quantity}</span> in cart
                                </div>
                                <Button
                                    className={incDecClass}
                                    variant={incDecVariant}
                                    onClick={handleAddToCart}
                                    disabled={availableStock === 0}
                                >
                                    +
                                </Button>
                            </div>
                            <Button
                                style={{ paddingLeft: "12px", paddingRight: "12px", paddingTop: "7.5px", paddingBottom: "7.5px" }}
                                variant="outline-danger"
                                size="sm"
                                onClick={() => removeFromCart(id)}
                            >
                                &times;
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}