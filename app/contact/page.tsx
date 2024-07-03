"use client"
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormDescription, FormMessage, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { FaGoogle  } from "react-icons/fa";
import { SiCalendly } from "react-icons/si";
import { CountrySelector, usePhoneInput } from 'react-international-phone';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { MdEmail } from "react-icons/md";
import { ScheduleButton } from "@/components/schedule-button"

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    const phoneNumber = phoneUtil.parseAndKeepRawInput(phone);
    console.log(phoneNumber);
    return phoneUtil.isValidNumber(phoneNumber);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const formSchema = z.object({
  firstName: z.string()
    .min(2, {
      message: "First name must be at least 2 characters"
  })
    .max(20, {
      message: "First name must be 20 characters or less"
  }),
  lastName: z.string()
    .min(2, {
      message: "Last name must be at least 2 characters"
    }).max(20, {
      message: "Last name must be 20 characters or less"
    }
  ),
  phoneNum: z.string(),
  email: z.string()
    .email("Valid email address is required")
    .min(3, {
      message: "Email field is required"
    }).max(320, {
      message: "Email must be 320 characters or less"
  }),
  prefContact: z.enum(['email', 'text'], {
    required_error: "You must select a preferred communication method"
  }),
  comments: z.string()
    .max(500, {
      message: "Comments must be 500 characters or less",
    }),
})

const Contact = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNum: "",
      email: "",
      comments: ""
    },
  })

  const {
    inputValue,
    phone,
    country,
    setCountry,
    handlePhoneValueChange,
    inputRef,
  } = usePhoneInput({
    defaultCountry: 'us',
    value: '',
    onChange: ({ phone, inputValue, country }) => {
      console.log(phone, inputValue, country);
      console.log(isPhoneValid(phone));
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values)
  }

  return (
    <>
      <div className="flex flex-col items-center mb-8">
        <div className="space-x-4">
          <ScheduleButton />
          <Button>
            <MdEmail size={20} className="mr-2"/> Email me directly
          </Button>
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
                        <Input
                          {...inputRef}
                          ref={inputRef}
                          value={inputValue}
                          onChange={handlePhoneValueChange}
                        />
                      </FormControl>
                      <FormMessage />
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
                          <RadioGroupItem value="email" />
                        </FormControl>
                        <FormLabel className="hover:cursor-pointer">
                          Email
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="text" />
                        </FormControl>
                        <FormLabel className="hover:cursor-pointer">
                          Text Message
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                </FormControl>
                {form.watch('prefContact') === 'text' && (
                  <FormDescription>
                    By submitting this form and entering your number above, you agree to receive automated text messages.
                    <br />
                    Msg and data rates may apply. Reply HELP for help and STOP to cancel.
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
                    <Textarea
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You may include any additional info or feedback that may be helpful.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  )
}

export default Contact