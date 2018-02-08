'use strict';

import AbstractCourse from './AbstractCourse.model';
import * as problemController from '../problem/problem.controller';
import shared from './../../config/environment/shared';
import Assignment from './assignment.model';
import Problem from '../problem/problem.model';
import TailoredCourse from './TailoredCourse.model';
import User from '../user/user.model';


export function getTailoredCourse(req, res) {
  return TailoredCourse.findById(req.params.id).exec().then( tc => {
    if(tc) {
      return res.json(tc).status(200);
    } else {
      return res.status(204).end();
    }
  }).catch( () => {
    return res.status(404).end();
  });
}

export function getAssignment(req, res) {
  return Assignment.findById(req.params.id).exec().then( assignment => {
    if(assignment) {
      return res.json(assignment).status(200);
    } else {
      return res.status(204).end();
    }
  }).catch( () => {
    return res.status(404).end();
  });
}

export function index(req, res) {
  AbstractCourse.find()
    .exec()
    .then(function(courses) {
      return res.status(200).json(courses);
    })
    //Print errors
    .catch(function(err) {
      res.status(500);
      res.send(err);
    });
}


export function show(req, res) {
  AbstractCourse.findById(req.params.id)
    .exec()
    .then(function(course) {
      if(course) {
        return res.status(200).json(course);
      } else {
        return res.status(204).end();
      }
    })
    //Print errors
    .catch(function(err) {
      res.send(err);
      return res.status(404).end();
    });
}


export function create(req, res) {
  let course = req.body;
  AbstractCourse.create(course)
    .then(function(createdCourse) {
      createdCourse.teacherID = req.user._id;
      createdCourse.save();
      return res.status(201).json(createdCourse);
    })
    //Print errors
    .catch(function(err) {
      res.send(err);
      return res.status(400).end();
    });
}

export function update(req, res) {
  return AbstractCourse.findById(req.params.id).exec()
    .then(course => {
      if(course) {
        hasPermission(req, course).then(() => {
          //update abstract course
          course.name = req.body.name;
          course.description = req.body.description;
          course.maxStudents = req.body.maxStudents;

          return course.save()
            .then(() => {
              return res.status(204).end();
            })
            .catch(function() {
              return res.status(404).end();
            });
        })
          .catch(function() {
            return res.status(403).end();
          });
      } else {
        return res.status(403).end();
      }
    });
}

export function destroy(req, res) {
  AbstractCourse.findById(req.params.id).then(course => {
    if(course) {
      hasPermission(req, course).then(() => {
        course.remove();
        return res.status(204).end();
      }).catch(() => {
        return res.status(403).end();
      });
    }
  }
  ).catch(() => {
    return res.status(400).end();
  });
}

export function enrollStudentInCourse(req, res) {

  //Find the course with the ID passed into the URL
  return AbstractCourse.findById(req.params.id)
    .exec()
    .then(function(course) {
      if(course) {
        //Create the course and associate it with the enrolling students ID
        //Since we return Promise.all we need to chain this with a .then or it will return a pending promise!
        return createCourseAndAddStudent(req.user, course).then( tc => {
          //Remove solutions from return
          //There may be a better way to do this without querying the database
          TailoredCourse.findById(tc._id, '-assignments.problems.problem.solution').then ( tcNoSolutions => {
            return res.json(tcNoSolutions).status(201);
          });
        });
      } else {
        return res.status(204).end();
      }
    })
    .catch(function() {
      return res.json('Invalid Course ID: '.concat(req.params.id)).status(400).end();
    });
}

/**
 * Generate a TailoredCourse that is specific to the student
 * include unique assignments and problems*
 * @params {User} user - Student that is getting the tailoredCourse
 * @params {Course} - The abstractCourse with details on for creating the tailored Course
 */
function createCourseAndAddStudent(user, course) {

  //This is where we will store the assignments returned by our generateAssignmentsWith() function
  var tailoredAssignments = [];

  //Push the generated assignments (with problems in them) to our local array tailoredAssignments
  for(var i = 0; i < course.assignments.length; i++) {
    tailoredAssignments.push(generateAssignmentsWith(course, course.assignments[i]));
  }

  //Return a pending promise. We will use .then to access this return in createCourseAndAddStudent() function
  return Promise.all(tailoredAssignments).then(ta => {

    //Create a TailoredCourse and assign the the values we have access to right now
    var tailoredCourse = new TailoredCourse();
    tailoredCourse.abstractCourseID = course._id;
    tailoredCourse.studentID = user._id;
    tailoredCourse.subjects = course.subjects;
    tailoredCourse.categories = course.categories;

    //ta is equal to the populated tailoredAssignments that was returned from generateAssignmentsWith()
    //Since courses can have more than one assignment we need to push all the returned assignments to tailoredCourse
    ta.forEach(function(item) {
      tailoredCourse.assignments.push(item);
    });

    //Save the newly created tailoredCourse object to the database and return it
    return tailoredCourse.save();
  }).catch(err => {
    console.log('Error creating tailored assignment', err);
  });
}//end create tailored course


/**
 * Generate a new assignment with problems based on the pre-defined
 * parameters from a AbstractCourse and AbstractCourse.assignment
  * @params {Course} course
 * @params {Assignment} assignment
 * @return {Assignment}
 */
function generateAssignmentsWith(course, assignment) {

  //We are returning a promise so the Promise.all in the above function will only be called when tailoredAssignments
  //has been fully populated! This is important because Javascript is asynchronous and we do NOT want to create
  //a tailoredCourse until we have fully populated its fields!
  return new Promise(function(resolve, reject) {

    //Compute the number of existing problems to fetch, and the number of new ones to generate
    var numberOfProblems = Math.floor(Math.random() * assignment.maxNumProblems) + assignment.minNumProblems;
    var numberOfNew = Math.floor(numberOfProblems * (assignment.newProblemPercentage / 100));

    //Query the Problem table in the database. $limit is going to limit the number of results so we only fetch
    //the amount of existing problems we need
    Problem.aggregate(
        [{$match: {'problem.category': course.categories}}, {$limit: (numberOfProblems - numberOfNew)}]
      ).then(results => {
        //Results is an array with numberOfProblems - numberOfNew matching problems
        //It was important to call this BEFORE we create new problems. If we didn't create problems after
        //fetching existing problems there is a possibility that a newly generated problem would be fetched
        //as an existing problems and there could be duplicate problems.
        for(let i = 0; i < numberOfNew; i++) {
          //Add on to the array of existing problems with numberOfNew new problems
          results.push(problemController.create({
            protocol: 'dpg',
            version: '0.1',
            problem: {
              subject: course.subjects,
              category: course.categories,
              depth: 1
            }
          }));
        }

        return results;
      }).then(promises => {
        //Create new assignment populated with appropriate fields and our final array of problems
        //Promises becomes finalProblems, which we then save in the assignment.

        Promise.all(promises).then(finalProblems => {
          resolve(new Assignment({
            AbstractAssignmentId: course._id,
            title: assignment.title,
            description: assignment.description,
            problems: finalProblems
          }).save());
        });
      }).catch(err => {
        reject('Error getting problems', err);
      });
  }
  );
}


//only allow the course teacher or role greater than teacher permission
export function hasPermission(req, course) {
  return new Promise(function(resolve, reject) {
    if(shared.userRoles.indexOf(req.user.role) > shared.userRoles.indexOf('teacher') || course.teacherID.equals(req.user._id)) {
      resolve();
    } else {
      reject();
    }
  });
}
