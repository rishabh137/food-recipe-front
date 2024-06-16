import { Box, Typography, styled, TextField, Button, inputLabelClasses, } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom"
import { useState } from "react";

const AddRecipeForm = styled(Box)({
    padding: "4rem",

    '& > form': {
        display: "flex",
        // justifyContent: "space-between",
        // color: "#fff",

        '& > div > #image-field': {
            marginTop: "16px",
            height: "142px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            '& > p': {
                marginBottom: "2rem",
                // marginRight: "2rem",
                fontSize: "18px"
            },

            '& > div > div > input': {
                color: "#fff",
            }
        },

        '& > .right-child': {
            marginLeft: "3rem",
            width: "50%",
        }
    },

    '& > form > div > div ': {
        background: "#383737",
        borderRadius: "4px",
        fontSize: "1rem",
        color: "#fff",

        '& > div > input': {
            color: "#fff"
        }
    },

    '& > div > input, textarea': {
        color: "#fff"
    }


})

const AddRecipe = () => {
    const navigate = useNavigate()
    const { openDrawer } = useOutletContext();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [image, setImage] = useState(null);
    const [steps, setSteps] = useState([]);
    const [error, setError] = useState('');

    const addRecipeHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('ingredients', ingredients);
        formData.append('image', image);
        formData.append('steps', steps);
        const response = await fetch('https://recipe-verse.onrender.com/api/recipes', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            navigate("/resipes")
        } else {
            setError('Failed to add recipe, Please refresh the page and try again');
        }
    };

    return (
        <>
            <AddRecipeForm style={openDrawer ? { marginLeft: 280 } : { marginLeft: 0 }}>
                <h1>Add a recipe</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={addRecipeHandler}>
                    <Box style={{ width: "45%" }}>
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Name"
                            variant="outlined"
                            fullWidth
                            color=""
                            margin="normal"
                            InputLabelProps={{
                                sx: {
                                    color: "#fff",
                                    [`&.${inputLabelClasses.shrink}`]: {
                                        color: "#fff",
                                        fontSize: "22px",
                                        borderColor: "#fff"
                                    }
                                }
                            }}
                        />

                        <TextField multiline rows={7}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            label="Recipe description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                sx: {
                                    color: "#fff",
                                    [`&.${inputLabelClasses.shrink}`]: {
                                        color: "#fff",
                                        fontSize: "22px",
                                        borderColor: "#fff"
                                    }
                                }
                            }}
                        />
                        <TextField multiline rows={3}
                            value={ingredients.join(', ')}
                            onChange={(e) => setIngredients(e.target.value.split(','))}
                            label="Ingredients (seperated by comma)"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                sx: {
                                    color: "#fff",
                                    [`&.${inputLabelClasses.shrink}`]: {
                                        color: "#fff",
                                        fontSize: "22px",
                                        borderColor: "#fff"
                                    }
                                }
                            }}
                        />

                    </Box>
                    <Box className="right-child">
                        <Box id="image-field">
                            <Typography>Add an image</Typography>
                            <TextField type="file" name="image" placeholder="Upload an image" className="recipe-details" onChange={(e) => setImage(e.target.files[0])} />
                        </Box>

                        <TextField multiline rows={7}
                            value={steps.join(', ')}
                            onChange={(e) => setSteps(e.target.value.split(','))}
                            label="Steps (seperated by comma)"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                sx: {
                                    color: "#fff",
                                    [`&.${inputLabelClasses.shrink}`]: {
                                        color: "#fff",
                                        fontSize: "22px",
                                        borderColor: "#fff"
                                    }
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            PUBLISH RECIPE
                        </Button>
                    </Box>
                </form>
            </AddRecipeForm>
        </>
    )
}

export default AddRecipe