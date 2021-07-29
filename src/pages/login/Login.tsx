import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    TextField,
    Button,
    Grid,
} from "@material-ui/core";

const Login: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Please Enter your Email"),
            password: Yup.string().required("Please Enter your password"),
            rememberMe: Yup.boolean(),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values));
        },
    });

    const errorField = (
        value: boolean | undefined,
        error: string | undefined
    ) => (value && error ? <div style={{ color: "red" }}>{error}</div> : null);

    return (
        <Grid container justify="center">
            <Grid style={{ flexBasis: "auto", marginTop: 20 }} item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered{" "}
                                <a
                                    href={
                                        "https://social-network.samuraijs.com/"
                                    }
                                    target={"_blank"}
                                >
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps("email")}
                            />
                            {errorField(
                                formik.touched.email,
                                formik.errors.email
                            )}

                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps("password")}
                            />
                            {errorField(
                                formik.touched.password,
                                formik.errors.password
                            )}

                            <FormControlLabel
                                label={"Remember me"}
                                control={
                                    <Checkbox
                                        {...formik.getFieldProps("rememberMe")}
                                        checked={formik.values.rememberMe}
                                    />
                                }
                            />
                            <Button
                                type={"submit"}
                                variant={"contained"}
                                color={"primary"}
                            >
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};

export default Login;
