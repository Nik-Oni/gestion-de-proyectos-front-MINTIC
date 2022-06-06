import React, { useEffect } from "react";
import Input from "components/Input";
import ButtonLoading from "components/ButtonLoading";
import { Link } from "react-router-dom";
import useFormData from "hooks/useFormData";
import { useMutation } from "@apollo/client";
import { LOGIN } from "graphql/auth/mutations";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/authContext";

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();

  const [
    login,
    { data: dataMutation, loading: mutationLoading, error: mutationError }] = 
    useMutation(LOGIN);

  const submitForm = (e) => {
    e.preventDefault();
    login({
      variables: formData,
    });
  };

  useEffect(() => {
    console.log("data mutation", dataMutation);
    if (dataMutation) {
      if (dataMutation.login.token) {
        setToken(dataMutation.login.token);
        navigate('/');
      }
    }
  }, [dataMutation, setToken, navigate]);
  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <h1 className="text-3xl font-bols my-4">Regístrate</h1>
      <form
        className="flex flex-col"
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
      >
        <div className="grid grid-cols-2 gap-5">
          <Input label="Correo" name="correo" type="email" required />
          <Input label="Contraseña" name="password" type="password" required />
        </div>
        <ButtonLoading
          disabled={Object.keys(formData).length === 0}
          loading={mutationLoading}
          text="Iniciar sesión"
        />
      </form>
      <span>¿No tienes una cuenta?</span>
      <Link to="/auth/register">
        <span className="text-blue-700">Regístrate</span>
      </Link>
    </div>
  );
};

export default Login;
