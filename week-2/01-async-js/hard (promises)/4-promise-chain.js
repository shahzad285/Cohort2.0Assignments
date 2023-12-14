/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait1(t) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("promise1 resolved");
        }, t * 1000);
    });
}

function wait2(t) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("promise2 resolved");
        }, t * 1000);
    });
}

function wait3(t) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("promise3 resolved");
        }, t * 1000);
    });
}

function calculateTime(t1, t2, t3) {
    let d1 = new Date();
    return wait1(t1).then((value) => {
        console.log("Promise 1 resolved");
        return wait2(t2);
    })
    .then((value) => {
        console.log("Promise 2 resolved");
       return wait3(t3);
    })
    .then((value) => {
        console.log("Promise 3 resolved");
        let d2 = new Date();
        return d2 - d1;
    });
}

//calculateTime(1, 2, 3);
module.exports = calculateTime;
