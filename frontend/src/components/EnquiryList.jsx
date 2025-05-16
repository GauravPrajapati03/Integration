import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import axios from "axios";
// import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";

function EnquiryList({ data, getEnquiry, setFormData }) {
  // console.log(data)
  getEnquiry;

  const deleteRow = (delID) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#05C03D",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:5000/api/users/deleteUser/${delID}`)
            .then(() => {
              // console.log(`Enquiry Deleted`,res)
              // toast.success("User Deleted Successfully")
              getEnquiry();
            });

          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.log(`Error deleteing`, error);
    }
  };

  const updateRow = async (updateID) => {
    const form = await axios.get(`http://localhost:5000/api/users/getUserById/${updateID}`)
    // console.log(form.data.user)
    setFormData(form.data.user)
  };

  return (
    <div className="overflow-x-auto ml-[-160px] mt-3">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Sr no</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Phone No</TableHeadCell>
            <TableHeadCell>Message</TableHeadCell>
            <TableHeadCell>
              Actions
              <span className="sr-only">Edit</span>
              <span className="sr-only">Delete</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody className="divide-y">
          {data.length >= 1 ? (
            data.map((item, idx) => {
              return (
                <TableRow
                  key={idx}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phoneNo}</TableCell>
                  <TableCell>{item.message}</TableCell>
                  <TableCell className="flex flex-row items-center justify-center gap-2">
                    <button
                      onClick={() => updateRow(item._id)}
                      className="bg-green-500 text-white px-3 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteRow(item._id)}
                      className="bg-red-500 text-white px-3 py-2 rounded"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell colSpan={6} className="text-center">
                No Data Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default EnquiryList;
