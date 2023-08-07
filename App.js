import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{flex: 2, width: '100%', border: '1px solid black', justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
        <View style={{...styles.square, backgroundColor: 'red'}}></View>
      </View>
      
      <View style={{width: '100%',flex: 10, backgroundColor: 'blue'}}>
        <Text style={{color: 'white', fontSize: 30, textAlign: 'center'}}>Titre</Text>
      </View>
      <View style={{width: '100%',flex: 1, backgroundColor: 'yellow'}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  square: {
    width: 50,
    height: 50
  }
});