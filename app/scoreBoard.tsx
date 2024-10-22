import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TfiCup } from "react-icons/tfi";



export default function ScoreBoard() {

  return (
    <View style={styles.container}>
      <View style={styles.list}> 
            <Text style={styles.textHeader}>YÜKSEK SKORLAR</Text>
            <View style={styles.cupContainer}>
                <TfiCup style={styles.cup}/></View>
            
            <View style={styles.menu}>
            <TouchableOpacity style={[styles.choose, { backgroundColor: '#EBFF00' }]}>
         <Text>1</Text>

        </TouchableOpacity>
        </View>
        <View>
            <Text>SKORUNUZ: </Text>
        </View>
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
  textHeader:{
fontSize:25,
fontWeight:'bold',
color:'#AED581'
  },

  list:{
    width:'100%',
    height:'50%',
    paddingTop:'5%',
    alignItems:'center',
    
  },
  cupContainer:{
    width: '100%',
    height: '20%',
    marginTop:'2%'

  },
  cup:{
    width: '100%',
    height: '150%',
    color: 'white',
    fontWeight: 'bold'
  },
  menu:{
    width:'100%',
    height:'100%',
  alignItems:'center',
  marginTop:'2%'
  },
  choose: {
    width: '39%',
    height: '20%',
    //  backgroundColor:'yellow',
    borderRadius: 10,
    alignItems:'center',
  flexDirection:'row'

  },
});
  