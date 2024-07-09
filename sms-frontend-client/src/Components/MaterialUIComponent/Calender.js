import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import * as React from "react";

export default function DateCalendarValue() {
    const [value, setValue] = React.useState(dayjs("2022-04-17"));

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <DemoContainer components={["DateCalendar", "DateCalendar"]}> */}
            <DateCalendar
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    console.log(value);
                }}
            />
            {/* </DemoContainer> */}
        </LocalizationProvider>
    );
}
