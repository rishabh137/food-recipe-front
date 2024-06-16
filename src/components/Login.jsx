import { TextField, Box, inputLabelClasses, Button, styled } from "@mui/material"
import axios from "axios"
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"

const StyledForm = styled(Box)({
    background: "#fff",
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

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitLogin = async (e) => {
        setError("")
        e.preventDefault();
        try {
            const { data } = await axios.post('https://recipe-verse.onrender.com/api/users/login', {
                email,
                password,
            });
            navigate('/recipes');
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
        } catch (error) {
            setError('Invalid email or password');
        }
    };


    return (
        <>
            <StyledForm>
                <h1>Login to continue</h1>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={submitLogin}>
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
                        Login
                    </Button>
                </form>
                <NavLink to="/signup" style={{ marginTop: "20px" }}>Don't have an account?</NavLink>
                <NavLink to="/" style={{ marginTop: "20px" }}>Return to Home page</NavLink>
                {/* <p>Don't have an account <Navigate to="/signup">Sign up</Navigate></p> */}
            </StyledForm>
        </>
    )
}

export default Login