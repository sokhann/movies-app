import React, {useEffect, useState} from "react";
import {Typography, Row, Tooltip, Button} from "antd";
import axios from "axios";
import {FAVORITES} from "../../constants";
import {MovieCard} from "../../components/MovieCard";
import {DeleteOutlined} from "@ant-design/icons";

export const FavoritesPage = (props) => {
    const [favoriteMovies, setFavoriteMovies] = useState([])

    const fetchFavoritedMovies = () => {
        axios.post(`${FAVORITES}/getFavoriteMovies`, {userFrom: localStorage.getItem('userId')})
            .then(response => {
                setFavoriteMovies(response.data.favorites)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchFavoritedMovies();
    }, [])

    const removeFromFavorites = (e, movieId, userFrom) => {
        e.preventDefault()
        axios.post(`${FAVORITES}/removeFromFavorites`, {movieId, userFrom})
            .then(response => {
                fetchFavoritedMovies()
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <Typography.Title level={2}>Favorites</Typography.Title>
            {
                favoriteMovies.length === 0
                    ? 'You have no favorites yet'
                    : <Row gutter={[10, 10]}>
                        {
                            favoriteMovies.map(
                                (item, index) =>
                                    <MovieCard
                                        key={index}
                                        colspan={4}
                                        id={item.movieId}
                                        title={item.movieTitle}
                                        imagePath={item.movieImage}
                                        action={
                                            <Tooltip title={'Remove from favorites'}>
                                                <Button
                                                    onClick={(e) => removeFromFavorites(e, item.movieId, item.userFrom)}
                                                    icon={<DeleteOutlined/>}
                                                />
                                            </Tooltip>
                                        }
                                    />
                            )
                        }
                    </Row>
            }
        </div>
    )
}
