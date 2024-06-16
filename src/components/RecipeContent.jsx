import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

const RecipeContent = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const { data } = await axios.get('https://recipe-verse.onrender.com/api/recipes');
            setRecipes(data);
        };
        fetchRecipes();
    }, []);

    return (
        <>
            {recipes.map((recipe) => (
                <Box>
                    <img src={`https://recipe-verse.onrender.com/${recipe.image}`} alt={recipe.name} />
                    <Box>
                        <h1>{recipe.name}</h1>
                        <h2>Ingredients: </h2>
                        <Typography style={{ marginBottom: "1rem" }}>{recipe.ingredients.slice(0, 2)}...</Typography>
                        <Typography>{recipe.description.slice(0, 100)}...</Typography>
                    </Box>
                    <button><NavLink to={`/recipes/${recipe._id}`}>Read more</NavLink></button>
                </Box>
            ))}
        </>
    )
}

export default RecipeContent