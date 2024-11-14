import { Text, View, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { IoMdSquare } from "react-icons/io";
import { PiTriangleFill } from "react-icons/pi";
import { GiPlainCircle } from "react-icons/gi";
import { TbPentagonFilled } from "react-icons/tb";
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import axios from "axios";

const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function AboutScreen() {

  const [count, setCount] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [tfOptions, setTfOptions] = useState([]);
  const [score, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const deneme = localStorage.getItem("response");
  const data = deneme ? JSON.parse(deneme) : [];
  const currentQuestion = data[currentIndex];

  const [name, setName] = useState("")
  const [message, setMessage] = useState<string>("");
  const [showFinishButton, setShowFinishButton] = useState(false);

  useEffect(() => {
    // Geçerli sorunun cevaplarını karıştır
    const currentQuestion = data[currentIndex];
    const allOptions = [
      currentQuestion.correct_answer,
      ...currentQuestion.incorrect_answers
    ];
    setOptions(shuffleArray(allOptions)); // Cevapları karıştır ve duruma ayarla
  }, [currentIndex]);

  

  
  
   useEffect(() => {
     const storedName = localStorage.getItem('name');
     if (storedName) {
       setName(storedName);
     }
 
   }, []);
 
 
  if (data.length === 0) {
    return <p>Veriler mevcut değil.</p>;
  }

  
  const handleAnswerPress = (selectedAnswer:any) => {
    const currentQuestion = data[currentIndex];

    if (selectedAnswer === currentQuestion.correct_answer) {
      setCorrectCount(score + 1);
    } else {
      setWrongCount(wrongCount + 1);
    }

    if (currentIndex < data.length - 1) {
      // Sondan önceki sorularda sadece bir sonraki soruya geç
      setCount(count + 1);
      setCurrentIndex(currentIndex + 1);
    } else {
      // Son soruya cevap verildiğinde butonu göster
      setShowFinishButton(true);
      Alert.alert("Test Tamamlandı", "Testi bitirmek için butona basın.");
    }
  };

  

  const event_datetime = new Date();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { name, score, count_quiz, event_datetime };
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/", userData);
      setMessage("User added successfully");
    } catch (error) {
      setMessage("Error adding user");
      console.error(error);
    }
  };


  const handleFinishTest = () => {
    localStorage.setItem("correctCount", score.toString());
    localStorage.setItem("wrongCount", wrongCount.toString());
   
  };

  const handleBoth = (e: React.FormEvent) => {
    handleFinishTest();
    handleSubmit(e); 
  };
  


let count_quiz = localStorage.getItem("selectedNumber");



  
  return (


    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <View style={styles.menu}>
          <Text style={styles.textNumber}>{count}</Text>

          <Text >
            {data[currentIndex].question}
          </Text>

          <Pressable style={{ width: '10%', height: '100%', paddingTop: '7%' }}>
            <GiPlainCircle style={{ width: '100%', height: '60%', }} />
          </Pressable>
        </View>
      </View>

      {data[currentIndex].type === 'multiple' ? (<>
        <View style={styles.multipleContainer}>
          <Pressable
            style={[styles.choose, { backgroundColor: '#D32F2F' }]}
            onPress={() => handleAnswerPress(options[0])}
          >
            <IoMdSquare style={styles.square} />
            <Text>{options[0]}</Text>
          </Pressable>
          <Pressable
            style={[styles.choose, { backgroundColor: '#FFC107' }]}
            onPress={() => handleAnswerPress(options[1])}
          >
            <PiTriangleFill style={styles.square} />
            <Text>{options[1]}</Text>
          </Pressable>
        </View>
        <View style={styles.multipleContainer}>
          <Pressable
            style={[styles.choose, { backgroundColor: '#009688' }]}
            onPress={() => handleAnswerPress(options[2])}
          >
            <GiPlainCircle style={styles.square} />
            <Text>{options[2]}</Text>
          </Pressable>
          <Pressable
            style={[styles.choose, { backgroundColor: '#2D8630' }]}
            onPress={() => handleAnswerPress(options[3])}
          >
            <TbPentagonFilled style={styles.square} />
            <Text>{options[3]}</Text>
          </Pressable>
        </View>

      </>) : (<>

        <View style={styles.multipleContainerTrueFalse}>

          <Pressable onPress={() => handleAnswerPress(options[0])}
          style={[styles.chooseTrueFalse, { backgroundColor: '#2D8630' }]}>
            <TiTick style={styles.squareTrue} />
            <Text style={styles.textQuestion}
              >{options[0]}</Text>

          </Pressable>

          <Pressable  onPress={() => handleAnswerPress(options[1])} 
          style={[styles.chooseTrueFalse, { backgroundColor: '#D32F2F' }]}>
            <ImCross style={styles.squareFalse} />
            <Text style={styles.textQuestion}
            >{options[1]}</Text>

          </Pressable>


        </View>
      </>)}
      {showFinishButton && (
        <Pressable style={styles.finishButton}>
          <Link href={"/scoreBoard"} style={styles.finishButtonText}>Testi Bitir</Link>
        </Pressable>
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
    paddingRight: '2%'

  },
  textQuestion: {
    fontFamily: 'alice',
    fontSize: 15,
    marginLeft: '0.75%',
  },
  finishButton: {
    height: '10%',
    width: '10%',
    marginLeft: '45%',
    backgroundColor: '#2196F3',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },

  textNumber: {
    //   fontWeight:'bold',
    fontSize: 40,
    marginLeft: '2%'
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
  multipleContainerTrueFalse: {
    width: '100%',
    height: '40%',
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  chooseTrueFalse: {
    width: '49%',
    height: '31%',
    //  backgroundColor:'yellow',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',

  },
  squareTrue: {
    width: '10%',
    height: '50%',
    color: 'white',
    fontWeight: 'bold'
  },
  squareFalse: {
    width: '10%',
    height: '25%',
    color: 'white',
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

