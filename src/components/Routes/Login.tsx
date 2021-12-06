import { FC, FormEvent } from "react";
import { useFormState } from "../../hooks/useFormState";
import Button from "../Generic/Button";
import FloatingInput from "../Generic/Input/FloatingInput";
import "./Login.scss";

const Login: FC = () => {
  const [formValues, changeFormValues] = useFormState({
    username: "",
    password: "",
  });

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <main className="login text-center">
      <form className="login__form" onSubmit={submitForm}>
        <h1 className="mb-4">EncDiary - Admin</h1>

        <FloatingInput
          name="username"
          type="text"
          label="Username"
          value={formValues.username}
          onChange={changeFormValues}
        />
        <FloatingInput
          name="password"
          type="password"
          label="Password"
          value={formValues.password}
          onChange={changeFormValues}
        />

        <Button content="Login" />
      </form>
    </main>
  );
};

export default Login;
