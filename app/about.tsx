import { Text, View, StyleSheet, ScrollView, Pressable, Alert, TouchableOpacity, Modal } from 'react-native';
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
  const [isAnswered, setIsAnswered] = useState(false);

  

  const [seconds, setSeconds] = useState(30);
  const [timerId, setTimerId] = useState(null);  
  
  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds(geriSayım => geriSayım - 1); 
      }, 1000);
      setTimerId(timer)
      return () => clearInterval(timer); 
    }
  }, [seconds]);

  const stopTimer = () => {
    clearInterval(timerId); 
  };

  const [finishedTime, setFinishedTime] = useState(false);

  useEffect(() => {
    if (seconds === 0){
      setFinishedTime(true)
    }
  },)

 
 

  const handleReset = () => {
   
  };

  useEffect(() => {
    if (data.length > 0) {
      const allOptions = [
        currentQuestion.correct_answer,
        ...currentQuestion.incorrect_answers,
      ];
      setOptions(shuffleArray(allOptions)); 
    }
    setIsAnswered(false); 
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
   
   const [showAnswer, setShowAnnwer] = useState("")
   const [controlAnswer, setControlAnswer] = useState("")
  
  const handleAnswerPress = (selectedAnswer: any) => {
    if (isAnswered === true) return; 
    
    const currentQuestion = data[currentIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      setCorrectCount(score + 1);
    } else {
      setWrongCount(wrongCount + 1);
    }
    setIsAnswered(true); 
    setShowAnnwer(data[currentIndex].correct_answer)
    setControlAnswer(selectedAnswer)
    stopTimer()
  };


  const handleNextButton = (selectedAnswer:any) => {
    if (currentIndex < data.length - 1) {
      // Sondan önceki sorularda sadece bir sonraki soruya geç
      setCount(count + 1);
      setCurrentIndex(currentIndex + 1);
    } else {
      // Son soruya cevap verildiğinde butonu göster
      setShowFinishButton(true);
      Alert.alert("Test Tamamlandı", "Testi bitirmek için butona basın.");
    }
    setSeconds(30); 
    setShowAnnwer("")
    
  }
  

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
    setSeconds(-1); 
    
  };
  


let count_quiz = localStorage.getItem("selectedNumber");
  
  return (


    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={finishedTime}
        onRequestClose={() => setFinishedTime(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Süreniz Doldu. Lütfen sıradaki soruya geçiniz Doğru Cevap:{(data[currentIndex].correct_answer)} </Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setFinishedTime(false); 
                handleNextButton();    
              }}
            >
              <Text style={styles.finishButtonText}>Tamam</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.questionContainer}>
        <View style={styles.menu}>
          <Text style={styles.textNumber}>{count}</Text>

          <Text >
            {data[currentIndex].question}
          </Text>

          <Pressable style={{ width: '10%', height: '100%', paddingTop: '7%' }} >
            <View style={{ width: '75%', height: '60%', backgroundColor:'white', borderRadius:200, 
              justifyContent:'center', alignItems:'center'
            }} > 
              <Text >{seconds}</Text>
            </View>
            
          </Pressable>
        </View>
      </View>

      {data[currentIndex].type === 'multiple' ? (<>
        <View style={styles.multipleContainer}>
          <TouchableOpacity
            style={[styles.choose, { backgroundColor: '#D32F2F' }]}
            onPress={() => handleAnswerPress(options[0])}
            disabled={isAnswered}
          >
            <IoMdSquare style={styles.square} />
            <Text>{options[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choose, { backgroundColor: '#FFC107' }]}
            onPress={() => handleAnswerPress(options[1])}
            disabled={isAnswered}
          >
            <PiTriangleFill style={styles.square} />
            <Text>{options[1]}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.multipleContainer}>
          <TouchableOpacity
            style={[styles.choose, { backgroundColor: '#009688' }]}
            onPress={() => handleAnswerPress(options[2])}
            disabled={isAnswered}
          >
            <GiPlainCircle style={styles.square} />
            <Text>{options[2]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choose, { backgroundColor: '#2D8630' }]}
            onPress={() => handleAnswerPress(options[3])}
            disabled={isAnswered}
          >
            <TbPentagonFilled style={styles.square} />
            <Text>{options[3]}</Text>
          </TouchableOpacity>
        </View>

      </>) : (<>

        <View style={styles.multipleContainerTrueFalse}>

          <TouchableOpacity onPress={() => handleAnswerPress(options[0])}
          disabled={isAnswered}
          style={[styles.chooseTrueFalse, { backgroundColor: '#2D8630' }]}>
            <TiTick style={styles.squareTrue} />
            <Text style={styles.textQuestion}
              >{options[0]}</Text>

          </TouchableOpacity>

          <TouchableOpacity  onPress={() => handleAnswerPress(options[1])} 
          disabled={isAnswered}
          style={[styles.chooseTrueFalse, { backgroundColor: '#D32F2F' }]}>
            <ImCross style={styles.squareFalse} />
            <Text style={styles.textQuestion}
            >{options[1]}</Text>

          </TouchableOpacity>


        </View>
      </>)}
      {showFinishButton ? (
  <Pressable style={styles.finishButton} onPress={handleBoth}>
    <Link href="/scoreBoard" style={styles.finishButtonText}>
      Testi Bitir
    </Link>
  </Pressable>
) : (
  <View style={styles.buttonContainer}>
    <View style={styles.nexthButton}>
      <Text>
      Doğru Sayınız:{score}  Yanlış Sayınız:{wrongCount}
      </Text>
  </View>
  <View style={styles.nexthButton}>
  <Text
  style={{
    color: controlAnswer === data[currentIndex].correct_answer ? 'green' : 'red',
    fontWeight: 'bold',
  }}
>
  {showAnswer}
</Text>

  </View>
  <Pressable style={styles.nexthButton} onPress={handleNextButton}>
    <Text style={styles.finishButtonText}> Sıradaki Soru   </Text>
  </Pressable>
  </View>
)}

    </View>

  );
}

// 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
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
    paddingRight: '2%',
   
  },
  buttonContainer: {
      width:'100%',
      height:'100%',
     // backgroundColor:'yellow',
      flexDirection:'row',
      justifyContent:'space-between',
      paddingHorizontal:'5%'
  },
  nexthButton:{
    height: '9%',
    width: '20%',
    backgroundColor: 'gray',
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center'
  },
  nexthButtonText: {

  },
  textQuestion: {
    fontFamily: 'alice',
    fontSize: 15,
    marginLeft: '0.75%',
  },
  finishButton: {
    height: '9%',
    width: '10%',
    marginLeft: '45%',
    backgroundColor: 'gray',
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
    paddingHorizontal: '1%',
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
    alignItems: 'center',
    
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '50%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#2D7C86',
    padding: 10,
    borderRadius: 10,
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

