package com.jamsy.shop.service;

import com.jamsy.shop.entity.Appointment;
import com.jamsy.shop.entity.Employee;
import com.jamsy.shop.entity.Financial;
import com.jamsy.shop.model.BookingDetails;
import com.jamsy.shop.repository.AppointmentRepository;
import com.jamsy.shop.repository.EmployeeRepository;
import com.jamsy.shop.repository.FinancialRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final AppointmentServiceImpl appointmentServiceImpl;
    private final AppointmentRepository appointmentRepository;
    private final EmployeeRepository employeeRepository;
    private final FinancialRepository financialRepository;

    public void bookAppointment(@NonNull final BookingDetails bookingDetails){
        Appointment appointment = new Appointment();
        appointment.setCategory(bookingDetails.getServices());
        appointment.setCustomerName(bookingDetails.getCustomerName());
        appointment.setCustomerEmail(bookingDetails.getCustomerEmail());

        Optional<Employee> employeeGet = employeeRepository.findById(Long.valueOf(bookingDetails.getEmployee()));
        if(employeeGet.isPresent()){
            Employee employeeSet = employeeGet.get();
            appointment.setEmployee(employeeSet);
        }else {
            throw new RuntimeException("Employee not found for empId: " + appointment.getEmployee().getEmpId());

        }

        appointment.setDate(bookingDetails.getDate());
        appointment.setTime(bookingDetails.getTime());
        appointment.setPno(bookingDetails.getPno());
        Appointment appointmentCreated = appointmentServiceImpl.saveAppointment(appointment);

        Financial financial = new Financial();
        financial.setOrderID(appointmentCreated.getId());
        financial.setEmail(bookingDetails.getCustomerEmail());
        financial.setPaymentMethod(bookingDetails.getPaymentMethod());
        financial.setPaymentStatus("PENDING");
        financial.setAmount(bookingDetails.getAmount());
        financial.setMoneyReceived(true);

        financialRepository.save(financial);
    }
}
