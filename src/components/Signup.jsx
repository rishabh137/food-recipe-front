import { TextField, inputLabelClasses, Button, styled, Box } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";

const StyledForm = styled(Box)({
    background: "#fff",
    width: "50%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "4rem auto",
    padding: "4rem",
    borderRadius: "10px",

    '& > h1': {
        color: "#111",
        fontWeight: "400",
    }
})


const Signup = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitRegistration = async (e) => {
        setError("")
        e.preventDefault();
        try {
            const { data } = await axios.post('https://recipe-verse.onrender.com/api/users/register', {
                username,
                email,
                password,
            });
            navigate("/login")
        } catch (error) {
            console.error(error);
            setError('Failed to register');
        }
    }

    return (
        <>
            <StyledForm>
                <h1>Create an Account</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={submitRegistration}>
                    <TextField
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="off"
                        label="Your name"
                        variant="outlined"
                        fullWidth
                        color=""
                        margin="normal"
                        InputLabelProps={{
                            sx: {
                                color: "#111",
                                [`&.${inputLabelClasses.shrink}`]: {
                                    color: "#111",
                                    fontSize: "22px"
                                }
                            }
                        }}
                    />
                    <TextField
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        color=""
                        margin="normal"
                        InputLabelProps={{
                            sx: {
                                color: "#111",
                                [`&.${inputLabelClasses.shrink}`]: {
                                    color: "#111",
                                    fontSize: "22px"
                                }
                            }
                        }}
                    />
                    <TextField
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        color=""
                        margin="normal"
                        InputLabelProps={{
                            sx: {
                                color: "#111",
                                [`&.${inputLabelClasses.shrink}`]: {
                                    color: "#111",
                                    fontSize: "22px"
                                }
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Sign Up
                    </Button>
                </form >
                <NavLink to="/login" style={{ marginTop: "20px" }}>Already have an account?</NavLink>
            </StyledForm>
        </>
    )
}

export default Signup