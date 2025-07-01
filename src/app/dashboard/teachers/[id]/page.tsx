'use client';

import * as React from 'react';
import { notFound, useParams } from 'next/navigation';
import { Clock, Mail, Tag, User, GraduationCap } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { teachers } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { SmartScheduler } from '@/components/smart-scheduler';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  subject: z
    .string({
      required_error: "Please select a subject to discuss.",
    }),
  date: z.date({
    required_error: "A date is required.",
  }),
})

export default function TeacherProfilePage() {
  const params = useParams<{ id: string }>();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const teacher = teachers.find((t) => t.id === params.id);
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Appointment Requested!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  if (!teacher) {
    notFound();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader className="items-center text-center bg-secondary/30">
             <Avatar className="h-28 w-28 mb-4 border-4 border-background shadow-md">
              <AvatarImage src={teacher.avatarUrl} alt={teacher.name} data-ai-hint="person portrait" />
              <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{teacher.name}</CardTitle>
            <CardDescription>{teacher.department} Department</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Subjects</span>
            </div>
             <div className="flex flex-wrap gap-2 pl-8">
              {teacher.subjects.map((subject) => (
                <Badge key={subject} variant="secondary">
                  {subject}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Availability</span>
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground pl-8">
                {Object.entries(teacher.availability).map(([day, slots]) => (
                    <li key={day}>{day}: {slots.map(s => `${s.start}-${s.end}`).join(', ')}</li>
                ))}
            </ul>
             <Button className="w-full" variant="outline"><Mail className="mr-2 h-4 w-4"/> Contact {teacher.name.split(' ')[0]}</Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <SmartScheduler teacherId={teacher.id} />
        
        <Card>
            <CardHeader>
                <CardTitle>Book an Appointment</CardTitle>
                <CardDescription>Select a subject and date from the calendar to book your slot.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a subject to discuss" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {teacher.subjects.map(subject => (
                                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    This will help your teacher prepare for the meeting.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Appointment Date</FormLabel>
                                <FormControl>
                                     <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        className="rounded-md border self-center"
                                        disabled={(date) => {
                                            const day = date.getDay();
                                            return day !== 1 && day !== 3 && day !== 5; // Example: Disable weekends
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Request Appointment</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
