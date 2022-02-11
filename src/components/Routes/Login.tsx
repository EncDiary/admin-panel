import { enc } from "crypto-js";
import JSEncrypt from "jsencrypt";
import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { useFormState } from "../../hooks/useFormState";
import { createSignature } from "../../modules/crypto";
import { checkIsTokenValid } from "../../modules/jwt";
import {
  authRequest,
  getAuthMessageRequest,
} from "../../modules/request/admin";
import store from "../../store";
import H1 from "../Generic/Title";

const Login: FC = () => {
  const navigate = useNavigate();

  const [formValues, changeFormValues] = useFormState({
    username: "",
  });

  const [fileText, setFileText] = useState<any>();

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    const serverGetMessageResponse = await getAuthMessageRequest(
      formValues.username
    );
    if (!serverGetMessageResponse) return;

    const jse = new JSEncrypt();
    jse.setPrivateKey(fileText);

    const signature = createSignature(
      jse,
      serverGetMessageResponse.data.message
    );

    const serverAuthResponse = await authRequest(
      formValues.username,
      signature
    );
    if (!serverAuthResponse) return;

    const tokenData = checkIsTokenValid(serverAuthResponse.data.token);
    if (!tokenData.isValid) return;

    store.user.setAccount(
      formValues.username.toLowerCase(),
      jse,
      serverAuthResponse.data.token,
      tokenData.tokenExp,
      enc.Hex.parse(serverAuthResponse.data.salt)
    );

    navigate("/dashboard");
  };

  const readFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileText = fileReader.result;
      if (typeof fileText === "string") {
        setFileText(fileText);
      }
    };
    const files = event.currentTarget.files;
    if (files) {
      fileReader.readAsText(files[0]);
    }
  };

  return (
    <main style={{ padding: "100px 0" }}>
      <Container style={{ maxWidth: 400 }}>
        <H1>EncDiary Admin</H1>

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

          <FormGroup>
            <Input type="file" bsSize="lg" onChange={readFile} />
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
