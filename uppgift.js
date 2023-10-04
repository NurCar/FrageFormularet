const prompt = require('prompt-sync')({ sigint: true }); //To receive input from the user
const fs = require('fs'); //To perform file operations

const results = []; //An empty array to store survey results

//Array for the survey question and the values of the answers to these questions
//Each question and answer is stored in an object.
//The first object contains "question" and "answers". The second object has a property called "answers".
//This property represents a nested object.This nested object contains "Yes" and "No".
const questions = [
    {
        question: '1.Do you like taking care of pets at home? (Yes/No)',
        answers: {
            Yes: { Cat: 3, Dog: 4, Rabbit: 2, Fish: 1 },
            No: { Cat: 1, Dog: 0, Rabbit: 2, Fish: 4 }
        }
    },
    {
        question: '2.Do you spend much time at home? (Yes/No)',
        answers: {
            Yes: { Cat: 3, Dog: 4, Rabbit: 2, Fish: 0 },
            No: { Cat: 1, Dog: 0, Rabbit: 2, Fish: 4 }
        }
    },
    {
        question: '3.Do you have plants in your home? (Yes/No)',
        answers: {
            Yes: { Cat: 2, Dog: 1, Rabbit: 1, Fish: 4 },
            No: { Cat: 4, Dog: 3, Rabbit: 2, Fish: 0 }
        }
    },
    {
        question: '4.Is house cleaning important to you? (Yes/No)',
        answers: {
            Yes: { Cat: 2, Dog: 0, Rabbit: 1, Fish: 4 },
            No: { Cat: 2, Dog: 4, Rabbit: 3, Fish: 0 }
        }
    },
    {
        question: '5.Do guests come to your house very often? (Yes/No)',
        answers: {
            Yes: { Cat: 2, Dog: 3, Rabbit: 2, Fish: 4 },
            No: { Cat: 2, Dog: 3, Rabbit: 2, Fish: 4 }
        }
    },
    {
        question: '6.Do you travel often? (Yes/No)',
        answers: {
            Yes: { Cat: 1, Dog: 0, Rabbit: 2, Fish: 3 },
            No: { Cat: 3, Dog: 4, Rabbit: 2, Fish: 1 }
        }
    },
    {
        question: '7.Do you want to contact with the pets so much? (Yes/No)',
        answers: {
            Yes: { Cat: 3, Dog: 4, Rabbit: 1, Fish: 0 },
            No: { Cat: 1, Dog: 0, Rabbit: 3, Fish: 4 }
        }
    },
    {
        question: '8.Is your financial situation good to raise an animal? (Yes/No)',
        answers: {
            Yes: { Cat: 3, Dog: 4, Rabbit: 2, Fish: 1 },
            No: { Cat: 1, Dog: 0, Rabbit: 1, Fish: 3 }
        }
    },
    {
        question: '9.Do you own a big house? (Yes/No)',
        answers: {
            Yes: { Cat: 3, Dog: 4, Rabbit: 2, Fish: 0 },
            No: { Cat: 2, Dog: 1, Rabbit: 3, Fish: 1 }
        }
    },
    {
        question: '10.Do you like to take responsibility? (Yes/No)',
        answers: {
            Yes: { Cat: 3, Dog: 4, Rabbit: 2, Fish: 1 },
            No: { Cat: 1, Dog: 0, Rabbit: 2, Fish: 3 }
        }
    },
    {
        question: '11.Do you have any previous pets care experience? (Yes/No)',
        answers: {
            Yes: { Cat: 3, Dog: 4, Rabbit: 3, Fish: 1 },
            No: { Cat: 1, Dog: 0, Rabbit: 1, Fish: 3 }
        }
    },
    {
        question: '12.Do you have a friend you can leave your pets? (Yes/No)',
        answers: {
            Yes: { Cat: 3, Dog: 4, Rabbit: 2, Fish: 4 },
            No: { Cat: 0, Dog: 0, Rabbit: 1, Fish: 1 }
        }
    },
    {
        question: '13.Do you live on a high floor? (Yes/No)',
        answers: {
            Yes: { Cat: 0, Dog: 3, Rabbit: 1, Fish: 4 },
            No: { Cat: 4, Dog: 0, Rabbit: 3, Fish: 0 }
        }
    },
    {
        question: '14.Do you like bonding with your pets? (Yes/No)',
        answers: {
            Yes: { Cat: 3, Dog: 4, Rabbit: 1, Fish: 0 },
            No: { Cat: 1, Dog: 0, Rabbit: 3, Fish: 4 }
        }
    },
    {
        question: '15.Do you go for walks regularly? (Yes/No)',
        answers: {
            Yes: { Cat: 1, Dog: 4, Rabbit: 0, Fish: 0 },
            No: { Cat: 3, Dog: 0, Rabbit: 4, Fish: 4 }
        }
    },
];
//A function that launches the survey is defined to collect information from the user
function start() {
    //An empty object is created to store the user's name and the survey date
    const userData = {};

    userData.name = prompt('Name: '); //To get name from users with the object

    //JavaScript's Date object is created
    userData.timestamp = new Date().toLocaleString();
    //toLokaleString formats the date and time according to the local time zone.

    //This function is used to ask the user survey questions and process the answers.
    askQuestions(userData);
}

