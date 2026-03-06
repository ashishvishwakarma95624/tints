# Dsp-Tints — React Frontend

Pure React + Vite + Tailwind CSS website.  
**No backend. No database.** EmailJS sends emails directly from the browser when the contact form is submitted.

---

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:5173
```

---

## Email Setup (5 minutes)

Emails are sent via **EmailJS** — free up to 200 emails/month.

### Step 1 — Create a free account
Go to [emailjs.com](https://www.emailjs.com) and sign up.

### Step 2 — Add an Email Service
- Dashboard → Email Services → Add New Service
- Connect Gmail, Outlook, or any SMTP
- Copy the **Service ID**

### Step 3 — Create TWO Email Templates

**Template 1: Client Confirmation** (sent to the person who fills the form)
```
Subject: We received your message, {{to_name}}!

Hi {{to_name}},

Thanks for reaching out to Dsp-Tints. We've received your message and will get back to you within a few hours.

Subject: {{subject}}
Your message: {{message}}

Best regards,
The Dsp-Tints Team
```

**Template 2: Business Notification** (sent to you)
```
Subject: New contact form submission from {{from_name}}

Name:    {{from_name}}
Email:   {{from_email}}
Phone:   {{from_phone}}
Subject: {{subject}}

Message:
{{message}}
```

### Step 4 — Get your Public Key
Account → General → Public Key

### Step 5 — Update the config

Open `src/hooks/useEmail.js` and replace:

```js
export const EMAILJS = {
  PUBLIC_KEY:           'AbCdEfGhIjKlMnOp',   // ← your public key
  SERVICE_ID:           'service_abc123',        // ← your service ID
  CLIENT_TEMPLATE_ID:   'template_client_abc',   // ← Template 1 ID
  BUSINESS_TEMPLATE_ID: 'template_biz_abc',      // ← Template 2 ID
  BUSINESS_EMAIL:       'you@yourdomain.com',    // ← your email
};
```

That's it — emails will now send when anyone submits the contact form.

---

## Project Structure

```
src/
├── main.jsx                     # App entry point
├── App.jsx                      # All routes
├── styles/globals.css           # Tailwind + custom CSS
├── data/index.js                # All content (services, blog, testimonials)
├── hooks/useEmail.js            # EmailJS config ← EDIT THIS
├── components/
│   ├── layout/
│   │   ├── Layout.jsx           # Wraps all pages
│   │   ├── Navbar.jsx           # Fixed navigation
│   │   └── Footer.jsx           # Footer + ticker
│   └── ui/index.jsx             # Stars, PageHero components
└── pages/
    ├── Home.jsx
    ├── Services.jsx
    ├── ServiceDetail.jsx
    ├── Pricing.jsx
    ├── About.jsx
    ├── Gallery.jsx
    ├── Blog.jsx
    ├── BlogPost.jsx
    ├── Contact.jsx              # ← Email sends from here
    └── NotFound.jsx
```

## Customisation

**Business info** (phone, address, email, hours):
- `src/components/layout/Navbar.jsx` — phone number in nav
- `src/components/layout/Footer.jsx` — address & email
- `src/pages/Contact.jsx` — address, phone, email, hours

**Services, Pricing, Blog, Testimonials:**
- Edit `src/data/index.js` — all content is in one file

**Colours & Fonts:**
- `tailwind.config.js` — gold & ink colour tokens
- `index.html` — Google Fonts CDN link

## Build for Production

```bash
npm run build
# Output → dist/
```
