import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8EBD4',
    paddingTop: 50,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuIcon: {
    width: 30,
    height: 30,
    justifyContent: 'space-around',
  },
  menuLine: {
    width: 25,
    height: 3,
    backgroundColor: '#94C88A',
    borderRadius: 4,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  streak: {
    fontSize: 24,
    marginRight: 5,
  },
  streakText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bellIcon: {
    position: 'relative',
  },
  bell: {
    fontSize: 24,
  },
  notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    backgroundColor: 'tomato',
    borderRadius: 5,
  },
  greetingSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subGreeting: {
    fontSize: 14,
    color: 'dimgray',
    marginTop: 5,
  },
  calendar: {
    backgroundColor: '#D8EBD4',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDay: {
    fontSize: 12,
    fontWeight: '600',
    width: 30,
    textAlign: 'center',
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dateCircle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentDate: {
    backgroundColor: '#66BB6A',
  },
  dateText: {
    fontSize: 14,
  },
  currentDateText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  taskCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 40,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'tomato',
    marginRight: 12,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: 'dimgray',
    marginTop: 2,
  },
  dueBadge: {
    backgroundColor: '#A5D6A7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  dueText: {
    fontSize: 12,
    fontWeight: '600',
  },
  daysText: {
    fontSize: 10,
    color: 'dimgray',
  },
  addTaskButton: {
    backgroundColor: '#BADBB3',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  addTaskText: {
    fontSize: 16,
  },
  friendButton: {
    backgroundColor: '#94C88A',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: 12,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});