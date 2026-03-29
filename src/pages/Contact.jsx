import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { PageHero } from '../components/ui';
// import { sendFormEmails } from '../hooks/useEmail';
import { sendFormEmails } from '../hooks/useExpressEmail';
const SUBJECTS = ['General Inquiry', 'Request a Quote', 'Book Appointment', 'Question about a Service', 'Feedback', 'Other'];

export default function Contact() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!form.email.trim()) {
      toast.error('Please enter your email');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!form.message.trim()) {
      toast.error('Please enter your message');
      return false;
    }
    if (form.message.length < 10) {
      toast.error('Message must be at least 10 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    const toastId = toast.loading('Sending your message...');

    try {
      await sendFormEmails({
        clientEmail: form.email,
        clientName: form.name,
        templateVars: {
          from_phone: form.phone || 'Not provided',
          subject: form.subject,
          message: form.message,
          date: new Date().toLocaleString(),
        },
      });

      toast.dismiss(toastId);
      toast.success('Message sent! We\'ll get back to you soon.', {
        duration: 5000,
      });
      setDone(true);
    } catch (err) {
      toast.dismiss(toastId);
      toast.error('Failed to send. Please call us directly or try again.', {
        duration: 5000,
      });
      console.error('Email send error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDone(false);
    setForm({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    });
  };

  return (
    <>
      {/* Contact Section */}
      <section className="py-24 bg-[#05070B]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-20">
          {/* INFO COLUMN */}
          <div>
            <div className="section-tag text-[#009fff]">Find Us</div>
            <h2 className="font-serif font-light text-4xl mb-10 text-white">
              Visit Our <em className="text-[#009fff] not-italic">Shop</em>
            </h2>

            <div className="space-y-7 mb-12">
              {[
                [MapPin, 'Address', 'Windsor, ON, Canada · Essex, ON, Canada'],
                [Phone, 'Phone', '+1 (555) 123-4567'],
                [Mail, 'Email', 'ashishvishwakarma95624@gmail.com'],
                [Clock, 'Hours', 'Mon–Fri: 8AM – 6PM\nSaturday: 9AM – 4PM\nSunday: Closed'],
              ].map(([Icon, label, val]) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0F1726] flex items-center justify-center shrink-0 border border-[#009fff]/20">
                    <Icon size={17} className="text-[#009fff]" />
                  </div>
                  <div>
                    <div className="text-[10.5px] font-bold tracking-[.18em] uppercase text-[#f7f8f9] mb-1">
                      {label}
                    </div>
                    <div className="text-[14px] text-[#f7f8f9] leading-relaxed font-light whitespace-pre-line">
                      {val}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours Card */}
            <div className="bg-[#0F1726] rounded-xl p-6 border border-[#009fff]/10">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Clock size={18} className="text-[#009fff]" />
                Business Hours
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#f7f8f9]">
                  <span>Monday – Friday</span>
                  <span className="text-white font-medium">8AM – 6PM</span>
                </div>
                <div className="flex justify-between text-[#f7f8f9]">
                  <span>Saturday</span>
                  <span className="text-white font-medium">9AM – 4PM</span>
                </div>
                <div className="flex justify-between text-[#f7f8f9]">
                  <span>Sunday</span>
                  <span className="text-[#009fff] font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* FORM COLUMN */}
          <div>
            {done ? (
              /* Success state */
              <div className="text-center py-16 bg-[#0F1726] rounded-2xl border border-[#009fff]/10">
                <CheckCircle size={68} className="text-[#009fff] mx-auto mb-5" />
                <h3 className="font-serif text-3xl mb-3 text-white">Message Sent!</h3>
                <p className="text-[#f7f8f9] font-light mb-2">
                  A confirmation has been sent to <strong className="text-white">{form.email}</strong>.
                </p>
                <p className="text-[#f7f8f9] font-light mb-8">
                  We'll get back to you within a few hours.
                </p>
                <button
                  onClick={resetForm}
                  className="border border-[#009fff] text-[#009fff] px-8 py-3 rounded-lg text-sm font-semibold hover:bg-[#009fff] hover:text-[#05070B] transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="section-tag text-[#009fff]">Send a Message</div>
                <h2 className="font-serif font-light text-4xl mb-10 text-white">
                  Quick <em className="text-[#009fff] not-italic">Enquiry</em>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label-field text-[#f7f8f9]">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        required
                        className="w-full bg-[#0F1726] border border-[#009fff]/20 rounded-lg px-4 py-3 text-white placeholder-[#f7f8f9]/50 focus:border-[#009fff] focus:outline-none transition-colors"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange('name')}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="label-field text-[#f7f8f9]">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        className="w-full bg-[#0F1726] border border-[#009fff]/20 rounded-lg px-4 py-3 text-white placeholder-[#f7f8f9]/50 focus:border-[#009fff] focus:outline-none transition-colors"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={handleChange('email')}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label-field text-[#f7f8f9]">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full bg-[#0F1726] border border-[#009fff]/20 rounded-lg px-4 py-3 text-white placeholder-[#f7f8f9]/50 focus:border-[#009fff] focus:outline-none transition-colors"
                        placeholder="(555) 000-0000"
                        value={form.phone}
                        onChange={handleChange('phone')}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="label-field text-[#f7f8f9]">Subject</label>
                      <select
                        className="w-full bg-[#0F1726] border border-[#009fff]/20 rounded-lg px-4 py-3 text-white focus:border-[#009fff] focus:outline-none transition-colors"
                        value={form.subject}
                        onChange={handleChange('subject')}
                        disabled={loading}
                      >
                        {SUBJECTS.map(s => (
                          <option key={s} className="bg-[#0F1726]">{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="label-field text-[#f7f8f9]">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      required
                      rows="5"
                      className="w-full bg-[#0F1726] border border-[#009fff]/20 rounded-lg px-4 py-3 text-white placeholder-[#f7f8f9]/50 focus:border-[#009fff] focus:outline-none transition-colors resize-none"
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={handleChange('message')}
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#009fff] text-[#05070B] py-4 rounded-lg text-sm font-semibold hover:bg-[#007BFF] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      'Send Message →'
                    )}
                  </button>

                  <p className="text-center text-[12px] text-[#f7f8f9]">
                    🔒 Your information is private and never shared with third parties.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-[#0A0F1C] py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#009fff]" />
              <span className="text-[11px] font-bold tracking-[.2em] uppercase text-[#009fff]">Our Location</span>
              <span className="w-8 h-px bg-[#009fff]" />
            </div>
            <h2 className="font-serif font-light text-4xl text-white">
              Find Us in <em className="text-[#009fff] not-italic">Windsor-Essex</em>
            </h2>
          </div>
          
          <div className="bg-[#0F1726] rounded-2xl overflow-hidden border border-[#009fff]/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191654.23321510364!2d-83.15983195!3d42.2318305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b2b0c1e5b5b5b%3A0x5b5b5b5b5b5b5b5b!2sWindsor%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              width="100%"
              height="500px"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Windsor-Essex Map"
              className="filter brightness-90"
            />
          </div>
          
          {/* Service Areas */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-[#0F1726] rounded-xl p-6 border border-[#009fff]/10">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <MapPin size={18} className="text-[#009fff]" />
                Windsor Location
              </h3>
              <p className="text-[#f7f8f9] text-sm mb-2">123 Riverside Drive</p>
              <p className="text-[#f7f8f9] text-sm">Windsor, ON N9A 1A2</p>
            </div>
            <div className="bg-[#0F1726] rounded-xl p-6 border border-[#009fff]/10">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <MapPin size={18} className="text-[#009fff]" />
                Essex Location
              </h3>
              <p className="text-[#f7f8f9] text-sm mb-2">456 Talbot Street</p>
              <p className="text-[#f7f8f9] text-sm">Essex, ON N8M 1C8</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}