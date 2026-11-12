import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Início: undefined;
  Busca: undefined;
  Planos: undefined;
  Perfil: { nome?: string; email?: string }; 
};

export type RootStackParamList = {
  Login: undefined;
  Registro: undefined;
  Principal: NavigatorScreenParams<TabParamList>; 
};