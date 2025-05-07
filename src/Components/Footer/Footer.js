import { faFacebookF, faTwitter, faLinkedinIn, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import './Footer.css';
import FooterCol from './FooterCol';
import sjsuLogo from '../../assets/images/logos/SpartanSpirit-blue_[web].png';
// SJSU Health Assistant-frontend/src/assets/images/logos/SpartanSpirit-blue_[web].png
const Footer = () => {
	const [ modalIsOpen, setModalIsOpen ] = useState(false);

	const healthServices = [
		{ name: 'Virtual Consultations', link: '/services' },
		{ name: 'Make an Appointment', link: '/appointment' },
		{ name: 'Mental Health Services', link: '/services' },
		{ name: 'Preventive Care', link: '/services' },
		{ name: 'Wellness Programs', link: '/services' },
		{ name: 'COVID-19 Resources', link: '/services' }
	];

	const resources = [
		{ name: 'Student Health 101', link: '/resources' },
		{ name: 'Health Insurance', link: '/resources' },
		{ name: 'Wellness Center', link: '/resources' },
		{ name: 'Immunization Records', link: '/resources' },
		{ name: 'Health Education', link: '/resources' },
		{ name: 'FAQs', link: '/resources' }
	];

	const contactInfo = [
		{ name: 'One Washington Square, San Jose, CA 95192', link: 'https://www.google.com/maps/place/San+Jose+State+University' },
		{ name: 'telehealth@sjsu.edu', link: 'mailto:telehealth@sjsu.edu' },
		{ name: '(408) 924-3000', link: 'tel:+14089243000' },
		{ name: 'Monday-Friday: 8:00 AM - 5:00 PM', link: '/contact' }
	];

	const quickLinks = [
		{ name: 'SJSU Main Website', link: 'https://www.sjsu.edu' },
		{ name: 'Student Health Center', link: 'https://www.sjsu.edu/studenthealth/' },
		{ name: 'Counseling Services', link: 'https://www.sjsu.edu/counseling/' },
		{ name: 'Emergency Information', link: '/emergency' },
		{ name: 'Admin Login', link: '/dashboard' }
	];
	return (
		<>
			<footer className="footer-area">
				{/* Top section with logo and university name */}
				<div className="footer-top">
					<div className="container">
						<img src={sjsuLogo} alt="SJSU Logo" className="footer-logo" />
						<h2 className="footer-university-name">San José State University</h2>
						
						{/* Social media icons */}
						<ul className="social-media list-inline">
							<li className="list-inline-item">
								<a href="https://www.facebook.com/sanjosestate" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
									<FontAwesomeIcon className="icon" icon={faFacebookF} />
								</a>
							</li>
							<li className="list-inline-item">
								<a href="https://twitter.com/SJSU" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
									<FontAwesomeIcon className="icon" icon={faTwitter} />
								</a>
							</li>
							<li className="list-inline-item">
								<a href="https://www.instagram.com/sjsu/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
									<FontAwesomeIcon className="icon" icon={faInstagram} />
								</a>
							</li>
							<li className="list-inline-item">
								<a href="https://www.linkedin.com/school/san-jose-state-university/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
									<FontAwesomeIcon className="icon" icon={faLinkedinIn} />
								</a>
							</li>
							<li className="list-inline-item">
								<a href="https://www.youtube.com/user/sjsu" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
									<FontAwesomeIcon className="icon" icon={faYoutube} />
								</a>
							</li>
						</ul>
					</div>
				</div>
				
				{/* Middle section with columns */}
				<div className="footer-middle">
					<div className="container">
						<div className="row">
							<FooterCol key={1} menuTitle="Health Services" menuItems={healthServices} />
							<FooterCol key={2} menuTitle="Resources" menuItems={resources} />
							<FooterCol key={3} menuTitle="Contact Us" menuItems={contactInfo} />
							<FooterCol key={4} menuTitle="Quick Links" menuItems={quickLinks}>
								<div className="mt-4">
									<button 
										className="admin-panel-button" 
										onClick={() => setModalIsOpen(true)}
										aria-label="Open Admin Panel"
									>
										<FontAwesomeIcon icon={faUser} className="me-2" /> Admin Panel
									</button>
								</div>
							</FooterCol>
						</div>
					</div>
				</div>
				
				{/* Bottom section with copyright and legal links */}
				<div className="footer-bottom">
					<div className="container">
						<div className="row">
							<div className="col-md-6">
								<div className="copyright">
									&copy; {new Date().getFullYear()} San José State University TeleHealth
									<div className="last-updated">Last Updated: May 2025</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="legal-links">
									<a href="https://www.sjsu.edu/privacy/" target="_blank" rel="noopener noreferrer">Privacy</a>
									<a href="https://www.sjsu.edu/accessibility/" target="_blank" rel="noopener noreferrer">Accessibility</a>
									<a href="https://www.sjsu.edu/titleix/" target="_blank" rel="noopener noreferrer">Title IX</a>
									<a href="https://www.sjsu.edu/diversity/" target="_blank" rel="noopener noreferrer">Diversity</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				id="modal-responsive"
				style={{
					overlay: {
						backgroundColor: 'rgba(0, 0, 0, 0.75)'
					},
					content: {
						top: '50%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						marginRight: '-50%',
						width: '90%',
						maxWidth: '500px',
						transform: 'translate(-50%, -50%)',
						borderRadius: '10px',
						padding: '30px'
					}
				}}
			>
				<div className="text-center">
					<h4 style={{ color: 'var(--sjsu-blue)', marginBottom: '20px', fontWeight: '600' }}>SJSU TeleHealth Admin Login</h4>
					<p className="mb-4">
						Use the following credentials to access the admin dashboard:
					</p>
					<div className="p-3 mb-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '5px', border: '1px solid #e9ecef' }}>
						<p className="mb-2"><strong>Email:</strong> doctors.portal@gmail.com</p>
						<p className="mb-0"><strong>Password:</strong> AdminDoctor@123</p>
					</div>
					<p className="mb-4">
						You can also create a new account or sign in with an account that hasn't been used for patient appointments.
					</p>
					<div className="d-flex justify-content-center">
						<Link to="/dashboard/dashboard">
							<button className="admin-panel-button" style={{ marginRight: '10px' }}>
								Access Admin Dashboard
							</button>
						</Link>
						<button 
							onClick={() => setModalIsOpen(false)} 
							style={{ 
								background: 'transparent', 
								border: '1px solid var(--sjsu-blue)', 
								color: 'var(--sjsu-blue)',
								padding: '8px 15px',
								borderRadius: '5px'
							}}
						>
							Cancel
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Footer;
