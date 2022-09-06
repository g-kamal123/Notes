import React, { useContext, useEffect, useState } from "react";
import classes from "../Styles/Show.module.css";
import api from "../Server";
import { Modal } from "@mui/material";
import { Storage } from "./Storage";

function Show() {
  const [print, setPrint] = useState([]);
  const [modal, setModal] = useState(false);
  const [delmodal, setdelmodal] = useState(false);
  const [item, setItem] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const detail = useContext(Storage);

  //   useEffect(()=>{
  //     // console.log([detail.pri])
  //     setPrint([detail.pri])
  //   },[detail.pri])
  const delete1 = (item) => {
    setItem(item);
    setdelmodal(true);
  };
  const deleteNote = async () => {
    await api.delete(`/notes/${item.id}`);
    const response = await api.get("/notes");
    let arr = [...response.data];
    arr.sort(order);
    setPrint(arr);
    setdelmodal(false);
  };
  const updatenoteHandler = async () => {
    await api.put(`/notes/${item.id}`, {
      id: item.id,
      author: item.author,
      title: title,
      content: content,
      time: item.time,
    });
    const response = await api.get("/notes");
    let arr = [...response.data];
    arr.sort(order);
    setPrint(arr);
    setModal(false);
  };
  const update = (val) => {
    setItem(val);
    setTitle(val.title);
    setContent(val.content);
    setModal(true);
  };
  const order = (a, b) => {
    return new Date(b.time) - new Date(a.time);
  };
  useEffect(() => {
    const getdata = async () => {
      if (!detail.text) {
        const response = await api.get("/notes");
        let arr = [...response.data];
        arr.sort(order);
        arr = arr.slice(0,2)
        setPrint(arr);
      } else {
        let arr = [detail.pri];
        //   arr.sort(order);
        setPrint(arr);
      }
    };
    getdata();
  }, [detail.pri]);
  return (
    <>
      <div className={classes.show}>
        <button
          style={{
            fontSize: "1.4rem",
            color: "aliceblue",
            backgroundColor: "steelblue",
            border: "none",
            padding: "0.4em",
            borderRadius: "7px",
            cursor: "pointer",
          }}
          onClick={async () => {
            const response = await api.get("/notes");
            let arr = [...response.data];
            arr.sort(order)
            setPrint(arr);
          }}
        >
          See All
        </button>
        {print.map((item) => (
          <div className={classes.onenote}>
            <div>
              <img
                src="note1.png"
                alt=""
                height={800}
                width={800}
                title="My Notes"
              />
            </div>
            <h2>
              <span>{item.title}</span>
              <span>{item.time}</span>
            </h2>
            <p>{item.content}</p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                style={{
                  fontSize: "1.2rem",
                  color: "aliceblue",
                  backgroundColor: "red",
                  border: "none",
                  padding: "0.4em",
                  borderRadius: "7px",
                  cursor: "pointer",
                }}
                onClick={() => delete1(item)}
              >
                Delete
              </button>
              <button
                style={{
                  fontSize: "1.2rem",
                  color: "aliceblue",
                  backgroundColor: "green",
                  border: "none",
                  padding: "0.4em",
                  borderRadius: "7px",
                  cursor: "pointer",
                }}
                onClick={() => update(item)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={modal} onClose={() => setModal(false)}>
        <form
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            backgroundColor: "whitesmoke",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1.5rem",
            height: "55vw",
            width: "55vw",
            border: "4px solid steelblue",
            borderRadius: "7px",
          }}
          onSubmit={async (event) => {
            event.preventDefault();
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="title"
              style={{ fontSize: "2rem", fontWeight: "500" }}
            >
              Title
            </label>
            <input
              style={{ fontSize: "1.4rem", padding: "0.1em" }}
              id="title"
              placeholder="Title"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "1 1 auto",
            }}
          >
            <label
              htmlFor="content"
              style={{ fontSize: "1.7rem", fontWeight: "500" }}
            >
              Content
            </label>
            <textarea
              style={{ flex: "1 1 auto", fontSize: "1.2rem", padding: "0.4em" }}
              id="content"
              required
              value={content}
              onChange={(event) => setContent(event.target.value)}
            ></textarea>
          </div>
          <button
            style={{
              width: "fit-content",
              fontSize: "1.4rem",
              padding: "0.4em",
              backgroundColor: "#007ACC",
              color: "aliceblue",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            type="submit"
            onClick={() => updatenoteHandler()}
          >
            Update
          </button>
        </form>
      </Modal>
      <Modal open={delmodal} onClose={() => setdelmodal(false)}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            backgroundColor: "whitesmoke",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.7rem",
            padding: "1.5rem",
            borderRadius: "7px",
            border: "2px solid steelblue",
          }}
        >
          <h2>Do you want to delete this note?</h2>
          <p style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <button
              style={{
                width: "fit-content",
                fontSize: "1.4rem",
                padding: "0.4em",
                backgroundColor: "green",
                color: "aliceblue",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => setdelmodal(false)}
            >
              Cancel
            </button>
            <button
              style={{
                width: "fit-content",
                fontSize: "1.4rem",
                padding: "0.4em",
                backgroundColor: "red",
                color: "aliceblue",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => deleteNote()}
            >
              Delete
            </button>
          </p>
        </div>
      </Modal>
    </>
  );
}

export default Show;
