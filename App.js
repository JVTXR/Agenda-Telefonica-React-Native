import React, { useState } from 'react';
import { View, Text } from 'react-native';
import TabelaContatos from '@react-native-async-storage/async-storage'
import styled from 'styled-components';

const Page = styled.SafeAreaView`
flex: 1;
align-items: center;
`
const Header = styled.View`
background-color: blue;
width: 100%;
align-items: center;
justify-content: center;
margin-bottom: 15px;
`
const HeaderText = styled.Text`
font-size:25px;
margin-top: 20px;
margin-bottom: 20px;
color: white;
`;
const Input = styled.TextInput`
    background-color: #DDD;
    border-radius: 10px;
    margin: 15px;
    padding: 10px;
    font-size: 23px;
    color: #000;
    width: 70%;
`
const Botao = styled.TouchableOpacity`  
    background-color: blue;
    justify-content: center;
    align-items: center;
    margin: 8px;
    padding: 10px;
    border-radius: 10px;
    width: 50%;
`;
const TextoBotao = styled.Text`
    color: #FFF;
    font-size: 25px;
`;
const Resultado = styled.View`
margin-top: 40px;
margin-bottom: 40px;
justify-content: center;
align-items: center;
`;

export default function App() {
  const [nome, setNome] = useState('')
  const [numero, setNumero] = useState('')
  const [resultado, setResultado] = useState('')

  //funcao de adicao de contatos
  const Armazenar = async (chave, valor) => {
    if (chave === '' || valor === '') {
      alert("Preencha todos os campos!!");
      return;
    }
    await TabelaContatos.setItem(chave, valor);
    alert("Telefone adicionado com sucesso :D")

      setNome('');
      setNumero('');
  };

  //funcao de busca de contatos
  const Buscar = async (chave) => {
    if (chave === "") {
      alert("Preencha o campo de busca!!")
      return;
    }
    const valor = await TabelaContatos.getItem(chave);
    if (valor === null) {
      alert("Contato não encontrado");
      return;
    }
    setResultado(valor)
    setNome('');
    setNumero('');
    //funcao de apaga o resultado depois de um tempo
    setTimeout(() => {
      setResultado("");
    }, 5000); //apagando o resultado depois de 5 segundos
  };

  const Excluir = async (chave) => {
    if (chave === "") {
      alert("preencha o campo de busca para realizara exclusão!!");
      return;
    }
    const valor = await TabelaContatos.getItem(chave);
    if (valor === null) {
      alert("Contato não encontrado")
      return;
    }
    await TabelaContatos.removeItem(chave);
    alert("Numero excluido com sucesso!!");
  };

  return (
    <Page>
      <Header><HeaderText>Agenda do João</HeaderText></Header>
      <Input
        KeyborardType="text"
        placeholder="Nome"
        value={nome}
        onChangeText={(n) => setNome(n)}
        
      />

      <Input
        KeyborardType="text"
        placeholder="Telefone"
        value={numero}
        onChangeText={(n) => setNumero(n)}

      />

      <Botao onPress={() => Armazenar(nome, numero)}>
        <TextoBotao>Adicionar</TextoBotao>
      </Botao>
      <Botao onPress={() => Buscar(nome)}>
        <TextoBotao>Buscar</TextoBotao>
      </Botao>
      <Resultado>
        <Text style={{fontSize:25}}>{resultado}</Text>
      </Resultado>
      <Botao onPress={() => Excluir(nome)}>
        <TextoBotao>Excluir</TextoBotao>
      </Botao>
    </Page>
  );
}
