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
<<<<<<< HEAD
    update: 'courseCtrl.upsert',
    destroy: 'courseCtrl.destroy',

=======
    update: 'courseCtrl.update',
    destroy: 'courseCtrl.destroy'
>>>>>>> d331e92dfef12db445f8ad854d45df813b399aab
  };


// require the index with our stubbed out modules
var courseIndex = proxyquire('./index.js', {
    express: {
      Router() {
        return routerStub;
      }
    },
    './course.controller': courseCtrlStub,
    '../../auth/auth.service': authServiceStub
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
          .withArgs('/', 'courseCtrl.create')
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

<<<<<<< HEAD
    describe('DELETE /api/courses/:id', function() {
      it('should route to course.controller.destroy', function() {
        expect(routerStub.delete
          .withArgs('/:id', 'authService.hasRole.teacher','courseCtrl.destroy')
=======
    describe('POST /api/courses', function() {
      it('should route to course.controller.update', function() {
        expect(routerStub.put
          .withArgs('/','authService.hasRole.teacher', 'courseCtrl.update')
>>>>>>> 81d7579001464b704ea3b528f2f6706fb7538176
        ).to.have.been.calledOnce;
      });
    });

<<<<<<< HEAD


=======
>>>>>>> 81d7579001464b704ea3b528f2f6706fb7538176


  });//end router tests
