import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cores } from '../styles/theme';
import { RootStackParamList } from '../navigation/types';
import { api } from '../services/api';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (): Promise<void> => {
    if (!email || !senha) {
      alert('Por favor, preencha o e-mail e a senha.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/login', { 
        email, 
        password: senha 
      });
      
      await AsyncStorage.setItem('access_token', response.data.access_token);
      
      navigation.replace('Principal', { screen: 'Início' });    } catch (error) {
      console.error('Erro no login:', error);
      alert('E-mail ou senha incorretos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToRegister = (): void => {
    navigation.navigate('Registro');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Bloco 1: Cabeçalho */}
      <View style={styles.cabecalho}>
        <View style={styles.logo}>
          <Text style={styles.logoTexto}>A</Text>
        </View>
        <Text style={styles.titulo}>Bem-vindo!</Text>
        <Text style={styles.subtitulo}>Faça login para continuar</Text>
      </View>

      {/* Bloco 2: Formulário */}
      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Text style={styles.esqueci}>Esqueci a senha</Text>

        <TouchableOpacity 
          style={styles.botao} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={cores.branco} />
          ) : (
            <Text style={styles.botaoTexto}>ENTRAR</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Bloco 3: Rodapé */}
      <View style={styles.rodape}>
        <Text>Não tem conta? </Text>
        <Text style={styles.link} onPress={handleNavigateToRegister}>
          Cadastre-se
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 32,
    backgroundColor: cores.fundo,
  },
  cabecalho: {
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: cores.primaria,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoTexto: { color: cores.branco, fontSize: 36, fontWeight: 'bold' },
  titulo: { fontSize: 26, fontWeight: 'bold', color: cores.texto },
  subtitulo: { color: cores.cinza },
  formulario: {
    gap: 12,
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dfe6e9',
    backgroundColor: cores.branco,
  },
  esqueci: {
    alignSelf: 'flex-end',
    color: cores.primaria,
  },
  botao: {
    height: 50,
    borderRadius: 10,
    backgroundColor: cores.primaria,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoTexto: { color: cores.branco, fontWeight: 'bold', fontSize: 16 },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  link: { color: cores.primaria, fontWeight: 'bold' },
});