import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
const ADD_TODO = gql`
  mutation($todo: String!, $isPublic: Boolean!) {
    insert_todos(objects: { title: $todo, is_public: $isPublic }) {
      affected_rows
      returning {
        id
        title
        created_at
        is_completed
      }
    }
  }
`;
const TodoInput = ({ isPublic = false }) => {
  const [addTodo, data] = useMutation(ADD_TODO);
  const [todoInput, setTodoInput] = useState("");
  return (
    <form
      className="formInput"
      onSubmit={(e) => {
        e.preventDefault();
        addTodo({ variables: { todo: todoInput, isPublic } });
      }}
    >
      <input
        className="input"
        placeholder="What needs to be done?"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <i className="inputMarker fa fa-angle-right" />
    </form>
  );
};

export default TodoInput;
