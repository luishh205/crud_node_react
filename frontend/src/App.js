import GlobalStyle from "./styles/global.js";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "./Imagens/download.jpeg"; // Importe a imagem de fundo aqui

import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

   background-image: url(${backgroundImage}); // Defina a imagem de fundo aqui
  background-size: cover;
  padding: 20px; // Adicione um pouco de espaço interno para melhorar a aparência
  border-radius: 10px; // Adicione borda arredondada para suavizar as bordas
`;

const Title = styled.h2``;

function App() {
    const [users, setUsers] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8800");
            setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, [setUsers]);

    return (
        <>
            <Container>
                <Title>USUARIOS</Title>
                <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
                <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
            </Container>
            <ToastContainer autoClose={2000} position="bottom-left" />
            <GlobalStyle />
        </>
    );
}

export default App;
