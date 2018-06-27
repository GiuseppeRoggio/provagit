import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { Constants } from 'expo';
import * as firebase from 'firebase';
import { List, ListItem } from 'react-native-elements';


 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD70mlNgRWDFVbf9U3VOl7FKn_j4hAZLGE",
    authDomain: "fir-example-3bf05.firebaseapp.com",
    databaseURL: "https://fir-example-3bf05.firebaseio.com",
    projectId: "fir-example-3bf05",
    storageBucket: "fir-example-3bf05.appspot.com",
    messagingSenderId: "675911080595"
  };
  
  !firebase.apps.length ? firebase.initializeApp(config) : null;


export default class App extends Component {
  state = {
    list : []
  }
  
  componentDidMount() {
    console.log("didmount");
   const students =  firebase.database().ref("students");
   students.on("value" , snap => {
     console.log("snap" , snap);
   
     var elenco = [];
     
     snap.forEach(child =>{
       elenco.push({
         name: child.val().nome,
         surname: child.val().cognome,
         matricola : child.val().matricola,
         avatar: child.val().avatar
       });
       
     });
     
     console.log("array:" , elenco);
     this.setState({list : elenco});
   });
  }
  
  render() {
    return (
      <View style = {styles.container}>
        {
          this.state.list.map(currEl => {
            return(
            <View style = {styles.row}> 
             <Image style = {{width: 50 , height: 50}} source = {{uri : currEl.avatar}} />
              <View style = {{marginLeft : 5}}>
              <Text>Nome : {currEl.name}</Text>
               <Text>Cognome : {currEl.surname}</Text>
                <Text>Matricola : {currEl.matricola}</Text>
              </View>
               
            </View>
            );
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    justifyContent: "center",
    alignItems: "flex-start",
    margin:10 
  },
  row : {
    flexDirection: "row",
    flex:1,
    justifyContent:"flex-start",
    alignItems: "flex-start",
    height: 60
  }
  
});
