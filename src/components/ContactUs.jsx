import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Mail, Phone, MapPin, MessageCircle, CheckCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        message: ""
      });

      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white px-6 md:px-20 py-14 relative">
      
      {/* Back Arrow */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 text-[#FF6B01] hover:text-white transition duration-300"
        title="Go Back"
      >
        <ArrowLeft size={28} />
      </button>

      {/* Success Notification */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-5 right-5 bg-green-600/90 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
        >
          <CheckCircle size={20} />
          <span>Message Sent! Thanks for contacting us.</span>
        </motion.div>
      )}

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">

        {/* Left Side */}
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="lg:w-1/2"
        >
          <h1 className="text-4xl font-bold text-[#FF6B01] mb-6">Contact Us</h1>

          <p className="text-lg text-zinc-300 mb-8">
            Got questions, feedback, or just want to say hi? Fill out the form below and we'll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-zinc-300 mb-2 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B01]"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-zinc-300 mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B01]"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-zinc-300 mb-2 font-medium">Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-[#1c1c1c] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B01]"
                placeholder="Write your message..."
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className={`${isSubmitting ? 'bg-[#FF6B01]/70' : 'bg-[#FF6B01]'} text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 w-full justify-center`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z">
                    </path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </motion.button>

          </form>
        </motion.div>

        {/* Right Side */}
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="lg:w-1/2 flex items-center"
        >
          <div className="bg-gradient-to-br from-[#111111] to-[#1c1c1c] border border-[#FF6B01]/30 rounded-2xl p-8 w-full shadow-xl">

            <div className="flex items-center gap-3 mb-8">
              <div className="bg-[#FF6B01]/20 p-3 rounded-full">
                <MessageCircle className="text-[#FF6B01]" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Let's Connect</h2>
            </div>

            <div className="space-y-6">

              <div className="flex items-start gap-4">
                <div className="bg-[#FF6B01]/10 p-2 rounded-full mt-1">
                  <Mail className="text-[#FF6B01]" size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-zinc-300">Email Us</h3>
                  <p className="text-zinc-400">support@bingebuddy.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#FF6B01]/10 p-2 rounded-full mt-1">
                  <Phone className="text-[#FF6B01]" size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-zinc-300">Call Us</h3>
                  <p className="text-zinc-400">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#FF6B01]/10 p-2 rounded-full mt-1">
                  <MapPin className="text-[#FF6B01]" size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-zinc-300">Visit Us</h3>
                  <p className="text-zinc-400">123 Cinema St, Movieville</p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#FF6B01]/20">
                <h3 className="font-medium text-zinc-300 mb-3">Business Hours</h3>
                <p className="text-zinc-400">Monday - Friday: 9AM - 6PM</p>
                <p className="text-zinc-400">Saturday: 10AM - 4PM</p>
                <p className="text-zinc-400">Sunday: Closed</p>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ContactUs;