'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var courseCtrlStub = {
    index: 'courseCtrl.index',
    show: 'courseCtrl.show',
    create: 'courseCtrl.create',
    update: 'courseCtrl.upsert',
    destroy: 'courseCtrl.destroy'
  };


var routerStub = {
    get: sinon.spy(),
    put: sinon.spy(),
    patch: sinon.spy(),
    post: sinon.spy(),
    delete: sinon.spy()
  };

// require the index with our stubbed out modules
var courseIndex = proxyquire('./index.js', {
    express: {
      Router() {
        return routerStub;
      }
    },
    './course.controller': courseCtrlStub
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
      })
    })

  });//end router tests
