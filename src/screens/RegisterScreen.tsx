import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { cores } from '../styles/theme';
import { RootStackParamList } from '../navigation/types';
import { api } from '../services/api';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Registro'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

export default function RegisterScreen({ navigation }: Props) {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', confirmar: '' });
  const [loading, setLoading] = useState(false);

  function alterar(campo: keyof typeof form, valor: string) {
    setForm({ ...form, [campo]: valor });
  }

  function handleVoltarSeguro() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Login');
    }
  }

  async function handleRegistrar() {
    if (!form.nome || !form.email || !form.senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (form.senha !== form.confirmar) {
      alert('As senhas não conferem.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/users', {
        name: form.nome,
        email: form.email,
        password: form.senha,
      });

      alert('Conta criada com sucesso!');
      handleVoltarSeguro(); 
    } catch (error: any) {
      console.error('Erro no registro:', error);
      
      if (error.response?.data?.message) {
        const msg = Array.isArray(error.response.data.message)
          ? error.response.data.message.join('\n')
          : error.response.data.message;
        alert(msg);
      } else {
        alert('Erro ao criar conta. Verifique sua conexão com o servidor.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={{ backgroundColor: cores.fundo }}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>Criar conta</Text>
      <Text style={styles.subtitulo}>Preencha seus dados</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={form.nome}
        onChangeText={(v) => alterar('nome', v)}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(v) => alterar('email', v)}
      />

      <View style={styles.linha}>
        <TextInput
          style={[styles.input, styles.metade]}
          placeholder="Senha"
          secureTextEntry
          value={form.senha}
          onChangeText={(v) => alterar('senha', v)}
        />
        <TextInput
          style={[styles.input, styles.metade]}
          placeholder="Confirmar"
          secureTextEntry
          value={form.confirmar}
          onChangeText={(v) => alterar('confirmar', v)}
        />
      </View>

      <TouchableOpacity 
        style={styles.botao} 
        onPress={handleRegistrar} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={cores.branco} />
        ) : (
          <Text style={styles.botaoTexto}>CADASTRAR</Text>
        )}
      </TouchableOpacity>

      <View style={styles.rodape}>
        <Text>Já tem conta? </Text>
        <Text style={styles.link} onPress={handleVoltarSeguro}>
          Entrar
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: { flexGrow: 1, justifyContent: 'center', padding: 24, gap: 12 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: cores.texto },
  subtitulo: { color: cores.cinza, marginBottom: 12 },
  input: {
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dfe6e9',
    backgroundColor: cores.branco,
  },
  linha: { flexDirection: 'row', gap: 12 },
  metade: { flex: 1 },
  botao: {
    height: 50,
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: cores.primaria,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 16 },
  rodape: { flexDirection: 'row', justifyContent: 'center' },
  link: { color: cores.primaria, fontWeight: 'bold' },
});
