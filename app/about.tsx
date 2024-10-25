import { Text, View, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { IoMdSquare } from "react-icons/io";
import { PiTriangleFill } from "react-icons/pi";
import { GiPlainCircle } from "react-icons/gi";
import { TbPentagonFilled } from "react-icons/tb";
import React, { useEffect, useState } from 'react';

export default function AboutScreen() {
  const [name, setName] = useState('');
  const [count , setCount] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);


   const handlePressNumber =() => {
     setCount(count + 1)
  }


  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }

  }, []);

  const deneme = localStorage.getItem("response");
  const data = deneme ? JSON.parse(deneme) : [];
  if (data.length === 0) {
    return <p>Veriler mevcut değil.</p>;
  }

  const handleAnswerPress = (isCorrect?:any) => {
    setCount(count + 1); // Sayacı artır
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1); // Sonraki soruya geç
    } else {
      // Tüm sorular bitince yapılacak işlemler
      console.log("Tüm sorular bitti.");
    }
  };

  return (
    
   
    <View  style={styles.container}>
      <View style={styles.questionContainer}>
        <View style={styles.menu}>
          <Text style={styles.textNumber}>{count}</Text>

            <Text >
            {data[currentIndex].question}
            </Text>

          <TouchableOpacity style={{ width: '10%', height: '100%', paddingTop: '7%' }}>
            <GiPlainCircle style={{ width: '100%', height: '60%', }} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.multipleContainer}>
        <TouchableOpacity style={[styles.choose, { backgroundColor: '#D32F2F' }]} onPress={() => handleAnswerPress(true)}>
          <IoMdSquare style={styles.square} />
          <Text >
          {data[currentIndex].correct_answer}
            </Text>
        
        </TouchableOpacity>
        <TouchableOpacity style={[styles.choose, { backgroundColor: '#FFC107' }]}   onPress={() => handleAnswerPress(false)}>
          <PiTriangleFill style={styles.square} />
          
            <Text >
            {data[currentIndex].incorrect_answers[0]}
            </Text>
         
        </TouchableOpacity>
      </View>
      <View style={styles.multipleContainer}>
        <TouchableOpacity style={[styles.choose, { backgroundColor: '#009688' }]} onPress={() => handleAnswerPress(false)}>
          <GiPlainCircle style={styles.square} />
       
            <Text >
            {data[currentIndex].incorrect_answers[1]}
            </Text>
         
        </TouchableOpacity>
        <TouchableOpacity style={[styles.choose, { backgroundColor: '#2D8630' }]} onPress={() => handleAnswerPress(false)}>
          <TbPentagonFilled style={styles.square} />
         
            <Text>
            {data[currentIndex].incorrect_answers[2]}
            </Text>
         
        </TouchableOpacity>
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
  menu: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingRight:'2%'

  },
  textQuestion: {
    fontFamily: 'alice',
    fontSize: 15,
    marginLeft: '0.75%',
  },

  textNumber: {
    //   fontWeight:'bold',
    fontSize: 40,
    marginLeft:'2%'
  },
  questionContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    paddingVertical: '2%'

  },
  box: {
    width: '100%',
    height: '50%',
    backgroundColor: 'black',
    justifyContent: 'space-around'
  },
  multipleContainer: {
    width: '100%',
    height: '22%',
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  choose: {
    width: '49%',
    height: '62%',
    //  backgroundColor:'yellow',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',



  },
  square: {
    width: '10%',
    height: '40%',
    color: '#D9D9D9',
    fontWeight: 'bold'

  },
  sayac: {
    width: '10%',
    height: '40%',
    color: 'black',
    fontWeight: 'bold'
  },
});

/* <Text style={styles.text}>Home screen</Text>
      <Link href="/about" style={styles.button}>
        Go to About screen
      </Link>
      */

      /*  {data.map((correct, index) => (
            <Text key={index}>
              {correct.correct_answer}
            </Text>
          ))}
            */