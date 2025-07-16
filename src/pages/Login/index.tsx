import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Swal from 'sweetalert2';

import { useAuth } from '~/hooks/Auth';
import getValidationErros from '~/utils/getValidationsErrors';

import { Container } from './styles';
import Input from '~/components/Input';

interface IFormData {
  name: string;
}

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('O seu nome é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        signIn({
          name: data.name,
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErros(error);
          formRef.current?.setErrors(errors);
        } else {
          Swal.fire('Oops...', 'Ocorreu um erro tente novamente, por favor');
        }
      }
    },
    [signIn]
  );

  return (
    <Container className="vh-100">
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-lg-5">
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1 className="h2 fw-normal text-center w-100">
                Olá, seja bem-vindo!
              </h1>
              <Input
                name="name"
                placeholder="Digite o seu nome:"
                className="my-4 input"
              />
              <button
                type="submit"
                className="btn btn-submit w-100 fs-4 fw-bold"
              >
                Entrar
              </button>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
