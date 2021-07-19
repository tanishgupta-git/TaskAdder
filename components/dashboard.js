import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,ScrollView } from 'react-native'
import * as Progress from 'react-native-progress';
import countTaskType from '../utils/countTasktype';

const Dashboard = ({todos}) => {
    const [progress,setProgress] = useState(0);
    const [tasksCount,setTasksCount] = useState({Business:0,Personal:0,Other:0});

    useEffect(() => {
   
        const doneDocs =  todos.reduce( (x,y) => {
          if (y.done) {
            return x + 1
          }else {
            return x
          }
        },0);
        if(!todos.length) {
          setProgress(0);
        }else{
          setProgress( (doneDocs/todos.length) * 100 );
        }
       const businessTasks = countTaskType(todos,'Business');
       const personalTasks = countTaskType(todos,'Personal');
       const otherTasks = countTaskType(todos,'Other');
       setTasksCount({Business:businessTasks,Personal:personalTasks,Other:otherTasks});
    
      },[todos])

    return (
                 <ScrollView style={{ flex : 1}} horizontal>

                    {/* progress bar */}
                        <View style={{...styles.dashboardItem,...styles.dashboardItemcenter}}>
                                <Progress.Circle 
                                    size={100} borderWidth={0} showsText={true} color={'#85a4f9'} unfilledColor={'#06257a'}
                                    borderColor={'#303030'} progress={progress / 100} animated thickness={10} formatText={() => { return `${progress}%`}}
                                    />    
                                    <Text style={styles.countHeadtext}>{todos.length} Task's</Text>        
                        </View>
                      
                      {/* business type item */}
                        <View style={styles.dashboardItem}>
                            <Text style={styles.countTypetext}>{tasksCount.Business} tasks</Text>
                            <Text style={styles.countTypehead}>Business</Text>
              
                            <View style={styles.lineBackcontainer}>
                              <View style={{...styles.lineBack,...styles.businessColor}}></View>
                            </View>
        
                        </View>

                        {/* personal type item */}
                        <View style={styles.dashboardItem}>
                        <Text style={styles.countTypetext}>{tasksCount.Personal} tasks</Text>
                          <Text style={styles.countTypehead}>Personal</Text>
                          
                          <View style={styles.lineBackcontainer}>
                              <View style={{...styles.lineBack,...styles.personalColor}}></View>
                            </View>

                        </View>

                        {/* other type item */}
                        <View style={styles.dashboardItem}>
                          <Text style={styles.countTypetext}>{tasksCount.Other} tasks</Text>
                          <Text style={styles.countTypehead}>Other</Text>
                          <View style={styles.lineBackcontainer}>
                              <View style={{...styles.lineBack,...styles.otherColor}}></View>
                            </View>

                        </View>
         
                </ScrollView>
  
  
    )
}

export default Dashboard

const styles = StyleSheet.create({

       dashboardItem : {
        backgroundColor:'#041955',
        width:240,
        padding: 15,
        borderRadius:10,
        marginHorizontal :15,
        justifyContent:'center'
       },
       dashboardItemcenter : {
        alignItems:'center',
       },
       countHeadtext : {
        color: '#98ade7',
        textAlign:'center',
        fontSize:20,
        marginTop:15
       },

       countTypehead : {
           fontWeight : 'bold',
           fontSize :25,
           marginTop:10,
           marginBottom:15,
           color : '#c8d6e7'
       },
       countTypetext : {
           color: '#94b4fb',
           fontSize:18
       },
       lineBackcontainer :{
         height: 5,
         backgroundColor:'#536c9c',
         borderRadius:20
       },
       lineBack : {
         height: '100%',
         width: '50%'
       },
       businessColor : {
        backgroundColor:'#657fcd'
       },
       personalColor :{
        backgroundColor:'#A10CC9'
       },
       otherColor : {
        backgroundColor:'#3399ff'
       }
})
