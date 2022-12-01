import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Registration() {
  const initValues = {
    name: "",
    email: "",
    password: "",
    c_password: "",
    gender: "",
    remember_me: false,
  };
  const [InputFields, setInputFields] = useState(initValues);
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      auth.login(InputFields);
      navigate("/dashboard");
    }
  }, [formErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFields({ ...InputFields, [name]: value });
    setformErrors({
      ...formErrors,
      [name]: !value ? validate(InputFields) : "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setformErrors(validate(InputFields));
    setisSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = /\S+@\S+\.\S+/;
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Email should be valid address.";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.c_password) {
      errors.c_password = "Confirm Password is required";
    }
    if (values.c_password && values.c_password !== values.password) {
      errors.c_password = "Password and confirm password should be same.";
    }
    if (!values.gender) {
      errors.gender = "Confirm Password is required";
    }
    return errors;
  };

  return (
    <>
      <form
        className="form-horizontal"
        id="regisrationForm"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label className="control-label col-sm-2">Name:</label>
          <div className="col-sm-10">
            <input
              type="text"
              className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
              name="name"
              placeholder="Enter name"
              value={InputFields.name}
              onChange={handleChange}
            />
          </div>
          {formErrors.name && <p className="text-danger">{formErrors.name}</p>}
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Email:</label>
          <div className="col-sm-10">
            <input
              type="email"
              className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
              name="email"
              placeholder="Enter email"
              value={InputFields.email}
              onChange={handleChange}
            />
          </div>
          {formErrors.email && (
            <p className="text-danger">{formErrors.email}</p>
          )}
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Password:</label>
          <div className="col-sm-10">
            <input
              type="password"
              className={`form-control ${
                formErrors.password ? "is-invalid" : ""
              }`}
              name="password"
              placeholder="Enter password"
              value={InputFields.password}
              onChange={handleChange}
            />
          </div>
          {formErrors.password && (
            <p className="text-danger">{formErrors.password}</p>
          )}
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Confirm Password:</label>
          <div className="col-sm-10">
            <input
              type="password"
              className={`form-control ${
                formErrors.c_password ? "is-invalid" : ""
              }`}
              name="c_password"
              placeholder="Confirm password"
              value={InputFields.c_password}
              onChange={handleChange}
            />
          </div>
          {formErrors.c_password && (
            <p className="text-danger">{formErrors.c_password}</p>
          )}
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Gender:</label>
          <div className="col-sm-10">
            <select
              className={`form-select ${formErrors.gender ? "is-invalid" : ""}`}
              name="gender"
              aria-label="Default select example"
              onChange={handleChange}
              defaultValue={""}
            >
              <option>select</option>
              <option value="male">Male</option>
              <option value="female">female</option>
            </select>
          </div>
          {formErrors.gender && (
            <p className="text-danger">{formErrors.gender}</p>
          )}
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  className={`form-control ${
                    formErrors.remember_me ? "is-invalid" : ""
                  }`}
                  name="remember_me"
                  onChange={handleChange}
                  checked={InputFields.remember_me === true ? "checked" : ""}
                />
                Remember me
              </label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-info">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Registration;
