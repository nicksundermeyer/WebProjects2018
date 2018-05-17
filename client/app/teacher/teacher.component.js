import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './teacher.routes';

export class TeacherController {
  course = {
    name: '',
    description: '',
    subjects: '',
    categories: [],
    assignments: [
      {
        title: '',
        description: '',
        minNumProblems: '',
        maxNumProblems: '',
        newProblemPercentage: '',
        numberOfPossibleAttempts: ''
      }
    ]
  };
  courses = [];
  teacher;
  gravatarUrl;
  submitted = false;

  /*@ngInject*/
  constructor($http, Course, Auth, UserServ) {
    this.$http = $http;
    this.Course = Course;
    this.Auth = Auth;
    this.UserServ = UserServ;
  }

  $onInit() {
    // get teacher's courses
    this.Auth.getCurrentUser().then(teacher => {
      //the gravatar implementation should build a url from the email given from the student size 320 px
      // this.gravatarUrl = gravatar.url(teacher.email, {s: '320', r: 'x', d: 'retro'});

      // get courses
      this.UserServ.getUsersCourses(teacher._id).then(response => {
        this.courses = [];
        response.data.forEach(aCourse => {
          console.log(aCourse);
          var tempCourse = {
            name: aCourse.abstractCourseID.name,
            description: aCourse.abstractCourseID.description,
            categories: aCourse.categories,
            subjects: aCourse.subjects,
            _id: aCourse.abstractCourseID._id
          };
          this.courses.push(tempCourse);
        });
      });
    });
  }

  submit() {
    this.submitted = true;

    // submit the course to be created
    this.Course.createCourse(this.course)
      .then(result => {
        this.formInfo =
          'Abstract Course (id=' + result._id + ') successfully created!';
      })
      .catch(err => {
        console.error(err);
      });
  }

  getCourses() {}
}

export default angular
  .module('webProjectsApp.teacher', [ngRoute])
  .config(routing)
  .component('teacher', {
    template: require('./teacher.html'),
    controller: TeacherController,
    controllerAs: 'teacherController'
  }).name;
