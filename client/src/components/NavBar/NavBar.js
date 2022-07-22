import React from 'react';
import {PageHeader} from 'antd';
import './Navbar.css';
import {HeartOutlined, HomeOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
import {NavRightMenu} from "./NavRightMenu";
import {useSelector} from "react-redux";

export const NavBar = () => {
    const user = useSelector(state => state.user)
    const isAuth = user.userData && user.userData.isAuth

    return (
        <PageHeader
            title={'My Movies'}
            className={'nav-bar'}
            subTitle={
                <nav className={'nav'}>
                    <NavLink exact to="/" activeClassName={'nav-item-active'}><HomeOutlined /> Home</NavLink>
                    {isAuth && <NavLink exact to="/favorites" activeClassName={'nav-item-active'}><HeartOutlined/> Favorites</NavLink>}
                </nav>
            }
            extra={<NavRightMenu />}
        >
        </PageHeader>
    )
}
