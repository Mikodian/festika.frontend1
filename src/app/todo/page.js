"use client";
import ButtonKita from "@/components/Button";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

const ToDo = () => {
  const userReducer = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (userReducer) {
      console.log("User Data:", userReducer);
    }
  }, [userReducer]);

  const [activity, setActivity] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [toDoList, setToDoList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activity === "" && deskripsi === "") return;

    setActivity("");
    setDeskripsi("");
    setToDoList([...toDoList, { activity, deskripsi }]);

    // if (activity !== "" && deskirpsi !== "") {
    //   setActivty("");
    //   setDeskripsi("");
    //   setToDoList([...toDoList, { activity, deskirpsi }]);
    // }
  };

  const handleDeleteList = (index) => {
    const newTask = toDoList;
    newTask.splice(index, 1);

    //refresh
    setToDoList([...newTask]);
  };

  return (
    <div className="container px-96">
      <h1 className="text-2xl">TODO LIST</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="flex flex-col gap-4">
          <p>Activity</p>
          <TextField
            id="outlined-multiline-static"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "blue", // Warna border default
                },
                "&:hover fieldset": {
                  borderColor: "blue", // Warna border saat hover
                },
              },
            }}
          />
          <p>Deskripsi</p>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "blue", // Warna border default
                },
                "&:hover fieldset": {
                  borderColor: "blue", // Warna border saat hover
                },
              },
            }}
          />
          {/* <ButtonKita title={"Simpan ToDo"} type={"submit"} /> */}

          <Button type="submit" size="large" variant="contained">
            Simpan
          </Button>
        </div>
      </form>

      <div className="mt-4" />
      {/* <Button title={"CEKK ToDo"} onClick={() => console.log(toDoList)} /> */}

      {toDoList.map((item, index) => (
        <div
          key={index}
          className="border mb-4 p-4 flex flex-row justify-between"
        >
          <div>
            <p className="text-[24px]">{item.activity}</p>
            <p className="text-[14px]">{item.deskripsi}</p>
          </div>
          {/* <ButtonKita title={"Hapus"} onClick={() => handleDeleteList(index)} /> */}
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            title={"Hapus"}
            onClick={() => handleDeleteList(index)}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ToDo;
