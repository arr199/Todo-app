import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, FlatList, SafeAreaView } from 'react-native'
import Task from './task'
import { useState } from 'react'
import API from '../utils/API'
import Icon from 'react-native-vector-icons/FontAwesome'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid'

interface TTask {
  id: string
  title: string
}

export default function Main (): JSX.Element {
  const [tasks, setTasks] = useState<TTask[] | null>(API.INITIAL_TASKS)
  const [inputValue, setInputValue] = useState('')

  function handleAddTask (): void {
    const newTask: TTask[] = JSON.parse(JSON.stringify(tasks))
    const id = nanoid()
    newTask?.push({ id, title: inputValue })
    setTasks(newTask)
  }
  function handleRemoveTask (id: string): void {
    const newTasks: TTask[] = JSON.parse(JSON.stringify(tasks)).filter((e: TTask) => e.id !== id)
    setTasks(newTasks)
  }
  return (
        <View style={styles.container}>
            <Text style={styles.title} >Today&apos;s Tasks  </Text>
            <StatusBar style='auto'></StatusBar>
            <SafeAreaView style={styles.tasksList}>
                <FlatList
                data={tasks}
                renderItem={({ item }) => <Task onPress={ () => { handleRemoveTask(item.id) }} >{item.title}</Task> }
                keyExtractor={(item) => item.id }
                >
                </FlatList>
            </SafeAreaView>

            {/* Write A task */}
              <KeyboardAvoidingView style={{ marginTop: 'auto' }} >
                <View style={{ marginTop: 'auto', display: 'flex', flexDirection: 'row', gap: 14, alignItems: 'center', justifyContent: 'space-between' }}>
                  <TextInput value={inputValue} onChangeText={(e) => { setInputValue(e) } }
                  placeholderTextColor="#C0C0C0" placeholder='Write a task' style={styles.input}></TextInput>
                  <TouchableOpacity disabled={inputValue.length === 0} onPress={handleAddTask} >
                        <View style={styles.plusIcon}>
                          <Icon size={30} name='plus' color="#C0C0C0" ></Icon>
                        </View>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
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
