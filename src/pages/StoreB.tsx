import { useEffect, useState, useCallback } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import { ProductDetailsModal } from "../components/ProductDetailsModal"
import api from "../api/axios"
import { useShoppingCart } from "../context/ShoppingCartContext"

type StoreItemType = {
    id: string
    name: string
    price: number
    imgUrl: string
    description: string
    stock: number
    category: string
}

export function StoreB() {
    const [storeItems, setStoreItems] = useState<StoreItemType[]>([])
    const { onStoreCheckout } = useShoppingCart()

    // --- Modal State ---
    const [selectedProduct, setSelectedProduct] = useState<StoreItemType | null>(null)
    const [showModal, setShowModal] = useState(false)

    // Handler to be passed down to StoreItem
    const handleProductImageClick = (product: StoreItemType) => {
        setSelectedProduct(product)
        setShowModal(true)
    }
    const handleModalClose = () => {
        setShowModal(false)
        setSelectedProduct(null)
    }

    const fetchProducts = useCallback(() => {
        api.get("/products").then(res => setStoreItems(res.data))
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    useEffect(() => {
        if (onStoreCheckout) {
            onStoreCheckout(fetchProducts)
        }
    }, [onStoreCheckout, fetchProducts])

    return (
        <section className="fade-in custom-width bg-white" style={{ marginBottom: "6rem" }}>
            <Container className="custom-width">
                <div className="text-center mt-2 mb-4">
                    <h1 className="display-4">Cosmetics</h1>
                </div>
            </Container>
            <Row md={2} xs={1} lg={3} className="g-1 px-2">
                {storeItems.map(item => (
                    <Col key={item.id}>
                        <StoreItem {...item} isVersionB={true} onImageClick={() => handleProductImageClick(item)} />
                    </Col>
                ))}
            </Row>
            <ProductDetailsModal
                show={showModal}
                onHide={handleModalClose}
                product={selectedProduct}
                isVersionB={true}
            />
        </section>
    )
}