const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const crypto = require('crypto');  // For generating OTP

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dash',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


// Generate OTP (6-digit)
const generateOTP = () => {
  return crypto.randomInt(100000, 999999); // 6-digit OTP
};

// Add or update OTP in the database
app.post('/add-otp', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const otp = generateOTP();

  // Update OTP if the email exists, otherwise insert a new record
  const query = `
    INSERT INTO otp (email, otp) 
    VALUES (?, ?) 
    ON DUPLICATE KEY UPDATE otp = VALUES(otp)
  `;

  db.query(query, [email, otp], (err, results) => {
    if (err) {
      console.error('Error adding/updating OTP:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    // You would add email sending logic here. 
    // Example: sending the OTP to the user via an email service (e.g., nodemailer).

    res.json({ message: 'OTP generated and sent successfully', otp });
  });
});


// Verify OTP by checking email and OTP match
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'OTP is required' });
  }

  // Check if the OTP exists for this email in the database
  const query = 'SELECT * FROM otp WHERE email = ? AND otp = ? LIMIT 1';
  db.query(query, [email, otp], (err, results) => {
    if (err) {
      console.error('Error verifying OTP:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ error: 'Invalid OTP or email' });
    }
  });
});

// Password strength regex: at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// POST route to update password
app.post('/setup-password', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Password strength check (can be adjusted to your needs)
    const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordStrengthRegex.test(password)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
      });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database (with hashed password)
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error during registration:', err);
        return res.status(500).json({ error: 'Server error' });
      }

    // Delete the OTP entry associated with the email after password setup
    const deleteOtpQuery = 'DELETE FROM otp WHERE email = ?';
    db.query(deleteOtpQuery, [email], (err, results) => {
      if (err) {
        console.error('Error during OTP deletion:', err);
        return res.status(500).json({ error: 'Error deleting OTP entry' });
      }

      // Respond with success
      res.status(200).json({ message: 'Password updated successfully' });
    });
  });
  } catch (error) {
    console.error('Error during password setup:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});


// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ error: 'Server error' });
        }

        if (isMatch) {
          // Include all the details in the response
          res.json({
            message: 'Login successful',
            user: {
              id: user.id_number,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              user_type: user.user_type,
            },
          });
        } else {
          res.status(401).json({ error: 'Invalid email or password' });
        }
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  });
});

