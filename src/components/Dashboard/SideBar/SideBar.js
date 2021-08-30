import React, { useContext, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { UserContext } from "../../../App";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersCog,
  faEdit,
  faHome,
  faTasks,
  faPlus,
  faUser,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import sidebarStyles from "./SideBar.module.css";
import { IconContext } from "react-icons";
const SideBar = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isAdmin, setAdmin] = useState(false);
  let { url } = useRouteMatch();

  useEffect(() => {
    fetch("https://toprakserver.herokuapp.com/admin/is-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => setAdmin(true));
  }, [loggedInUser.email]);

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      {/* Previous sidebar data */}

      {/* <ul className={styles.sideBarUl}>
                <li className={styles.sideBarLi}>
                    <Link to={`${url}/profile`} className={styles.sideBarLink} >Profile</Link>
                </li>
                <li className={styles.sideBarLi}>
                    <Link to={`${url}/purchased-property`} className={styles.sideBarLink} >Purchased Property</Link>
                </li>
                <li className={styles.sideBarLi}>
                    <Link to={`${url}/add-post`} className={styles.sideBarLink} >Add a post</Link>
                </li>
                {
                    isAdmin ?
                    
                        (<div> <li className={styles.sideBarLi}>
                            <Link to={`${url}/manage-post`} className={styles.sideBarLink} >Manage Post</Link>
                        </li>
                            <li className={styles.sideBarLi}>
                                <Link to={`${url}/add-admin`} className={styles.sideBarLink} >Add Admin</Link>
                            </li>
                        </div>)
                        :
                        (<div>
                            <li className={styles.sideBarLi}>
                                <Link to={`${url}/review`} className={styles.sideBarLink} >Review</Link>
                            </li>
                        </div>)
                }
            </ul> */}

      <IconContext.Provider value={{ color: "#fff" }}>
        <div className={sidebarStyles.sidebar}>
          <Link to="#" className={sidebarStyles.menuBars}>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav
          className={
            sidebar
              ? [sidebarStyles.sideMenu, sidebarStyles.active].join(" ")
              : sidebarStyles.sideMenu
          }
        >
          <ul className={sidebarStyles.sideMenuItems} onClick={showSidebar}>
            <li className={sidebarStyles.sidebarToggle}>
              <Link to="#" className={sidebarStyles.menuBars}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            <li className={sidebarStyles.sideText}>
              <Link className={sidebarStyles.menuLink} to={`${url}/profile`}>
                <FontAwesomeIcon icon={faUser} />
                <span className={sidebarStyles.span}>Profile</span>
              </Link>
            </li>
            <li className={sidebarStyles.sideText}>
              <Link
                className={sidebarStyles.menuLink}
                to={`${url}/purchased-property`}
              >
                <FontAwesomeIcon icon={faUser} />

                <span className={sidebarStyles.span}>Purchased</span>
              </Link>
            </li>
            <li className={sidebarStyles.sideText}>
              <Link className={sidebarStyles.menuLink} to={`${url}/add-post`}>
                <FontAwesomeIcon icon={faPlus} />
                <span className={sidebarStyles.span}>Add Post</span>
              </Link>
            </li>
            {isAdmin && (
              <>
                <li className={sidebarStyles.sideText}>
                  <Link
                    className={sidebarStyles.menuLink}
                    to={`${url}/manage-post`}
                  >
                    <FontAwesomeIcon icon={faCog} />
                    <span className={sidebarStyles.span}>Manage Post</span>
                  </Link>
                </li>
                <li className={sidebarStyles.sideText}>
                  <Link
                    className={sidebarStyles.menuLink}
                    to={`${url}/add-admin`}
                  >
                    <FontAwesomeIcon icon={faUsersCog} />
                    <span className={sidebarStyles.span}>Add Admin</span>
                  </Link>
                </li>
              </>
            )}
            <li className={sidebarStyles.sideText}>
              <Link className={sidebarStyles.menuLink} to={`${url}/review`}>
                <FontAwesomeIcon icon={faUsersCog} />
                <span className={sidebarStyles.span}>Review</span>
              </Link>
            </li>
            {/* )} */}

            <li className={sidebarStyles.sideText}>
              <Link className={sidebarStyles.menuLink} to="/">
                <FontAwesomeIcon icon={faUsersCog} />
                <span className={sidebarStyles.span}>Home</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default SideBar;
