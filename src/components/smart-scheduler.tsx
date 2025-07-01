'use client';

import * as React from 'react';
import { Loader2, Wand2 } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getSuggestedTimes } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type Inputs = {
  preferences: string;
};

type SmartSchedulerProps = {
  teacherId: string;
};

export function SmartScheduler({ teacherId }: SmartSchedulerProps) {
  const { register, handleSubmit } = useForm<Inputs>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [suggestion, setSuggestion] = React.useState<{ suggestedTimes: string[]; reasoning: string } | null>(null);
  const { toast } = useToast();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await getSuggestedTimes(teacherId, data.preferences);
      if (result.suggestedTimes.length === 0) {
        toast({
          variant: 'destructive',
          title: 'No slots found',
          description: result.reasoning || 'Could not find any matching appointment times. Please adjust your preferences or check the calendar.',
        });
      }
      setSuggestion(result);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-secondary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-accent" />
          Smart Scheduling Assistant
        </CardTitle>
        <CardDescription>
          Let our AI find the perfect time for you. Describe your ideal meeting times (e.g., "mornings," "late afternoons on Friday").
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Textarea
            {...register('preferences')}
            placeholder="I prefer mornings, around 10 AM, but I am flexible on Wednesday..."
            rows={3}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Finding Times...
              </>
            ) : (
              'Get Suggestions'
            )}
          </Button>
        </form>

        {suggestion && (
          <div className="mt-6">
            <Alert>
              <Wand2 className="h-4 w-4" />
              <AlertTitle>AI Suggestions</AlertTitle>
              <AlertDescription className="space-y-4">
                <p>{suggestion.reasoning}</p>
                {suggestion.suggestedTimes.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {suggestion.suggestedTimes.map((time) => (
                      <Button key={time} variant="outline">
                        {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No available slots match your preferences. Try being more general.</p>
                )}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
