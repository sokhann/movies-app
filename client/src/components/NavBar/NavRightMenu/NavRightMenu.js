import React from 'react';
import {Avatar, Button} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import {withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../../actions/user-actions";

const RightMenu = (props) => {
    const user = useSelector(state => state.user)
    const userData = user.userData
    const isAuth = userData && userData.isAuth

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser())
            .then(() => {
                props.history.push("/");
            })
            .catch(error => console.log(error))
    };

    return !isAuth
        ? <>
            <Button type="link"><a href="/sign-in">Sign In</a></Button>
            <Button type="primary"><a href="/sign-up">Sign Up</a></Button>
          </>
        : <>
            {
                userData &&
                <span className={'nav-user'}>
                    <Avatar src={userData.image} size={'small'} />
                        {userData.name}
                </span>
            }
            <Button type="link" onClick={handleLogout} icon={<LogoutOutlined />}>Logout</Button>
          </>
}

export const NavRightMenu = withRouter(RightMenu)
