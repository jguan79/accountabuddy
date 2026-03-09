import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/signupStyles';
import { useRouter } from 'expo-router';

export default function Signup() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      <View style={styles.titleSection}>
        {/* Logo */}
        <View style={styles.logo}>
          <Text style={styles.logoText}>Logo</Text>
        </View>

        {/* Welcome Text and App Name*/}
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.appName}>Accountabuddy</Text>
      </View>

      <View style={styles.inputSection}>
        {/* Sign Up Title */}
        <Text style={styles.title}>Sign Up</Text>

        {/* First Name Input */}
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
        />

        {/* Last Name Input */}
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
        />

        {/* Username Input */}
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
        />

        {/* Password Input */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
        />

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <Text style={styles.signinText}>Already have an account? 
          <Text style={styles.signinText} onPress={() => router.push('/')}> Sign in</Text>
        </Text>
      </View>
    </View>
  );
}