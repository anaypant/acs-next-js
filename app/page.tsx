import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Plus } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-white bg-[radial-gradient(circle,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:40px_40px] relative">
      {/* Grid Background Behind Navbar and Hero */}
      <div
        className="absolute top-0 left-0 w-full bg-gray-50"
        style={{
          height: "250px", // Adjusted height to stop at the "Get Started" button
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          zIndex: 0,
        }}
      ></div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 lg:py-24 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column: Heading, CTA, Features */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              <span className="text-[#127954] italic">Empowering</span>
              <br />
              <span className="text-[#002417]">Realtors with AI</span>
            </h1>

            <div className="relative z-10">
              <Link
                href="/get-started"
                className="inline-flex items-center px-6 py-3 text-white bg-green-700 hover:bg-green-800 rounded-md font-medium transition-colors shadow-lg shadow-green-700/20"
              >
                Get Started
              </Link>
            </div>

            {/* Feature List */}
            <div className="space-y-3">
              {[
                "Pricing Prediction",
                "Virtual Staging",
                "Marketing Optimization",
                "Automated Lead Scoring",
                "Lorem Ipsum",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:border-green-200 hover:bg-green-50/50 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="h-5 w-5 text-[#0e6537]" />
                    <span className="text-green-800 font-semibold">{feature}</span>
                  </div>
                  <Plus className="h-5 w-5 text-[#0e6537]" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Subheading and App Screenshot */}
          <div className="space-y-6">
            <p className="text-[10px] text-green-700 max-w-md mx-auto text-center normal-weight">
              Leverage AI to generate real-time business solutions and make informed decisions faster than ever
            </p>

            <div className="relative flex justify-center md:justify-end">
              <div className="p-[40px] border border-gray-200 bg-white rounded-lg shadow-lg">
                <Image
                  src="/homephone.png"
                  alt="Dashboard analytics interface showing client data and revenue charts"
                  width={450}
                  height={900}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-green-800 mb-4">AI-Powered Real Estate Solutions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-semibold">
              Our platform helps real estate professionals make data-driven decisions with powerful AI tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Market Analysis",
                description: "Get real-time insights on property values and market trends in your area",
              },
              {
                title: "Client Matching",
                description: "AI algorithms match properties with potential buyers based on preferences",
              },
              {
                title: "Automated Marketing",
                description: "Create targeted marketing campaigns that reach the right audience",
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-green-700 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 font-semibold">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-green-800 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-semibold">
              Real estate professionals are transforming their business with our AI tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "ACS has completely transformed how I approach property valuations. The AI predictions are incredibly accurate.",
                author: "Sarah Johnson",
                role: "Real Estate Agent",
              },
              {
                quote:
                  "The virtual staging feature has helped me sell properties 30% faster than before. Clients love seeing the potential.",
                author: "Michael Chen",
                role: "Property Developer",
              },
              {
                quote:
                  "The lead scoring system has saved me countless hours by focusing my attention on the most promising clients.",
                author: "Jessica Williams",
                role: "Broker",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <p className="text-gray-600 mb-4 font-semibold">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-green-800">{testimonial.author}</p>
                  <p className="text-sm text-gray-500 font-semibold">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Ready to transform your real estate business?</h2>
          <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8 font-semibold">
            Join thousands of real estate professionals who are leveraging AI to grow their business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-started"
              className="px-8 py-3 bg-white text-green-800 hover:bg-green-100 rounded-md font-medium transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-green-700 hover:bg-green-600 rounded-md font-medium transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="text-2xl font-bold text-green-800">
                ACS
              </Link>
              <p className="mt-2 text-gray-600 font-semibold">AI-powered solutions for real estate professionals</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/pricing" className="text-gray-600 hover:text-green-700 font-semibold">
                    Pricing Prediction
                  </Link>
                </li>
                <li>
                  <Link href="/staging" className="text-gray-600 hover:text-green-700 font-semibold">
                    Virtual Staging
                  </Link>
                </li>
                <li>
                  <Link href="/marketing" className="text-gray-600 hover:text-green-700 font-semibold">
                    Marketing Optimization
                  </Link>
                </li>
                <li>
                  <Link href="/leads" className="text-gray-600 hover:text-green-700 font-semibold">
                    Lead Scoring
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-green-700 font-semibold">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-600 hover:text-green-700 font-semibold">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-green-700 font-semibold">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-green-700 font-semibold">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-green-700 font-semibold">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-green-700 font-semibold">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-gray-600 hover:text-green-700 font-semibold">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm font-semibold">
            <p>&copy; {new Date().getFullYear()} ACS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

