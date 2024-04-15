import React from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
  width: 740px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Tr = styled.tr``;

const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    display: ${(props) => props.onlyWeb && "none"};
  }
`;

const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    display: ${(props) => props.onlyWeb && "none"};
  }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete("http://localhost:8800/" + id);
            const newArray = users.filter((user) => user.id !== id);
            setUsers(newArray);
            toast.success(data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        
            <Table>
                <Thead>
                    <Tr>
                        <Th>Nome</Th>
                        <Th>Email</Th>
                        <Th>Fone</Th>
                        <Th>Data</Th>
                        <Th></Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((item, i) => (
                        <Tr key={i}>
                            <Td width="20%">{item.nome}</Td>
                            <Td width="40%">{item.email}</Td>
                            <Td width="20%">{item.fone}</Td>
                            <Td width="20%">{item.data_nascimento}</Td>
                            <Td width="6%">
                                <FaEdit onClick={() => handleEdit(item)} />
                            </Td>
                            <Td width="6%">
                                <FaTrash onClick={() => handleDelete(item.id)} />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        
    );
};

export default Grid;
