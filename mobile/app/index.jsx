import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/indexStyles';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* Logo */}
      <View style={styles.logo}>
        <Text style={styles.logoText}>Logo</Text>
      </View>

      {/* Username Input */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
      />

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
      />

      {/* Save Password Checkbox */}
      <View style={styles.checkboxContainer}>
        <View style={styles.checkbox} />
        <Text style={styles.checkboxText}>Save password</Text>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password Link */}
      <Text style={styles.forgotPassword}>
        Forgot Username or Password?
      </Text>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Sign Up Link */}
      <Text style={styles.signupText}>Don't have an account?
        <Text style={styles.signupText} onPress={() => router.push('/signup')}> Sign up</Text>
      </Text>
    </View>
  );
}