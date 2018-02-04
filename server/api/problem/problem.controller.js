'use strict';

import Problem from './problem.model';
import shared from './../../config/environment/shared';

export function index(req, res) {
  Problem.find()
    .exec()
    .then(function(problems) {
      return res.status(200).json(problems);
    })
    //Print errors
    .catch(function(err) {
      res.status(500);
      res.send(err);
    });
}

export function show(req, res) {
  Problem.findById(req.params.id)
    .exec()
    .then(function(problem) {
      if(problem) {
        return res.status(200).json(problem);
      } else {
        return res.status(204).end();
      }
    })
    .catch(function() {
      return res.status(404).end();
    });
}

export function create(req) {
  const axios = require('axios');

  return new Promise(function(resolve, reject) {
    axios
      .post(shared.problemEngineUrl, req)
      .then(function(response) {
        var problem = new Problem();
        problem.problem.description = JSON.parse(JSON.stringify(response.data.problem.description));
        problem.problem.solution = JSON.parse(JSON.stringify(response.data.problem.solution));
        problem.problem.problemId = response.data.problem.problemId;
        problem.problem.instructions = response.data.instructions;
        problem.problem.subject = response.data.problem.subject;
        problem.problem.category = response.data.problem.category;
        problem.problem.depth = response.data.problem.depth;
        problem.save();
        resolve(problem);
      })
      .catch(function(err) {
        reject('Axios status code: '.concat(err.response.status));
      });
  });

}

