import React from "react";
import {Col, Card, Tooltip, Button} from "antd";
import {API_IMAGE_URL} from "../../constants";
import './MovieCard.css'

export const MovieCard = (props) => {
    const {imagePath, title, id, colspan, action} = props

    return <Col span={colspan || 6}>
        <a className={'card-link'} href={`/movie/${id}`}>
            {
                action &&
                    <div className={'card-action'}>{action}</div>
            }
            <Card
                hoverable
                cover={<img src={`${API_IMAGE_URL}/w500${imagePath}`} alt={title}/>}
            >
                <Card.Meta title={title}/>
            </Card>
        </a>
    </Col>
}
