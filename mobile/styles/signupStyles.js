import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8EBD4',
    justifyContent: 'center',
  },
  titleSection: {
    backgroundColor: '#E7F0F1',
    paddingTop: 50,
    paddingBottom: 50,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#94C88A',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  logoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 5,
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#94C88A',
    marginBottom: 15,
  },
  inputSection: {
    flex: 1,
    backgroundColor: '#D8EBD4',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    marginTop: 12,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#94C88A',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
  },
  nextButton: {
    borderColor: '#94C88A',
    backgroundColor: '#D8EBD4',
    borderRadius: 25,
    borderWidth: 3,
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 14,
    width: '40%',
  },
  buttonText: {
    fontSize: 18,
  },
  signinText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
});