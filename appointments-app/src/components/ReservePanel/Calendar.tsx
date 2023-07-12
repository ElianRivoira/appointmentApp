import styled from 'styled-components';

export const CalendarContainer = styled.div`
/* ~~~ container styles ~~~ */
width: 100%;
height: 400px;
max-width: 550px;
padding: 32px;
border-radius: 8px;
background-color: white;
text-transform: capitalize;

@media (max-width: 580px) {
  padding: 10px;
}

/* ~~~ calendar styles ~~~ */
.react-calendar__navigation {
  display: flex;
  margin-bottom: 26px;
  
  .react-calendar__navigation__label {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    text-transform: capitalize;
    @media (max-width: 580px) {
      font-size: 16px;
      line-height: 21px;
    }
}

  .react-calendar__navigation__arrow {
    flex-grow: 0.333;
  }
}

/* ~~~ label styles ~~~ */
.react-calendar__month-view__weekdays {
  text-align: center;
  margin-bottom: 16px;
}

/* ~~~ button styles ~~~ */
button {
  background-color: white;
  border-radius: 4px;
  color: #282828;
  padding: 8px 18px !important;
  text-align: center !important;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  &:hover {
    background-color: #C8C8C8;
    color: #A442F1;
  }
  
  &:active {
    background-color: #A442F1;
    color: white;
  }
}

/* ~~~ neighboring month & weekend styles ~~~ */
.react-calendar__month-view__days__day--neighboringMonth {
  color: #C8C8C8;
  pointer-events: none;
}
.react-calendar__month-view__days__day--weekend {
  color: #C8C8C8;
  pointer-events: none;
}

/* ~~~ active day styles ~~~ */
.react-calendar__tile--range {
  background-color: #A442F1;
  color: white;
  pointer-events: none;
}
`

export const CalendarContainerDisabled = styled.div`
/* ~~~ container styles ~~~ */
width: 100%;
height: 400px;
max-width: 550px;
padding: 32px;
border-radius: 8px;
background-color: white;
text-transform: capitalize;
pointer-events: none;

@media (max-width: 580px) {
  padding: 10px;
}

/* ~~~ calendar styles ~~~ */
.react-calendar__navigation {
  display: flex;
  margin-bottom: 26px;
  
  .react-calendar__navigation__label {
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    text-transform: capitalize;
    @media (max-width: 580px) {
      font-size: 16px;
      line-height: 21px;
    }
}

.react-calendar__navigation__arrow {
  flex-grow: 0.333;
}
}

/* ~~~ label styles ~~~ */
.react-calendar__month-view__weekdays {
  text-align: center;
  margin-bottom: 16px;
  color: #C8C8C8;
}

/* ~~~ button styles ~~~ */
button {
  background-color: white;
  border-radius: 4px;
  color: #C8C8C8;
  padding: 8px 18px !important;
  text-align: center !important;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  &:hover {
    background-color: #C8C8C8;
    color: #A442F1;
  }
  
  &:active {
    background-color: #A442F1;
    color: white;
  }
}

/* ~~~ neighboring month & weekend styles ~~~ */
.react-calendar__month-view__days__day--neighboringMonth {
  color: #C8C8C8;
  pointer-events: none;
}
.react-calendar__month-view__days__day--weekend {
  color: #C8C8C8;
  pointer-events: none;
}

/* ~~~ active day styles ~~~ */
.react-calendar__tile--range {
  background-color: white;
  color: #C8C8C8;
  pointer-events: none;
}
`