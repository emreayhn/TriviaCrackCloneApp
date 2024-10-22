import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { IoMdSquare } from "react-icons/io";
import { PiTriangleFill } from "react-icons/pi";
import { GiPlainCircle } from "react-icons/gi";
import { TbPentagonFilled } from "react-icons/tb";
import { TfiCup } from "react-icons/tfi";


import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

export default function TfScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <View style={styles.menu}>
          <Text style={styles.textNumber}>1</Text>
          <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam deserunt pariatur odio dolores doloribus cum ipsum nobis et explicabo, quae soluta possimus tempore cumque iste dignissimos doloremque laborum! Repudiandae, omnis.</Text>
          <TouchableOpacity style={{ width: '10%', height: '100%', paddingTop: '7%' }}>
            <GiPlainCircle style={{width:'100%', height:'60%'}}/>
          </TouchableOpacity>
        </View>
      </View>



      <View style={styles.multipleContainerTrueFalse}>
       
        <TouchableOpacity style={[styles.chooseTrueFalse, { backgroundColor: '#2D8630' }]}>
          <TiTick style={styles.squareTrue} />
          <Text style={styles.textQuestion}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, nam.</Text>

        </TouchableOpacity>

        <TouchableOpacity style={[styles.chooseTrueFalse, { backgroundColor: '#D32F2F' }]}>
          <ImCross style={styles.squareFalse} />
          <Text style={styles.textQuestion}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, nam.</Text>

        </TouchableOpacity>
     
        
      </View>
      


    </View>
  );
}
// 
const styles = StyleSheet.create({
    multipleContainerTrueFalse: {
        width: '100%',
        height: '44%',
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
        alignItems:'center',
        flexDirection:'row',
    
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
      textQuestion:{
        fontFamily:'alice',
        fontSize:15,
            marginLeft:'0.75%',

      },
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
    borderRadius:10,
   
  },
  textNumber: {
    //   fontWeight:'bold',
    fontSize: 40,
  },
  questionContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    paddingVertical:'2%'

  },
  box: {
    width: '100%',
    height: '50%',
    backgroundColor: 'black',
    justifyContent: 'space-around'
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