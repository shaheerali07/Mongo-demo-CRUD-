const mongoose = require("mongoose");

//DB connection
mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Conected to DB"))
  .catch(err => console.error("Could not connect to mongodb", err));

//creating scheema
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

//creating a model
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "html Course",
    author: "Mosh",
    tags: ["HTML", " frontend"],
    isPublished: true
  });
  try {
    //await course.validate();
    const result = await course.save();
    console.log(course);
  } catch (ex) {
    console.log(ex.message);
  }
}

//getting data from db
async function getCourses() {
  const courses = await Course.find({ author: "Mosh", isPublished: true });
  console.log(courses);
}

//updating data from db
async function updateCourse(id) {
  //Approch name: Query First
  //findbyID
  //Modify its properties
  //save
  const course = await Course.findById(id);
  if (!course) return;
  course.set({
    isPublished: true,
    author: "Another Author"
  });
  const result = await course.save();
  console.log(result);
}

//removing data from db
async function removeCourse(id) {
  const course = await Course.deleteOne({ _id: id });
  console.log(course);
}
createCourse();
