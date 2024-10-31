import React from 'react';
import './Support.css';
import Footer from './Footer';

const Support = () => {
    return (
        <div className="support-page">
            <header className="support-header">
                <h1 className="support-title">Support</h1>
                <p className="support-subtitle">We're here to help you with any questions or issues.</p>
            </header>

            {/* Contact Form */}
            <section className="contact-form-section">
                <h2>Contact Us</h2>
                <form className="support-form">
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea rows="5" placeholder="Your Message" required></textarea>
                    <button type="submit" className="submit-button">Send Message</button>
                </form>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-item">
                    <p className="faq-question">How can I reset my password?</p>
                    <p className="faq-answer">To reset your password, go to the login page and click 'Forgot Password'.</p>
                </div>
                <div className="faq-item">
                    <p className="faq-question">Where can I view my saved blogs?</p>
                    <p className="faq-answer">You can view your saved blogs in the 'Saved' section under your profile.</p>
                </div>
                {/* Additional FAQ items can be added here */}
            </section>

            {/* Resources Section */}
            <section className="resources-section">
                <h2>Additional Resources</h2>
                <ul>
                    <li><a href="#">User Guide</a></li>
                    <li><a href="#">Community Forum</a></li>
                    <li><a href="#">Contact Support</a></li>
                </ul>
            </section>

            <Footer />
        </div>
    );
};

export default Support;
