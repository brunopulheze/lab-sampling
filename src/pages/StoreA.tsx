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

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return isMobile
}

export function StoreA() {
    const [storeItems, setStoreItems] = useState<StoreItemType[]>([])
    const { onStoreCheckout } = useShoppingCart()
    const isMobile = useIsMobile()

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

    // Only show 3 items on mobile, all on desktop/tablet
    const visibleItems = isMobile ? storeItems.slice(0, 3) : storeItems

    return (
        <section className="fade-in custom-width bg-white" style={{ marginBottom: "6rem" }}>
            <Container className="custom-width">
                <div className="text-center mt-2 mb-4">
                    <h1 className="display-4">Cosmetics</h1>
                </div>
            </Container>
            <Row md={2} xs={1} lg={3} className="g-1 px-2">
                {visibleItems.map(item => (
                    <Col key={item.id}>
                        <StoreItem {...item} onImageClick={() => handleProductImageClick(item)} />
                    </Col>
                ))}
            </Row>
            <ProductDetailsModal
                show={showModal}
                onHide={handleModalClose}
                product={selectedProduct}
            />
        </section>
    )
}