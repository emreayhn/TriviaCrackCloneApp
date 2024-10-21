import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { IoMdSquare } from "react-icons/io";
import { PiTriangleFill } from "react-icons/pi";
import { GiPlainCircle } from "react-icons/gi";
import { TbPentagonFilled } from "react-icons/tb";

export default function AboutScreen() {
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

      <View style={styles.multipleContainer}>
        <TouchableOpacity style={[styles.choose, { backgroundColor: '#D32F2F' }]}>
          <IoMdSquare style={styles.square} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.choose, { backgroundColor: '#FFC107' }]}>
          <PiTriangleFill style={styles.square} />
        </TouchableOpacity>
      </View>
      <View style={styles.multipleContainer}>
        <TouchableOpacity style={[styles.choose, { backgroundColor: '#009688' }]}>
          <GiPlainCircle style={styles.square} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.choose, { backgroundColor: '#2D8630' }]}>
          <TbPentagonFilled style={styles.square} />
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
    justifyContent: 'center'

  },
  square: {
    width: '10%',
    height: '40%',
    color: 'white',
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