import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoMdCalendar } from "react-icons/io";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiGooglecalendar, SiCalendly } from "react-icons/si";
import { InlineWidget } from "react-calendly";
import React from "react";

export function ScheduleButton() {
  const height = "600px";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <IoMdCalendar size={20} className="mr-2" /> Meet with me
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Schedule a Meeting with Me</DialogTitle>
          <DialogDescription>
            You can schedule directly through Google Calendar or use Calendly to
            find a convenient time.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="gCal">
          <TabsList className="space-x-2">
            <TabsTrigger value="gCal">
              <SiGooglecalendar size={20} className="mr-2" /> Google Calendar
            </TabsTrigger>
            <TabsTrigger value="calendly">
              <SiCalendly size={20} className="mr-2" /> Calendly
            </TabsTrigger>
          </TabsList>
          <TabsContent value="gCal">
            <div className="w-full h-full">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2ClD9UcchbBK8TYVf0V-sQBYOu6lmMJNOVNLubLfOHtaDPierxJ3VNcLT83nvedveb564ncnxm?gv=true"
                style={{ border: "0" }}
                width="100%"
                height={height}
              ></iframe>
            </div>
          </TabsContent>
          <TabsContent value="calendly">
            <div className="w-full h-full">
              <InlineWidget
                styles={{
                  height: height,
                }}
                url="https://calendly.com/thanson-dev/30-minute-meeting"
              />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
