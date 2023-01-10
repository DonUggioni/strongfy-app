import React from 'react';
import AuthContent from '../../components/AuthContent';

function LoginScreen({ onPress }) {
  return <AuthContent onPress={onPress} isLogin={true} />;
}

export default LoginScreen;
