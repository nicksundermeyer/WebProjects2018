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

var courseCtrlStub = {
    index: 'courseCtrl.index',
    show: 'courseCtrl.show',
    create: 'courseCtrl.create',
    update: 'courseCtrl.update',
    destroy: 'courseCtrl.destroy'
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
    './course.controller': courseCtrlStub,
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
                .withArgs('/', 'courseCtrl.index')
                ).to.have.been.calledOnce;
        });
    });

    describe('GET api/courses/:id', function() {
      it('should route to course.controller.show', function(){
        expect(routerStub.get
          .withArgs('/:id', 'courseCtrl.show')
        ).to.have.been.calledOnce;
      });
    });

    describe('POST /api/courses', function() {
        it('should route to course.controller.create', function() {
            expect(routerStub.post
                .withArgs('/','authService.hasRole.teacher', 'courseCtrl.create')
                ).to.have.been.calledOnce;
        });
    });

    describe('POST /api/courses/id', function() {
      it('should route to course.controller.addStudent', function() {
          expect(routerStub.post
              .withArgs('/','authService.hasRole.student', 'courseCtrl.addStudent')
              ).to.have.been.calledOnce;
      });
  });

    describe('DELETE /api/courses/:id', function() {
      it('should route to course.controller.destroy', function() {
        expect(routerStub.delete
          .withArgs('/:id', 'authService.hasRole.admin','courseCtrl.destroy')
        ).to.have.been.calledOnce;
    });
    });

    describe('PUT /api/courses/:id', function() {
      it('should route to course.controller.update', function() {
        expect(routerStub.put
          .withArgs('/:id','authService.hasRole.teacher', 'courseCtrl.update')
        ).to.have.been.calledOnce;
      });
    });

    //TESTS FOR THE PROBLEM ENGINE
    describe('POST to the Problem Engine API', function() {
      it('should route to problem.controller.create', function() {
        expect(routerStub.post
          .withArgs('/', 'problemCtrl.create')
        ).to.have.been.calledOnce;
      });
    });

  });//end router tests
