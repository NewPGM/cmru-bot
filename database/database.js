const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// MySQL connection pooling configuration
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL, 
});

// ฟังก์ชันสำหรับดึงข้อมูล intents และ training phrases จากฐานข้อมูล
async function getIntentsAndTrainingPhrasesFromDB() {
  try {
    const [intents] = await pool.query('SELECT intent_id, intent_name FROM intents');
    const [trainingPhrases] = await pool.query('SELECT intent_id, phrase FROM training_phrases');

    const intentsData = intents.map(intent => {
      return {
        intent_id: intent.intent_id,
        intent_name: intent.intent_name,
        training_phrases: trainingPhrases
          .filter(phrase => phrase.intent_id === intent.intent_id)
          .map(phrase => phrase.phrase),
      };
    });

    return intentsData;
  } catch (error) {
    console.error('Error fetching intents and training phrases from database:', error);
    throw new Error('Database query failed');
  }
}

// ฟังก์ชันสำหรับดึงข้อมูลจากตาราง subject
async function getsubjectsFromDB() {
  try {
    const [subject] = await pool.query('SELECT * FROM subjects;');
    return subject;
  } catch (error) {
    console.error('Error fetching courses from database:', error);
    throw new Error('Database query failed');
  }
}

async function getLocationFromDB() {
  try {
    const [Locations] = await pool.query('SELECT * FROM Locations;');
    return Locations;
  } catch (error) {
    console.error('Error fetching courses from database:', error);
    throw new Error('Database query failed');
  }
}

async function getcoursesFromDB() {
  try {
    const [courses] = await pool.query('SELECT * FROM courses;');
    return courses;
  } catch (error) {
    console.error('Error fetching courses from database:', error);
    throw new Error('Database query failed');
  }
}

async function getDegreeProgramsFromDB() {
  try {
    const [degree_programs] = await pool.query('SELECT * FROM degree_programs;');
    return degree_programs;
  } catch (error) {
    console.error('Error fetching courses from database:', error);
    throw new Error('Database query failed');
  }
}

async function getDepartmentHistoryFromDB() {
  try {
    const [department_history] = await pool.query('SELECT * FROM department_history;');
    return department_history;
  } catch (error) {
    console.error('Error fetching courses from database:', error);
    throw new Error('Database query failed');
  }
}


// async function getIninsTructorsFromDB() {
//   try {
//     const [instructors] = await pool.query('SELECT * FROM instructors;');
//     return instructors;
//   } catch (error) {
//     console.error('Error fetching courses from database:', error);
//     throw new Error('Database query failed');
//   }
// }

async function getInstructorsFromDB() {
  try {
    const query = `
      SELECT 
        itt.*, 
        r.room_name
      FROM 
        instructors itt
      LEFT JOIN
        rooms r ON itt.room_id = r.room_id
     
    `;
    const [instructors] = await pool.query(query);
    return instructors;
  } catch (error) {
    console.error('Error fetching program subjects from database:', error);
    throw new Error('Database query failed');
  }
}


async function getProgramSubjectsFromDB() {
  try {
    const query = `
      SELECT 
        ps.*, 
        s.subject_name, 
        p.full_name,
        s.subject_code
      FROM 
        program_subjects ps
      JOIN 
        subjects s ON ps.subject_id = s.subject_id
      JOIN 
        degree_programs p ON ps.program_id = p.program_id;
    `;
    const [programSubjects] = await pool.query(query);
    return programSubjects;
  } catch (error) {
    console.error('Error fetching program subjects from database:', error);
    throw new Error('Database query failed');
  }
}
async function getresponsibilitiesFromDB() {
  try {
    const [responsibilities] = await pool.query('SELECT * FROM responsibilities;');
    return responsibilities;
  } catch (error) {
    console.error('Error fetching courses from database:', error);
    throw new Error('Database query failed');
  }
}

async function getroomsFromDB() {
  try {
    const [rooms] = await pool.query('SELECT * FROM rooms;');
    return rooms;
  } catch (error) {
    console.error('Error fetching courses from database:', error);
    throw new Error('Database query failed');
  }
}

async function getPhilosophyFromDB() {
  try {
    const [philosophy] = await pool.query('SELECT * FROM Philosophy;');
    return philosophy;
  } catch (error) {
    console.error('Error fetching courses from database:', error);
    throw new Error('Database query failed');
  }
}
module.exports = {
  getIntentsAndTrainingPhrasesFromDB,
  getsubjectsFromDB,
  getLocationFromDB,
  getcoursesFromDB,
  getDegreeProgramsFromDB,
  getDepartmentHistoryFromDB,
  getInstructorsFromDB,
  getProgramSubjectsFromDB,
  getresponsibilitiesFromDB,
  getroomsFromDB,
  getPhilosophyFromDB
};
