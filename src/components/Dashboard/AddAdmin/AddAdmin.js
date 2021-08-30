import React from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import addAdminStyles from "./Addadmin.module.css";
const AddAdmin = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const newEmail = {
      email: data.email,
    };
    const url = "https://toprakserver.herokuapp.com/admin/add-admin";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmail),
    })
      .then((res) => res.json())
      // .then(res => {
      //     // reset()
      //     return swal("Successfully add admin!", "Welcome.", { dangerMode: true });
      // })
      .then((data) => console.log(data));
  };
  return (
    <section className={addAdminStyles.form}>
      <div className={addAdminStyles.formContainer}>
        <h1 className="text-white text-center mb-5 text-uppercase">
          Add new admin
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="from-group mb-3">
            <label className={addAdminStyles.label} htmlFor="email">
              Enter Email :
            </label>

            <input
              className={addAdminStyles.input}
              name="email"
              {...register("email")}
            />
          </div>

          <button type="submit " className={addAdminStyles.formButton}>
            Add Admin
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddAdmin;
