import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form/dist/types/form';
import { PatternFormat } from 'react-number-format';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  email: z.string().email('Invalid email format'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
  contactMethod: z.enum(['Text', 'Email']),
  comments: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [phone, setPhone] = useState('');
  const [unformattedPhone, setUnformattedPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
  
    try {
      await axios.post("/api/sendEmail", {
        "email": data.email,
        "firstName": data.firstName,
        "lastName": data.lastName,
        "phoneNumber": phone,
        "emailAddress": data.email,
        "contactMethod": data.contactMethod,
        "comments": data.comments,
        "subjectIn": "[thanson.dev] Contact Form Submission",
        "subjectOut": "[thanson.dev] Thank you for your submission!"
      });

      await axios.post("/api/sendMessage", {
        "phone": unformattedPhone,
        "message": "[thanson.dev] Hi, {} Thank you for reaching out to me! I received your form submission:\nPhone Number: {}\nEmail:{}\nComments: {}\n\nI will reach back out as soon as possible."
      });

      // Reset the form after successful submission
      reset();
      setPhone('');

      setIsSubmitted(true);

    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit)}>
      {isSubmitted && (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded-md mb-4">
          Form submitted successfully!
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block mb-2 font-medium">First Name</label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: true })}
            className="border border-gray-400 rounded-md w-full p-2"
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">{errors.firstName.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="block font-medium mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: true })}
            className="border border-gray-400 rounded-md w-full p-2"
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">{errors.lastName.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="border border-gray-400 rounded-md w-full p-2"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block font-medium mb-1">
            Phone Number
          </label>
          <PatternFormat
            type="tel"
            id="phoneNumber"
            format="+1 (###) ###-####"
            mask="_"
            onValueChange={(value) => {
              setPhone(value.formattedValue);
              setUnformattedPhone(value.value);
            }}
            required
            {...register('phoneNumber')}
            value={phone}
            className="border border-gray-400 rounded-md w-full p-2"
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>
          )}
        </div>
        <div className="col-span-2">
          <label className="block font-medium mb-1">Preferred Contact Method</label>
          <div className="flex items-center">
            <input
              type="radio"
              id="contactMethodText"
              {...register('contactMethod', { required: true })}
              value="Text"
              className="mr-2"
            />
            <label htmlFor="contactMethodText" className="mr-4">Text</label>
            <input
              type="radio"
              id="contactMethodEmail"
              {...register('contactMethod', { required: true })}
              value="Email"
              className="mr-2"
            />
            <label htmlFor="contactMethodEmail">Email</label>
          </div>
          {errors.contactMethod && (
            <span className="text-red-500 text-sm">Preferred contact method is required.</span>
          )}
        </div>
        <div className="col-span-2">
          <label htmlFor="comments" className="block font-medium mb-1">
            Comments
          </label>
          <textarea
            id="comments"
            {...register('comments')}
            className="border border-gray-400 rounded-md w-full p-2"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Submit'}
      </button>
    </form>
  );
}
