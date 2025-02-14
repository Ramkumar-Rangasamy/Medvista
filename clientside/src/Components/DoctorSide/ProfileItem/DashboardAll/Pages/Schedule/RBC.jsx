import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const styles = `
 .rbc-event {
    background: transparent;
    border-radius: 5px;
    text-align: center;
    padding: 2px 5px;
    color: white;
    border: none !important;
 }
 .rbc-event.booked {
    background-color: grey;
 }
 .rbc-event.free {
    background-color: #0167FF;
 }
`;

const CustomEvent = ({ event }) => (
  <div className={`${event.status === 'booked' ? 'rbc-event booked' : 'rbc-event free'}`}>
    <strong>{moment(event.start).format("HH:mm")}</strong> -{" "}
    <strong>{moment(event.end).format("HH:mm")}</strong>{" "}
    {event?.title ? (
      `(${event.title})`
    ) : (
      event.consultationType ? ` (${event.consultationType})` : ''
    )}
  </div>
);

export default function ReactBigCalendar({ onScheduleChange }) {
  const [doctor, setDoctor] = useState({});
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [subscriptionType, setSubscriptionType] = useState('');
  const [maxTimeSlots, setMaxSlots] = useState(0);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/doctor/profile/update`,
          { withCredentials: true }
        );
        const doctorData = response.data;
        setSubscriptionType(doctorData.doctor.subscriptionType);
        setMaxSlots(doctorData.doctor.maxTimeSlots);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };
    fetchDoctor();
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem("loggedIn");
    if (!user) {
      alert("You need to log in to book an appointment.");
      return;
    }

    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/doctor/manage-time-slots`,
          { withCredentials: true }
        );

        const doctorData = response.data;
        setDoctor(doctorData);

        const parseDateTime = (dateStr, timeStr) => {
          try {
            const date = new Date(dateStr);
            const [hoursStr, minutesStr] = timeStr.split(":");
            const hours = parseInt(hoursStr, 10);
            const minutes = parseInt(minutesStr, 10);

            date.setHours(hours);
            date.setMinutes(minutes);
            return date;
          } catch (error) {
            console.error("Error parsing date and time:", error);
            return new Date(NaN);
          }
        };

        if (doctorData && doctorData.timeSlots && doctorData.bookings) {
          const timeSlots = doctorData.timeSlots.map((slot) => ({
            id: slot._id,
            title: slot.hospital,
            start: parseDateTime(slot.date, slot.startTime),
            end: parseDateTime(slot.date, slot.endTime),
            status: slot.status
          }));

          const bookings = doctorData.bookings.map((booking) => {
            const start = parseDateTime(booking.date, booking.time);
            const end = new Date(start);
            end.setMinutes(end.getMinutes() + 30);

            return {
              id: booking._id,
              start: start,
              end: end,
              consultationType: booking.consultationType || 'N/A',
            };
          });

          setEvents([...timeSlots, ...bookings]);
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, [navigate]);

  function onSelectEvent(e) {
    Swal.fire({
      title: "Scheduled Visit",
      html: `
        <div class="addtimeslot">
          <div id="lineargroup">
            <div class="inputgroup">
              <label htmlFor="starttime">Start Time</label>
              <input type="text" id="starttime" readonly value="${e.start.toLocaleTimeString()}" />
            </div>
            <div class="inputgroup">
              <label htmlFor="endtime">End Time</label>
              <input type="text" id="endtime" readonly value="${e.end.toLocaleTimeString()}" />
            </div>
          </div>
          <div class="inputgroup">
            <label htmlFor="Hospital">Hospital</label>
            <input type="text" readonly value="${e.title}" />
          </div>
          <div class="inputgroup">
            <label htmlFor="consultationType">Consultation Type</label>
            <input type="text" readonly value="${e.consultationType || 'N/A'}" />
          </div>
        </div>
      `,
      confirmButtonText: "Ok",
    });
  }

  function onSelectSlot(e) {
    const selectedDate = moment(e.start).format("YYYY-MM-DD");

    if (moment(selectedDate).isBefore(moment().format("YYYY-MM-DD"))) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date',
        text: 'You cannot add time slots for past dates.',
      });
      return;
    }

    if (subscriptionType === 'Standard' && maxTimeSlots <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Upgrade Required',
        text: 'You have reached the limit of 3 free time slots. Please upgrade to add more.',
      });
      return;
    }

    onScheduleChange(events.filter((event) => moment(event.start).format("YYYY-MM-DD") === selectedDate));

    Swal.fire({
      title: "Add New Time Slot",
      html: `
      <form class="addtimeslot">
        <div class="inputgroup">
          <label>Timeslot Type</label>
          <div class="input-radio-button">
            <div>
              <input type="radio" id="single" name="slotType" value="Single" checked>
              <label for="single">Single</label>
            </div>
            <div>
              <input type="radio" id="multiple" name="slotType" value="multiple">
              <label for="multiple">Multiple</label>
            </div>
          </div>
        </div>
        <div class="inputgroup">
      <label>Consultation Type</label>
      <div class="input-radio-button">
        <div>
          <input type="radio" id="inperson" name="consultationType" value="In-person" checked>
          <label for="inperson">In-person</label>
        </div>
        <div>
          <input type="radio" id="video" name="consultationType" value="Video call">
          <label for="video">Video</label>
        </div>
      </div>
    </div>
        <div id="dategroup">
          <div class="inputgroup">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" value="${selectedDate}" readonly/>
          </div>
        </div>
        <div id="lineargroup">
          <div class="inputgroup">
            <label htmlFor="starttime">Start Time</label>
            <input type="time" id="starttime" />
          </div>
          <div class="inputgroup">
            <label htmlFor="endtime">End Time</label>
            <input type="time" id="endtime" />
          </div>
        </div>
        <div id="hospitalDropdown" class="inputgroup">
      <label htmlFor="hospital">Select Hospital</label>
      <select id="hospital" name="hospital" class="form-control">
        <option value=""></option>
        ${
          doctor?.doctor?.hospitals
            ? doctor.doctor.hospitals
                .map(
                  (hospital) =>
                    `<option value="${hospital.name}">${hospital.name} - ${hospital.street}, ${hospital.city}, ${hospital.state}</option>`
                )
                .join("")
            : ""
        }
      </select>
    </div>
      </form>
    `,  // Form HTML goes here as in your initial code
      confirmButtonText: "Add Time Slot",
      showCancelButton: true,
      didOpen: () => {
        const hospitalDropdown = document.getElementById('hospitalDropdown');
        const inpersonRadio = document.getElementById('inperson');
        const videoRadio = document.getElementById('video');
        const singleRadio = document.getElementById('single');
        const multipleRadio = document.getElementById('multiple');
          // Initially, hospital dropdown is visible for In-person
    hospitalDropdown.style.display = 'block';
         // Add event listeners to toggle hospital dropdown based on consultation type
    inpersonRadio.addEventListener('change', () => {
      if (inpersonRadio.checked) {
        hospitalDropdown.style.display = 'block';
      }
    });
    videoRadio.addEventListener('change', () => {
      if (videoRadio.checked) {
        hospitalDropdown.style.display = 'none';
      }
    });
        singleRadio.addEventListener('change', () => {
          if (singleRadio.checked) {
            document.getElementById('dategroup').innerHTML = `
              <div class="inputgroup">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" value="${selectedDate}" readonly/>
              </div>
            `;
          }
        });
  
        multipleRadio.addEventListener('change', () => {
          if (multipleRadio.checked) {
            document.getElementById('dategroup').innerHTML = `
              <div id="lineargroup">
                <div class="inputgroup">
                  <label htmlFor="startdate">Start Date</label>
                  <input type="date" id="startdate" value="${selectedDate}" />
                </div>
                <div class="inputgroup">
                  <label htmlFor="enddate">End Date</label>
                  <input type="date" id="enddate" value="${selectedEndDate}" />
                </div>
              </div>
            `;
          }
        });
      },
      preConfirm: () => {
        const consultationType = document.querySelector('input[name="consultationType"]:checked').value;
        const slotType = document.querySelector('input[name="slotType"]:checked').value;
        const date = document.getElementById("date") ? document.getElementById("date").value : null;
        const startdate = document.getElementById("startdate") ? document.getElementById("startdate").value : null;
        const enddate = document.getElementById("enddate") ? document.getElementById("enddate").value : null;
        const starttime = document.getElementById("starttime").value;
        const endtime = document.getElementById("endtime").value;

        let hospital = document.getElementById("hospital").value;

        if (!starttime || !endtime || (slotType === 'Single' && !date)) {
          Swal.showValidationMessage("Please fill in all details before proceeding!");
          return null;
        }

        return { consultationType, slotType, date, startdate, enddate, starttime, endtime, hospital };
      },
    }).then((result) => {
        if (result.isConfirmed && result.value) {
          const {consultationType, slotType, date, startdate, enddate, starttime, endtime, hospital } = result.value;
          console.log({ consultationType, slotType, date, startdate, enddate, starttime, endtime, hospital });
  
          const newEvent = {
            title: consultationType === 'In-person' ? hospital : 'Video Consultation',
            start: new Date(`${slotType === 'Single' ? date : startdate}T${starttime}:00`),
            end: new Date(`${slotType === 'Single' ? date : enddate}T${endtime}:00`),
            consultationType,
            slotType,
            status: 'free', // Assuming all new slots are free
          };
    
          setEvents((prevEvents) => [...prevEvents, newEvent]);
    
          axios.post(`${process.env.REACT_APP_BASE_URL}/doctor/add-time-slot`, {
            date: slotType === 'Single' ? date : startdate,
            ...(slotType === 'Multiple' && { endDate: enddate }), // Conditionally include endDate
            startTime: starttime,
            endTime: endtime,
            consultationType,
            hospital,
            slotType,
        }, { withCredentials: true })
          .then(() => {
            Swal.fire("Time Slot Added!", "", "success");
          })
          .catch((error) => {
            console.error("Error adding time slot:", error);
            Swal.fire("Error adding time slot", "", "error");
          });
        } else if (result.isDismissed) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
  }

  return (
    <>
      <style>{styles}</style>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable
        components={{ event: CustomEvent }}
      />
    </>
  );
}
