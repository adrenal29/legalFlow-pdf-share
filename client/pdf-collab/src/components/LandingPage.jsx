import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Share,
  Workflow,
  Check,
  X,
  ChevronDown,
  Menu,
  X as Close,
  MessageSquare,
  Slack,
} from "lucide-react";
import { Link } from "react-router-dom";
const Feature = ({ icon, title, description }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-2">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const PricingPlan = ({ name, price, features, recommended }) => (
  <div
    className={`bg-white p-6 rounded-lg shadow-md ${
      recommended ? "border-2 border-blue-500" : ""
    }`}
  >
    <h3 className="text-2xl font-bold mb-2">{name}</h3>
    <p className="text-3xl font-semibold mb-4">
      ${price}
      <span className="text-sm text-gray-500">/month</span>
    </p>
    <ul className="mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center mb-2">
          {feature.included ? (
            <Check className="w-5 h-5 text-green-500 mr-2" />
          ) : (
            <X className="w-5 h-5 text-red-500 mr-2" />
          )}
          <span className={feature.included ? "" : "text-gray-400"}>
            {feature.text}
          </span>
        </li>
      ))}
    </ul>
    <a href="/dashboard">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full py-2 px-4 rounded ${
          recommended ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {recommended ? "Start Free Trial" : "Get Started"}
      </motion.button>
    </a>
  </div>
);

