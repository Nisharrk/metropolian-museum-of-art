import Head from 'next/head'
import { favoritesAtom } from '@/store'
import { useAtom } from 'jotai'
import { Row, Col } from 'react-bootstrap'
import CustomCard from '@/components/CustomCard'
import ArtworkCard from '@/components/ArtworkCard'


export default function Favorites() {
    const [favorites, setFavorites] = useAtom(favoritesAtom)

    return (
        <>
            <Head>
                <title>Metropolitan Museum of Art | Favorites</title>
                <meta name="description" content="Metropolitan Museum of Art | Favorites" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/museum.ico" />
            </Head>

            <main>
                {favorites.length > 0 && <h5 style={{ paddingBottom: "0.5rem" }}>My Favorite Artworks</h5>}

                <Row className='gy-4'>
                    {
                        favorites.length > 0 ?
                            favorites.map((id) => (
                                <Col lg={3} md={4} sm={6} xs={12} key={id}>
                                    <ArtworkCard objectID={id} />
                                </Col>
                            ))
                            :
                            <>
                                <CustomCard title={"Sorry, No items in your list"} text={"Try adding your favorite artworks to the list"} />
                            </>
                    }
                </Row>
            </main>
        </>
    )
}