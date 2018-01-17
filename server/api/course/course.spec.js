

var routerStub = {
    get: sinon.spy(),
    put: sinon.spy(),
    patch: sinon.spy(),
    post: sinon.spy(),
    delete: sinon.spy()
  };


describe('GET api/courses', function(){
    it('should route to course.controller', function(){
        expect(routerStub.get
            .withArgs('/', 'courseCtrl.index')
            ).to.have.been.calledOnce;
    });
});