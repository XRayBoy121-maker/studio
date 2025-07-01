'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { appointments } from '@/lib/data';
import type { Appointment } from '@/lib/types';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const statusVariant = {
  Approved: 'default',
  Pending: 'secondary',
  Cancelled: 'destructive',
} as const;


export default function AppointmentsPage() {
    const [appointmentList, setAppointmentList] = React.useState<Appointment[]>(appointments);

    const handleCancel = (id: string) => {
        setAppointmentList(prev => prev.map(app => app.id === id ? {...app, status: 'Cancelled'} : app));
    }

  const renderTable = (filteredAppointments: Appointment[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Teacher</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredAppointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="font-medium">{appointment.teacherName}</TableCell>
            <TableCell>{appointment.subject}</TableCell>
            <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
            <TableCell>{appointment.time}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[appointment.status]}>{appointment.status}</Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Reschedule</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCancel(appointment.id)} disabled={appointment.status === 'Cancelled'}>
                    Cancel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Appointments</CardTitle>
        <CardDescription>
          Manage your scheduled, pending, and past appointments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            {renderTable(appointmentList)}
          </TabsContent>
          <TabsContent value="upcoming" className="mt-4">
             {renderTable(appointmentList.filter(a => a.status === 'Approved'))}
          </TabsContent>
          <TabsContent value="pending" className="mt-4">
             {renderTable(appointmentList.filter(a => a.status === 'Pending'))}
          </TabsContent>
           <TabsContent value="past" className="mt-4">
             {renderTable(appointmentList.filter(a => a.status === 'Cancelled'))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
