import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import {useState} from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { s } from './App.style.js'
import { Header } from './components/Header/Header.jsx';
import { CardTodo } from './components/CardTodo/CardTodo.jsx';
import { TabBottomMenu } from './components/TabBottomMenu/TabBottomMenu.jsx'
import { ButtonAdd } from './components/ButtonAdd/ButtonAdd.jsx';
import Dialog from "react-native-dialog"
import uuid from 'react-native-uuid'



export default function App() {

  const [selectedTabName, setSelectedTabName] = useState("all")

  const [todoList, setTodoList] = useState([])
  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")

  function getFilteredList() {
    switch (selectedTabName) {
      case "all":
        return todoList
      case "inProgress":
        return  todoList.filter(todo => !todo.isCompleted)
      case "done":
        return  todoList.filter(todo => todo.isCompleted)
    }
  }

  function updateTodo(todo) {
    const updatedTodo = {
      ...todo,
      isCompleted : !todo.isCompleted
    }

    const indexToUpdate = todoList.findIndex(
      (todo) => todo.id === updatedTodo.id
    )

    const updatedTodoList = [...todoList]
    updatedTodoList[indexToUpdate] = updatedTodo
    setTodoList(updatedTodoList)
  }

  function deletedTodo(todoToDelete) {
    Alert.alert("Suppression","Supprimer cette tâche ?", [
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter((todo) => todo.id !==todoToDelete.id))
        }
      },
      {
        text: "Annuler",
        style: "cancel"
      }
    ])
  }

  function renderTodoList() {
    return getFilteredList().map((todo) => (
      <View style={s.cardItem} key={todo.id}>
        <CardTodo onLongPress={deletedTodo} onPress={updateTodo} todo={todo} />
      </View>
      ))
  } 

  function showAddDialog() {
    setIsAddDialogVisible(true);
  }

  function addTodo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };
  
    setTodoList([...todoList, newTodo]);
    setIsAddDialogVisible(false);
  }
  return (
    <>

    <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
          <Header/>
        </View>
            
            <View style={s.body}>
      <ScrollView>
              {renderTodoList()}
        </ScrollView>
          </View>
          <ButtonAdd onPress={showAddDialog}/> 
      </SafeAreaView>
    </SafeAreaProvider>
        <View style={s.footer}>
        <TabBottomMenu
          todoList={todoList}
          onPress={setSelectedTabName}
          selectedTabName={selectedTabName} />
        </View>
      <Dialog.Container visible={isAddDialogVisible} onBackdropPress={()=>setIsAddDialogVisible}>
        <Dialog.Title>Créer une tâche</Dialog.Title>
        <Dialog.Description>Nom de la nouvelle tâche</Dialog.Description>
        <Dialog.Input onChangeText = {setInputValue} />
        <Dialog.Button disabled={inputValue.trim().length===0}  label="Créer" onPress={addTodo}  />
      </Dialog.Container>
    </>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ccc',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    square: {
      width: 50,
      height: 50
    }
  })