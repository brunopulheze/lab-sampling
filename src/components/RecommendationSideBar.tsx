import { Card, Col } from 'react-bootstrap'

export function RecommendationSideBar() {
    return (
        <Col md={2} className="d-none d-md-block p-0">
            <aside className="d-flex justify-content-center">
                <div className="w-75 px-3" style={{ height: "440px" }}>
                    <div className="text-center mt-2 mb-4">
                        <h1 className="display-4 opacity-0">Ads</h1>
                    </div>
                    <Card className="h-100">
                        <Card.Img
                            src={process.env.PUBLIC_URL + '/imgs/side-banner.png'}
                            height="440px"
                            style={{ objectFit: "contain" }}
                        >
                        </Card.Img>
                    </Card>
                </div>
            </aside>
        </Col>
    )
}
