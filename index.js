import { fifaData } from './fifa.js';
console.log(fifaData);


// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

function getSpecifics(list) {
    list.forEach(function(item){
        if (item.Year === 2014 && item.Stage === "Final"){
            let winner = item[ "Home Team Name" ];
            if(item[ "Home Team Goals" ] < item[ "Away Team Goals" ]) { // Check winner of the match
                winner = item[ "Away Team Name" ]; // Assign winner
            }

            console.log(`The Home Team for the 2014 world cup final was ${item[ "Home Team Name" ]}`);
            console.log(`The Away Team for that game was ${item[ "Away Team Name" ]}`);
            console.log(`The Home Team scored ${item[ "Home Team Goals" ]} goals, while the Away Team scored ${item[ "Away Team Goals" ]}`);
            console.log(`Therefore, The team who came out victorious was ${winner}`);
        }
    })
}

getSpecifics(fifaData);

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(list) {
    let finalsData = [];
    finalsData = list.filter(function(item){
        return item.Stage === "Final";
    });

    return finalsData;
};

console.log(getFinals(fifaData));

/* Task 3: Impliment a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(callback) { // higher-order function
    let finalsData = callback(fifaData); // assign array from callback data
    let years = [];
    finalsData.forEach(function(item){
        years.push(item.Year);
    });

    return years;
};

console.log(getYears(getFinals));

/* Task 5: Impliment a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(callback) { // higher-order function
    let finalsData = callback(fifaData); // assign array to callback
    let winners = [];
    finalsData.forEach(function(item){
        if(item[ "Home Team Goals" ] > item[ "Away Team Goals" ]) {
            winners.push(item[ "Home Team Name" ]);
        } else {
            winners.push(item[ "Away Team Name" ]);
        }
    });

    return winners;
};

console.log(getWinners(getFinals));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(callbackWinners, callbackYears){ // higher-order function
    let winners = callbackWinners;
    let years = callbackYears;
    let statements = years.map(function(item){
        return `In ${item}, `;
    });

    statements = winners.map(function(item, index){
        return statements[index] + `${item} won the world cup!`;
    });

    return statements;
}

console.log(getWinnersByYear(getWinners(getFinals), getYears(getFinals)));

/* Task 7: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
    let initialValue = 0;
    let teamWins = data.reduce(function(accumulator, item){
        if (item[ "Stage" ] === "Final" && item[ "Home Team Initials" ] === teamInitials && item[ "Home Team Goals" ] > item[ "Away Team Goals" ]) {
            return accumulator + 1;
        } else if (item[ "Stage" ] === "Final" && item[ "Away Team Initials" ] === teamInitials && item[ "Away Team Goals" ] > item[ "Home Team Goals" ]){
            return accumulator + 1;
        }
        
        return accumulator 
    }, initialValue);
    
    return teamWins;
};

console.log(getCountryWins(fifaData, "ITA"))


/* Task 8: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

/*
    Get Finals Games
    Get Teams
    Count appearances for Teams
    Count Score for Teams
    Do Math to find average
*/

function getGoals(data) {
    let teams = []; // Declare Empty Array for Team names

    // Get Finals Games
    let cupGames = data.filter(function(item){ // Filter World Cup Games
        return item["Stage"] === "Final";
    });

    // Get Teams
    cupGames.forEach(function(item){ // Home Teams
        teams.push(item["Home Team Name"]);
    });
    cupGames.forEach(function(item){ // Away Teams
        teams.push(item["Away Team Name"]);
    });
    let teamList = teams.filter(function(item, index){ // Remove Duplicates
        return teams.indexOf(item) == index;
    });

    // Setup Object List
    let goalData = [];
    teamList.forEach(function(item){
        goalData.push({goals: 0, appearanceCount: 0});
    });

    // Record Goal and Appearance Data for Each game
    cupGames.forEach(function(item){
        // Record Home Team Data
        goalData[teamList.indexOf(item["Home Team Name"])].goals += item["Home Team Goals"];
        goalData[teamList.indexOf(item["Home Team Name"])].appearanceCount++;
        // Record Away Team Data
        goalData[teamList.indexOf(item["Away Team Name"])].goals += item["Away Team Goals"];
        goalData[teamList.indexOf(item["Away Team Name"])].appearanceCount++;
    });

    //Calculate Averages
    let teamAvgs = [];
    goalData.forEach(function(item){
        teamAvgs.push(item.goals / item.appearanceCount);
    });


    let indexOfHighest = 0;
    teamAvgs.forEach(function(item, index){ // Calculate Highest Average Scoring Team
        if(teamAvgs[indexOfHighest] < item){
            indexOfHighest = index;
        }
    });

    return teamList[indexOfHighest];
}

