import React, { useState } from 'react';
import {Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const existingTask = tasks.find(task => task.title === newTaskTitle);
    if (existingTask) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return
    }
    let task = {
      id: new Date().getTime(),
      done: false,
      title: newTaskTitle
    }
    setTasks(prev => [...prev, task])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.done = !task.done
      }
      return task
    })
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', '`Tem certeza que você deseja remover esse item?`',
    [
    { text: 'Nao' },
    { text: 'Sim',
      onPress: () => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks)
      }
    },]
    )
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.title = taskNewTitle
      }
      return task
    })
    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})