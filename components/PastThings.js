import React from 'react'
import {View,Text} from 'react-native'

export default class PastThings extends React.Component {
  
  render() {
    return(
    <View style={{flexDirection: 'row', backgroundColor: '#1A1B20',padding: 8,marginBottom:10,justifyContent: 'space-around',width:340}}>
    {this.props.pastValues.length>0 &&(
      <>
      <Text style={[this.props.pastValues[0]?.toFixed(2)<2?{color:"#F44336"}:{color:"#5AA457"},{fontWeight: 'bold'}]}>{this.props.pastValues[0]?.toFixed(2)}</Text>
      <Text style={[this.props.pastValues[1]?.toFixed(2)<2?{color:"#F44336"}:{color:"#5AA457"},{fontWeight: 'bold'}]}>{this.props.pastValues[1]?.toFixed(2)}</Text>
      <Text style={[this.props.pastValues[2]?.toFixed(2)<2?{color:"#F44336"}:{color:"#5AA457"},{fontWeight: 'bold'}]}>{this.props.pastValues[2]?.toFixed(2)}</Text>
      <Text style={[this.props.pastValues[3]?.toFixed(2)<2?{color:"#F44336"}:{color:"#5AA457"},{fontWeight: 'bold'}]}>{this.props.pastValues[3]?.toFixed(2)}</Text>
      <Text style={[this.props.pastValues[4]?.toFixed(2)<2?{color:"#F44336"}:{color:"#5AA457"},{fontWeight: 'bold'}]}>{this.props.pastValues[4]?.toFixed(2)}</Text>
      <Text style={[this.props.pastValues[5]?.toFixed(2)<2?{color:"#F44336"}:{color:"#5AA457"},{fontWeight: 'bold'}]}>{this.props.pastValues[5]?.toFixed(2)}</Text> 
      </>
    )}
  </View>
    )
  
  }}

