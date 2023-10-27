import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseService from "../services/course.service";
const EdlitComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const { courseId } = useParams(); // 使用参数名 courseId
  const [updatedCourseData, setUpdatedCourseData] = useState({
    title: "",
    description: "",
    price: 0,
  });
  let [message, setMessage] = useState("");

  // 更新新课程信息
  const handleNewCourseChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourseData({
      ...updatedCourseData,
      [name]: value,
    });
  };

  // 提交更改后的课程信息
  const handleChange = () => {
    if (currentUser.user.role == "instructor") {
      CourseService.chang(courseId, updatedCourseData)
        .then((data) => {
          navigate("/course");
        })
        .catch((e) => {
          setMessage(e.response.data);
        });
    } else {
      navigate("/course");
    }
  };
  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <h2 className="h2">
        <p>更改課程</p>{" "}
      </h2>
      <br />
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label for="exampleforTitle">課程標題：</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={updatedCourseData.title}
            onChange={handleNewCourseChange}
          />
        </div>
        <br />
        <div>
          <label for="exampleforContent">內容：</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={updatedCourseData.description}
            onChange={handleNewCourseChange}
          />
        </div>
        <br />
        <div>
          <label for="exampleforPrice">價格：</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            value={updatedCourseData.price}
            onChange={handleNewCourseChange}
          />
        </div>
        <br />
        <button className="btn btn-primary" onClick={handleChange}>
          提交更改
        </button>
      </div>
    </div>
  );
};

export default EdlitComponent;
