import { Box, styled } from "@mui/material";
import { useOutletContext } from "react-router-dom"
import RecipeContent from "./RecipeContent";

export const RecipeContainer = styled(Box)({
    padding: "4rem",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",

    '& > div': {
        background: "#282828",
        width: "320px",
        borderRadius: "12px",
        paddingBottom: "2rem",
        transition: "0.1s",
        marginRight: "3rem",
        marginBottom: "3rem"
    },


    '& > div:hover': {
        transform: "scale(1.1)"
    },

    '& > div > img': {
        width: "100%",
        height: "300px",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
    },

    '& > div > div': {
        paddingLeft: "1rem",

        '& > h1, h2': {
            color: "#eb6b16",
            fontWeight: 400,
        },

        '& > h2': {
            marginBottom: "1rem",
        },

    },
    '& > div > button': {
        background: "none",
        border: "none",
        outline: "none",
        marginTop: "1rem",
        marginLeft: "10px"
    },

    '& > div > button > a': {
        color: "#fff",
        textDecoration: "none",
        fontSize: "18px",
        background: "#eb6b16",
        padding: "12px 28px",
        marginTop: "1rem"
    },
})

const Recipe = () => {
    const { openDrawer } = useOutletContext();

    return (
        <>
            <RecipeContainer style={openDrawer ? { marginLeft: 280 } : { marginLeft: 0 }}>
                <RecipeContent />
            </RecipeContainer>
        </>
    )
}

export default Recipe