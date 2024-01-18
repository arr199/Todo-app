import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, FlatList, Keyboard, ToastAndroid } from 'react-native'
import Task from './task'
import { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useGlobalStore, useTaskStore } from '../store/store'
import RemoveTaskModal from './removeTaskModal'

export default function Main (): JSX.Element {
  const [inputValue, setInputValue] = useState('')
  const { addTask, tasks } = useTaskStore()
  const { setModalVisible, setSelectedTask } = useGlobalStore()

  return (
    <View style={styles.container}>
      <Text style={styles.title} >Today&apos;s Tasks  </Text>
      <StatusBar style='auto'></StatusBar>

      <View style={styles.tasksList}>
        {tasks.length === 0
          ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text >No tasks ...</Text></View>
          : <FlatList
          data={tasks}
          renderItem={({ item }) =>
          <Task onPress={() => {
            setSelectedTask(item)
            setModalVisible(true)
          }} >{item.title}
          </Task>}
          keyExtractor={(item) => item.id}
        >
        </FlatList>}
      </View>

      {/* WRITE A TASK INPUT */}
      <KeyboardAvoidingView style={{ marginTop: 'auto' }}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 14,
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10

        }}>
          <TextInput
            value={inputValue}
            onChangeText={(e) => { setInputValue(e) }}
            placeholderTextColor="#C0C0C0"
            placeholder='Write a task'
            style={styles.input}></TextInput>
          <TouchableOpacity disabled={inputValue.length === 0} onPress={() => {
            addTask(inputValue)
            ToastAndroid.show('Task added', ToastAndroid.SHORT)
            Keyboard.dismiss()
            setInputValue('')
          }} >
            <View style={styles.plusIcon}>
              <Icon size={30} name='plus' color="#C0C0C0" ></Icon>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {/* MODAL */}
      <RemoveTaskModal />

    </View>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#E8EAED', height: '100%', padding: 20 },
  title: { fontWeight: 'bold', fontSize: 22, marginTop: 80 },
  tasksList: { marginTop: 20, marginBottom: 200 },
  input: {
    marginTop: 'auto',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 10,
    borderRadius: 25,
    width: '100%',
    maxWidth: '80%',
    paddingHorizontal: 15

  },

  plusIcon: { paddingVertical: 10, paddingHorizontal: 15, backgroundColor: 'white', borderRadius: 100 }

})
