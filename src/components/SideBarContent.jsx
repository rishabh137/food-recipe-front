import { Box, List, ListItem, styled } from "@mui/material"
import { NavLink } from "react-router-dom"
import { SIDEBAR_DATA } from "../config/sidebar.config"

const Container = styled(Box)({
    '& >ul > li> .active': {
        background: "#383737",
    },

    '& > ul > li > a': {
        textDecoration: "none",
        width: "100%",
        color: "#fff",
        padding: "1rem 4.5rem",
        fontWeight: 400,
        fontSize: "19px"
    },

    '& > ul > li > a:hover': {
        background: "#383737"
    }
})

const SideBarContent = () => {
    var isToken = localStorage.getItem("token")

    return (
        <>
            <Container>
                <List>
                    {
                        SIDEBAR_DATA.map(data => (
                            <ListItem key={data.id}>
                                <NavLink to={isToken ? data.link : "/login"}>{data.title}</NavLink>
                            </ListItem>
                        ))
                    }
                </List>
            </Container>
        </>
    )
}

export default SideBarContent