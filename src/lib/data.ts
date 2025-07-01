import type { Teacher, Appointment, Message } from './types';

export const teachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Evelyn Reed',
    department: 'Science',
    subjects: ['Biology', 'Chemistry'],
    avatarUrl: 'https://placehold.co/100x100.png',
    availability: {
      Monday: [{ start: '09:00', end: '11:00' }, { start: '14:00', end: '16:00' }],
      Wednesday: [{ start: '10:00', end: '12:00' }],
      Friday: [{ start: '09:00', end: '12:00' }],
    },
  },
  {
    id: '2',
    name: 'Mr. David Chen',
    department: 'Mathematics',
    subjects: ['Algebra', 'Calculus', 'Statistics'],
    avatarUrl: 'https://placehold.co/100x100.png',
    availability: {
      Tuesday: [{ start: '13:00', end: '17:00' }],
      Thursday: [{ start: '10:00', end: '12:00' }, { start: '14:00', end: '16:00' }],
    },
  },
  {
    id: '3',
    name: 'Ms. Maria Garcia',
    department: 'Humanities',
    subjects: ['History', 'Literature'],
    avatarUrl: 'https://placehold.co/100x100.png',
    availability: {
        Monday: [{ start: '11:00', end: '13:00' }],
        Wednesday: [{ start: '14:00', end: '17:00' }],
        Friday: [{ start: '13:00', end: '15:00' }],
    },
  },
    {
    id: '4',
    name: 'Dr. Ben Carter',
    department: 'Computer Science',
    subjects: ['Programming', 'Data Structures'],
    avatarUrl: 'https://placehold.co/100x100.png',
    availability: {
        Tuesday: [{ start: '09:00', end: '11:00' }],
        Thursday: [{ start: '15:00', end: '17:00' }],
    },
  },
];

export const appointments: Appointment[] = [
  {
    id: '1',
    studentName: 'Alex Johnson',
    teacherName: 'Dr. Evelyn Reed',
    teacherId: '1',
    date: '2024-05-20',
    time: '10:00',
    status: 'Approved',
    subject: 'Biology',
  },
  {
    id: '2',
    studentName: 'Sam Wilson',
    teacherName: 'Mr. David Chen',
    teacherId: '2',
    date: '2024-05-21',
    time: '14:00',
    status: 'Pending',
    subject: 'Calculus',
  },
    {
    id: '3',
    studentName: 'Casey Brown',
    teacherName: 'Ms. Maria Garcia',
    teacherId: '3',
    date: '2024-05-22',
    time: '15:30',
    status: 'Approved',
    subject: 'History',
  },
   {
    id: '4',
    studentName: 'Jordan Lee',
    teacherName: 'Dr. Evelyn Reed',
    teacherId: '1',
    date: '2024-05-24',
    time: '09:30',
    status: 'Cancelled',
    subject: 'Chemistry',
  }
];

export const messages: Message[] = [
    { id: '1', sender: 'teacher', text: "Hi Alex, just confirming our meeting at 10:00 tomorrow. Please come prepared with your questions about photosynthesis.", timestamp: "Yesterday 2:30 PM"},
    { id: '2', sender: 'user', text: "Sounds good, Dr. Reed. I'll be there. I have a few specific questions about the Krebs cycle as well.", timestamp: "Yesterday 2:35 PM"},
    { id: '3', sender: 'teacher', text: "Excellent. See you then.", timestamp: "Yesterday 2:36 PM"},
]
