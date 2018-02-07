import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './about.routes';

export class AboutController {

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  contributorData = {"contributors": [{
                      "name": "Evan Hicks",
                      "email": "evan.hicks@du.edu",
                      "bio": "Evan was the lead developer on the UI side of the project.",
                      "image": "http://www.example.com/route/to/image"
                    },{
                      "name": "Josh Hoeg",
                      "email": "josh.hoeg@du.edu",
                      "bio": "Josh was another lead developer on the UI team for this project.",
                      "image": "http://www.example.com/path/to/image"
                    },{
                      "name": "Joseph Wainwright",
                      "email": "joseph.wainwright@du.edu",
                      "bio": "This is a biography about Joseph, one of the developers on the UI Team.",
                      "image": "http://www.example.com/path/to/image"
                    }]
                  };
  descriptionData = {"description": "This project was developed as part of Dr. Daniel Pittman's Web Development Projects course in Winter Quarter 2018. The goal of the this MVP (minimum viable product) is a rich and responsive web application for Dr. GauthierDickey's research into problem creation and generation for educational purposes."}

  $onInit() {
    /*
    this.$http.get('about.json')
      .then(response => {
        this.displayData = response;
        console.log("RESPONSE:\n" + response.data);
     });
    */
  }

}

export default angular.module('webProjectsApp.about', [ngRoute])
  .config(routing)
  .component('about', {
    template: require('./about.html'),
    controller: AboutController,
    controllerAs: 'aboutController'
  })
  .name;
