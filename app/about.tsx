import { Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}></View>
     
      <View style={styles.multipleContainer}>
        <TouchableOpacity style={styles.choose}></TouchableOpacity>
        <TouchableOpacity style={styles.choose}></TouchableOpacity>
      </View>
      <View style={styles.multipleContainer}>
      <TouchableOpacity style={styles.choose}></TouchableOpacity>
      <TouchableOpacity style={styles.choose}></TouchableOpacity>
        </View>
        
       
    </View>
  );
}
// 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  text: {
    color: '#fff',
  },
  questionContainer: {
    width:'100%',
    height:'50%',
    backgroundColor:'white',
  },
  box:{
    width:'100%',
    height:'50%',
    backgroundColor:'gray',
    justifyContent:'space-around'
  },
  multipleContainer:{ 
    width:'100%',
    height:'22%',
    backgroundColor:'blue',
   flexDirection:'row',
   justifyContent:'space-around',
   alignItems:'center'
  },
  choose:{
    width:'49%',
    height:'62%',
    backgroundColor:'yellow',
    borderRadius:10
  
  }
});

/* <Text style={styles.text}>Home screen</Text>
      <Link href="/about" style={styles.button}>
        Go to About screen
      </Link>
      */