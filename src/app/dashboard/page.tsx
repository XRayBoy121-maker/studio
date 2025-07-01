import Link from 'next/link';
import {
  ArrowRight,
  BookUser,
  CalendarCheck,
  MessageSquare,
  Users,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { appointments } from '@/lib/data';

export default function DashboardPage() {
    const upcomingAppointments = appointments.filter(a => a.status === 'Approved' || a.status === 'Pending').slice(0, 3);

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-secondary/50">
          <CardHeader className="pb-2">
            <CardDescription>Upcoming Appointments</CardDescription>
            <CardTitle className="text-4xl">{appointments.filter(a => a.status === 'Approved').length}</CardTitle>
          </CardHeader>
           <CardContent>
            <div className="text-xs text-muted-foreground">
              +{appointments.filter(a => a.status === 'Pending').length} pending requests
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Find a Teacher</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Available teachers this week</p>
          </CardContent>
           <CardFooter>
            <Button asChild size="sm" className="w-full">
              <Link href="/dashboard/teachers">Browse Teachers</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Unread messages</p>
          </CardContent>
            <CardFooter>
                <Button asChild size="sm" className="w-full">
                <Link href="/dashboard/messages">View Messages</Link>
                </Button>
            </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Your Profile</CardTitle>
            <BookUser className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">Profile completion</p>
          </CardContent>
           <CardFooter>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link href="#">Update Profile</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Here are your next scheduled meetings.</CardDescription>
        </CardHeader>
        <CardContent>
            {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={`https://placehold.co/100x100.png`} />
                            <AvatarFallback>{appointment.teacherName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{appointment.teacherName}</p>
                            <p className="text-sm text-muted-foreground">{appointment.subject}</p>
                        </div>
                        </div>
                        <div className="text-right">
                            <p className="font-medium">{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                            <p className="text-sm text-muted-foreground">{appointment.time}</p>
                        </div>
                    </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground">No upcoming appointments.</p>
            )}
        </CardContent>
        <CardFooter>
            <Button asChild className="ml-auto" variant="outline">
                <Link href="/dashboard/appointments">
                View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
