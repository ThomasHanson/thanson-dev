import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  email: z.string().email('Invalid email format'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
  preferredCommMethod: z.enum(['Text', 'Email']),
  comments: z.string(),
});

type FormData = z.infer<typeof schema>;

interface ResponseData {
  error?: string;
}

async function sendFormToServer(data: FormData) {
  const res = await fetch("/api/sendgrid", {
    body: JSON.stringify({
      "email": data.email,
      "firstName": data.firstName,
      "lastName": data.lastName,
      "phoneNumber": data.phoneNumber,
      "emailAddress": data.email,
      "preferredCommMethod": data.preferredCommMethod,
      "comments": data.comments,
      "subjectIn": "[thanson.dev] Contact Form Submission",
      "subjectOut": "[thanson.dev] Thank you for your submission!"
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const responseData = await res.json() as ResponseData;

  if (res.ok) {
    console.log('Email(s) sent successfully!');
  } else {
    console.error('Error sending email:', responseData.error);
  }
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isSending, setIsSending] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsSending(true);
    await sendFormToServer(data);
    setIsSending(false);
  });

  return (
    <form className="max-w-lg mx-auto" onSubmit={void onSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block mb-2 font-medium">First Name</label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: true })}
            className="border-gray-300 rounded-md w-full p-2"
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
            className="border-gray-300 rounded-md w-full p-2"
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
            className="border-gray-300 rounded-md w-full p-2"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block font-medium mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            {...register('phoneNumber')}
            className="border-gray-300 rounded-md w-full p-2"
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>
          )}
        </div>
        <div className="col-span-2">
          <label className="block font-medium mb-1">Preferred Communication Method</label>
          <div className="flex items-center">
            <input
              type="radio"
              id="preferredCommMethodText"
              {...register('preferredCommMethod', { required: true })}
              value="Text"
              className="mr-2"
            />
            <label htmlFor="preferredCommMethodText" className="mr-4">Text</label>
            <input
              type="radio"
              id="preferredCommMethodEmail"
              {...register('preferredCommMethod', { required: true })}
              value="Email"
              className="mr-2"
            />
            <label htmlFor="preferredCommMethodEmail">Email</label>
          </div>
          {errors.preferredCommMethod && (
            <span className="text-red-500 text-sm">Preferred method of communication is required.</span>
          )}
        </div>
        <div className="col-span-2">
          <label htmlFor="comments" className="block font-medium mb-1">
            Comments
          </label>
          <textarea
            id="comments"
            {...register('comments')}
            className="border-gray-300 rounded-md w-full p-2"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
        disabled={isSending}
      >
        {isSending ? 'Sending...' : 'Submit'}
      </button>
    </form>
  );
}
