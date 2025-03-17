"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../utils/supabase/supabase"
import { motion } from "framer-motion"
import Image from "next/image"

export default function SignupPage() {
  // State to hold form input values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    phoneNumber: "",
    email: "",
    password: "",
  })

  // State for messages and loading indicator
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Next.js router
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const checkUserSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.push("/domain-selection")
      }
    }
    checkUserSession()
  }, [router])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  // Handle form submission for sign-up
  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
    setIsLoading(true)

    try {
      // NOTE: I've kept the original functionality but we're only showing name, email, and password fields
      // in the UI according to the design. The firstName value will contain the full name now.
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            // Using firstName field to store the full name as per the design
            full_name: formData.firstName,
            company: formData.company,
            phone_number: formData.phoneNumber,
          },
          emailRedirectTo: `${window.location.origin}/domain-selection`,
        },
      })

      if (error) {
        if (error.message.includes("Email already exists")) {
          setMessage("This email address is already registered. Please log in instead.")
        } else {
          setMessage(`Error: ${error.message}`)
        }
      } else if (data.user && !data.user.email_confirmed_at) {
        setMessage(
          `Signup successful! A verification email has been sent to ${formData.email}. Please verify your email to log in.`,
        )
      } else {
        setMessage("Signup successful! Redirecting...")
        router.push("/domain-selection")
      }
    } catch (err) {
      console.error("Error during signup:", err)
      setMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle sign-in with Google
  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setMessage("")

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/loading?source=signup`,
        },
      })

      if (error) {
        setMessage(`Error: ${error.message}`)
      } else {
        setMessage("Redirecting to Google...")
      }
    } catch (err) {
      console.error("Error during Google sign-in:", err)
      setMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle sign-in with Apple
  const handleAppleSignIn = async () => {
    setIsLoading(true)
    setMessage("")

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: {
          redirectTo: `${window.location.origin}/loading?source=signup`,
        },
      })

      if (error) {
        setMessage(`Error: ${error.message}`)
      } else {
        setMessage("Redirecting to Apple...")
      }
    } catch (err) {
      console.error("Error during Apple sign-in:", err)
      setMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Column: Green background with ACS logo */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/greenblur.png"
            alt="ACS Background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[#0D331A]/60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-7xl font-bold text-white tracking-tight">ACS</h1>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="w-full lg:w-[55%] bg-[#E9F3EC] flex items-center justify-center p-6">
        <motion.div
          className="w-full max-w-md px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile Logo (visible only on mobile) */}
          <div className="flex justify-center mb-8 lg:hidden">
            <div className="bg-[#0D331A] rounded-full w-16 h-16 flex items-center justify-center">
              <h1 className="text-2xl font-bold text-white">ACS</h1>
            </div>
          </div>

          {/* Heading - Exactly as in the image */}
          <h2 className="text-4xl font-bold text-[#0D331A] text-center">Get Started Now</h2>
          <p className="text-[#0D331A] mt-2 mb-8 text-center">Enter your Credentials to access your account</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name - Single field as shown in the image */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[#0D331A] mb-2">
                Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-md border border-[#0D331A]/30 focus:outline-none focus:ring-1 focus:ring-[#0D331A] text-gray-700 bg-white"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#0D331A] mb-2">
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
                className="w-full px-4 py-3 rounded-md border border-[#0D331A]/30 focus:outline-none focus:ring-1 focus:ring-[#0D331A] text-gray-700 bg-white"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#0D331A] mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Name"
                className="w-full px-4 py-3 rounded-md border border-[#0D331A]/30 focus:outline-none focus:ring-1 focus:ring-[#0D331A] text-gray-700 bg-white"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 mt-4 font-medium text-white rounded-md text-lg uppercase
                ${isLoading ? "bg-[#2B7A3F]/70 cursor-not-allowed" : "bg-[#2B7A3F]"}
              `}
            >
              {isLoading ? "Signing up..." : "SIGN UP"}
            </button>
          </form>

          {/* "Or" separator - Styled exactly as in the image */}
          <div className="my-6 flex items-center">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 px-2 py-1 bg-[#2B7A3F] text-white text-xs rounded">Or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Sign in with Google & Apple - Styled as in the image */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex items-center justify-center py-2.5 px-4 border border-[#0D331A]/30 rounded-md text-sm font-medium text-[#0D331A] bg-white"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </button>
            <button
              onClick={handleAppleSignIn}
              disabled={isLoading}
              className="flex items-center justify-center py-2.5 px-4 border border-[#0D331A]/30 rounded-md text-sm font-medium text-[#0D331A] bg-white"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.3,2c0.3,0,0.7,0,1,0.1c1.8,0.1,3.3,1.2,4.2,2.7c-1.9,1.1-2.8,3-2.7,5.1c0.1,1.9,1.1,3.5,2.7,4.4 c-0.7,1.7-1.7,3.3-3,4.6c-0.9,0.9-1.7,1.3-2.8,1.3c-0.9,0-1.5-0.3-2.1-0.5c-0.6-0.3-1.3-0.6-2.4-0.6c-1.1,0-1.9,0.3-2.5,0.6 c-0.6,0.3-1.1,0.5-1.8,0.5c-1.3,0-2.3-0.8-3.1-1.7C2.1,15.9,1,12.9,1,10c0-4.4,2.8-6.8,5.6-6.8c1,0,1.9,0.3,2.6,0.6 C9.9,4,10.5,4.3,11.3,4.3c0.7,0,1.3-0.3,2-0.5C14,3.5,14.9,3.1,16.3,2z M16.9,0C16.5,2.4,14.8,4,12.7,3.9 c-0.2-1.6,0.5-3.2,1.7-4.3C15.5-1.3,17.4-0.3,16.9,0z"
                  fill="#000000"
                />
              </svg>
              Sign in with Apple
            </button>
          </div>

          {/* Already have an account? */}
          <div className="mt-8 text-center">
            <p className="text-[#0D331A]">
              Have an account?{" "}
              <a href="/login" className="text-[#2B7A3F] font-medium">
                Sign In
              </a>
            </p>
          </div>

          {/* Display message (errors, success, etc.) */}
          {message && (
            <motion.div
              className="mt-6 p-3 rounded-md bg-red-50 border border-red-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-center text-sm text-red-600">{message}</p>
            </motion.div>
          )}

          {/* 
            NOTE: The following fields are hidden as they're not in the design image,
            but the functionality is preserved in the form submission handler.
            - Last Name
            - Company
            - Phone Number
          */}
          <div className="hidden">
            <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} />
            <input id="company" name="company" type="text" value={formData.company} onChange={handleChange} />
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

