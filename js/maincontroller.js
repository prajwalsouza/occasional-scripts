var app = angular.module('myApp', []);


app.controller('theMainController', ['$scope', '$location', '$timeout', '$interval', '$filter', function($scope, $location, $timeout, $interval, $filter) {
    $scope.appName = "Experiment Assist";
   
    $scope.potentialParticipant = {}

    $scope.markPresence = false;


    $scope.generatePotentialParticipants = function () {
        for (i = 1; i <= 10; i++) {
            $scope.potentialParticipant[i] = {};
            $scope.potentialParticipant[i]['status'] = 'present';
        }
    }


    $scope.getParticipantNumber = function() {
        count = 0;
        for (var participant in $scope.potentialParticipant) {
            if ($scope.potentialParticipant[participant]['status'] == 'present') {
                count = count + 1;
            }
        }
        return count;
    }

    $scope.groups = {}
    $scope.numOfGroups = 0;
    
    $scope.generateNewGroups = function () {
        participantsPresent = $scope.getParticipantNumber();
        $scope.numOfGroups = parseInt(participantsPresent/2)

        for (k = 0; k < $scope.numOfGroups; k++) {
            $scope.groups[k] = {'capacity': 2}
            $scope.groups[k]['members'] = []
        }

        if ($scope.participantsPresent % 2 == 1) {
            $scope.groups[0]['capacity'] = 3;
        }

        for (var participant in $scope.potentialParticipant) {
            if ($scope.potentialParticipant[participant]['status'] == 'present') {
                while (true) {
                    groupNum = parseInt(Math.random()*$scope.numOfGroups)
                    if ($scope.groups[groupNum]['members'].length < $scope.groups[groupNum]['capacity']) {
                        $scope.groups[groupNum]['members'].push(participant);
                        $scope.potentialParticipant[participant]['group'] = groupNum;
                        break;
                    }
                }
            }
        }
    }

    $scope.tweakGroups = function () {
        oldPoints = []
        for (k = 0; k < $scope.numOfGroups; k++) {
            oldPoints.push(k);
        }

        points = shuffle(oldPoints);

        // correctShuffle = false;
        // while (correctShuffle == false) {
            
            
        //     for (k = 0; k < points.length; k++) {
        //         if (points[k] == oldPoints[k]) {
        //             break
        //         }
        //         if (k == points.length - 1) {
        //             correctShuffle = true;
        //         }
        //     }
        // }
            

        for (k = 0; k < points.length; k++) {
            oldGroup = k;
            newGroup = points[k];

            oldMember = $scope.groups[oldGroup]['members'].pop();
            $scope.groups[newGroup]['members'].splice(0, 0, oldMember);
            $scope.potentialParticipant[oldMember]['group'] = newGroup;
        }
    }


    $scope.generatePotentialParticipants();


    
    // $scope.potentialParticipant[24]['status'] = 'absent'

    

    console.log($scope.groups);
    console.log($scope.potentialParticipant);










    $scope.parseInt = function(value) {
        return parseInt(value);
    }

    $scope.ignusTheme = {}
    $scope.ignusTheme.hsMoveLeft = function(carousalElement, scrollPercentAmount) {
        $(carousalElement).finish();
        var leftPos = $(carousalElement).scrollLeft();
        $(carousalElement).animate({scrollLeft: leftPos - window.innerWidth*0.01*scrollPercentAmount}, 300);
    }
    
    $scope.ignusTheme.hsMoveRight = function(carousalElement, scrollPercentAmount) {
        $(carousalElement).finish();
        var leftPos = $(carousalElement).scrollLeft();
        $(carousalElement).animate({scrollLeft: leftPos + window.innerWidth*0.01*scrollPercentAmount}, 300);
    }


}]);


app.filter('numkeys', function() {
    return function(object) {
        if (object == null) {
            return null
        }
        else {
            return Object.keys(object).length;
        }
    }
});

app.filter('numkeysFirebase', function() {
    return function(object) {
        if (object == null) {
            return null
        }
        else {
            countO = 0;
            for (var key in object) {
                if (key[0] != '$' && key != 'forEach') {
                    countO = countO + 1;
                }
            }
            return countO
        }
    }
});

app.filter('getDate', function() {
    return function(dateSeconds) {
        if (dateSeconds == null) {
            return null
        }
        else {
            d = new Date(dateSeconds).toLocaleString()
            return d;
        }
        
    }
});