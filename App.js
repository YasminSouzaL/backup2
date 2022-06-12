import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList
} from 'react-native';

import GoalItem from './componetes/item_lista';
import GoalInput from './componetes/entrada_lista';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode,setIsAddMode] = useState (false);

  const addGoalHandler = goalTitle => {

    if (goalTitle.length === 0){
      return;
    }


    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle }
    ]);
    setIsAddMode(false);
  };

  const revomeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter( goal => goal.id !== goalId );
    });
  };

  const cancelGoalAdditionHandler = () =>{
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress ={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} 
      onCancel={cancelGoalAdditionHandler} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => (
           <GoalItem 
            id={itemData.item.id}
            onDelete={revomeGoalHandler}
            title={itemData.item.value}
           />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
});
