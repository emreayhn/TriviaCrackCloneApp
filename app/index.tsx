import { Text, View, TextInput, StyleSheet, TouchableOpacity, } from 'react-native';
import { Link } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

import React, { useState, useEffect } from 'react';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import axios from 'axios';

const BASE_URL = "https://opentdb.com/api.php?amount=10";
const CATEGORY_URL = "https://opentdb.com/api_category.php";
const QUESTİON_URL = "https://opentdb.com/api_count_global.php"


export default function Index() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [question, setQuestion] = useState("");
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [selectedType, setSelectedType] = useState([]);
  const [name, setName] = useState("")



  const type = ["", "boolean", "multiple"];


  const fetchCategories = async () => {
    try {
      const response = await axios.get(CATEGORY_URL);
      setCategories(response.data.trivia_categories);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(QUESTİON_URL);
      setQuestion(response.data.trivia_question);
      console.log(response.data);

    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {

    fetchCategories();

  }, []);


  useEffect(() => {

    fetchQuestion();
  }, []);

  const navigation = useNavigation();

  const handlePress = async () => {
    const url = `https://opentdb.com/api.php?amount=${selectedNumber}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=${selectedType}`;
    console.log("emrebabag")
    console.log(url)
    try {
      const response = await axios.get(url);
      //navigation.navigate('About', { questions: response.data });
      console.log(response.data.results);
      
    } catch (error) {
      console.error(error);
    }
  };
  return (// #2D7C86  #FBC02D  #BF360C
    <View style={styles.container}>

      <View style={styles.boxName}>
        <TextInput style={styles.textInput} placeholder='Adınızı Giriniz ' placeholderTextColor="white" 
        value={name}
        onChangeText={setName} >
        </TextInput>
      </View>
      <View style={styles.boxContainer}>
        <View style={styles.boxZorlukContainer} >

          <TouchableOpacity
            style={[styles.boxZorluk, selectedDifficulty === 'easy' ? { backgroundColor: '#B3E0E5' } : { backgroundColor: '#2D7C86' }]}
            onPress={() => setSelectedDifficulty('easy')}
          >
            <Text style={styles.text}>Kolay</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.boxZorluk, selectedDifficulty === 'medium' ? { backgroundColor: '#D2B979' } : { backgroundColor: '#FBC02D' }]}
            onPress={() => setSelectedDifficulty("medium")}
          >
            <Text style={styles.text}>Orta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.boxZorluk, selectedDifficulty === 'hard' ? { backgroundColor: '#D28E79' } : { backgroundColor: '#BF360C' }]}
            onPress={() => setSelectedDifficulty('hard')}
          >
            <Text style={styles.text}>Zor</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxSelectContainer}>
          <Picker
            selectedValue={selectedCategory}
            style={styles.select}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            <Picker.Item label="Kategori " value="" />
            {categories.map(category => (
              <Picker.Item key={category.id} label={category.name} value={category.id} />

            ))}

          </Picker>


          <Picker
            selectedValue={selectedNumber}
            style={styles.select}
            onValueChange={(itemValue) => setSelectedNumber(itemValue)}
          >

            {[...Array(50)].map((_, index) => (
              <Picker.Item key={index + 1} label={(index + 1).toString()} value={index + 1} />
            ))}
          </Picker>


          <Picker
        selectedValue={selectedType}
        style={styles.select}
        onValueChange={(itemValue) => setSelectedType(itemValue)}
      >
        <Picker.Item label="Tip" value="" />
        {type.map((type, index) => (
          <Picker.Item key={index} label={type} value={type} />
        ))}
      </Picker>
          
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress} >

        <Link href="/about" style={styles.text} >
          Başla
        </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7CCC8'
  },
  boxName: {

    // backgroundColor:'yellow',
    alignItems: 'center',
    height: 75,
    // marginTop:'7%',
    paddingTop: '2%',


  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Roboto, sans-serif'
  },
  button: {
    width: '15%',
    height: '10%',
    fontSize: 20,
    //textDecorationLine:'line-through',
    color: 'white',
    backgroundColor: '#969696',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '42.5%',
    // marginVertical:'10%',
    borderRadius: 15,
    fontWeight: 'bold',

  },
  textInput: {
    color: 'white',
    backgroundColor: '#969696',
    borderRadius: 20,
    justifyContent: 'center',
    textAlign: 'center',
    height: 50,
    borderColor: '#B2B2B2',
    fontWeight: 'bold'

  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    //backgroundColor:'pink',
    //paddingHorizontal: 20,
    height: '50%',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    alignItems: 'center',
    marginVertical: '5%'

  },
  boxZorlukContainer: {
    // backgroundColor:'white',
    width: '10%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',


  },
  boxZorluk: {
    width: '90%',
    height: '30%',
    // backgroundColor:'#607D8B',
    borderRadius: 15,
    margin: '5%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  boxSelectContainer: {
    width: '50%',
    height: '20%',
    flexDirection: 'row',
    // backgroundColor:'pink',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingTop:'10%'
    // width:'80%'
  },
  select: {
    width: '30%',
    height: '70%',
    color: 'white',
    backgroundColor: '#BF6240',
    borderRadius: 10,
    fontWeight: 'bold',
    padding: '1%'
  }

});
