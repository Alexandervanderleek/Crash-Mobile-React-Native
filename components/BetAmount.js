import React from 'react'
import {View,Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


export default class BetAmount extends React.Component {
  
  render() {
    return(
    <View style={{flexDirection: 'row',marginVertical: 8,width: 340, backgroundColor: '#3E3974',marginVertical: 5}}>
        <View style={{width: 90}}>
            <View style={{padding: 4}}>
            <Text style={{color: "#FFFEFE",fontWeight: 'bold'}}>BET</Text>
            <Text style={{color: "#FFFEFE",fontWeight: 'bold'}}>{`${this.props.betAmount}$`}</Text>
            </View>
        </View>
        <View style={{width: 250,flexDirection: "row", justifyContent: 'space-between',padding:4}}>
            <TouchableOpacity onPress={()=>{this.props.halfBet()}} style={{backgroundColor: '#E6BE4B',width: 50, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', color: "#3E3974", fontWeight: 'bold'}}>1/2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.removeBet()}} style={{backgroundColor: '#E6BE4B',width: 50, justifyContent: 'center', alignItems: 'center'}}>
                 <Icon name="remove-outline" size={30} color="#3E3974" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.addBet()}} style={{backgroundColor: '#E6BE4B',width: 50, justifyContent: 'center', alignItems: 'center'}}>
                 <Icon name="add-outline" size={30} color="#3E3974" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.doubleBet()}} style={{backgroundColor: '#E6BE4B',width: 50, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', color: "#3E3974", fontWeight: 'bold'}}>2x</Text>
            </TouchableOpacity>
        </View>
        
        

    </View>
    )
  
  }}
