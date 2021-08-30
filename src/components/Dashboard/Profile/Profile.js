import React, { useContext, useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
// import toast from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { UserContext } from "../../../App";
import ProfileUpdate from "./ProfileUpdate";

const Profile = () => {
  const [show, setShow] = useState(null);

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const history = useHistory();

  const signOut = () => {
    // initializeLoginFramework();
    const userId = localStorage.removeItem("user_token");
    // toast.error("Logged Out!");
    if (!userId) {
      return swal("Successfully Logout!", "Please Login.", {
        dangerMode: true,
      }).then((lo) => {
        setLoggedInUser(lo);
        history.push("/login");
      });
    }
  };
  return (
    <Container
      style={{
        maxWidth: "30rem",
        zIndex: -2,
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
      }}
    >
      <Card className="border-0 shadow">
        <Card.Header as={"h3"} className="text-center border-0 mt-3 pt-2 pb-2">
          Profile
        </Card.Header>
        <Card.Body className="card-body">
          <div className="d-flex flex-column align-items-center text-center">
            <img
              src={
                loggedInUser.profilePicture ||
                "https://i.ibb.co/7CzR0Dg/users.jpg"
              }
              alt="..."
              className="rounded-circle"
              width="150"
              style={{ boxShadow: "0 8px 20px -4px #95abbb" }}
            />
            <div className="mt-4">
              <h4>{loggedInUser.username}</h4>
              <p className="text-secondary mb-3">{loggedInUser.email}</p>
              <p className="text-secondary mb-3">{loggedInUser.country}</p>
            </div>
            <div className="mt-2">
              <Button
                // as={Link}
                // to="/dashboard/update-profile"
                className="btn btn-secondary me-4"
                onClick={() => setShow(true)}
              >
                Profile Update
              </Button>
              <Button onClick={signOut} className="btn btn-secondary">
                Log Out
              </Button>
            </div>
          </div>
        </Card.Body>
        <>
          <Modal centered show={show} size='lg'>
            <Modal.Header >
              <Modal.Title className="text-center mt-2 text-success">Update Profile</Modal.Title>
              <Button onClick={() => setShow(false)}>Close</Button>
            </Modal.Header>
            <Modal.Body >
              <ProfileUpdate />
            </Modal.Body>
          </Modal>
        </>
      </Card>
    </Container>
  );
};

export default Profile;