const Testimonial = ({ quote, author, role }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <p className="text-gray-600 mb-4 italic">"{quote}"</p>
    <p className="font-semibold">{author}</p>
    <p className="text-sm text-gray-500">{role}</p>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border-b border-gray-200 pb-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-lg font-semibold">{question}</h4>
        <ChevronDown
          className={`w-5 h-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-600 mt-2">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileMenu = ({ isOpen, toggleMenu }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-6"
      >
        <a
          href="#features"
          className="block py-2 text-gray-600 hover:text-blue-600"
          onClick={toggleMenu}
        >
          Features
        </a>
        <a
          href="#pricing"
          className="block py-2 text-gray-600 hover:text-blue-600"
          onClick={toggleMenu}
        >
          Pricing
        </a>
        <a
          href="#testimonials"
          className="block py-2 text-gray-600 hover:text-blue-600"
          onClick={toggleMenu}
        >
          Testimonials
        </a>
        <a
          href="#faq"
          className="block py-2 text-gray-600 hover:text-blue-600"
          onClick={toggleMenu}
        >
          FAQ
        </a>
      </motion.div>
    )}
  </AnimatePresence>
);

const IntegrationCard = ({ icon, name, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-2">{name}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-blue-100 to-white font-sans"
    >
      <header className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 relative">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold text-blue-600">DocuFlow</h1>
          <div className="hidden sm:flex space-x-4 text-sm sm:text-base">
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              FAQ
            </a>
          </div>
          <motion.button
            className="sm:hidden z-50"
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <Close /> : <Menu />}
          </motion.button>
        </nav>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-lg py-4 px-6 z-40"
            >
              <div className="flex flex-col space-y-4 mt-16">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-blue-600"
                  onClick={toggleMobileMenu}
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-blue-600"
                  onClick={toggleMobileMenu}
                >
                  Pricing
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-600 hover:text-blue-600"
                  onClick={toggleMobileMenu}
                >
                  Testimonials
                </a>
                <a
                  href="#faq"
                  className="text-gray-600 hover:text-blue-600"
                  onClick={toggleMobileMenu}
                >
                  FAQ
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Transform Your Document Workflow
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience seamless document management with our powerful PDF tools.
          </p>
          <a href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-lg"
            >
              Start Free Trial
            </motion.button>
          </a>
        </motion.div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section id="features" className="mb-20">
          {/* <h2 className="text-3xl font-semibold mb-12 text-center">
            Key Features
          </h2> */}
          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={<Upload className="w-8 h-8 text-blue-500" />}
              title="Secure Document Sharing"
              description="Upload documents with unlimited storage, add real-time comments, and share securely with encrypted access."
            />
            <Feature
              icon={<Workflow className="w-8 h-8 text-green-500" />}
              title="Smart Workflow Management"
              description="Create custom workflows for signing and passing documents between different levels of your organization."
            />
            <Feature
              icon={<Upload className="w-8 h-8 text-purple-500" />}
              title="AI-Powered Categorization"
              description="Automatically categorize documents using OpenAI technology for efficient internal organization."
            />
          </div>
        </section>

        {/* Vector image section */}
        <section className="mb-20 text-center">
          <h2 className="text-3xl font-semibold mb-8">
            Streamline Your Document Workflow
          </h2>
          <div className="max-w-3xl mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 400"
              className="w-full h-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
                <defs>
                  <linearGradient
                    id="bg-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    {/* <stop
                      offset="0%"
                      style={{"stop-color:#f0f9ff;stop-opacity:1"}}
                    />
                    <stop
                      offset="100%"
                      style={{"stop-color:#e0f2fe;stop-opacity:1"}}
                    /> */}
                  </linearGradient>
                </defs>

                {/* <!-- Background --> */}
                <rect
                  x="0"
                  y="0"
                  width="800"
                  height="400"
                  fill="url(#bg-gradient)"
                  rx="20"
                />

                {/* <!-- Central Platform --> */}
                <rect
                  x="300"
                  y="150"
                  width="200"
                  height="100"
                  fill="#3b82f6"
                  rx="10"
                />
                <text
                  x="400"
                  y="205"
                  font-family="Arial, sans-serif"
                  font-size="24"
                  fill="white"
                  text-anchor="middle"
                >
                  DocuFlow
                </text>

                {/* <!-- Upload --> */}
                <circle cx="150" cy="200" r="60" fill="#10b981" />
                <path
                  d="M130 210 L150 190 L170 210 M150 190 L150 230"
                  stroke="white"
                  stroke-width="4"
                  fill="none"
                />
                <text
                  x="150"
                  y="290"
                  font-family="Arial, sans-serif"
                  font-size="16"
                  fill="#333"
                  text-anchor="middle"
                >
                  Upload
                </text>

                {/* <!-- Share --> */}
                <circle cx="650" cy="200" r="60" fill="#6366f1" />
                <path
                  d="M630 210 C630 180, 670 180, 670 210 M650 170 L650 210 M635 185 L650 170 L665 185"
                  stroke="white"
                  stroke-width="4"
                  fill="none"
                />
                <text
                  x="650"
                  y="290"
                  font-family="Arial, sans-serif"
                  font-size="16"
                  fill="#333"
                  text-anchor="middle"
                >
                  Share
                </text>

                {/* <!-- Workflow --> */}
                <circle cx="400" cy="50" r="40" fill="#ef4444" />
                <path
                  d="M380 50 L420 50 M395 40 L380 50 L395 60 M405 40 L420 50 L405 60"
                  stroke="white"
                  stroke-width="3"
                  fill="none"
                />
                <text
                  x="400"
                  y="110"
                  font-family="Arial, sans-serif"
                  font-size="16"
                  fill="#333"
                  text-anchor="middle"
                >
                  Workflow
                </text>

                {/* <!-- AI Categorization --> */}
                <circle cx="400" cy="350" r="40" fill="#8b5cf6" />
                <path
                  d="M385 350 L415 350 M385 340 L385 360 M415 340 L415 360"
                  stroke="white"
                  stroke-width="3"
                  fill="none"
                />
                <path d="M390 345 L410 345 L400 355 Z" fill="white" />
                <text
                  x="400"
                  y="400"
                  font-family="Arial, sans-serif"
                  font-size="16"
                  fill="#333"
                  text-anchor="middle"
                >
                  AI Categorization
                </text>

                {/* <!-- Connecting Lines --> */}
                <path
                  d="M210 200 Q 255 200 300 200"
                  stroke="#333"
                  stroke-width="2"
                  fill="none"
                />
                <path
                  d="M500 200 Q 545 200 590 200"
                  stroke="#333"
                  stroke-width="2"
                  fill="none"
                />
                <path
                  d="M400 110 L400 150"
                  stroke="#333"
                  stroke-width="2"
                  fill="none"
                />
                <path
                  d="M400 250 L400 290"
                  stroke="#333"
                  stroke-width="2"
                  fill="none"
                />

                {/* <!-- Lock for Security --> */}
                <circle cx="740" cy="60" r="30" fill="#facc15" />
                <path
                  d="M730 60 L750 60 L750 75 L730 75 Z M735 60 L735 55 C735 50, 745 50, 745 55 L745 60"
                  stroke="#333"
                  stroke-width="2"
                  fill="none"
                />
                <text
                  x="740"
                  y="110"
                  font-family="Arial, sans-serif"
                  font-size="14"
                  fill="#333"
                  text-anchor="middle"
                >
                  Secure
                </text>
              </svg>
              Last edited just now
            </svg>
          </div>
          {/* <p className="mt-8 text-xl text-gray-600">
            Our intuitive platform connects all your document processes
            seamlessly.
          </p> */}
        </section>

        <section id="pricing" className="mb-20">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            Simple, Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingPlan
              name="Free"
              price="0"
              features={[
                { text: "5 GB Storage", included: true },
                { text: "Basic Document Sharing", included: true },
                { text: "Limited Workflow Management", included: true },
                { text: "Community Support", included: true },
                { text: "AI-Powered Categorization", included: false },
                { text: "Advanced Security Features", included: false },
              ]}
            />
            <PricingPlan
              name="Pro"
              price="5"
              recommended={true}
              features={[
                { text: "Unlimited Storage", included: true },
                { text: "Advanced Document Sharing", included: true },
                { text: "Full Workflow Management", included: true },
                { text: "Priority Support", included: true },
                { text: "AI-Powered Categorization", included: true },
                { text: "Advanced Security Features", included: true },
              ]}
            />
          </div>
        </section>

        {/* <section id="testimonials" className="mb-20">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial
              quote="DocuFlow has revolutionized our document management process. It's intuitive and powerful."
              author="Jane Doe"
              role="CEO, Tech Innovators Inc."
            />
            <Testimonial
              quote="The AI categorization feature saves us hours of manual work every week. Highly recommended!"
              author="John Smith"
              role="Operations Manager, Global Solutions"
            />
            <Testimonial
              quote="Secure sharing and real-time collaboration have made our remote work seamless. Great product!"
              author="Emily Brown"
              role="Team Lead, Remote Experts"
            />
          </div>
        </section> */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            Future Integrations
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <IntegrationCard
              icon={<Slack className="w-8 h-8 text-purple-500" />}
              name="Slack"
              description="Seamlessly share and discuss documents within your Slack channels, enhancing team collaboration."
            />
            <IntegrationCard
              icon={<MessageSquare className="w-8 h-8 text-blue-500" />}
              name="Notion"
              description="Integrate your PDFs directly into Notion pages, creating a central knowledge base for your team."
            />
          </div>
        </section>

        <section id="faq" className="mb-20">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-2xl mx-auto">
            <FAQItem
              question="Is my data secure with DocuFlow?"
              answer="Yes, we use industry-standard encryption and security measures to protect your documents and data. All files are encrypted at rest and in transit, ensuring the highest level of security for your sensitive information."
            />
            <FAQItem
              question="Can I upgrade or downgrade my plan at any time?"
              answer="Absolutely! You can change your plan at any time, and the changes will be reflected in your next billing cycle. There are no long-term commitments, giving you the flexibility to adjust your plan as your needs change."
            />
            <FAQItem
              question="How does the AI-powered categorization work?"
              answer="Our AI uses advanced natural language processing to analyze your documents and automatically categorize them based on content, making organization effortless. The system learns from your organization's specific document types and improves its categorization over time."
            />
          </div>
        </section>

        <section className="text-center mb-20">
          <h2 className="text-3xl font-semibold mb-6">
            Ready to Transform Your Document Workflow?
          </h2>
          <a href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-lg"
            >
              Start Your Free Trial
            </motion.button>
          </a>
        </section>
      </main>

      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <div className="flex flex-wrap justify-center space-x-4 mb-6">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Contact Us
            </a>
          </div>
          <p>&copy; 2024 DocuFlow. All rights reserved.</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default LandingPage;
