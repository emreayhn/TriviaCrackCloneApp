import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TfiCup } from "react-icons/tfi";
import { useState ,useEffect } from 'react';



export default function ScoreBoard() {

  const  [correctAnswers , setCorrectAnswers] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState("")
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [name, setName] = useState("")
  
  useEffect(() => {
    const storedCorrectAnswers = localStorage.getItem('correctCount');
    const storedWrongAnswers = localStorage.getItem('wrongCount');
    const storedName = localStorage.getItem('name')
    if (storedCorrectAnswers) {
      setCorrectCount(parseInt(storedCorrectAnswers, 10)); // Sayıya çevir
    }
    if (storedWrongAnswers) {
      setWrongCount(parseInt(storedWrongAnswers, 10)); // Sayıya çevir
    }
    if (storedName) {
      setName(storedName);
    }
  }, []);
  


  return (
    <View style={styles.container}>
      <View style={styles.list}> 
            <Text style={styles.textHeader}>YÜKSEK SKORLAR  </Text>
            <View style={styles.cupContainer}>
                <TfiCup style={styles.cup}/></View>
            
            <View style={styles.menu}>
            <View style={[styles.choose, { backgroundColor: '#EBFF00' }]}>
         <Text> 1.Yarışmacı: {name}  {correctCount} </Text>

        </View>
        </View>
        <View>
            <Text>SKORUNUZ: Doğru Cevap Sayısı: {correctCount} Yanlış Cevap Sayısı: {wrongCount} </Text>
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
    width: '29%',
    height: '20%',
    //  backgroundColor:'yellow',
    borderRadius: 10,
    alignItems:'center',
  flexDirection:'row',
  justifyContent:'space-evenly'

  },
});
  