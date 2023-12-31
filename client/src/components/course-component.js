import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const CourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "instructor") {
        CourseService.get(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role == "student") {
        CourseService.getEnrolledCourses(_id)
          .then((data) => {
            console.log(data);
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);

  const handledelete = (courseId) => {
    const confirmDelete = window.confirm("您確定要刪除此課程嗎?");
    if (!confirmDelete) {
      return;
    }
    CourseService.delete(courseId)
      .then((data) => {
        console.log(data);
        window.alert("課程成功刪除!");
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handlechange = (courseId) => {
    navigate(`/edlit/${courseId}`);
  };
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>您必須先登入才能看到課程。</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>歡迎來到講師的課程頁面。</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>歡迎來到學生的課程頁面。</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length !== 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseData.map((course) => {
            return (
              <div
                className="card"
                style={{ width: "18rem", margin: "1rem" }}
                key={course._id}
              >
                <div className="card-body">
                  <h5 className="card-title">課程名稱: {course.title}</h5>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    {course.description}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    學生人數: {course.students.length}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程價格: {course.price}
                  </p>
                  <p>
                    {currentUser && currentUser.user.role === "instructor" && (
                      <button
                        style={{ margin: "0.5rem 0rem" }}
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handledelete(course._id)}
                      >
                        刪除課程
                      </button>
                    )}
                  </p>
                  {currentUser && currentUser.user.role === "instructor" && (
                    <button
                      style={{ margin: "0.5rem 0rem" }}
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handlechange(course._id)}
                    >
                      更新課程
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
