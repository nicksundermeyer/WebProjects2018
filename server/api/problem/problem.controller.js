'use strict';

import Problem from './problem.model';
import shared from './../../config/environment/shared';

export function index(req, res) {
  Problem.find()
    .exec()
    .then(function (problems) {
      return res.status(200).json(problems);
    })
    //Print errors
    .catch(function (err) {
      res.status(500);
      res.send(err);
    });
}


export function show(req, res) {
  Problem.findById(req.params.id)
    .exec()
    .then(function (problem) {
      if (problem) {
        return res.status(200).json(problem);
      } else {
        return res.status(204).end();
      }
    })
    .catch(function () {
      return res.status(404).end();
    });
}

export function create(req, res) {
  const axios = require('axios');
  axios
    .post(shared.problemEngineUrl, req.body)
    .then(function (response) {
      var problem = new Problem();
      problem.problem.description = JSON.parse(JSON.stringify(response.data.problem.description));
      problem.problem.solution = JSON.parse(JSON.stringify(response.data.problem.solution));
      problem.problem.subject = response.data.problem.subject;
      problem.problem.category = response.data.problem.category;
      problem.problem.depth = response.data.problem.depth;
      problem.problem.problemId = response.data.problem.problemId;
      problem.save();
      return res.json(problem).status(204);
    })
    .catch(function () {
      return res.status(400).end();
    });

}

