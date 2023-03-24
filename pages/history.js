import Head from 'next/head'
import { useAtom } from 'jotai'
import { searchHistoryAtom } from '@/store'
import { useRouter } from 'next/router'
import CustomCard from '@/components/CustomCard'
import styles from '@/styles/style.module.css'
import { Button, ListGroup } from 'react-bootstrap'

export default function History() {
    const router = useRouter()
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    let parsedHistory = searchHistory.map((item) => {
        let params = new URLSearchParams(item)
        let entries = params.entries()
        return Object.fromEntries(entries)
    })

    const historyClicked = (e, index) => {
        router.push(searchHistory[index])
    }

    const removeHistoryClicked = (e, index) => {
        e.stopPropagation()
        setSearchHistory(searchHistory.filter((item, i) => i !== index))
    }

    return (
        <>
            <Head>
                <title>Metropolitan Museum of Art | History</title>
                <meta name="description" content="Metropolitan Museum of Art | History" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/museum.ico" />
            </Head>
            <main>
                {
                    parsedHistory.length > 0 ?
                        <ListGroup>
                            {parsedHistory.map((item, index) => (
                                <ListGroup.Item onClick={e => historyClicked(e, index)} className={styles.historyListItem} key={index}>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>Keyword: {item.q}</div>
                                        <div style={{ fontWeight: 300 }}>
                                            <span>Search By: {Object.keys(item)[0].split("?")[1]}&nbsp;&nbsp;&nbsp;</span>
                                            {Object.keys(item).map((key, index) => (
                                                (index !== 0 && index !== Object.keys(item).length - 1) &&
                                                <span key={index}>{key}: {item[key]}&nbsp;&nbsp;&nbsp;</span>
                                            ))}
                                        </div>

                                    </div>
                                    <Button variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)} style={{ height: "1.8rem" }}>
                                        &times;
                                    </Button>
                                </ListGroup.Item>

                            ))}
                        </ListGroup>
                        :
                        <CustomCard title={"No search history can be found"} text={"Try searching for some artworks"} />
                }
            </main>
        </>
    )
}

///
// const History = () => {
//     artwork?title: true,
//     geoLocation: Europe,
//     medium: Ceramics,
//     isOnView: true,
//     isHighlight: true,
//     q: land
// }