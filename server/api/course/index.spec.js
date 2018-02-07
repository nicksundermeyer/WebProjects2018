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
    }
  };

var CourseCtrlStub = {
    index: 'CourseCtrl.index',
    show: 'CourseCtrl.show',
    create: 'CourseCtrl.create',
    update: 'CourseCtrl.update',
    destroy: 'CourseCtrl.destroy'
  };

var problemCtrlStub = {
    index: 'problemCtrl.index',
    show: 'problemCtrl.show',
    create: 'problemCtrl.create'
  };


// require the index with our stubbed out modules
var courseIndex = proxyquire('./index.js', {
    express: {
      Router() {
        return routerStub;
      }
    },
    './Course.controller': CourseCtrlStub,
    '../../auth/auth.service': authServiceStub,
    '../problem/problem.controller': problemCtrlStub
  });

  describe('Course API Router:', function() {

    it('should return an express router instance', function() {
      expect(courseIndex).to.equal(routerStub);
    });

    describe('GET api/courses', function(){
        it('should route to course.controller', function(){
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
          .withArgs('/:id', 'authService.hasRole.teacher','CourseCtrl.destroy')
        ).to.have.been.calledOnce;
    });
    });

    describe('PUT /api/mycourses/:id', function() {
      it('should route to course.controller.update', function() {
        expect(routerStub.put
          .withArgs('/:id','authService.hasRole.teacher', 'CourseCtrl.update')
        ).to.have.been.calledOnce;
      });
    });

  });//end router tests
