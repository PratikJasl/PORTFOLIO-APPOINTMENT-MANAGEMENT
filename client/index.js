import React, { useState, useEffect } from 'react';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);  // Store the paginated appointments
    const [pagination, setPagination] = useState({});        // Store pagination metadata
    const [loading, setLoading] = useState(false);            // Loading state

    const [page, setPage] = useState(1);                      // Current page state
    const [limit] = useState(10);                             // Number of records per page (fixed for now)

    // Fetch appointments when page or limit changes
    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/appointments?page=${page}&limit=${limit}`);
                const data = await response.json();

                setAppointments(data.data);          // Set fetched appointments
                setPagination(data.pagination);      // Set pagination metadata
            } catch (error) {
                console.error('Error fetching appointments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [page, limit]);

    const handlePageChange = (newPage) => { //function to handle page change when user clicks on "Next" or "Previous" buttons.
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div>
            <h1>Appointments</h1>
            
            {loading && <p>Loading...</p>}

            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.id}>
                        {appointment.patientName} - {appointment.appointmentDate}
                    </li>
                ))}
            </ul>

            <div>
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <span> Page {page} of {pagination.totalPages} </span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page === pagination.totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Appointments;