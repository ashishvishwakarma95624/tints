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
      <PageHero
        label="Get In Touch"
        title="Let's <em class='text-gold not-italic'>Talk</em>"
        subtitle="We're here Monday–Saturday 8AM–6PM. Every message gets a personal response."
        breadcrumbs={['Home', 'Contact']}
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-20">
          {/* INFO COLUMN */}
          <div>
            <div className="section-tag">Find Us</div>
            <h2 className="font-serif font-light text-4xl mb-10">
              Visit Our <em className="text-gold not-italic">Shop</em>
            </h2>

            <div className="space-y-7 mb-12">
              {[
                [MapPin, 'Address', 'Windsor, ON, Canada · Essex, ON, Canada'],
                [Phone, 'Phone', '+1 (555) 123-4567'],
                [Mail, 'Email', 'ashishvishwakarma95624@gmail.com'],
                [Clock, 'Hours', 'Mon–Fri: 8AM – 6PM\nSaturday: 9AM – 4PM\nSunday: Closed'],
              ].map(([Icon, label, val]) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-[10.5px] font-bold tracking-[.18em] uppercase text-gray-400 mb-1">
                      {label}
                    </div>
                    <div className="text-[14px] text-gray-700 leading-relaxed font-light whitespace-pre-line">
                      {val}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FORM COLUMN */}
          <div>
            {done ? (
              /* Success state */
              <div className="text-center py-16">
                <CheckCircle size={68} className="text-gold mx-auto mb-5" />
                <h3 className="font-serif text-3xl mb-3">Message Sent!</h3>
                <p className="text-gray-500 font-light mb-2">
                  A confirmation has been sent to <strong>{form.email}</strong>.
                </p>
                <p className="text-gray-500 font-light mb-8">
                  We'll get back to you within a few hours.
                </p>
                <button
                  onClick={resetForm}
                  className="btn-outline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="section-tag">Send a Message</div>
                <h2 className="font-serif font-light text-4xl mb-10">
                  Quick <em className="text-gold not-italic">Enquiry</em>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label-field">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        required
                        className="input-field"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange('name')}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="label-field">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        className="input-field"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={handleChange('email')}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="label-field">Phone Number</label>
                      <input
                        type="tel"
                        className="input-field"
                        placeholder="(555) 000-0000"
                        value={form.phone}
                        onChange={handleChange('phone')}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="label-field">Subject</label>
                      <select
                        className="input-field"
                        value={form.subject}
                        onChange={handleChange('subject')}
                        disabled={loading}
                      >
                        {SUBJECTS.map(s => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="label-field">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      required
                      rows="5"
                      className="input-field resize-none"
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={handleChange('message')}
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed"
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

                  <p className="text-center text-[12px] text-gray-400">
                    🔒 Your information is private and never shared with third parties.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="mb-2">
        <div className="bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200 overflow-hidden">
          <iframe
            src="https://www.google.com/maps?q=Canada&output=embed"
            width="100%"
            height="500px"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Canada Map"
          />
        </div>
      </section>
    </>
  );
}