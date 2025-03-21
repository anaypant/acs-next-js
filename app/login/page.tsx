"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../utils/supabase/supabase"
import { motion } from "framer-motion"
import Image from "next/image"

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const router = useRouter()

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        setMessage(`Error: ${error.message}`)
      } else if (data.user && !data.user.email_confirmed_at) {
        setMessage("Error: Please verify your email before logging in.")
        await supabase.auth.signOut()
      } else {
        setMessage("Login successful!")

        // Create session on your server
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensures cookies are saved
          body: JSON.stringify({
            jwt: data.session.access_token, // Supabase JWT token
            email: formData.email,
            uid: data.user.id, // Supabase user ID
          }),
        })

        if (response.ok) {
          const responseData = await response.json()
          setMessage("Session created successfully.")
          router.push("/dashboard")
        } else {
          const errorData = await response.json()
          setMessage(`Login failed: ${errorData.message}`)
        }
      }
    } catch (err) {
      console.error(err)
      setMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle "Forgot Password"
  const handleForgotPassword = async () => {
    setIsResettingPassword(true)
    setMessage("")

    if (!formData.email) {
      setMessage("Please enter your email address to reset your password.")
      setIsResettingPassword(false)
      return
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        setMessage(`Error: ${error.message}`)
      } else {
        setMessage("Password reset email sent! Check your inbox.")
      }
    } catch (err) {
      console.error(err)
      setMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsResettingPassword(false)
    }
  }

  // Handle sign in with Google
  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setMessage("")

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/loading?source=login`,
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

  // Handle sign in with Apple
  const handleAppleSignIn = async () => {
    setIsLoading(true)
    setMessage("")

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: {
          redirectTo: `${window.location.origin}/loading?source=login`,
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
    <div className="min-h-screen w-full flex items-center justify-center relative">
      {/* Background Image */}
      <Image src="/greenblur.png" alt="Background" fill priority className="object-cover z-0" quality={100} />

      {/* Content */}
      <div className="w-full max-w-md px-6 py-12 flex flex-col items-center z-10 relative">
        {/* Heading */}
        <motion.h1
          className="text-5xl font-bold text-white mb-2 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome Back!
        </motion.h1>

        <motion.p
          className="text-white text-base mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Enter your Credentials to access your account
        </motion.p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white text-base mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-md border border-[#2B7A3F] bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#2B7A3F]"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-white text-base mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-md border border-[#2B7A3F] bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#2B7A3F]"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 text-lg font-bold rounded-md transition-colors
              ${isLoading ? "bg-opacity-70 cursor-not-allowed" : ""} bg-[#F0F9F0] text-[#0D331A] hover:bg-white`}
          >
            {isLoading ? "Logging in..." : "SIGN UP"}
          </button>
        </form>

        {/* Forgot Password */}
        <button
          onClick={handleForgotPassword}
          disabled={isResettingPassword}
          className="mt-4 text-white hover:underline focus:outline-none"
        >
          {isResettingPassword ? "Sending reset email..." : "Forgot Password?"}
        </button>

        {/* Divider */}
        <div className="w-full flex items-center my-8">
          <div className="flex-grow h-px bg-[#2B7A3F]"></div>
          <span className="px-4 text-white">Or</span>
          <div className="flex-grow h-px bg-[#2B7A3F]"></div>
        </div>

        {/* Social Sign In Buttons */}
        <div className="w-full space-y-4">
          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-md bg-white text-black border border-[#2B7A3F] hover:bg-gray-100 transition-colors"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path
                  fill="#4285F4"
                  d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                />
                <path
                  fill="#34A853"
                  d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                />
                <path
                  fill="#FBBC05"
                  d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                />
                <path
                  fill="#EA4335"
                  d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                />
              </g>
            </svg>
            Sign in with Google
          </button>

          {/* Apple Sign In */}
          <button
            onClick={handleAppleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-md bg-white text-black border border-[#2B7A3F] hover:bg-gray-100 transition-colors"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
            </svg>
            Sign in with Apple
          </button>
        </div>

        {/* Sign In Link */}
        <div className="mt-8 text-center">
          <p className="text-white">
            Have an account?{" "}
            <a href="/signin" className="text-[#4ADE80] hover:underline">
              Sign In
            </a>
          </p>
        </div>

        {/* Display any success/error messages */}
        {message && (
          <motion.div
            className="mt-6 p-3 w-full text-center text-white bg-opacity-20 bg-white rounded-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.div>
        )}
      </div>
    </div>
  )
}

