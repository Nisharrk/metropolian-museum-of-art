import useSWR from 'swr'
import Error from 'next/error'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import styles from '@/styles/style.module.css'

export default function ArtworkCard({ objectID }) {
    const maxLength = 50;

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

    return (
        error ?
            <Error statusCode={404} />
            :
            data ?
                <>
                    <Card style={{ maxWidth: '100%' }}>
                        <Link href={`/artwork/${objectID}`} passHref>
                            <Card.Img variant="top" src={data.primaryImageSmall ? data.primaryImageSmall : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} />
                        </Link>

                        <Card.Body>
                            <Card.Title>{data.title ?
                                data.title.length > maxLength ? data.title.slice(0, maxLength) + "..." : data.title
                                :
                                "N/A"}
                            </Card.Title>
                            <section className={styles.textArea}>
                                <div><span className={styles.highlightText}>Date: </span>{data.objectDate ? data.objectDate : "N/A"}</div>
                                <div><span className={styles.highlightText}>Classification: </span>{data.classification ? data.classification : "N/A"}</div>
                                <div><span className={styles.highlightText}>Medium: </span>{data.medium ? data.medium : "N/A"}</div>

                            </section>

                            <Link href={`/artwork/${objectID}`} passHref>
                                <Button variant="outline-success">
                                    <strong>ID: </strong>{objectID}
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </>
                :
                null
    )
}