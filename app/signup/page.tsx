// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { supabase } from '../utils/supabase/supabase';
// import { motion } from 'framer-motion';

// export default function SignupPage() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     company: '',
//     phoneNumber: '',
//     email: '',
//     password: '',
//   });
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const checkUser = async () => {
//       const { data } = await supabase.auth.getSession();
//       if (data.session) {
//         router.push('/domain-selection'); // Redirect if already logged in
//       }
//     };

//     checkUser();
//   }, [router]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setIsLoading(true);

//     try {
//       const { error, data } = await supabase.auth.signUp({
//         email: formData.email,
//         password: formData.password,
//         options: {
//           data: {
//             full_name: formData.firstName+" "+formData.lastName,
//             company: formData.company,
//             phone_number: formData.phoneNumber,
//           },
//           emailRedirectTo: `${window.location.origin}/domain-selection`, // Redirect after email verification
//         },
//       });

//       if (error) {
//         if (error.message.includes('Email already exists')) {
//           setMessage('This email address is already registered. Please log in instead.');
//         } else {
//           setMessage(`Error: ${error.message}`);
//         }
//       } else if (data.user && !data.user.email_confirmed_at) {
//         setMessage(
//             `Signup successful! A verification email has been sent to ${formData.email}. Please verify your email to log in.`
//         );
//       } else {
//         setMessage('Signup successful! Redirecting...');
//         router.push('/domain-selection');
//       }
//     } catch (err) {
//       console.error('Error during signup:', err);
//       setMessage('An unexpected error occurred. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   const handleGoogleSignIn = async () => {
//     setIsLoading(true);
//     setMessage('');

//     try {
//       const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           redirectTo: `${window.location.origin}/loading?source=signup`, // Add source parameter
//         },
//       });

//       if (error) {
//         setMessage(`Error: ${error.message}`);
//       } else {
//         setMessage('Redirecting to Google...');
//       }
//     } catch (err) {
//       console.error('Error during Google sign-in:', err);
//       setMessage('An unexpected error occurred. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };



//   return (
//       <motion.div
//           className="min-h-screen bg-[#1B1C28] text-gray-100 flex flex-col items-center justify-center px-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//       >
//         <motion.h1
//             className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#8FA1D0] to-[#E94560]"
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//         >
//           Signup for ACS
//         </motion.h1>

//         <form
//             onSubmit={handleSubmit}
//             className="w-full max-w-md space-y-6 bg-[#24253A] p-6 rounded-lg shadow-lg"
//         >
//           <p className="text-sm text-gray-400 mb-2">
//             <span className="text-red-500">*</span> Indicates required field
//           </p>

//           {[
//             { id: 'firstName', label: 'First Name', required: true },
//             { id: 'lastName', label: 'Last Name', required: true },
//             { id: 'email', label: 'Email', type: 'email', required: true },
//             { id: 'password', label: 'Password', type: 'password', required: true },
//           ].map((field) => (
//               <div key={field.id}>
//                 <label
//                     htmlFor={field.id}
//                     className="block text-sm font-medium text-gray-300"
//                 >
//                   {field.label} {field.required && <span className="text-red-500">*</span>}
//                 </label>
//                 <input
//                     id={field.id}
//                     name={field.id}
//                     type={field.type || 'text'}
//                     value={formData[field.id]}
//                     onChange={handleChange}
//                     required={field.required}
//                     className="w-full p-3 bg-[#33354A] text-gray-100 rounded-md focus:ring-2 focus:ring-[#8FA1D0]"
//                 />
//               </div>
//           ))}

//           <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full py-3 ${
//                   isLoading ? 'bg-[#8FA1D0]' : 'bg-[#4B5C99] hover:bg-[#5C6DAA]'
//               } text-gray-100 font-bold rounded-md focus:outline-none`}
//           >
//             {isLoading ? 'Signing up...' : 'Signup'}
//           </button>
//         </form>

//         <div className="mt-6 w-full max-w-md">
//           <button
//               onClick={handleGoogleSignIn}
//               disabled={isLoading}
//               className={`w-full flex items-center justify-center py-3 px-4 ${
//                   isLoading ? 'bg-[#33354A]' : 'bg-black hover:bg-[#454766]'
//               } text-white font-medium rounded-md shadow-md focus:outline-none`}
//           >
//             <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-3" />
//             {isLoading ? 'Redirecting...' : 'Sign in with Google'}
//           </button>
//         </div>

//         {message && (
//             <motion.p
//                 className="mt-4 text-center text-sm text-gray-400"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//             >
//               {message}
//             </motion.p>
//         )}
//       </motion.div>
//   );
// }



'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabase/supabase';
import { motion } from 'framer-motion';

export default function SignupPage() {
  // State to hold form input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  // State for messages and loading indicator
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Next.js router
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const checkUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push('/domain-selection');
      }
    };
    checkUserSession();
  }, [router]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission for sign-up
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.firstName + ' ' + formData.lastName,
            company: formData.company,
            phone_number: formData.phoneNumber,
          },
          emailRedirectTo: `${window.location.origin}/domain-selection`,
        },
      });

      if (error) {
        if (error.message.includes('Email already exists')) {
          setMessage('This email address is already registered. Please log in instead.');
        } else {
          setMessage(`Error: ${error.message}`);
        }
      } else if (data.user && !data.user.email_confirmed_at) {
        setMessage(
          `Signup successful! A verification email has been sent to ${formData.email}. Please verify your email to log in.`
        );
      } else {
        setMessage('Signup successful! Redirecting...');
        router.push('/domain-selection');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign-in with Google
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/loading?source=signup`,
        },
      });

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Redirecting to Google...');
      }
    } catch (err) {
      console.error('Error during Google sign-in:', err);
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column: Dark green background with ACS text */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-[#0D331A] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white">ACS</h1>
      </div>

      {/* Right Column: Light green background for the form */}
      <div className="flex-1 flex items-center justify-center bg-[#EAF3EC] py-10 px-6">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Heading */}
          <h2 className="text-3xl font-extrabold text-[#2B7A3F]">Get Started Now</h2>
          <p className="text-sm text-[#2B7A3F] mt-1">
            Enter your Credentials to access your account
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-[#2B7A3F]"
              >
                Name (First)
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter your first name"
                className="mt-1 w-full px-3 py-2 border border-[#C1D8C3] rounded focus:outline-none focus:ring-2 focus:ring-[#2B7A3F] text-gray-700"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-[#2B7A3F]"
              >
                Name (Last)
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter your last name"
                className="mt-1 w-full px-3 py-2 border border-[#C1D8C3] rounded focus:outline-none focus:ring-2 focus:ring-[#2B7A3F] text-gray-700"
              />
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-semibold text-[#2B7A3F]"
              >
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="Optional"
                className="mt-1 w-full px-3 py-2 border border-[#C1D8C3] rounded focus:outline-none focus:ring-2 focus:ring-[#2B7A3F] text-gray-700"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-semibold text-[#2B7A3F]"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Optional"
                className="mt-1 w-full px-3 py-2 border border-[#C1D8C3] rounded focus:outline-none focus:ring-2 focus:ring-[#2B7A3F] text-gray-700"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#2B7A3F]"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="mt-1 w-full px-3 py-2 border border-[#C1D8C3] rounded focus:outline-none focus:ring-2 focus:ring-[#2B7A3F] text-gray-700"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[#2B7A3F]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="mt-1 w-full px-3 py-2 border border-[#C1D8C3] rounded focus:outline-none focus:ring-2 focus:ring-[#2B7A3F] text-gray-700"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 mt-4 font-semibold text-white rounded 
                ${isLoading ? 'bg-[#8FA1D0] cursor-not-allowed' : 'bg-[#2B7A3F] hover:bg-[#256233]'}
              `}
            >
              {isLoading ? 'Signing up...' : 'SIGN UP'}
            </button>
          </form>

          {/* "Or" separator */}
          <div className="my-6 flex items-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Sign in with Google & Apple */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-2">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={`mb-2 sm:mb-0 w-full sm:w-1/2 flex items-center justify-center py-2 border border-[#C1D8C3] rounded text-sm font-medium 
                ${isLoading ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}
              `}
            >
              <img src="/google-icon.svg" alt="Google" className="w-4 h-4 mr-2" />
              {isLoading ? 'Redirecting...' : 'Sign in with Google'}
            </button>
            <button
              disabled={isLoading}
              className={`w-full sm:w-1/2 flex items-center justify-center py-2 border border-[#C1D8C3] rounded text-sm font-medium bg-black text-white
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
              `}
            >
              {/* Apple icon */}
              <svg
                className="w-4 h-4 mr-2 fill-current"
                viewBox="0 0 384 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M318.7 268.7c-.3-37 16.2-64.7 50.6-85.4-19.1-27.9-48.9-44.2-87.4-49.5-36.7-5.1-78.7 22-94.5 22-15.7 0-51.3-21.3-79.7-21.3-59.1.9-122.4 36.3-122.4 109.4 0 34.8 13.1 71.6 29.3 99.6 25.8 44.9 52.5 84.8 90.5 83.4 21.9-.9 31.1-14.2 58.2-14.2 26.8 0 35.2 14.2 58.1 13.8 38.1-.6 62.3-42.8 85-87.2 5.3-10.1 9.6-20.7 13-31.5-34.2-13-49.6-39.4-49.9-74.1zm-48.9-133.7c26.6-31.9 22.4-61.5 21.7-71.5-21 1.2-45.2 14.2-59.8 31.6-15.8 18.5-25.2 41.7-23.1 66.2 22.2 1.7 43.7-9.4 61.2-26.3z" />
              </svg>
              Sign in with Apple
            </button>
          </div>

          {/* Already have an account? */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-700">
              Have an account?{' '}
              <a href="#" className="text-[#2B7A3F] hover:text-[#256233] font-medium">
                Sign In
              </a>
            </p>
          </div>

          {/* Display message (errors, success, etc.) */}
          {message && (
            <motion.p
              className="mt-4 text-center text-sm text-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
