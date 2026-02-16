import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcf1de',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#81C784',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
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
    backgroundColor: '#9bd49d',
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
    borderColor: '#81C784',
    backgroundColor: 'white',
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 14,
  },
  button: {
    backgroundColor: '#66BB6A',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 100,
    fontWeight: 'bold'
  },
  divider: {
  height: 1,
  backgroundColor: '#81C784',
  marginTop: 20,
  marginBottom: 20,
  width: '100%',
  },
  signupContainer: {
    alignItems: 'center',
  },
  signupText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
});