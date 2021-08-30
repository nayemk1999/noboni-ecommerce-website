import { Popover } from 'bootstrap';
import React, { useContext, useEffect, useState } from 'react'
import { Image, OverlayTrigger } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import { UserContext } from '../../../App';
import axios from 'axios';
import { setUpdateInfo } from '../../Authentication/LoginManager';

export default function ProfileUpdate() {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [imageURL, setImageURL] = useState(null)
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const onSubmit = updateData => {
        const updatedData = {
            userId: loggedInUser._id,
            email: updateData.email,
            mobile: updateData.mobile,
            city: updateData.city,
            country: updateData.country,
            profilePicture: imageURL,
            // password: updateData.password
        }

        const url = `http://localhost:5050/user/${loggedInUser._id}`
        axios.patch(url, updatedData)
            .then(res => {
                if (res.data) {
                    reset();
                    handleUpdate(res.data)
                    // setLoggedInUser(res.data)
                    return swal(`Account has been updated`, "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
    };

    const handleUpdate = (res) => {
        setUpdateInfo(res)
        setLoggedInUser(res);
    }



    const handleImageUpload = (event) => {
        // console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '9dd0f2772c6bcf2a62643d2538566ef1');
        imageData.append('image', event.target.files[0])
        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                // console.log(response);
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className="container">
            {/* <h2 className="text-center mt-2 text-success">Profile Update</h2> */}
            <div style={{ borderRadius: "20px" }} className="p-3 shadow-lg mt-1">
                {/* <Image className="d-flex justify-content-center mx-auto" style={{ maxWidth: "70px", border: '1px solid #17a2b8' }} src={loggedInUser.profilePicture} roundedCircle /> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mt-4">
                        <div className="col-md-4 me-2">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" name='email' {...register("email", { required: true })} defaultValue={loggedInUser.email} />
                        </div>
                        {/* <div className="col-md-4 me-2">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" name='password' {...register("password", { required: true })} />
                        </div> */}
                        <div className="col-md-3 me-2">
                            <label htmlFor="email">Number</label>
                            <input className="form-control" name='mobile' {...register("mobile", { required: true })} defaultValue={loggedInUser.mobile} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-4 me-2">
                            <label htmlFor="username">City</label>
                            <input className="form-control" name='city' {...register("city", { required: true })} defaultValue={loggedInUser.city} />
                        </div>
                        <div className="col-md-4 me-2">
                            <label htmlFor="email">Country</label>
                            <input className="form-control" name='country' {...register("country", { required: true })} defaultValue={loggedInUser.country} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col mt-4">
                            <Image style={{ maxWidth: "60px", border: '1px solid #17a2b8' }} src={imageURL || 'https://i.ibb.co/7CzR0Dg/users.jpg'} roundedCircle />
                        </div>
                        <div className="col-md-10 me-2">
                            <label htmlFor="password">Picture</label>
                            <input className="form-control" type="file" name='profilePicture' {...register("profilePicture")} onChange={handleImageUpload} />
                        </div>
                    </div>

                    <div className="form-group text-center mt-4">
                        <button type="submit" className="btn btn-primary btn-lg submitButton"> Updated Profile </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
