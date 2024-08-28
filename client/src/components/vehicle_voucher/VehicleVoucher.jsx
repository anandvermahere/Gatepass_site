import React from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Axios from 'axios';

import './VehicleVoucher.css'

const schema = yup.object().shape({
    employeeName: yup.string().required('Employee Name is required'),
    vehicleNo: yup.string().required('Vehicle No. is required'),
    departmentName: yup.string().required('Department Name is required'),
    inKms: yup.lazy((value, context) => {
        if (context.parent.status === 'IN') {
            return yup.string().required('In Kms is required when status is IN').nullable();
        }
        return yup.string().notRequired();
    }),
    outKms: yup.lazy((value, context) => {
        if (context.parent.status === 'OUT') {
            return yup.string().required('Out Kms is required when status is OUT').nullable();
        }
        return yup.string().notRequired();
    }),
    reasondd: yup.string().required('Reason is required'),
    reason: yup.lazy((value, context) => {
        return context.parent.reasondd
            ? yup.string().required('Reason is required')
            : yup.string().notRequired();
    }),
    headName: yup.string().required('Head Name is required'),
}); 

const VehicleVoucher = () => {

    const [isInForm, setIsInForm] = useState(false);
    const [activeButton, setActiveButton] = useState('OUT')
    const [selectedReason, setSelectedReason] = useState('');

    const { handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            status: 'OUT'
        }
    });    

    const onSubmit = (data) => {
        console.log("onSubmit triggered");
        console.log(data);
        Axios.post("http://localhost:3001/api/voucher", {
            empName: data.employeeName,
            VehicleNo: data.vehicleNo,
            deptName: data.departmentName,
            Inkms: isInForm ? data.inKms : null,
            Outkms: isInForm ? null :data.outKms,
            reasondd: data.reasondd,
            reason: data.reason,
            headName: data.headName,
            way: activeButton,
          }).then(() => {
            alert("Successfully Inserted")
          })
    }

    return (
        <div className='form-container'>
            <h1>Vehicle Voucher</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <button className='inoutbtn' type='button'
                style={{
                    backgroundColor: activeButton === 'IN' ? '#ffc940' : '#EEEEEE',
                }}
                onClick={() => {
                    setIsInForm(true);
                    setActiveButton("IN");
                    setValue('status', 'IN');
                }}>IN</button>
                <button className='inoutbtn' type="button"
                style={{
                    backgroundColor: activeButton === 'OUT' ? '#ffc940' : '#EEEEEE',
                }}
                onClick={() => {
                    setIsInForm(false);
                    setActiveButton("OUT");
                    setValue('status', 'OUT');
                }}>OUT</button>
                <div className='form-group'>
                    <div className='ipfield'>
                        <label>Employee Name</label>
                        <Controller
                            name="employeeName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <input {...field} placeholder="Enter Name" />}
                        />
                        {errors.employeeName && <p>{errors.employeeName.message}</p>}
                    </div>
                    <div className='ipfield'>
                        <label>Vehicle No.</label>
                        <Controller
                            name="vehicleNo"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <select {...field}>
                                    <option value="">Select</option>
                                    <option value="GJ05BQ0772">GJ05BQ0772</option>
                                    <option value="GJ16CG1311">GJ16CG1311</option>
                                    <option value="GJ16BK3634">GJ16BK3634</option>
                                    <option value="GJ16DJ5288">GJ16DJ5288</option>
                                </select>
                            )}
                        />
                        {errors.vehicleNo && <p>{errors.vehicleNo.message}</p>}
                    </div> 
                    <div className='ipfield'>
                        <label>Department Name</label>
                        <Controller
                            name="departmentName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <select {...field}>
                                    <option value="">Select</option>
                                    <option value="Prod">Production</option>
                                    <option value="OffandAcc">Office and Accounts</option>
                                    <option value="CSS">Customer support and Sales</option>
                                    <option value="HRA">HR and Admin</option>
                                    <option value="Opr">Operation</option>
                                    <option value="lab">Lab</option>
                                    <option value="eng">Engineering</option>
                                    <option value="store">Stores</option>
                                </select>
                            )}
                        />
                        {errors.departmentName && <p>{errors.departmentName.message}</p>}
                    </div>
                    {isInForm ? (
                        <>
                            <div className='ipfield'>
                                <label>In Kms</label>
                                <Controller
                                    name="inKms"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <input {...field} type='number' placeholder="Enter In Kms" />}
                                />
                                {errors.inKms && <p>{errors.inKms.message}</p>}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='ipfield'>
                                <label>Out Kms</label>
                                <Controller
                                    name="outKms"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <input {...field} type='number' placeholder="Enter Out Kms" />}
                                />
                                {errors.outKms && <p>{errors.outKms.message}</p>}
                            </div>
                        </>
                    )}
                    <div className='ipfield'>
                        <label>Reason</label>
                        <Controller
                            name="reasondd"
                            control={control}
                            defaultValue=""
                            render={({ field }) =>
                                <select {...field} onChange={(e) => {
                                    setSelectedReason(e.target.value);
                                    field.onChange(e);
                                  }}>
                                    <option value="">Select</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Visit">Visit</option>
                                    <option value="Other">Other</option>
                                </select>
                            }
                            
                        />
                        {selectedReason && selectedReason !== '' && (
                            <>
                                <Controller
                                    name="reason"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => <input {...field} placeholder="Enter Reason" id='reason'/>}
                                />
                                {errors.reason && <p>{errors.reason.message}</p>}
                            </>
                        )}  
                    </div>
                    <div className='ipfield' id='head'>
                        <label>Head Name for approval</label>
                        <Controller
                            name="headName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <select {...field}>
                                    <option value="">Select</option>
                                    <option value="abc">ABC</option>
                                    <option value="xyz">XYZ</option>
                                </select>
                            )}
                        />
                        {errors.headName && <p>{errors.headName.message}</p>}
                    </div>
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    )
}

export default  VehicleVoucher;