import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserContext } from "../../../App";
import toast from "react-hot-toast";
import swal from "sweetalert";
import addPostStyles from "./AddPost.module.css";

const AddAPost = () => {
  const { loggedInUser } = useContext(UserContext);
  const { register, handleSubmit, reset } = useForm();
  const [imageURL, setImageURL] = useState(null);
  const [imageURL1, setImageURL1] = useState(null);
  const [imageURL2, setImageURL2] = useState(null);
  const onSubmit = (data) => {
    const newPost = {
      name: data.name,
      email: loggedInUser.email,
      description: data.description,
      area: data.area,
      nearestPlace: data.nearestPlace,
      image1: imageURL1,
      image2: imageURL2,
      image: imageURL,
      price: data.price,
      address: data.address,
      beds: data.beds,
      bath: data.bath,
      type: data.type,
      purpose: data.purpose,
      completion: data.completion,
      date: new Date(),
    };
    const loading = toast.loading("Adding...Please wait!");
    const url = "https://toprakserver.herokuapp.com/property/add-post";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(newPost),
    }).then((res) => {
      if (res) {
        toast.dismiss(loading);
        reset();
        return swal(
          `Successfully Post add!`,
          `${loggedInUser.email} Welcome`,
          "success"
        );
      }
      swal("Failed!", "Something went wrong! Please try again.", "error", {
        dangerMode: true,
      });
    });
  };

  const handleImageUpload = (event) => {
    const imageData = new FormData();
    imageData.set("key", "9dd0f2772c6bcf2a62643d2538566ef1");
    imageData.append("image", event.target.files[0]);
    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleImageUpload1 = (event) => {
    console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "9dd0f2772c6bcf2a62643d2538566ef1");
    imageData.append("image", event.target.files[0]);
    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        console.log(response.data.data.display_url);
        setImageURL1(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleImageUpload2 = (event) => {
    console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "9dd0f2772c6bcf2a62643d2538566ef1");
    imageData.append("image", event.target.files[0]);
    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        console.log(response.data.data.display_url);
        setImageURL2(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <section className={addPostStyles.form}>
      <div className={addPostStyles.formContainer}>
        <h1 className="text-center mb-5 text-light text-uppercase">
          Add new Property
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className={addPostStyles.label}>Name:</label>
          <input
            {...register("name")}
            type="text"
            autoFocus
            className={addPostStyles.input}
          />

          <label className={addPostStyles.label}>Description:</label>
          <textarea
            className={addPostStyles.textarea}
            {...register("description")}
            type="text"
            rows="6"
          ></textarea>

          <label className={addPostStyles.label}>Area:</label>
          <input
            {...register("area")}
            type="number"
            className={addPostStyles.input}
          />

          <label className={addPostStyles.label}>Nearest Place:</label>
          <input
            {...register("nearestPlace")}
            type="text"
            placeholder="like mosque, school etc.."
            className={addPostStyles.input}
          />

          <label className={addPostStyles.label}>Image 1:</label>
          <input
            {...register("image1")}
            onChange={handleImageUpload}
            type="file"
            id="fileUpload"
            className={addPostStyles.input}
          />

          <label className={addPostStyles.label}>Image 2:</label>
          <input
            {...register("image2")}
            onChange={handleImageUpload1}
            type="file"
            className={addPostStyles.input}
          />

          <label className={addPostStyles.label}>Image 3:</label>
          <input
            {...register("image3")}
            onChange={handleImageUpload2}
            type="file"
            className={addPostStyles.input}
          />

          <label className={addPostStyles.label}>Price:</label>
          <input
            {...register("price")}
            type="number"
            className={addPostStyles.input}
          />

          <label className={addPostStyles.label}>Address:</label>
          <input
            {...register("address")}
            type="text"
            className={addPostStyles.input}
          />

          {/* <div class="d-flex mt-4">
            <select
              {...register("division")}
              onChange={(e) => setSelectId(e.target.value)}
              className={`form-select me-2 ${addPostStyles.select}`}
              aria-label="Default select example"
            >
              <option selected>Division</option>
              {allDivisionbn.map((dv) => (
                <option key={dv._id}>{dv.division}</option>
              ))}
            </select>
            <select
              {...register("district")}
              onChange={districtChange}
              className={`form-select me-2 ${addPostStyles.select}`}
              aria-label="Default select example"
            >
              <option selected>District</option>
              {district !== undefined &&
                district.map((dis) => (
                  <option key={dis._id}>{dis.district}</option>
                ))}
            </select>
            <select
              {...register("upazilla")}
              className={`form-select me-2 ${addPostStyles.select}`}
              aria-label="Default select example"
            >
              <option selected>Upazilla</option>
              {selectId &&
                upazila.map((upa) => <option key={upa}>{upa}</option>)}
            </select>
          </div> */}
          <div className="d-flex mt-4">
            <select
              {...register("beds")}
              className={`form-select me-2 ${addPostStyles.select}`}
              aria-label="Default select example"
            >
              <option selected>Beds</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <select
              {...register("bath")}
              className={`form-select me-2 ${addPostStyles.select}`}
              aria-label="Default select example"
            >
              <option selected>Bath</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <select
              {...register("type")}
              className={`form-select me-2 ${addPostStyles.select}`}
              aria-label="Default select example"
            >
              <option selected>Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Flat">Flat</option>
              <option value="Land">Land</option>
            </select>
          </div>
          <div className="d-flex mt-4">
            <select
              {...register("purpose")}
              className={`form-select me-2 ${addPostStyles.select}`}
              aria-label="Default select example"
            >
              <option selected>Purpose</option>
              <option value="Sale">Sale</option>
              <option value="Rent">Rent</option>
            </select>
            <select
              {...register("completion")}
              className={`form-select me-2 ${addPostStyles.select}`}
              aria-label="Default select example"
            >
              <option selected>Completion</option>
              <option value="Complete">Complete</option>
              <option value="Under-Construction">Under-Construction</option>
            </select>
            {/* <input {...register("date")}  type="date" /> */}
          </div>

          <button className={addPostStyles.formButton} type="submit">
            Post Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddAPost;
