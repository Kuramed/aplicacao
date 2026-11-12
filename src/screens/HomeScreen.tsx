import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { api } from '../services/api';
import { cores } from '../styles/theme';

interface Curso {
  id: number;
  titulo: string;
  descricao: string;
}

export default function HomeScreen() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarCursos() {
      try {
        const response = await api.get('/cursos'); 
        setCursos(response.data);
      } catch (error) {
        console.error('Erro ao buscar cursos', error);
      } finally {
        setLoading(false);
      }
    }
    carregarCursos();
  }, []);

  if (loading) {
    return (
      <View style={styles.centralizado}>
        <ActivityIndicator size="large" color={cores.primaria} />
      </View>
    );
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.tituloSecao}>Cursos Disponíveis</Text>
      
      <FlatList
        data={cursos}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ gap: 16 }}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum curso encontrado.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>{item.titulo}</Text>
            <Text style={styles.cardDescricao}>{item.descricao}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo, padding: 20 },
  centralizado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  tituloSecao: { fontSize: 22, fontWeight: 'bold', color: cores.texto, marginBottom: 16 },
  card: { 
    backgroundColor: cores.branco, 
    padding: 16, 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dfe6e9'
  },
  cardTitulo: { fontSize: 18, fontWeight: 'bold', color: cores.primaria, marginBottom: 4 },
  cardDescricao: { fontSize: 14, color: cores.cinza },
  vazio: { textAlign: 'center', marginTop: 20, color: cores.cinza }
});