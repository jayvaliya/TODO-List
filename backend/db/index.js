const mongoose = require('mongoose');
const URL = process.env.databaseURL;
// Connect to MongoDB
mongoose.connect(URL);

// Define schemas
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
    required: false,
  }
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  email: {
    type: String,
    required: true,
    maxlength: 40,
  },
  password: {
    type: String,
    required: true,
    maxlength: 20,
  },
  todoList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todos'
  }]
});

const User = mongoose.model('User', UserSchema);
const Todos = mongoose.model('Todos', TodoSchema);

module.exports = {
  User,
  Todos
}