// This file is empty because the prompt did not specify any server actions to implement.
'use server';

import { suggestAppointmentTimes } from '@/ai/flows/suggest-appointment-times';
import { teachers } from './data';

export async function getSuggestedTimes(teacherId: string, studentPreferences: string) {
  const teacher = teachers.find(t => t.id === teacherId);
  if (!teacher) {
    throw new Error('Teacher not found');
  }

  const input = {
    teacherAvailability: JSON.stringify(teacher.availability),
    studentPreferences: studentPreferences || 'No specific preferences.',
    appointmentDuration: 30,
  };

  try {
    const result = await suggestAppointmentTimes(input);
    return result;
  } catch (error) {
    console.error('Error suggesting appointment times:', error);
    return {
      suggestedTimes: [],
      reasoning: 'An error occurred while generating suggestions. Please try again later.',
    };
  }
}