//
function askQuestions(userData) { //A function that asks questions and processes the answers
    //An object is created to store the total score based on the answers.
    let totalPoints = { Cat: 0, Dog: 0, Rabbit: 0, Fish: 0 };

    console.log('Answer the following questions:');

    //A loop is started to process each element of the questions array in turn.
    //Questions within the loop is assigned to the currentQuestion.
    //Each question, which is the object, is assigned to current questions and the answers are processed.
    //prompt is displayed to ask the user the currentQuestion.question. The user's answer is assigned to the answer variable.
    for (let i = 0; i < questions.length; i++) {
        const currentQuestion = questions[i];
        const answer = prompt(currentQuestion.question + ' (Yes/No): ').toLowerCase();

        //If the answer is "yes", the points for the "Yes" answer to the current question are 
        //added to the totalPoints object using the addPoints function.

        if (answer === 'yes') {
            totalPoints = addPoints(totalPoints, currentQuestion.answers.Yes);
        } else if (answer === 'no') {
            totalPoints = addPoints(totalPoints, currentQuestion.answers.No);
        } else {
            console.log('Please enter either "Yes" or "No" as your answer.');
            i--; // Repeat the same question since the input was not valid
        }
    }

    // The function with this name is called to display the results
    displayResults(userData, totalPoints);

    //The function with this name is called
    saveResults();
}

//This function takes two different parameters and is used to calculate scores.
//it adds up the total score with the scores of the current question.
//totalPoints = addPoints(totalPoints, currentQuestion.answers.No or .Yes);
function addPoints(points1, points2) {
    return {
        Cat: points1.Cat + points2.Cat,
        Dog: points1.Dog + points2.Dog,
        Rabbit: points1.Rabbit + points2.Rabbit,
        Fish: points1.Fish + points2.Fish
    };
}

//Used this function to display user's survey results and most suitable pets
//The information and the total score for each animal received are displayed
function displayResults(userData, totalPoints) {
    console.log('\n' + userData.name + ' Results:');
    console.log('Date and Time: ' + userData.timestamp);
    console.log('Cat: ' + totalPoints.Cat);
    console.log('Dog: ' + totalPoints.Dog);
    console.log('Rabbit: ' + totalPoints.Rabbit);
    console.log('Fish: ' + totalPoints.Fish);

    //To calculate the percentile, the total score is calculated
    const total = totalPoints.Cat + totalPoints.Dog + totalPoints.Rabbit + totalPoints.Fish;

    //This block of code creates an object.Each pet's percentile is calculated
    //Rounded to two decimal places for better representation (toFixed(2))
    const percentages = {
        Cat: ((totalPoints.Cat / total) * 100).toFixed(2),
        Dog: ((totalPoints.Dog / total) * 100).toFixed(2),
        Rabbit: ((totalPoints.Rabbit / total) * 100).toFixed(2),
        Fish: ((totalPoints.Fish / total) * 100).toFixed(2)
    };

    //To get the object's keys (animal names) as an array with Object.keys
    //Sorted these animals according to percentiles with the sort function
    const sortedAnimals = Object.keys(percentages).sort((a, b) => percentages[b] - percentages[a]);

    //The for of starts a loop and assign each element to animal.
    //call the sorted animal percentage with the percentages[animal] object
    console.log('\nMost Suitable Pets: ');
    for (const animal of sortedAnimals) {
        console.log(animal + ': ' + percentages[animal] + '%');
    }

    //This code is used to add the user's results to an array called results (const results = [];)
    //In other words, it adds user information and results to data
    results.push({
        name: userData.name,
        timestamp: userData.timestamp,
        points: totalPoints,
        percentages: percentages
    });
}

//saveResults, a function that saves users' survey responses to a JSON file and helps manage this data
function saveResults() {
    //Converts the array named results to JSON format and formats it with 2-space indentation
    const jsonResults = JSON.stringify(results, null, 2);

    //To write the jSON data to a file named 'allSurveyResults.json'
    //Checks for errors during the file writing process
    fs.writeFile('allSurveyResults.json', jsonResults, (err) => {
        if (err) {
            console.error('Error saving all results: ' + err);
        } else {
            console.log('All results have been successfully saved in allSurveyResults.json file.');
        }
        //Write data to data.json file. Creates an empty object to store existing data.
        let existingData = {};
        //If the file exists, it reads its contents and assigns it to the existingData object.
        if (fs.existsSync('data.json')) {
            const jsonData = fs.readFileSync('data.json');
            existingData = JSON.parse(jsonData);
        }

        //Adds data from users currently participating in the survey to existing user data.
        existingData.users = existingData.users || [];
        existingData.users.push(...results);

        //Writes the updated user data in JSON format to the file named 'data.json'
        fs.writeFileSync('data.json', JSON.stringify(existingData, null, 2));
    });
}

start();