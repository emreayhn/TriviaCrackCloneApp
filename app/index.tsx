import { Text, View, TextInput, StyleSheet, TouchableOpacity, } from 'react-native';
import { Link } from 'expo-router';
import React, { useState } from 'react';
export default function Index() {
  const [isPressed, setIsPressed] = useState(false);
  const handlePressIn = () => {
    setIsPressed(true);
  };
  
  return (
    <View style={styles.container}>
    
       <View style={styles.boxName}>
          <TextInput style={styles.textInput} placeholder='Adınızı Giriniz ' placeholderTextColor="white"  >
          </TextInput>
          </View>
          <View style={styles.boxContainer}>
            <View style={styles.boxZorlukContainer} >
              
            <TouchableOpacity style={[styles.boxZorluk, { backgroundColor: '#2D7C86' }]}>
            <Text style={styles.text}>Kolay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.boxZorluk, { backgroundColor: '#FBC02D' }]}>
            <Text style={styles.text}>Orta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.boxZorluk, { backgroundColor: '#BF360C' }]}>
            <Text style={styles.text}>Zor</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.boxSelectContainer}>
              
            <select style={styles.select}>
        <option value="" disabled>
          Seçiniz
        </option>
        <option value="option1">Seçenek 1</option>
        <option value="option2">Seçenek 2</option>
        <option value="option3">Seçenek 3</option>
      </select>
      <select style={styles.select}>
        <option value="" disabled>
          Seçiniz
        </option>
        <option value="option1">Seçenek 1</option>
        <option value="option2">Seçenek 2</option>
        <option value="option3">Seçenek 3</option>
      </select>
      <select style={styles.select}>
        <option value="" disabled>
          Seçiniz
        </option>
        <option value="option1">Seçenek 1</option>
        <option value="option2">Seçenek 2</option>
        <option value="option3">Seçenek 3</option>
      </select>
      </View>
          </View>
          <TouchableOpacity style={styles.button}>

<Link href="/about" style={styles.text}>
        Başla
      </Link>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#D7CCC8'
  },
  boxName:{
   
   // backgroundColor:'yellow',
    alignItems:'center',
    height:75,
  // marginTop:'7%',
   paddingTop:'2%',
   

  },
  text: {
    color: 'white',
    fontWeight:'bold',
    fontFamily:'Roboto, sans-serif'
  },
  button: {
    width:'15%',
    height:'10%',
    fontSize: 20,
    //textDecorationLine:'line-through',
    color: 'white',
    backgroundColor:'#969696',
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:'42.5%',
  // marginVertical:'10%',
   borderRadius:15,
   fontWeight:'bold',
  
  },
  textInput:{
    color:'white',
    backgroundColor:'#969696',
    borderRadius:20,
    justifyContent:'center',
    textAlign:'center',
    height:50,
    borderColor:'#B2B2B2',
    fontWeight: 'bold'
    
  },
  boxContainer: {
    flexDirection: 'row',
   justifyContent:'space-evenly',
    //backgroundColor:'pink',
    //paddingHorizontal: 20,
    height:'50%',
    paddingHorizontal:'5%',
    paddingVertical:'2%',
    alignItems:'center',
    marginVertical:'5%'
    
  },
  boxZorlukContainer: {
     // backgroundColor:'white',
      width:'10%',
      height:'80%',
      justifyContent:'center',
      alignItems:'center',
      
   
  },
  boxZorluk:{
    width:'90%',
    height:'30%',
   // backgroundColor:'#607D8B',
    borderRadius:15,
    margin:'5%',
    justifyContent:'center',
    alignItems:'center',
   
  },
  boxSelectContainer: {
    width:'50%',
    height:'20%',
    flexDirection:'row',
   // backgroundColor:'pink',
    justifyContent: 'space-between',
    alignItems:'center',
   // paddingTop:'10%'
   // width:'80%'
  },
  select: {
    width:'30%',
    height:'70%',
    color:'white',
    backgroundColor:'#BF6240',
    borderRadius:10,
    fontWeight:'bold',
    padding:'1%'
  }
  
});
