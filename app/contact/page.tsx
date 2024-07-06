"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { MdEmail } from "react-icons/md";
import { ScheduleButton } from "@/components/schedule-button";
import { PhoneInput } from "@/components/ui/phone-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters",
    })
    .max(20, {
      message: "First name must be 20 characters or less",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters",
    })
    .max(20, {
      message: "Last name must be 20 characters or less",
    }),
    phoneNum: z
    .string()
    .refine(value => !value || isValidPhoneNumber(value), {
      message: "Invalid phone number"
    })
    .or(z.literal("")),
  email: z
    .string()
    .email("Valid email address is required")
    .min(3, {
      message: "Email field is required",
    })
    .max(320, {
      message: "Email must be 320 characters or less",
    }),
  prefContact: z.enum(["Email", "Text"], {
    required_error: "You must select a preferred communication method",
  }),
  comments: z.string().max(500, {
    message: "Comments must be 500 characters or less",
  }),
});

export type ContactFormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNum: "",
      email: "",
      comments: "",
    },
  });

  useEffect(() => {
    form.watch((value) => {
      isValidPhoneNumber(value.phoneNum || "");
    });
  }, [form.watch]);

  const onSubmit = async (values: ContactFormValues) => {
    isValidPhoneNumber(values.phoneNum || "")
    try {
      // Call API to send SMS to self and optionally to the user based on communication preference
      const smsResponse = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      const smsResult = await smsResponse.json();
      if (!smsResponse.ok) {
        throw new Error(smsResult.message || 'Failed to send SMS');
      }
  
      console.log('SMS sent successfully', smsResult);
  
      // Call API to send email to self with form details
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (!emailResponse.ok) {
        throw new Error('Failed to send email');
      }
  
      console.log('Email sent successfully');
  
      // Reset form values on successful submission
      form.reset();
  
      // Show success toast message
      toast({
        title: "Success!",
        description: "Your form was submitted successfully.",
      });
    } catch (error) {
      console.error('Form submission error:', error);
  
      // Show error toast message
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mb-8">
        <div className="space-x-4">
          <ScheduleButton />
          <Link href="mailto:hello@thanson.dev">
            <Button>
              <MdEmail size={20} className="mr-2" /> Email me directly
            </Button>
          </Link>
        </div>
      </div>
      <div className="justify-center items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="phoneNum"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <PhoneInput defaultCountry="US" {...field} />
                      </FormControl>
                      <FormMessage errors={form.formState.errors} name="phoneNum" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="prefContact"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Communication Preference</FormLabel>

                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Email" />
                        </FormControl>
                        <FormLabel className="hover:cursor-pointer">
                          Email
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="Text" />
                          </FormControl>
                          <FormLabel className="hover:cursor-pointer">
                            Text Message
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  {form.watch("prefContact") === "Text" && (
                    <FormDescription>
                      By submitting this form and entering your number above,
                      you agree to receive automated text messages.
                      <br />
                      Msg and data rates may apply. Reply HELP for help and STOP
                      to cancel.
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>
                    You may include any additional info or feedback that may be
                    helpful.
                  </FormDescription>
                  <FormMessage errors={form.formState.errors} name="comments" />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Contact;
