import loc from "../assets/location.png";
import mail from "../assets/mail.png";
import phoneCall from "../assets/phone-call.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* <div className="bg-img"> */}
      <div className="content">
        <div className="main">
          <div className="main-content">
            <div className="head">
              Vishwakarma Institute of Technology, Pune
            </div>

            <div className="info-section">
              <div className="vit-info">
                Welcome to VIT Pune's premier student community platform.
                Connect with diverse clubs, explore your passions, and become
                part of a vibrant campus life. Join innovative minds, develop
                new skills, and create lasting memories with fellow students.
              </div>

              <div className="explore-btn-div">
                <Link to="/clubs">
                  <button className="explore-btn">Explore Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* CONTACT US */}
      <div className="contact-us">
        <div className="contact-head">Contact Us</div>
        <div className="contact-text">
          Have questions? We'd love to hear from you.
        </div>

        <div className="contact-info">
          <div className="send-msg">
            <p className="input-head">Name</p>
            <input className="cont-input" placeholder="Your Name" />

            <p className="input-head">Email</p>
            <input
              className="cont-input"
              placeholder="your.email@vit.edu"
              type="email"
            />

            <p className="input-head">Message</p>
            <textarea
              id="msg-input"
              className="cont-input"
              placeholder="Tell us how can we help you..."
              type="text"
            ></textarea>

            <button id="send-btn">Send message</button>
          </div>

          <div className="gitouch">
            <div className="git-head">Get in Touch</div>
            <div className="our-info">
              <div className="info-text">
                <div className="git-icon">
                  <img className="icons" src={loc} />
                </div>
                <div className="icon-info">
                  <p>Address</p>
                  <p className="info">
                    Vishwakarma Institute of Technology 666, Upper Indiranagar,
                    Bibwewadi Pune, Maharashtra 411037
                  </p>
                </div>
              </div>
              <div className="info-text">
                <div className="git-icon">
                  <img className="icons" src={mail} />
                </div>
                <div className="icon-info">
                  <p>Email</p>
                  <p className="info">vit.connect@vit.edu</p>
                </div>
              </div>
              <div className="info-text">
                <div className="git-icon">
                  <img className="icons" src={phoneCall} />
                </div>
                <div className="icon-info">
                  <p>Phone</p>
                  <p className="info">+91 20 2437 XXXX</p>
                </div>
              </div>
            </div>
            <div className="ohours">
              <p className="ohours-text" id="ohours-head">
                Office Hours
              </p>
              <p className="ohours-text">Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p className="ohours-text">Saturday: 9:00 AM - 1:00 PM</p>
              <p className="ohours-text">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
