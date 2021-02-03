/* Your Code Here */

function createEmployeeRecord(details) {
    const record = {
        firstName: details[0],
        familyName: details[1],
        title: details[2],
        payPerHour: details[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return record;
}

function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord);
}

function createEvent(type, timeStamp) {
    return {
        type: type,
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.split(" ")[1])
    };
}

function createTimeInEvent(timeStamp) {
    this.timeInEvents.push(createEvent("TimeIn", timeStamp));
    return this;
}

function createTimeOutEvent(timeStamp) {
    this.timeOutEvents.push(createEvent("TimeOut", timeStamp));
    return this;
}

function hoursWorkedOnDate(date) {
    const index = this.timeInEvents.findIndex(event => event.date === date);
    return (this.timeOutEvents[index].hour - this.timeInEvents[index].hour)/100;
}

function wagesEarnedOnDate(date) {
    return this.payPerHour*hoursWorkedOnDate.call(this, date);
}

function allWagesFor() {
    return this.timeInEvents.map(event => wagesEarnedOnDate.call(this, event.date)).reduce((a, b) => a+b);
}

function calculatePayroll(employees) {
    return employees.reduce((a, b) => a + allWagesFor.call(b),0);
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(a => a.firstName === firstName);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// let allWagesFor = function () {
//     let eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     let payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }