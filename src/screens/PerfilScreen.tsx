import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { cores } from '../styles/theme';
import { RootStackParamList, TabParamList } from '../navigation/types';

type PerfilScreenRouteProp = RouteProp<TabParamList, 'Perfil'>;
type PerfilScreenNavProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  route: PerfilScreenRouteProp;
  navigation: PerfilScreenNavProp;
}

export default function PerfilScreen({ navigation, route }: Props) {
  const nome = route.params?.nome ?? 'Visitante';
  const email = route.params?.email ?? '-';

  function sair() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.email}>{email}</Text>
      <TouchableOpacity style={styles.botao} onPress={sair}>
        <Text style={styles.botaoTexto}>SAIR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  nome: { fontSize: 22, fontWeight: 'bold' },
  email: { color: cores.cinza },
  botao: { marginTop: 24, paddingHorizontal: 40, paddingVertical: 14, borderRadius: 10, backgroundColor: '#d63031' },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});