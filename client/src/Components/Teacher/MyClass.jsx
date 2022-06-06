import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetMyClass } from "../../redux/apiRequest";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import Error from "../Error";

const MyClass = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);
  const Class = useSelector((state) => state.user?.classes?.data?.classes);

  const [classes, setClasses] = useState(Class);

  useEffect(() => {
    GetMyClass(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setClasses(Class);
  }, [Class]);

  if (loading || !classes) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className="body_left">
      <div className="body_title">Các lớp chủ nhiệm</div>
      <div className="body_wrapper">
        <table>
          <tr>
            <th>STT</th>
            <th>Tên Lớp</th>
            <th>Số lượng sinh viên</th>
            <th>Khóa</th>
          </tr>
          {classes
            ? classes.map((item, index) => {
                const { _id, name, students } = item;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{students.length}</td>
                    <td>32</td>
                    <Link className="detail" state={students} to={name || ""}>
                      About
                    </Link>
                  </tr>
                );
              })
            : null}
        </table>
      </div>
    </div>
  );
};

export default MyClass;
