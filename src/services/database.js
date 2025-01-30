import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('worker_management.db');
//initialise database tables
export const initializeDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Workers (
        workerID INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phoneNumber TEXT,
        email TEXT UNIQUE,
        hourlyRate REAL,
        location TEXT,
        dateOfBirth TEXT,
        profile TEXT,
        experience TEXT
      );
    `);
 db.transaction((tx) => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Attendance (
        attendanceID INTEGER PRIMARY KEY AUTOINCREMENT,
        workerID INTEGER,
        date TEXT,
        status BOOLEAN,
        CheckInTime TEXT,
        CheckOutTime TEXT
        FOREIGN KEY(workerID) REFERENCES Workers(workerID)

      );
    `);
    db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS WeeklyReports (
            reportID INTEGER PRIMARY KEY AUTOINCREMENT,
            workerID INTEGER,
            dateRange TEXT NOT NULL,
            totalHours REAL NOT NULL,
            totalPayment REAL NOT NULL,
            totalSanctions REAL NOT NULL,
            numberOfTasks INTEGER NOT NULL,
            FOREIGN KEY(workerID) REFERENCES Workers(workerID)
          );`
        );
      });
      db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS Tasks (
            taskID INTEGER PRIMARY KEY AUTOINCREMENT,
            workerID INTEGER,
            description TEXT NOT NULL,
            dueDate TEXT NOT NULL,
            status TEXT NOT NULL CHECK(status IN ('Assigned', 'In Progress', 'Completed')),
            FOREIGN KEY(workerID) REFERENCES Workers(workerID)
          );`
        );
      });
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS Sanctions (
            sanctionID INTEGER PRIMARY KEY AUTOINCREMENT,
            workerID INTEGER,
            dateIssued TEXT NOT NULL,
            reason TEXT NOT NULL,
            penaltyAmount REAL NOT NULL,
            nature TEXT NOT NULL,
            FOREIGN KEY(workerID) REFERENCES Workers(workerID)
          );`
        );
      });  
  });
});

// add worker
const addWorker = (workerDetails) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO Workers (name, phoneNumber, email, hourlyRate, location, dateOfBirth, profile, experience) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          workerDetails.name,
          workerDetails.phoneNumber,
          workerDetails.email,
          workerDetails.hourlyRate,
          workerDetails.location,
          workerDetails.dateOfBirth,
          workerDetails.profile,
          workerDetails.experience,
        ],
        () => console.log("Worker added successfully"),
        (_, error) => console.error("Error adding worker: ", error)
      );
    });
  };
  
//   add attendance
const recordAttendance = (attendance) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO Attendance (workerID, date, isPresent, startTime, endTime) VALUES (?, ?, ?, ?, ?)',
      [attendance.workerID, attendance.date, attendance.isPresent, attendance.startTime, attendance.endTime]
      () , console.log("Attendance recorded successfully"),
      (_, error) => console.error(error)
    );
  });
};

// add task
const addTask = (task) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Tasks (workerID, description, dueDate, status) VALUES (?, ?, ?, ?)',
        [task.workerID, task.description, task.dueDate, task.status],
        () => console.log("Task added successfully"),
        (_, error) => console.error("Error adding task:", error)
      );
    });
  };

//   add sanction
const addSanction = (sanction) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Sanctions (workerID, dateIssued, reason, penaltyAmount, nature) VALUES (?, ?, ?, ?, ?)',
        [sanction.workerID, sanction.dateIssued, sanction.reason, sanction.penaltyAmount, sanction.nature],
        () => console.log("Sanction added successfully"),
        (_, error) => console.error("Error adding sanction:", error)
      );
    });
  };
/**
 * Retrieves all sanctions associated with a specific worker.
 * 
 * @param {number} workerID - The ID of the worker whose sanctions are to be fetched.
 * @param {function} callback - A function to be called with the sanctions data or an error.
 */
const getSanctionsByWorker = (workerID, callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Sanctions WHERE workerID = ?',
        [workerID],
        (_, { rows }) => callback(rows._array),
        (_, error) => console.error("Error fetching sanctions:", error)
      );
    });
  };

// Generate Payment Report
const generatePaymentReport = (workerID, dateRange, callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT 
          W.name,
          SUM(A.endTime - A.startTime) AS totalHours,
          W.hourlyRate * SUM(A.endTime - A.startTime) AS grossPay,
          SUM(S.penaltyAmount) AS totalDeductions,
          (W.hourlyRate * SUM(A.endTime - A.startTime)) - SUM(S.penaltyAmount) AS netPay
        FROM Workers W
        LEFT JOIN Attendance A ON W.workerID = A.workerID
        LEFT JOIN Sanctions S ON W.workerID = S.workerID
        WHERE W.workerID = ? AND A.date BETWEEN ? AND ?
        GROUP BY W.workerID;`,
        [workerID, ...dateRange.split(' to ')],
        (_, { rows }) => callback(rows._array),
        (_, error) => console.error('Error generating payment report:', error)
      );
    });
  };

// Generate Weekly Report
const generateWeeklyReport = (workerID, dateRange) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT 
        SUM(A.endTime - A.startTime) AS totalHours,
        (W.hourlyRate * SUM(A.endTime - A.startTime)) AS totalPayment,
        SUM(S.penaltyAmount) AS totalSanctions,
        COUNT(T.taskID) AS numberOfTasks
      FROM Workers W
      LEFT JOIN Attendance A ON W.workerID = A.workerID
      LEFT JOIN Sanctions S ON W.workerID = S.workerID
      LEFT JOIN Tasks T ON W.workerID = T.workerID
      WHERE W.workerID = ?
      AND A.date BETWEEN ? AND ?
      GROUP BY W.workerID;`,
      [workerID, ...dateRange.split(' to ')],
      (_, { rows }) => console.log(rows._array),
      (_, error) => console.error("Error generating weekly report:", error)
    );
  });
};
}