export type Teacher = {
  id: string;
  name: string;
  department: string;
  subjects: string[];
  avatarUrl: string;
  availability: {
    [day: string]: { start: string; end: string }[];
  };
};

export type Appointment = {
  id: string;
  studentName: string;
  teacherName: string;
  teacherId: string;
  date: string;
  time: string;
  status: 'Pending' | 'Approved' | 'Cancelled';
  subject: string;
};

export type Message = {
    id: string;
    sender: 'user' | 'teacher';
    text: string;
    timestamp: string;
}
