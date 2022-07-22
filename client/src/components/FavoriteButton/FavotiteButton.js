import React, {useEffect, useState} from "react";
import axios from "axios";
import {HeartOutlined, HeartFilled} from "@ant-design/icons";
import {Button} from "antd";
import {FAVORITES} from "../../constants";

export const FavoriteButton = (props) => {
    const {
        userFrom,
        movieId,
        movieInfo
    } = props

    const [favorite, setFavorite] = useState(false)

    const data = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieInfo.title,
        movieImage: movieInfo.poster_path,
        movieRunTime: movieInfo.runtime
    }


    useEffect(() => {
        axios.post(`${FAVORITES}/favorite`, data)
            .then(response => {
                setFavorite(response.data.favorite)
            })
            .catch(error => console.log(error))
    }, [])

    const toggleFavorite = () => {
        if (favorite) {
            axios.post(`${FAVORITES}/removeFromFavorites`, data)
                .then(response => {
                    setFavorite(!favorite)
                })
                .catch(error => console.log(error))

        } else {
            axios.post(`${FAVORITES}/addToFavorites`, data)
                .then(response => {
                    setFavorite(!favorite)
                })
                .catch(error => console.log(error))

        }
    }

    return <Button
        icon={favorite ? <HeartFilled/> : <HeartOutlined/>}
        onClick={toggleFavorite}>
        {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </Button>
}