// GET users with user type names
app.get('/api/users/get', (req, res) => {
  const query = `
    SELECT users.email, users.password, users.id_number, users.firstname, users.lastname, users.comment, user_types.name AS user_type
    FROM users
    JOIN user_types ON users.user_type = user_types.id
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users: ' + err.stack);
      return res.status(500).send('Error fetching users');
    }
    res.json(results);
  });
});

// Get user types - for drop down selection in add/edit users
app.get('/api/users/user-types', (req, res) => {
  const query = 'SELECT name FROM user_types';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching user types:', err);
      return res.status(500).send('Error fetching user types');
    }
    res.json(results);
  });
});

// Add user route
app.post('/api/users/add', async (req, res) => {
  const { email, password, id_number, firstname, lastname, user_type, comment } = req.body;

  // Validate required fields
  if (!email || !password || !id_number || !firstname || !lastname || !user_type) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Query to get the user_type id
    const userTypeQuery = 'SELECT id FROM user_types WHERE name = ? LIMIT 1';
    db.query(userTypeQuery, [user_type], (err, results) => {
      if (err) {
        console.error('Error fetching user_type id:', err);
        return res.status(500).json({ error: 'Server error' });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: 'Invalid user_type' });
      }

      const userTypeId = results[0].id;

      // Insert the new user with the hashed password and user_type id
      const query = 'INSERT INTO users (email, password, id_number, firstname, lastname, user_type, comment) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(query, [email, hashedPassword, id_number, firstname, lastname, userTypeId, comment], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res.status(500).json({ error: 'Failed to add user' });
        }

        // Respond with success
        res.status(201).json({ message: 'User added successfully' });
      });
    });
  } catch (error) {
    console.error('Error hashing password:', error);
    return res.status(500).json({ error: 'Server error while hashing password' });
  }
});



// UPDATE user by email
app.put('/api/users/update', async (req, res) => {
  const { email, id_number, firstname, lastname, user_type, comment, password } = req.body;

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Query to get the user_type id
    const userTypeQuery = 'SELECT id FROM user_types WHERE name = ? LIMIT 1';
    const [userTypeResults] = await db.promise().query(userTypeQuery, [user_type]);

    if (userTypeResults.length === 0) {
      return res.status(400).json({ error: 'Invalid user_type' });
    }

    const userTypeId = userTypeResults[0].id;

    // Fetch the current password from the database
    const getPasswordQuery = 'SELECT password FROM users WHERE email = ? LIMIT 1';
    const [userResults] = await db.promise().query(getPasswordQuery, [email]);

    if (userResults.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentHashedPassword = userResults[0].password;

    // Check if the provided password matches the hashed password
    let newHashedPassword = currentHashedPassword;
    if (password && password !== currentHashedPassword) {
      // Password has changed, hash the new password
      newHashedPassword = await bcrypt.hash(password, 10);
    }

    // SQL query to update the user details
    const updateQuery = `
      UPDATE users
      SET id_number = ?, firstname = ?, lastname = ?, user_type = ?, comment = ?, password = ?
      WHERE email = ?
    `;

    // Execute the update query
    const queryParams = [
      id_number,
      firstname,
      lastname,
      userTypeId,
      comment,
      newHashedPassword,
      email,
    ];
    const [updateResults] = await db.promise().query(updateQuery, queryParams);

    if (updateResults.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// DELETE user by email
app.delete('/api/users/delete/:email', (req, res) => {
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // SQL query to delete the user by email
  const query = 'DELETE FROM users WHERE email = ?';
  
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  });
});


// Backend route to fetch health conditions
app.get('/health-conditions/get', (req, res) => {
  const query = 'SELECT id_num, category_name, color FROM health_conditions';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching health conditions:', err);
      return res.status(500).json({ error: 'Server error' });
    }
    res.json(results);
  });
});


// Add Health Condition with auto incremented ID
app.post('/health-conditions/add', async (req, res) => {
  const { category_name, color } = req.body;

  if (!category_name || !color) {
    return res.status(400).json({ error: 'Category Name and Color are required.' });
  }

  // First, fetch the last inserted category ID
  const query = 'SELECT id_num FROM health_conditions ORDER BY id_num DESC LIMIT 1';  // Get the last inserted ID
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching last category ID:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    const lastId = results[0] ? results[0].id_num : 0;  // If no categories, default to 0
    const newId = lastId + 1;  // Increment the ID

    // Now insert the new category with the incremented ID
    const insertQuery = 'INSERT INTO health_conditions (id_num, category_name, color) VALUES (?, ?, ?)';
    db.query(insertQuery, [newId, category_name, color], (err, results) => {
      if (err) {
        console.error('Error adding category:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      res.status(201).json({
        id_num: newId,
        category_name,
        color,
      });
    });
  });
});


// Update Health Condition
app.put('/health-conditions/update/', (req, res) => {
  const { id_num, category_name, color } = req.body;

  if (!category_name || !color) {
    return res.status(400).json({ error: 'Category Name and Color are required.' });
  }

  const query = 'UPDATE health_conditions SET category_name = ?, color = ? WHERE id_num = ?';
  db.query(query, [category_name, color, id_num], (err, results) => {
    if (err) {
      console.error('Error updating category:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Health condition not found' });
    }

    res.json({ message: 'Health condition updated successfully', category_name, color });
  });
});

// Delete Health Condition
app.delete('/health-conditions/delete/:id_num', (req, res) => {
  const { id_num } = req.params;

  const query = 'DELETE FROM health_conditions WHERE id_num = ?';
  db.query(query, [id_num], (err, results) => {
    if (err) {
      console.error('Error deleting category:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Health condition not found' });
    }

    res.json({ message: 'Health condition deleted successfully',id_num });
  });
});

// Fetch all doctors from the users table
app.get('/api/schedules/get', (req, res) => {
  const query = `SELECT users.id_number, CONCAT(users.firstname, ' ', users.lastname) AS fullname, users.comment, schedules.day, schedules.time_period, schedules.time, schedules.is_red
   FROM users 
   JOIN schedules ON users.id_number = schedules.id_number WHERE user_type IN ('2', '3')`;
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Update Doctor Schedules
app.put('/api/schedules/update/:doctorId', async (req, res) => {
  const { doctorId } = req.params;
  const { schedules } = req.body;

  try {
    // Create an array of promises for all database updates
    const updatePromises = [];

    schedules.forEach(schedule => {
      // Morning Slots
      schedule.morning.forEach(timeSlot => {
        const query = `
          UPDATE schedules 
          SET is_red = ? 
          WHERE id_number = ? AND day = ? AND time_period = 'morning' AND time = ?
        `;
        updatePromises.push(
          new Promise((resolve, reject) => {
            db.query(query, [timeSlot.isRed, doctorId, schedule.day, timeSlot.time], (err, result) => {
              if (err) return reject(err);
              resolve(result);
            });
          })
        );
      });

      // Afternoon Slots
      schedule.afternoon.forEach(timeSlot => {
        const query = `
          UPDATE schedules 
          SET is_red = ? 
          WHERE id_number = ? AND day = ? AND time_period = 'afternoon' AND time = ?
        `;
        updatePromises.push(
          new Promise((resolve, reject) => {
            db.query(query, [timeSlot.isRed, doctorId, schedule.day, timeSlot.time], (err, result) => {
              if (err) return reject(err);
              resolve(result);
            });
          })
        );
      });
    });

    // Wait for all promises to complete
    await Promise.all(updatePromises);

    // Send success response
    res.status(200).json({ message: 'Schedules updated successfully!' });
  } catch (error) {
    console.error('Error updating schedules:', error);
    res.status(500).json({ error: 'Failed to update schedules' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});