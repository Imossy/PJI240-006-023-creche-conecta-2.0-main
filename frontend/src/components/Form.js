import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome_aluno.value = onEdit.nome_aluno;
      user.data_nascimento.value = onEdit.data_nascimento;
      user.horario_entrada.value = onEdit.horario_entrada;
      user.horario_saida.value = onEdit.horario_saida;
      user.nome_mae.value = onEdit.nome_mae;
      user.cpf_mae.value = onEdit.cpf_mae;
      user.nome_pai.value = onEdit.nome_pai;
      user.cpf_pai.value = onEdit.cpf_pai;
      user.endereco.value = onEdit.endereco;
      user.telefone.value = onEdit.telefone;
      user.data_inicio.value = onEdit.data_inicio;
      user.valor_mensalidade.value = onEdit.valor_mensalidade;
      user.data_desligamento.value = onEdit.data_desligamento;

    }
  }, [onEdit]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome_aluno.value ||
      !user.data_nascimento.value ||
      !user.horario_entrada.value ||
      !user.horario_saida.value ||
      !user.nome_mae.value ||
      !user.cpf_mae.value ||
      !user.nome_pai.value ||
      !user.cpf_pai.value ||
      !user.endereco.value ||
      !user.telefone.value ||
      !user.data_inicio.value ||
      !user.valor_mensalidade.value ||
      !user.data_desligamento.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome_aluno: user.nome_aluno.value,
          data_nascimento: user.data_nascimento.value,
          horario_entrada: user.horario_entrada.value,
          horario_saida: user.horario_saida.value,
          nome_mae: user.nome_mae.value,
          cpf_mae: user.cpf_mae.value,
          nome_pai: user.nome_pai.value,
          cpf_pai: user.cpf_pai.value,
          endereco: user.endereco.value,
          telefone: user.telefone.value,
          data_inicio: user.data_inicio.value,
          valor_mensalidade: user.valor_mensalidade.value,
          data_desligamento: user.data_desligamento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
            nome_aluno: user.nome_aluno.value,
            data_nascimento: user.data_nascimento.value,
            horario_entrada: user.horario_entrada.value,
            horario_saida: user.horario_saida.value,
            nome_mae: user.nome_mae.value,
            cpf_mae: user.cpf_mae.value,
            nome_pai: user.nome_pai.value,
            cpf_pai: user.cpf_pai.value,
            endereco: user.endereco.value,
            telefone: user.telefone.value,
            data_inicio: user.data_inicio.value,
            valor_mensalidade: user.valor_mensalidade.value,
            data_desligamento: user.data_desligamento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }


    user.nome_aluno.value = "";
    user.data_nascimento.value = "";
    user.horario_entrada.value = "";
    user.horario_saida.value = "";
    user.nome_mae.value = "";
    user.cpf_mae.value = "";
    user.nome_pai.value = "";
    user.cpf_pai.value = "";
    user.endereco.value = "";
    user.telefone.value = "";
    user.data_inicio.value = "";
    user.valor_mensalidade.value = "";
    user.data_desligamento.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome do aluno</Label>
        <Input name="nome_aluno" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data_nascimento" type="date" />
      </InputArea>
      <InputArea>
        <Label>Horário de Entrada</Label>
        <Input name="horario_entrada" type="time" />
      </InputArea>
      <InputArea>
        <Label>Horário de Saída</Label>
        <Input name="horario_saida" type="time" />
      </InputArea>
      <InputArea>
        <Label>Nome da Mãe</Label>
        <Input name="nome_mae" />
      </InputArea>
      <InputArea>
        <Label>CPF da Mãe</Label>
        <Input name="cpf_mae" />
      </InputArea>
      <InputArea>
        <Label>Nome do Pai</Label>
        <Input name="nome_pai" />
      </InputArea>
      <InputArea>
        <Label>CPF do Pai</Label>
        <Input name="cpf_pai" />
      </InputArea>
      <InputArea>
        <Label>Endereço</Label>
        <Input name="endereco" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="telefone" />
      </InputArea>
      <InputArea>
        <Label>Data de Início</Label>
        <Input name="data_inicio" type="date" />
      </InputArea>
      <InputArea>
        <Label>Valor da mensalidade</Label>
        <Input name="valor_mensalidade" type="number" />
      </InputArea>
      <InputArea>
        <Label>Data de Desligamento</Label>
        <Input name="data_desligamento" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;