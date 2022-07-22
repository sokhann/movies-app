import React, {useEffect, useState} from 'react'
import {API_KEY, API_URL} from "../../constants";
import {Row, Button, Typography} from 'antd'
import {MovieCard} from "../../components/MovieCard";
import {ReloadOutlined} from "@ant-design/icons";

const HomePage = () => {
    const lastPopularRequestUrl = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US`
    const [latest, setLatest] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const fetchLatest = () => {
        setCurrentPage(prevState => prevState + 1)

        fetch(`${lastPopularRequestUrl}&page=${currentPage}`)
            .then(response => response.json())
            .then(response => {
                setLatest([...latest, ...response.results])
            })
            .catch(error => console.log(error))
    }


    useEffect(() => {
        fetchLatest()
    }, [])

    const loadMore = () => {
        fetchLatest()
    }

    return (
        <div>
            <Typography.Title level={2}>Latest Popular</Typography.Title>
            <Row gutter={[10, 10]}>
                {
                    latest && latest.map(
                        (item, index) =>
                            <MovieCard
                                key={index}
                                id={item.id}
                                title={item.title}
                                imagePath={item.backdrop_path}
                            />
                    )
                }
            </Row>
            <Button onClick={loadMore} icon={<ReloadOutlined />} className={'load-more'}>Load More</Button>
        </div>
    )
}

export default HomePage
