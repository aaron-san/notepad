import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
// import { INote } from "../App";

interface AddFormData {
  title: string;
  content: string;
}

const FormModal = ({
  setShowModal,
  setIsMenuOpen,
  notesList,
  setNotesList,
}: any) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title."),
    content: yup.string().required("You must add content."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFormData>({
    resolver: yupResolver(schema),
  });
  const noteRef = collection(db, "notes");

  const onAddNote = async (data: AddFormData) => {
    await addDoc(noteRef, {
      ...data,
      // title: data.title,
      // content: data.content,
      username: user?.displayName,
      userId: user?.uid,
    });

    //---------------------------------
    //notesList is an array of objects
    //data is an object
    //---------------------------------

    setNotesList([
      ...notesList,
      {
        ...data,
        username: user?.displayName,
        userId: user?.uid,
        id: Date(),
      },
    ]);

    // const dt = new Date();
    // console.log(dt);
    // console.log(notesList);
    // console.log(data);
    // console.log([
    //   ...notesList,
    //   {
    //     ...data,
    //     username: user?.displayName,
    //     userId: user?.uid,
    //   },
    // ]);
    // console.log(user?.uid);

    // console.log(notesList);

    // navigate("/notepad");
    setShowModal(false);
    setIsMenuOpen(false);
  };

  return (
    <div className="p-7 fixed flex justify-center items-center bg-slate-300 left-0 top-0 h-full w-full z-[200]">
      <div className="text-lg m-7 bg-slate-500 border border-white shadow-2xl shadow-slate-200 md:w-[50%] rounded-2xl px-10 py-7">
        <form onSubmit={handleSubmit(onAddNote)}>
          <h1 className="text-2xl text-slate-100 w-[80%]">Add a note</h1>
          <input
            placeholder="Title..."
            {...register("title")}
            className="p-2 my-2 w-[100%] rounded-sm text-gray-600"
          />
          <p className="text-red-500">{errors.title?.message}</p>
          <textarea
            rows={4}
            placeholder="Content..."
            {...register("content")}
            className="p-2 w-[100%] rounded-sm text-gray-600"
          />
          <p className="text-red-500">{errors.content?.message}</p>
          <input
            type="submit"
            className="m-2 h-30 cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline text-gray-600 bg-green-300 rounded border border-white p-2 shadow-md"
          />
          <button
            className="m-2 h-30 cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline text-gray-600 bg-red-300 rounded border border-white p-2 shadow-md"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
