'use client';

import { useState, useRef } from 'react';
import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Wand2, Loader2 } from 'lucide-react';
import { getSummary } from '@/app/actions/summarize';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

type SummarizerState = {
  summary?: string;
  error?: string;
}

const initialState: SummarizerState = {};

export function AISummarizer({
  contentToSummarize,
  buttonText = 'Summarize',
}: {
  contentToSummarize: string;
  buttonText?: string;
}) {
  const [state, formAction] = useFormState(getSummary, initialState);
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async () => {
    setIsOpen(true);
    setIsPending(true);
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      await formAction(formData);
    }
    setIsPending(false);
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
      // Reset state when closing
      formAction(new FormData());
    }
  }

  return (
    <>
      <form ref={formRef} action={handleSubmit}>
        <input type="hidden" name="content" value={contentToSummarize} />
        <Button type="submit" variant="outline" size="lg" className="w-full sm:w-auto" disabled={isPending}>
          {isPending && isOpen ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-5 w-5" />
          )}
          {buttonText}
        </Button>
      </form>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-headline flex items-center gap-2">
              <Wand2 className="text-primary"/>
              AI Summary
            </DialogTitle>
            <DialogDescription>
              A quick overview powered by AI.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 min-h-[10rem] flex items-center justify-center">
            {isPending && (
              <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span>Summarizing...</span>
              </div>
            )}
            {state?.summary && !isPending && (
              <p className="text-muted-foreground">{state.summary}</p>
            )}
            {state?.error && !isPending && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
          </div>
           <DialogFooter>
             <Button variant="outline" onClick={() => handleOpenChange(false)}>Close</Button>
           </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
