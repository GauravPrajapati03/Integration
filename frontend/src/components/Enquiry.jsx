import React, { useEffect, useState } from "react";
import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import EnquiryList from "./EnquiryList";

function Enquiry() {
  const BASE_URL = "http://localhost:5000/api/users";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    message: "",
    _id: "",
  });

  const [enquiryList, setEnquiryList] = useState([]);

  const getFormData = (e) => {
    let inputName = e.target.name;
    // console.log(inputName);
    let inputValue = e.target.value;
    // console.log(inputValue)
    setFormData({
      ...formData,
      [inputName]: inputValue,
    });
  };

  const saveEnquiry = (e) => {
    e.preventDefault();

    // let formData = {
    //     name : e.target.name.value,
    //     email : e.target.email.value,
    //     phoneNo : e.target.phoneNo.value,
    //     message : e.target.message.value
    // }

    if (formData._id) {
      axios
        .put(`${BASE_URL}/updateUser/${formData._id}`, formData)
        .then((res) => {
          toast.success(res.data.msg);
          console.log(res);
          setFormData({
            name: "",
            email: "",
            phoneNo: "",
            message: "",
            _id: "",
          });
          getEnquiry();
        });
    } else {
      axios.post(`${BASE_URL}/createUser`, formData).then((res) => {
        toast.success(res.data.msg);
        // console.log(res.data)
        setFormData({
          name: "",
          email: "",
          phoneNo: "",
          message: "",
        });
        getEnquiry();
      });
    }
  };

  const getEnquiry = async () => {
    try {
      await axios
        .get(`${BASE_URL}/getUsers`)
        // .then((res) => console.log(res.data.userslist))
        .then((res) => {
          return res.data;
        })
        .then((finalData) => {
          if (finalData.status) {
            setEnquiryList(finalData.userslist);
          }
        });
      // setEnquiryList(res.data.userslist)
    } catch (error) {
      console.log(`Errors : `, error);
    }
  };

  useEffect(() => {
    getEnquiry();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="text-3xl text-center pb-8">Enquiry Form</div>
      <div className="grid grid-cols-2 m-2">
        <form
          className="flex max-w-md flex-col gap-4 bg-slate-900 p-5 w-full rounded-2xl m-3"
          onSubmit={(e) => saveEnquiry(e)}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name">Your Name</Label>
            </div>
            <TextInput
              id="name"
              name="name"
              value={formData.name}
              onChange={getFormData}
              type="text"
              placeholder="Enter name here"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1">Your email</Label>
            </div>
            <TextInput
              id="email1"
              type="email"
              value={formData.email}
              onChange={getFormData}
              name="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="phone">Phone No</Label>
            </div>
            <TextInput
              id="phone"
              type="phone"
              value={formData.phoneNo}
              onChange={getFormData}
              name="phoneNo"
              placeholder="Enter Phone No"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="message">Your Message</Label>
            </div>
            <Textarea
              rows={4}
              id="message"
              value={formData.message}
              onChange={getFormData}
              name="message"
              placeholder="Enter message here"
              required
            />
          </div>
          {/* <p className="text-white">{formData._id}</p> */}
          <Button type="submit">{formData._id ? "Update" : "Save"}</Button>
        </form>
        <div>
          <EnquiryList
            data={enquiryList}
            getEnquiry={getEnquiry}
            setFormData={setFormData}
          />
        </div>
      </div>
    </>
  );
}

export default Enquiry;
