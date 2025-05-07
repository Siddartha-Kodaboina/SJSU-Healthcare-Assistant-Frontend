import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../App';
import PatientStatistics from '../../Components/Dashboard/PatientStatistics';
import Sidebar from '../../Components/Dashboard/Sidebar';
import Statistics from '../../Components/Dashboard/Statistics';
import AppointmentDataTable from '../../Components/DataTables/AppointmentDataTable';
import DataTable from '../../Components/DataTables/DataTable';
import PatientAppointmentPaymentTable from '../../Components/DataTables/PatientAppointmentPaymentTable';
import { CopilotPopup } from "@copilotkit/react-ui";

const Dashboard = () => {
	const { loggedInUser, allPatients } = useContext(DataContext);
	const [userAppointments, setUserAppointments] = useState([]);
	const [coPilotInstruction, setCoPilotInstruction] = useState(`You are assisting the user about his appointments, medicine, prescriptions, patients, doctors, recent health history.`);

	useEffect(() => {
		window.scrollTo(0, 0);
		console.log('Dashboard useEffect - loggedInUser:', loggedInUser);

		// Check if loggedInUser and email exist before proceeding
		if (!loggedInUser || !loggedInUser.email) {
			console.warn('Dashboard: loggedInUser or email is undefined', { loggedInUser });
			return; // Exit early if user data is not available
		}

		// Fetch all appointments
		fetch(`${process.env.REACT_APP_BASE_URL}/bookedAppointments`)
			.then((res) => res.json())
			.then(async (data) => {
				console.log('Dashboard: All appointments data:', data);
				
				// Filter appointments for the logged-in user with null check
				const filteredAppointments = data.filter(ap => {
					if (!ap.patientInfo || !ap.patientInfo.email) {
						console.warn('Dashboard: Found appointment with missing patientInfo or email', ap);
						return false;
					}
					return ap.patientInfo.email === loggedInUser.email;
				});
				console.log("Filtered appointments for user:", filteredAppointments);

				// Fetch doctor information for each appointment
				const appointmentsWithDoctorInfo = await Promise.all(filteredAppointments.map(async (appointment) => {
					try {
						const doctorResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/doctors/${appointment.apId}`);
						const doctorInfo = await doctorResponse.json();
						return { 
							...appointment, 
							doctorInfo: {
								category: doctorInfo.category || 'General',
								name: doctorInfo.name || 'Unknown',
								education: doctorInfo.education || 'N/A',
								designation: doctorInfo.designation || 'Doctor',
								department: doctorInfo.department || 'General',
								hospital: doctorInfo.hospital || 'SJSU Health Center'
							}
						};
					} catch (error) {
						console.error('Error fetching doctor info for appointment:', appointment.apId, error);
						// Return appointment with default doctor info if fetch fails
						return {
							...appointment,
							doctorInfo: {
								category: 'General',
								name: 'Unknown',
								education: 'N/A',
								designation: 'Doctor',
								department: 'General',
								hospital: 'SJSU Health Center'
							}
						};
					}
				}));

				console.log('Appointments with doctor info:', appointmentsWithDoctorInfo);
				setCoPilotInstruction(`You are assisting the user about his appointments, medicine, prescriptions, patients, doctors, recent health history. Here are the user appointment details: ${JSON.stringify(appointmentsWithDoctorInfo)}`);
				setUserAppointments(appointmentsWithDoctorInfo);
			})
			.catch((error) => {
				console.error('Error fetching appointments:', error);
				// Set empty array to avoid undefined errors
				setUserAppointments([]);
			});
	}, [loggedInUser]);

	const patientUser = allPatients.find((ap) => ap.email === loggedInUser.email);

	return (
		<>
			<div className="container-fluid row">
				<Sidebar />
				<div id="responsive-dashboard" className="col-md-10 p-4 pr-5" style={{ position: 'absolute', right: 0, backgroundColor: '#F4FDFB' }}>
					<h5>Dashboard</h5>
					{!patientUser ? (
						<>
							<Statistics />
							<DataTable tableName="Recent Appointments">
								<AppointmentDataTable />
							</DataTable>
						</>
					) : (
						<>
							<PatientStatistics />
							<DataTable tableName="Recent Appointments">
								<PatientAppointmentPaymentTable appointments={userAppointments} />
							</DataTable>
						</>
					)}
				</div>
			</div>
			{console.log("User Appointments:", coPilotInstruction)}
			<CopilotPopup
				instructions={coPilotInstruction}
				labels={{
					title: "Healthcare Assistant",
					initial: "Need any help?",
				}}
			/>
		</>
	);
};

export default Dashboard;
