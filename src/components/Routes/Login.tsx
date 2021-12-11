import { FC, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { useFormState } from "../../hooks/useFormState";
import { authRequest } from "../../modules/request/admin";
import store from "../../store";
import H1 from "../Generic/Title";

const Login: FC = () => {
  const navigate = useNavigate();

  const [formValues, changeFormValues] = useFormState({
    username: "",
    password: "",
  });

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();
    const serverResponse = await authRequest(
      formValues.username,
      formValues.password
    );
    if (!serverResponse) return;

    store.user.setToken(serverResponse.data.token);
    navigate("/dashboard");
  };

  return (
    <main style={{ padding: "100px 0" }}>
      <Container style={{ maxWidth: 400 }}>
        <H1>EncDiary - Admin</H1>

        <Form inline className="pt-3" onSubmit={submitForm}>
          <FormGroup floating>
            <Input
              name="username"
              placeholder="Username"
              type="text"
              value={formValues.username}
              onChange={changeFormValues}
              autoComplete="off"
            />
            <Label>Username</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              name="password"
              placeholder="Password"
              type="password"
              value={formValues.password}
              onChange={changeFormValues}
              autoComplete="off"
            />
            <Label>Password</Label>
          </FormGroup>
          <Button block color="primary">
            Submit
          </Button>
        </Form>
      </Container>
    </main>
  );
};

export default Login;
