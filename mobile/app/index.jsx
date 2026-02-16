import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/indexStyles';

export default function Index() {
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password Link */}
      <Text style={styles.forgotPassword}>
        Forgot Username or Password?
      </Text>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Sign Up Link */}
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>

    </View>
  );
}