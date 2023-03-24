import Link from 'next/link'
import { Card } from 'react-bootstrap'


export default function CustomCard({ title, text }) {

    return (
        <>
            <Card style={{ width: "80%", margin: "2rem auto" }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <br />
                    <Card.Text>
                        {text}
                    </Card.Text>

                    <Link href="/" passHref legacyBehavior><Card.Link>Back to Home</Card.Link></Link>
                    <Link href="/search" passHref legacyBehavior><Card.Link>Search Again</Card.Link></Link>
                </Card.Body>
            </Card>
        </>
    )

}