import React, { useState, useEffect } from 'react';
import { TiTick } from "react-icons/ti";
import { IoMdAdd } from "react-icons/io";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
  useMediaQuery,
  useTheme,
  TableFooter,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControlLabel,
  FormGroup,
  Grid,
  FormHelperText,
} from '@mui/material';
import axios from 'axios';
import './patient.css';
import { useNavigate } from 'react-router-dom';

const PatientTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [bookings, setBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const navigate = useNavigate();
  const [prescriptionData, setPrescriptionData] = useState({
    patientAge: '',
    medicines: [{ name: '', dosage: '', beforeFood: false, afterFood: false, timing: { morning: false, afternoon: false, night: false } }]
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/doctor/completed-bookings`, { withCredentials: true })
      .then(response => {
        console.log('Bookings data:', response.data.bookings);
        setBookings(response.data.bookings || []);
      })
      .catch(error => {
        console.error('There was an error fetching the bookings!', error.message);
        setBookings([]); // Set an empty array on error
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpen = (booking) => {
    setSelectedBooking(booking);
    console.log('Opening dialog for booking:', booking);
    axios.get(`${process.env.REACT_APP_BASE_URL}/doctor/bookings/${booking._id}/prescription`, { withCredentials: true })
      .then(response => {
        const { patientAge, medicines } = response.data;
        setPrescriptionData({
          patientAge,
          medicines: medicines || [{ name: '', dosage: '', beforeFood: false, afterFood: false, timing: { morning: false, afternoon: false, night: false } }]
        });
        setOpen(true);
      })
      .catch(error => {
        console.error('There was an error fetching the booking details!', error.message);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBooking(null);
  };


  const validateField = (value) => {
    return value && value.trim() !== '';
  };
  const validateAge = (age) => {
  
    const trimmedAge = age.trim();
  

    if (trimmedAge === '') {
      return 'Patient Age cannot be empty';
    }
    

    const agePattern = /^[0-9]+$/;
    if (!agePattern.test(trimmedAge)) {
      return 'Age should only contain digits';
    }

    if (trimmedAge.includes(' ')) {
      return 'Age should not contain spaces';
    }
    

    const numericAge = parseInt(trimmedAge, 10);
    if (isNaN(numericAge) || numericAge < 0 || numericAge > 999) {
      return 'Age must be a valid number between 0 and 999';
    }
    
    return null; 
  };
  
  const validatePrescription = () => {
    const errors = {};
    

    const ageError = validateAge(prescriptionData.patientAge);
    if (ageError) {
      errors.patientAge = ageError;
    }
  

    prescriptionData.medicines.forEach((medicine, index) => {
      if (!validateField(medicine.name)) {
        errors[`name_${index}`] = 'Medicine Name cannot be empty';
      }
      if (!validateField(medicine.dosage)) {
        errors[`dosage_${index}`] = 'Dosage cannot be empty';
      }
  
      if (!medicine.timing || !Object.values(medicine.timing).includes(true)) {
        errors[`timing_${index}`] = 'At least one timing must be selected';
      }
    });
  
    return errors;
  };
  
  
  const handleAddMedicine = () => {
    setPrescriptionData({
      ...prescriptionData,
      medicines: [...prescriptionData.medicines, { name: '', dosage: '', beforeFood: false, afterFood: false, timing: { morning: false, afternoon: false, night: false } }]
    });
  };
  const handleChange = (index, event) => {
    const { name, value, checked, type } = event.target;
    const updatedMedicines = [...prescriptionData.medicines];
  
    if (type === 'checkbox') {
      if (name === 'beforeFood' || name === 'afterFood') {
        updatedMedicines[index][name] = checked;
      } else if (name.includes('timing')) {
        const timingKey = name.split('.')[1];
        updatedMedicines[index].timing = {
          ...updatedMedicines[index].timing,
          [timingKey]: checked
        };
      }
    } else {
      updatedMedicines[index][name] = value;
    }
  
    setPrescriptionData({ ...prescriptionData, medicines: updatedMedicines });
  

    const validationErrors = validatePrescription();
    setErrors(validationErrors);
  };
  
  const handleSubmit = () => {
    if (!selectedBooking) {
      console.error('Booking ID is missing');
      return;
    }
    const validationErrors = validatePrescription();
  
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
  } 
    const { patient, doctor, date, time } = selectedBooking;
    if (!doctor) {
      console.error('Doctor information is missing');
      return;
    }
  
    const prescriptionPayload = {
      patientId: patient?._id,
      doctorId: doctor?._id,
      patientName: patient?.name,
      doctorName: doctor?.name,
      doctorSpeciality: Array.isArray(doctor?.speciality) ? doctor.speciality.join(', ') : doctor?.speciality,
      doctorEmail: doctor?.email,
      patientAge: prescriptionData.patientAge,
      medicines: prescriptionData.medicines,
      meetingDate: date,
      meetingTime: time
    };
  
    console.log('Submitting prescription with data:', prescriptionPayload);
  
    axios.post(`${process.env.REACT_APP_BASE_URL}/doctor/prescriptions/upload`, prescriptionPayload, { withCredentials: true })
      .then(response => {
        console.log('Prescription submitted successfully:', response.data);
        setOpen(false);
        setSelectedBooking(null);
      })
      .catch(error => {
        console.error('There was an error submitting the prescription!', error.message);
      });
  };
  
  const displayData = bookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <div className="header">
        <h2 className='mypatients'>My Patients</h2>
        <div className="actions">
          {/* <Button variant="contained" color="primary" className="button">
            + All Appointments
          </Button> */}
          {/* <Button variant="outlined" color="primary" className="button" onClick={() => navigate('/doctorprofile/dashboardpage/calendar')}>
            Calendar
          </Button> */}
        </div>
      </div>

      <TableContainer component={Paper} className="table-container reduced-width   table-adjustment">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="table-header">S.No</TableCell> {/* Serial Number Header */}
              {/* <TableCell className="table-header">Patient ID</TableCell> */}
              {!isMobile && (
                <>
                  <TableCell className="table-header">Date Check In</TableCell>
                  <TableCell className="table-header">Patient Name</TableCell>
                  <TableCell className="table-header">Patient Email</TableCell>
                  <TableCell className="table-header">Consultation</TableCell>
                </>
              )}
              <TableCell className="table-header">Prescription</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map((row, index) => (
              <TableRow key={row._id}>
                <TableCell className="table-data">{page * rowsPerPage + index + 1}</TableCell> {/* Serial Number */}
                {/* <TableCell className="table-data">{row.patient?._id.slice(-4)}</TableCell> */}
                {!isMobile && (
                  <>
                    <TableCell className="table-data">
                      {new Date(row.date).toLocaleDateString()} 
                    </TableCell>
                    <TableCell className="table-data">{row.patient?.name}</TableCell>
                    <TableCell className="table-data">{row.patient?.email}</TableCell>
                    <TableCell className="table-data">{row.consultationType}</TableCell>
                  </>
                )}
                <TableCell className="table-data">
                  {row.prescription ? (
                    <Button variant="contained" color="primary" className="prescription-button">
                      <TiTick style={{ marginRight: '5px' }} />
                      Added
                    </Button>
                  ) : (
                    <Button variant="outlined" color="primary" className="prescription-button" onClick={() => handleClickOpen(row)}>
                      <IoMdAdd style={{ marginRight: '5px' }} />
                      Add prescription
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={12}>
                <div className="pagination">
                  <Button onClick={(event) => handleChangePage(event, page - 1)} disabled={page === 0}>
                    Previous
                  </Button>
                  {[...Array(Math.ceil(bookings.length / rowsPerPage))].map((_, index) => (
                    <Button
                      key={index}
                      onClick={(event) => handleChangePage(event, index)}
                      variant={index === page ? 'contained' : 'outlined'}
                      color="primary"
                      className="pagination-button"
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <Button  className="pagination-button"  onClick={(event) => handleChangePage(event, page + 1)} disabled={page >= Math.ceil(bookings.length / rowsPerPage) - 1}>
                    Next
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Dialog for adding prescription */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Add Prescription</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Patient Age"
              fullWidth
              value={prescriptionData.patientAge}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, patientAge: e.target.value })}
              margin="normal"
              variant="outlined"
              error={!!errors.patientAge}
              helperText={errors.patientAge}
            />
            {prescriptionData.medicines.map((medicine, index) => (
              <Grid container spacing={2} key={index} className="medicine-grid">
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Medicine Name"
                    name="name"
                    value={medicine.name}
                    onChange={(e) => handleChange(index, e)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors[`name_${index}`]}
                    helperText={errors[`name_${index}`]}
                    
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Dosage"
                    name="dosage"
                    value={medicine.dosage}
                    onChange={(e) => handleChange(index, e)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors[`dosage_${index}`]}
                    helperText={errors[`dosage_${index}`]}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={medicine.beforeFood}
                          onChange={(e) => handleChange(index, e)}
                          name="beforeFood"
                          color="primary"
                        />
                      }
                      label="Before Food"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={medicine.afterFood}
                          onChange={(e) => handleChange(index, e)}
                          name="afterFood"
                          color="primary"
                        />
                      }
                      label="After Food"
                    />
                  </FormGroup>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={medicine.timing.morning}
                          onChange={(e) => handleChange(index, e)}
                          name={`timing.morning`}
                          color="primary"
                        />
                      }
                      label="Morning"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={medicine.timing.afternoon}
                          onChange={(e) => handleChange(index, e)}
                          name={`timing.afternoon`}
                          color="primary"
                        />
                      }
                      label="Afternoon"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={medicine.timing.night}
                          onChange={(e) => handleChange(index, e)}
                          name={`timing.night`}
                          color="primary"
                        />
                      }
                      label="Night"
                    />
                  </FormGroup>
                  {errors[`timing_${index}`] && (
              <FormHelperText error>{errors[`timing_${index}`]}</FormHelperText>
            )}
                </Grid>
              </Grid>
            ))}
          </form>
          <Button variant="outlined" color="primary" onClick={handleAddMedicine} className="add-medicine-button">
            + Add Another Medicine
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PatientTable;
