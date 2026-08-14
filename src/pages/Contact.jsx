

function Contact() {
  return (
    <section id="contact">
      <h2>Contact Me</h2>

      <div className="contact-container">
        
        <article>
          <h3>Direct Details</h3>
          <div className="contact-list">
            <div className="contact-item">
              <span className="contact-label">Email</span>
              <a href="mailto:madaniritish2007@gmail.com" className="contact-link">
                madaniritish2007@gmail.com
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">LinkedIn</span>
              <a
                href="https://www.linkedin.com/in/madani-ritish-639a81373/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                Madani Ritish
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Mobile</span>
              <span className="contact-value">xxxx</span>
            </div>
          </div>
        </article>

       
        <article>
          <h3>Send a Message</h3>
          <form >
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" required></textarea>

            <button type="submit">Send</button>
          </form>
        </article>
      </div>
    </section>
  );
}

export default Contact;
