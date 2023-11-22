import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TabelaCursos from '@react-native-async-storage/async-storage'

export default function App() {
  const [curso, setCurso] = useState(null)

  //Funcao de armazenamento de dados
  //recebe e graba chave / valor
  const Armazenar = (chave, valor) => {
    //n precisa de asunc await - armazenado, Mas se voce quiser, voce pode colocar
    TabelaCursos.setItem(chave, valor)
  }

  //funcao de leitura de dados
  //recebe a chave e retorna o valor 
  const Buscar = async (chave) => {
    const valor = await TabelaCursos.getItem(chave)
    //valor e gravado na variavel curso 
    //poderia ter usado de outra forma(mostar na tela, etc...)
    setCurso(valor)
  }

  //*******exemplo simples de uso*******
  //gravando os cursos
  Armazenar('01', 'Eng.Software')
  Armazenar('02', 'Eng.Produção')
  Armazenar('03', 'Geografia')
  Armazenar('04', 'Tec.Alimentos')

  //deletando toda a tabela
  //TabelaCursos.clear()

  //deletando apenas um item da tabela
  //TabelaCursos.removeItem('04')

  //buscando os cursos
  Buscar('01')

  return (
    <View>
      <Text>Armazenamento Local / Async storage</Text>
      <Text>Curso de {curso}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({


})
