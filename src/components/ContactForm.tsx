import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  email: z.string().email('Invalid email format'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
  comments: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data); // Handle form submission here
  });

  return (
    <form onSubmit={onSubmit} className="max-w-lg mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block font-medium mb-1">
            First Name
          </label>
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
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4">
        Submit
      </button>
    </form>
  );
}
