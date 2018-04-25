// abstractCourse
var newCourse = {
  _id: '5a7ba41cd642961be4381866',
  name: 'booleanLogic-about-and',
  description: 'booleanLogic focusing on the and topic',
  subjects: 'booleanLogic',
  categories: 'and',
  __v: 0,
  assignments: [
    {
      title: 'Assignment 1',
      description: 'this focuses on and operations',
      minNumProblems: 5,
      maxNumProblems: 10,
      newProblemPercentage: 15,
      _id: '5a7ba41cd642961be4381868'
    },
    {
      title: 'Assignment 2',
      description: 'this focuses on and operations',
      minNumProblems: 3,
      maxNumProblems: 15,
      newProblemPercentage: 25,
      _id: '5a7ba41cd642961be4381867'
    }
  ],
  teacherID: null
};

// tailoredCourse
var tailoredCourse = {
  _id: '5aa995204a7d181ba84c8a70',
  updatedAt: '2018-03-14T21:33:20.605Z',
  createdAt: '2018-03-14T21:33:20.605Z',
  categories: 'implication',
  subjects: 'booleanLogic',
  __v: 0,
  assignments: [
    {
      _id: '5aa995204a7d181ba84c8a6f',
      updatedAt: '2018-03-14T21:33:20.600Z',
      createdAt: '2018-03-14T21:33:20.600Z',
      AbstractAssignmentId: {
        _id: '5aa994094a7d181ba84c895d',
        title: 'Assignment 1',
        description: 'This focuses on implication operations'
      },
      __v: 0
    }
  ],
  abstractCourseID: {
    name: 'booleanLogic-about-implication',
    description: 'booleanLogic focusing on the implication topic'
  }
};
