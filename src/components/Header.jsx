import { AppBar, Toolbar, styled, InputBase, Box, Dialog } from "@mui/material"
import { Search, Menu as MenuIcon, } from "@mui/icons-material"
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DropDownMenu from "./DropDownMenu"
import { useState, useCallback, useEffect } from "react"
import { NavLink } from "react-router-dom";
import debounce from 'lodash/debounce';

const StyledAppBar = styled(AppBar)({
    background: '#0f0f18',
    boxShadow: 'none',
})

const dialogStyle = {
    background: "#fff",
    height: '60%',
    width: '80%',

    '& > #close-icon ': {
        display: "flex",
        justifyContent: "flex-end",

        '& > svg': {
            cursor: "pointer",
        }
    },

    '& > div': {
        display: "flex",
        padding: "20px 1rem",
        borderBottom: "1px solid gray",

        '& > div > a': {
            color: "#fff",
            textDecoration: "none",
            fontSize: "18px",
            background: "#eb6b16",
            padding: "12px 12px",
        }
    }
}

const StyledToolBar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",

    '#topBar': {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    '& > #topBar > #brand-name': {
        color: "#fff",
        marginLeft: "2rem",
        fontWeight: 400,
        display: "flexbox",
        marginTop: "4px"
    },

    '& > div > div > .userIcon': {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        height: "2.3rem",
        cursor: "pointer",
        background: "#eb6b16",
        fontSize: "18px",
        fontWeight: "Bold",
        padding: "8px",
        paddingLeft: "10px"
    },
})

const SearchWrapper = styled(Box)({
    border: "1px solid gray",
    outline: "none",
    borderRadius: 5,
    minWidth: 570,
    maxWidth: 610,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    '& > div': {
        color: "#fff",
        width: '100%',
        padding: '0 10px'
    },

    '& > svg': {
        color: "gray"
    }
})

const Header = ({ toggleDrawer }) => {
    const [showDropDown, setShowDropDown] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);

    const searchRecipes = async (query) => {
        if (query.trim() === '') {
            setRecipes([]);
            return;
        }
        const response = await fetch(`https://recipe-verse.onrender.com/api/recipes/search?q=${query}`);
        const data = await response.json();
        setRecipes(data);
    };

    const debouncedSearch = useCallback(debounce(searchRecipes, 300), []);
    useEffect(() => {
        debouncedSearch(query);
    }, [query, debouncedSearch]);

    const callDropMenu = () => {
        setShowDropDown(!showDropDown)
    }

    const handleDialog = () => {
        setShowDialog(!showDialog)
    }

    return (
        <StyledAppBar position="sticky">
            <StyledToolBar>
                <Box id="topBar">
                    <MenuIcon color="action" style={{ color: "#fff", cursor: 'pointer' }} onClick={toggleDrawer} />
                    <h1 id="brand-name"><span style={{ color: "#eb6b16", fontSize: "3rem" }}>R</span>ecipe<span style={{ color: "#eb6b16" }}>V</span>erse</h1>
                </Box>
                <SearchWrapper onClick={handleDialog}>
                    <Search color="action" />
                    <InputBase placeholder="Search recipe" />
                </SearchWrapper>

                <Dialog open={showDialog} PaperProps={{ sx: dialogStyle }} >
                    <Box id="close-icon">
                        <CloseIcon onClick={handleDialog} />
                    </Box>
                    <InputBase placeholder="Search recipe" value={query} onChange={(e) => setQuery(e.target.value)} style={{ color: "#111" }} />
                    {recipes.map((recipe) => (
                        <div key={recipe._id} style={{ color: "#111" }}>
                            <img src={`https://recipe-verse.onrender.com/${recipe.image}`} alt="" style={{ width: "100px", marginRight: "20px" }} />
                            <Box>
                                <h2>{recipe.name}</h2>
                                <p>{recipe.description.slice(0, 100)}...</p>
                                <NavLink to={`/recipes/${recipe._id}`} onClick={handleDialog}>Read more</NavLink>
                            </Box>
                        </div>
                    ))}
                </Dialog>

                <Box>
                    {
                        localStorage.getItem("token") ?
                            <Box>
                                <p onClick={callDropMenu} className="userIcon">{localStorage.getItem("username").slice(0, 1).toUpperCase()}<KeyboardArrowDownIcon /></p>
                            </Box>
                            :
                            <NavLink to="/login" style={{
                                color: "#fff",
                                textDecoration: "none",
                                fontSize: "18px",
                                background: "#eb6b16",
                                padding: "12px 25px",
                                borderRadius: "5px"
                            }}>Login</NavLink>
                    }

                    {

                        showDropDown ?
                            <>
                                <DropDownMenu setShowDropDown={setShowDropDown} />
                            </>
                            :
                            ""
                    }

                </Box>
            </StyledToolBar>
        </StyledAppBar >
    )
}

export default Header