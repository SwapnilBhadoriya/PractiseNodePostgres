const express = require("express");
const asyncWrap = require("../middlewares/async");
const { pool } = require("../database/db");

const getAllItems = asyncWrap(async (req, res) => {
  const data = await pool.query("Select * from tasks");
  res.status(200).send({ tasks: data.rows });
});

const createTask = async (req, res) => {
  const { description } = req.body;

  try {
    await pool.query("Insert into tasks(description) values(trim($1))", [
      description,
    ]);
    res.status(201).send("Create Task");
  } catch (error) {
    console.log("Error in inserting the data into database..", error);
    res.status(500).send({
      message: "Error in inserting the data in database.",
      error: error,
    });
  }
};

const getTask = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query("Select * from tasks where id=$1", [id]);
    res.status(200).send({ task: result.rows[0] });
  } catch (error) {
    console.log("Error in fetching data from the database.");
    res.status(500).send({
      message: "Error in fetching data from the database.",
      errro: error,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await pool.query(
      "Update tasks set description=$2 ,completed=$3 where id=$1 returning * ",
      [req.params.id, req.body.description, req.body.completed]
    );
    res.status(201).send({ task: task.rows[0] });
    console.log(task.rows);
  } catch (error) {
    console.log("Error in updating to database.");
    res
      .status(500)
      .send({ message: "Error in updating to database.", error: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    await pool.query("Delete from tasks where id=$1", [req.params.id]);
    res.send({ message: "Deleted successfully" });
  } catch (error) {
    console.log("Error in deleting from the database.");
    res.status(500).send({ message: "Error in deleting .", error });
  }
};
module.exports = { getAllItems, getTask, updateTask, createTask, deleteTask };
