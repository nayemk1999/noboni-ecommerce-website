import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { UserContext } from "./../../../App";
import reviewStyles from "./Review.module.css";

export default function Review() {
  const history = useHistory();
  const { register, handleSubmit, reset } = useForm();
  const { loggedInUser } = useContext(UserContext);
  // const reviewdata =  'https://toprak-real.herokuapp.com/review-data'

  const onSubmit = (data) => {
    const newReview = {
      name: data.name,
      message: data.message,
      email: loggedInUser.email,
      profiePicture: loggedInUser.profileUpdate || "",
    };
    const url = "https://toprakserver.herokuapp.com/review/add-review";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(newReview),
    }).then((res) => {
      swal(`Successfully review added `).then((ok) =>
        history.push("/dashboard/profile")
      );
    });
  };
  return (
    <section className={reviewStyles.form}>
      <div className={reviewStyles.formContainer}>
        <h1 className="text-center mb-5 text-light text-uppercase">
          Give Feedback
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className={reviewStyles.label}>Name</label>
          <input
            {...register("name")}
            required
            type="text"
            placeholder="Please enter your name"
            className={reviewStyles.input}
          />
          <label className={reviewStyles.label}>Review</label>

          <textarea
            name="review"
            rows="4"
            required
            {...register("message")}
            className={reviewStyles.textarea}
          />
          <br />
          <br />
          <button className={reviewStyles.formButton} type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
