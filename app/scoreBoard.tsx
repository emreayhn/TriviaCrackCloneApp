import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TfiCup } from "react-icons/tfi";
import { useState ,useEffect } from 'react';
import axios from "axios";

interface User {
  id: number;
  name: string;
  score: number;
  event_datetime: number;
  count_quiz: number;
  
}


export default function ScoreBoard() {

  const  [correctAnswers , setCorrectAnswers] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState("")
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [name, setName] = useState("")

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

   
  
  
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/scoreboard/");
        setUsers(response.data); 
      } catch (err) {
        setError("Error fetching users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  


  return (
    <View style={styles.container}>
      <View style={styles.list}> 
            <Text style={styles.textHeader}>YÜKSEK SKORLAR  </Text>
            <View style={styles.cupContainer}>
                <TfiCup style={styles.cup}/></View>
            
            <View style={styles.menu}>
            {users.slice(0, 5).map((user) => 
            <View key={user.id}  style={[styles.choose, { backgroundColor: '#EBFF00' }]}>
         <Text>{user.name}      {user.score}/{user.count_quiz}      {user.event_datetime}</Text>

        </View> 
        )}
        <Text style={styles.scoreText}>SKORUNUZ: Doğru Cevap Sayısı: {correctCount} Yanlış Cevap Sayısı: {wrongCount} </Text>
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
  marginBottom:'0.5%',
  justifyContent:'space-around'
  

  },
  scoreText:{
    fontWeight:'bold',
    fontSize:20
  }
});
  


 /*
        <View style={styles.scoreContainer}>
            <Text>SKORUNUZ: Doğru Cevap Sayısı: {correctCount} Yanlış Cevap Sayısı: {wrongCount} </Text>
        </View>
        */