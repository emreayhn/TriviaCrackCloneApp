import { Text, View, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,Alert } from 'react-native';
import { IoMdSquare } from "react-icons/io";
import { PiTriangleFill } from "react-icons/pi";
import { GiPlainCircle } from "react-icons/gi";
import { TbPentagonFilled } from "react-icons/tb";
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';


const shuffleArray = (array:any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function AboutScreen() {
 
  const [count , setCount] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);

   const handlePressNumber =() => {
     setCount(count + 1)
  }
  const deneme = localStorage.getItem("response");
  const data = deneme ? JSON.parse(deneme) : [];
  const currentQuestion = data[currentIndex];
  const [correctAnswers, setCorrectAnswers] = useState([]); 
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [correctCount, setCorrectCount] = useState(0); 
  const [wrongCount, setWrongCount] = useState(0); 

  useEffect(() => {
    // Geçerli sorunun cevaplarını karıştır
    const currentQuestion = data[currentIndex];
    const allOptions = [
      currentQuestion.correct_answer,
      ...currentQuestion.incorrect_answers
    ];
    setOptions(shuffleArray(allOptions)); // Cevapları karıştır ve duruma ayarla
  }, [currentIndex]);
 /*
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }

  }, []);

*/
  if (data.length === 0) {
    return <p>Veriler mevcut değil.</p>;
  }

  const handleAnswerPress = (selectedAnswer:any) => {
    const currentQuestion = data[currentIndex];
  
    // Doğru cevabı kontrol et
    if (selectedAnswer === currentQuestion.correct_answer) {
      setCorrectCount(correctCount + 1); // Doğru cevap sayısını artır
    } else {
      setWrongCount(wrongCount + 1); // Yanlış cevap sayısını artır
    }
  
    // Diğer işlemler
    setCount(count + 1); // Sayacı artır
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1); // Sonraki soruya geç
    } else {
      Alert.alert("Test Tamamlandı", "Testi bitirmek için butona basın.", [
        { text: "Tamam" }
      ]);
    }
  };
  
  
  const handleFinishTest = () => {
    localStorage.setItem("correctCount", correctCount.toString());
    localStorage.setItem("wrongCount", wrongCount.toString());
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
        <TouchableOpacity
          style={[styles.choose, { backgroundColor: '#D32F2F' }]}
          onPress={handleAnswerPress} // Doğru veya yanlış cevap
        >
          <IoMdSquare style={styles.square} />
          <Text>{options[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.choose, { backgroundColor: '#FFC107' }]}
          onPress={handleAnswerPress} // Doğru veya yanlış cevap
        >
          <PiTriangleFill style={styles.square} />
          <Text>{options[1]}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.multipleContainer}>
        <TouchableOpacity
          style={[styles.choose, { backgroundColor: '#009688' }]}
          onPress={handleAnswerPress} // Doğru veya yanlış cevap
        >
          <GiPlainCircle style={styles.square} />
          <Text>{options[2]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.choose, { backgroundColor: '#2D8630' }]}
          onPress={handleAnswerPress} // Doğru veya yanlış cevap
        >
          <TbPentagonFilled style={styles.square} />
          <Text>{options[3]}</Text>
        </TouchableOpacity>
      </View>
      {currentIndex === data.length - 1 && (
        <TouchableOpacity style={styles.finishButton} onPress={handleFinishTest}>
          <Link href={"/scoreBoard"} style={styles.finishButtonText}>Testi Bitir</Link>
         
        </TouchableOpacity>
      )}
    </View>
  
  );
}

// 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
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
  finishButton: {
    height:'10%',
    width:'10%',
    marginLeft:'45%',
    backgroundColor: '#2196F3',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent:'center'
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
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
    height: '20%',
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