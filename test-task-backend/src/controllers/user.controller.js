const express = require('express');
const { SignUpUserService, LoginUserService } = require('../services/user.service');

const SignUpUser = async (req, res) => {
    const { username,email, password, role, location } = req.body;
    try {
        const result = await SignUpUserService(username,email, password, role, location);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await LoginUserService(email, password);
      res.status(200).send(result);
    } catch (error) {
      res.status(401).send(error.message);
    }
  }
  

module.exports ={
    SignUpUser,
    LoginUser
}

