// Completed example:  https://github.com/Thinkful-Ed/example-promises-resolving-promises

const { welcome, goodbye, tell } = require("../utils/fortune-teller");

const promise = welcome();

console.log(promise);

const question = "Will the weather be nice today?";
const tellPromise = tell(question);
tellPromise.catch(console.error).then((fortune) => {
    console.log(question);
    console.log(fortune);
});

// Combining .then and .catch for a welcome message
welcome()
    .then(console.log) // Logs the result of welcome()
    .then(() => goodbye().then(console.log)) // .then inside of another .then
    .catch(console.error); // Logs error from welcome() or goodbye()

// ^^ OR below works...

welcome()
    .then(console.log) // Logs the result of welcome() ("Provide me a question and I'll give you an answer...")
    .then(goodbye) // Returns promise from goodbye()
    .then(console.log) // Logs the result of goodbye() ("Best of luck in the future...")
    .catch(console.error); // Logs error from welcome() or goodbye()

console.log("=====================================");

// Some nested examples...
welcome()
    .then((welcomeMessage) =>
        goodbye().then((goodbyeMessage) => `${welcomeMessage}\n${goodbyeMessage}`)
    ) // welcomeMessage and goodbyeMessage combined.
    .then(console.log) // Logs combines messages
    .catch(console.error); // Logs error from welcome() or goodbye()

// A then() or catch() always moves to the next then(). Therefore, if you place a then() call after a catch(),
// the next then() is always called. For example, run the following code to see the output:
welcome()
    .then(console.log) // Logs the result of welcome()
    .then(tell) // Calls tell, which returns a rejected promise (no question supplied).
    .then(console.log) // Skipped because tell returned a rejected promise.
    .catch(console.error) // Logs error from tell() or welcome()
    .then(goodbye) // Returns promise from goodbye()
    .then(console.log) // Logs the result from goodbye()
    .catch(console.error); // Logs error only from goodbye()

//> Will the weather be nice today?
//> Without a doubt. (Example fortune response.)
