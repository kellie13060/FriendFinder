// var friends = require("../data/friends.js");
// var bestMatch;


// module.exports = function(app) {
//     app.get("/api/friends", function(req, res) {
//         res.json(friends);
//     });

//     app.post("/api/friends" , function(req, res){
//         var newFriendScore = req.body.scores;
//         var totalDifference = [];

//         //find difference between friends. 
//         for (var i = 0; i < friends.length; i++) {
//             var totalDifference = 0;

//             //loop through each friend
//             for (var k = 0; k < friends.length; k++) {
//                 var difference = 0;
//                 if (parseInt(newFriendScore[k]) > parseInt(friends[i].scores[k])) {
//                     difference = parseInt(newFriendScore[k]) - parseInt(friends[i].scores[k]);
//                     totalDifference += difference;
//                 } else {
//                     difference =
//             parseInt(friends[i].scores[k]) - parseInt(newFriendScore[k]);
//           totalDifference += difference;
//                 }
//             }
//             //add to an array
//             totalDifference.push(totalDifference);
//         }
//         bestMatch = findSmallest(totalDifference);

//         res.json(friendsData[bestMatch]);

//     });
// };

// function findSmallest(numbers) {
//     var indexOfSmallest = 0;
//     var smallestNumber = numbers[0];

//     for (var i = 0; i < numbers.length; i++) {
//         if (numbers[i] < smallestNumber) {
//             smallestNumber = numbers[i];
//             indexOfSmallest = i;
//         }
//     }
//     return indexOfSmallest;
// }

// Require necessary dependencies
var friends = require("../data/friends");

module.exports = function (app) {
    // Return all friends found in friends.js as JSON
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        console.log(req.body);

        // Receive user details (name, photo, scores)
        var user = req.body;

        // parseInt for scores
        for (var i = 0; i < user.scores.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);
        }

        // First friend match is the default friend but result will be whoever has the minimum difference in scores
        var bestFriendIndex = 0;
        var minimumDifference = 40;

        // Start off with a zero difference and compare one set at a time whatever the difference is, add to the total difference
        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
                totalDifference += difference;
            }

            // If there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
            if (totalDifference < minimumDifference) {
                bestFriendIndex = i;
                minimumDifference = totalDifference;
            }
        }

        // after finding match, add user to friend array
        friends.push(user);

        // send back to browser the best friend match
        res.json(friends[bestFriendIndex]);
    });
};