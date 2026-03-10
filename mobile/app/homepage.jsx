import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../styles/homepageStyles';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  // sample data
  const userName = "Ted";
  const streak = 12;
  const currentDay = 9;
  
  const weekDays = ['Su', 'Mon', 'T', 'W', 'Th', 'F', 'S'];
  const dates = [6, 7, 8, 9, 10, 11, 12];
  
  const tasks = [
    { id: 1, name: 'Capstone', description: 'Finish slides', dueInDays: 5, color: '#FFB6C1' },
    { id: 2, name: 'Compilers', description: 'Project 1', dueInDays: 2, color: '#DDA0DD' },
  ];
  
  const friends = ['Timmy', 'John'];

  return (
    <ScrollView style={styles.container}>
      
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => router.push('/')}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </TouchableOpacity>
        
        <View style={styles.streakBadge}>
          <Text style={styles.streak}>☀️</Text>
          <Text style={styles.streakText}>{streak}</Text>
        </View>
        
        <TouchableOpacity style={styles.bellIcon}>
          <Text style={styles.bell}>🔔</Text>
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      {/* Greeting */}
      <View style={styles.greetingSection}>
        <Text style={styles.greetingText}>Welcome {userName},</Text>
        <Text style={styles.subGreeting}>What are we accomplishing today?</Text>
      </View>

      {/* Calendar Widget */}
      <View style={styles.calendar}>
        <View style={styles.weekDaysRow}>
          {weekDays.map((day, index) => (
            <Text key={index} style={styles.weekDay}>{day}</Text>
          ))}
        </View>
        <View style={styles.datesRow}>
          {dates.map((date, index) => (
            <View 
              key={index} 
              style={[
                styles.dateCircle, 
                date === currentDay && styles.currentDate
              ]}
            >
              <Text style={[
                styles.dateText,
                date === currentDay && styles.currentDateText
              ]}>
                {date}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tasks Section */}
      <Text style={styles.sectionTitle}>Tasks</Text>
      
      {tasks.map(task => (
        <View key={task.id} style={[styles.taskCard, { backgroundColor: task.color }]}>
          <View style={styles.taskLeft}>
            <View style={styles.taskCircle} />
            <View>
              <Text style={styles.taskName}>{task.name}</Text>
              <Text style={styles.taskDescription}>{task.description}</Text>
            </View>
          </View>
          <View style={styles.dueBadge}>
            <Text style={styles.dueText}>Due in {task.dueInDays}</Text>
            <Text style={styles.daysText}>days</Text>
          </View>
        </View>
      ))}

      {/* Add Task Button */}
      <TouchableOpacity style={styles.addTaskButton}>
        <Text style={styles.addTaskText}>Add Task</Text>
      </TouchableOpacity>

      {/* Friends Section */}
      <Text style={styles.sectionTitle}>View your friends' activities</Text>
      
      {friends.map((friend, index) => (
        <TouchableOpacity key={index} style={styles.friendButton}>
          <Text style={styles.friendName}>{friend}</Text>
        </TouchableOpacity>
      ))}

      {/* Bottom spacing */}
      <View style={{ height: 40 }} />

    </ScrollView>
  );
}