console.log(getGoals(fifaData));


/* Task 9: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
    let teams = []; // Declare Empty Array for Team names

    // Get Finals Games
    let cupGames = data.filter(function(item){ // Filter World Cup Games
        return item["Stage"] === "Final";
    });

    // Get Teams
    cupGames.forEach(function(item){ // Home Teams
        teams.push(item["Home Team Name"]);
    });
    cupGames.forEach(function(item){ // Away Teams
        teams.push(item["Away Team Name"]);
    });
    let teamList = teams.filter(function(item, index){ // Remove Duplicates
        return teams.indexOf(item) == index;
    });

    // Setup Object List
    let goalData = [];
    teamList.forEach(function(item){
        goalData.push({goalsAgainst: 0, appearanceCount: 0});
    });

    // Record Goal and Appearance Data for Each game
    cupGames.forEach(function(item){
        // Record Home Team Data
        goalData[teamList.indexOf(item["Home Team Name"])].goalsAgainst += item["Away Team Goals"];
        goalData[teamList.indexOf(item["Home Team Name"])].appearanceCount++;
        // Record Away Team Data
        goalData[teamList.indexOf(item["Away Team Name"])].goals += item["Home Team Goals"];
        goalData[teamList.indexOf(item["Away Team Name"])].appearanceCount++;
    });

    //Calculate Averages
    let teamAvgs = [];
    goalData.forEach(function(item){
        teamAvgs.push(item.goalsAgainst / item.appearanceCount);
    });

    console.log(teamList);
    console.log(teamAvgs);

    let indexOfHighest = 0;
    teamAvgs.forEach(function(item, index){ // Calculate Highest Average Scoring Team
        if(teamAvgs[indexOfHighest] < item){
            indexOfHighest = index;
        }
    });

    return teamList[indexOfHighest];
};

console.log(badDefense(fifaData));


/* Task 10: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
    let homeAvg = data.reduce(function(accumulator, item){ // Get Total Goals for Home
        return accumulator + item["Home Team Goals"];
    }, 0);
    homeAvg = homeAvg / data.length;
    let awayAvg = data.reduce(function(accumulator, item){ // Get Total Goals for Away
        return accumulator + item["Away Team Goals"];
    }, 0);
    awayAvg = awayAvg / data.length;

    
    return {Home: homeAvg, Away: awayAvg}
};

console.log(getAverageGoals(fifaData));


/// STRETCH 🥅 //

/* Use the space below to work on any stretch goals of your chosing as listed in the README file. */


// Strech Task 1

function searchWorldCup(data, initials){
    let appearances = 0;
    let cupGames = data.filter(function(item){ // Filter World Cup Games
        return item["Stage"] === "Final";
    });

    appearances = cupGames.reduce(function(accumulator,item){
        if(item["Home Team Initials"] === initials || item["Away Team Initials"] === initials) {
            return accumulator + 1;
        } else {
            return accumulator;
        }
    }, 0);

    return appearances;
}

console.log(searchWorldCup(fifaData, "ITA"));

function goalsSince1930(data, initials){
    let appearances = 0;
    let cupGames = data.filter(function(item){ // Filter World Cup Games
        return item["Stage"] === "Final";
    });
    let cupGamesAfter1930 = cupGames.filter(function(item){
        return item["Year"] > 1930;
    });

    appearances = cupGamesAfter1930.reduce(function(accumulator,item){
        if(item["Home Team Initials"] === initials || item["Away Team Initials"] === initials) {
            return accumulator + 1;
        } else {
            return accumulator;
        }
    }, 0);

    return appearances;
}

console.log(goalsSince1930(fifaData, "GER"));