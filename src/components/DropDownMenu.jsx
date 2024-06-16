import { Logout } from "@mui/icons-material"
import { Box, Typography, styled } from "@mui/material"
import { useNavigate } from "react-router-dom"

const DropDownSection = styled(Box)({
    position: "absolute",
    right: "1.8rem",
    width: "280px",
    padding: "15px",
    borderRadius: "15px",
    background: "#282828",

    '& > #user-info': {
        display: "flex",
        alignItems: "center",
        margin: "1rem auto",
        paddingBottom: "1rem",
        borderBottom: "1px solid gray",

        '& > .user-icon': {
            // height: "2.6rem",
            fontSize: "18px",
            padding: "8px 16px",
            fontWeight: "bold",
            borderRadius: "50%",
            background: "#eb6b16",
            marginRight: "1rem"
        }
    },

    '& > #user-action': {

        '& >  p': {
            display: "flex",
            textDecoration: "none",
            color: "#fff",
            fontSize: "18px",
            width: "100%",
            padding: "1rem 0",
            cursor: "pointer",
            fontWeight: 400,


            '& > svg': {
                marginRight: "1rem"
            }
        },

        '& >  p:hover': {
            background: "#383737"
        }
    },

})

const DropDownMenu = ({ setShowDropDown }) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setShowDropDown(false)
        navigate("/login")
    }

    return (
        <>
            <DropDownSection>
                <Box id="user-info">
                    <Typography className="user-icon">{localStorage.getItem("username").slice(0, 1).toUpperCase()}</Typography>
                    <Typography>{localStorage.getItem("username")}</Typography>
                </Box>
                <Box id="user-action">
                    <p onClick={handleLogout}><Logout /> Sign Out</p>
                </Box>
            </DropDownSection>
        </>
    )
}

export default DropDownMenu