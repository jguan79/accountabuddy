import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8EBD4',
    padding: 30,
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#94C88A',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    marginTop: 50,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#94C88A',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#94C88A',
    backgroundColor: '#D8EBD4',
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 14,
  },
  loginButton: {
    borderColor: '#94C88A',
    backgroundColor: '#D8EBD4',
    borderRadius: 25,
    borderWidth: 3,
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    width: '40%',
  },
  buttonText: {
    fontSize: 18,
  },
  forgotPassword: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 100,
    fontWeight: 'bold',
  },
  divider: {
  height: 1,
  backgroundColor: '#94C88A',
  marginTop: 20,
  marginBottom: 20,
  width: '100%',
  },
  signupText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
});