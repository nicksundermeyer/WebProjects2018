'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var routerStub = {
    get: sinon.spy(),
    post: sinon.spy(),
    put: sinon.spy(),
    patch: sinon.spy(),
    delete: sinon.spy()
  };

var authServiceStub = {
    isAuthenticated() {
      return 'authService.isAuthenticated';
    },
    hasRole(role) {
      return `authService.hasRole.${role}`;
    },
    hasPermission(role){
      return `authService.hasPermission.${role}`;
    }
  };

var CourseCtrlStub = {
    index: 'CourseCtrl.index',
    show: 'CourseCtrl.show',
    create: 'CourseCtrl.create',
    update: 'CourseCtrl.update',
    destroy: 'CourseCtrl.destroy',
    submitSolution: 'CourseCtrl.submitSolution',
    getTailoredCourse: 'CourseCtrl.getTailoredCourse',
    getAssignment: 'CourseCtrl.getAssignment',
    enrollStudentInCourse: 'CourseCtrl.enrollStudentInCourse'
  };

// require the index with our stubbed out modules
var courseIndex = proxyquire('./index.js', {
    express: {
      Router() {
        return routerStub;
      }
    },
    './Course.controller': CourseCtrlStub,
    '../../auth/auth.service': authServiceStub
  });

  describe('Course API Router:', function() {

    it('should return an express router instance', function() {
      expect(courseIndex).to.equal(routerStub);
    });
    describe('GET api/courses', function(){
        it('should route to course.controller.index', function(){
            expect(routerStub.get
                .withArgs('/', 'CourseCtrl.index')
                ).to.have.been.calledOnce;
        });
    });

    describe('GET api/courses/:id', function() {
      it('should route to course.controller.show', function(){
        expect(routerStub.get
          .withArgs('/:id', 'CourseCtrl.show')
        ).to.have.been.calledOnce;
      });
    });

    describe('POST /api/courses', function() {
        it('should route to course.controller.create', function() {
            expect(routerStub.post
                .withArgs('/','authService.hasRole.teacher', 'CourseCtrl.create')
                ).to.have.been.calledOnce;
        });
    });

    describe('DELETE /api/courses/:id', function() {
      it('should route to course.controller.destroy', function() {
        expect(routerStub.delete
          .withArgs('/:id', 'authService.hasPermission.teacher','CourseCtrl.destroy')
        ).to.have.been.calledOnce;
    });
    });

    describe('PUT /api/courses/:id', function() {
      it('should route to course.controller.update', function() {
        expect(routerStub.put
          .withArgs('/:id','authService.hasPermission.teacher', 'CourseCtrl.update')
        ).to.have.been.calledOnce;
      });
    });

    describe('POST /api/courses/:course/assignments/:assignment/problems/:problem', 
    function() {
      it('should route to course.controller.submitSolution', function() {
        expect(routerStub.post
          .withArgs('/:course/assignments/:assignment/problems/:problem',
           'authService.hasRole.student',
           'CourseCtrl.submitSolution')
        ).to.have.been.calledOnce;
      });
    });

    describe('GET /api/courses/mycourses/:id', function() {
      it('should route to course.controller.getTailoredCourse', function() {
        expect(routerStub.get
          .withArgs('/mycourses/:id', 'authService.hasRole.student',
          'CourseCtrl.getTailoredCourse')
        ).to.have.been.calledOnce;
      });
    });

    describe('GET /api/courses/mycourses/assignments/:id', function() {
      it('should route to course.controller.getAssignment', function() {
        expect(routerStub.get
          .withArgs('/mycourses/assignments/:id', 'authService.hasRole.student',
          'CourseCtrl.getAssignment')
        ).to.have.been.calledOnce;
      });
    });

    describe('POST /api/courses/:id/students', function() {
      it('should route to course.controller.enrollStudentInCourse', function() {
        expect(routerStub.post
          .withArgs('/:id/students', 'authService.hasRole.student',
          'CourseCtrl.enrollStudentInCourse')
        ).to.have.been.calledOnce;
      });
    });

  });//end router tests
