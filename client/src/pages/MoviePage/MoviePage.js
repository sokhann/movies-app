import React, {useEffect, useState} from "react";
import {API_URL, API_KEY, API_IMAGE_URL} from "../../constants";
import {Card, Typography, Row, Col, Tag} from 'antd'
import './MoviePage.css'
import {MovieCard} from "../../components/MovieCard";
import {FavoriteButton} from "../../components/FavoriteButton";
import {useSelector} from "react-redux";

export const MoviePage = (props) => {
    const movieId = props.match.params.movieId

    const [movieData, setMovieData] = useState(null)
    const [cast, setCast] = useState([])
    const [recommendations, setRecommendations] = useState([])

    const user = useSelector(state => state.user)
    const isAuth = user.userData && user.userData.isAuth

    const fetchCast = () => {
        fetch(`${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(response => {
                setCast(response.cast.slice(0, 12))
            })
    }

    const fetchRecommendations = () => {
        fetch(`${API_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
            .then(response => response.json())
            .then(response => {
                setRecommendations(response.results.slice(0, 12))
            })
    }

    useEffect(() => {
        fetch(`${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(response => {
                setMovieData(response)
                fetchCast()
                fetchRecommendations()
            })
    }, [])

    return movieData &&
        <>
            <div className={'main'}>
                <div className={'poster'}>
                    <img src={`${API_IMAGE_URL}/w500${movieData.poster_path}`} alt={movieData.title}/>
                </div>
                <div className={'meta'}>
                    <h1>{movieData.title}</h1>
                    {movieData.tagline && <blockquote>&laquo;{movieData.tagline}&raquo;</blockquote>}
                    <p>{movieData.release_date}&nbsp;&nbsp;<Tag color="blue">{movieData.status}</Tag></p>
                    <p>
                        <span>{movieData.genres && movieData.genres.map(genre => genre.name).join(', ')}</span>
                        &nbsp;&bull;&nbsp;
                        <span>{movieData.runtime}min</span>
                    </p>
                    <div>
                        <h5>Overview</h5>
                        <p>{movieData.overview}</p>
                    </div>
                    {
                        isAuth &&
                            <FavoriteButton
                                userFrom={localStorage.getItem('userId')}
                                movieId={movieId}
                                movieInfo={movieData}
                            />
                    }
                </div>
            </div>
            {
                cast.length > 0 &&
                <div className={'movie-grid'}>
                    <Typography.Title level={3}>Cast</Typography.Title>
                    <Row gutter={[10, 10]}>
                        {
                            cast.map(
                                (item, index) => <Col span={4} key={index}>
                                    <Card
                                        cover={<img src={`${API_IMAGE_URL}/w500${item.profile_path}`} alt={item.name}/>}
                                        className={'card'}
                                    >
                                        <Card.Meta title={item.name} description={item.character}/>
                                    </Card>
                                </Col>
                            )
                        }
                    </Row>
                </div>
            }
            {
                recommendations.length > 0 &&
                <div className={'movie-grid'}>
                    <Typography.Title level={3}>Recommended</Typography.Title>
                    <Row gutter={[10, 10]}>
                        {
                            recommendations.map((item, index) =>
                                <MovieCard
                                    key={index}
                                    id={item.id}
                                    title={item.title}
                                    imagePath={item.backdrop_path}
                                />
                            )
                        }
                    </Row>
                </div>
            }
        </>
}
