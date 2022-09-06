import React, { useState } from "react";
import classes from "../Styles/Home.module.css";
import Modal from "@mui/material/Modal";
import api from '../Server'
import {v4 as uuid} from 'uuid'

function Home() {
  const [modal, setModal] = useState(false);
  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')
  return (
    <>
      <div className={classes.home}>
        <div className={classes.homeImage}>
          <img
            src="note.jpeg"
            alt=""
            height={577}
            width={1000}
            title="Note maker"
          />
        </div>
        <button onClick={() => setModal(true)}>Create Notes</button>
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
          onSubmit={async(event)=>{event.preventDefault()
            var arr = Date().split(" ")
            await api.post('/notes',{id:uuid(),author:'kamal',title:title,content:content,time:arr[0]+" "+arr[1]+" "+ arr[2]+" "+arr[3]+" "+arr[4]})
            setContent('')
            setTitle('')
            setModal(false)
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
              onChange={(event)=>setTitle(event.target.value)}
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
              style={{ flex: "1 1 auto", fontSize: "1.2rem",padding:'0.4em' }}
              id="content"
              required
              value={content}
              onChange={(event)=>setContent(event.target.value)}
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
            type='submit'
          >
            Save
          </button>
        </form>
      </Modal>
    </>
  );
}

export default Home;
