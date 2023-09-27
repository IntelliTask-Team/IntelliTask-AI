const mongoose = require("mongoose");
const Project = require("../models/Project.model");
const Task = require("../models/Task.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/my-project-server";

const projects = [
  {
    title: "Home Vegetable Garden",
    description:
      "Transform a section of the backyard into a productive vegetable garden to grow fresh produce for household consumption, fostering sustainability and healthier eating habits.",
    tasks: [
      "Assess the backyard space and determine the garden size.",
      "Research suitable vegetables for the local climate.",
      "Plan a garden layout, considering sunlight and plant spacing.",
      "Purchase seeds or young plants, along with gardening tools.",
      "Prepare the soil with compost or organic fertilizers.",
      "Plant the chosen vegetables.",
      "Set up a watering schedule and system.",
      "Monitor for pests and diseases, applying organic treatments if necessary.",
      "Harvest produce when ripe.",
      "Maintain the garden by weeding, mulching, and rotating crops.",
    ],
    demo: true,
  },
  {
    title: "Virtual Reality Museum Tour",
    description:
      "Create a virtual reality (VR) experience allowing users to tour a renowned art museum, exploring artworks and historical pieces from the comfort of their homes.",
    tasks: [
      "Collaborate with the museum for permissions and rights.",
      "Map out the museum's layout for virtual navigation.",
      "Photograph or scan artworks in high-resolution.",
      "Develop a user-friendly VR interface.",
      "Integrate audio guides or descriptions for each piece.",
      "Test the VR experience for user comfort and functionality.",
      "Secure online hosting or platform partnerships.",
      "Market the VR tour to schools, institutions, and the public.",
      "Regularly update the content based on new exhibits.",
      "Gather user feedback for continuous improvement.",
    ],
    demo: true,
  },
  {
    title: "Children's Book Publication",
    description:
      "Write and publish a children's book that tells a heartwarming tale about friendship and adventure, aiming to inspire young readers and their families.",
    tasks: [
      "Brainstorm and outline the story concept.",
      "Write the initial draft of the book.",
      "Commission an illustrator for book illustrations.",
      "Revise and finalize the manuscript.",
      "Choose a publishing method (self-publish or traditional).",
      "Obtain ISBN and copyright for the book.",
      "Design and layout the book for print.",
      "Promote the book through social media, readings, and events.",
      "Distribute the book to various retailers.",
      "Gather feedback and reviews from readers.",
    ],
    demo: true,
  },
];

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);
    // return mongoose.connection.dropDatabase();  // Comment out this line
  })
  // .then(() => {                              // Comment out this block
  //   console.log("Database cleaned");
  // })
  .then(() => {
    const projectPromises = projects.map((projectData, index) => {
      const taskDescriptions = projectData.tasks;
      const taskDocuments = taskDescriptions.map((desc, order) => {
        return {
          description: desc,
          order: order + 1,
        };
      });

      return Task.create(taskDocuments).then((createdTasks) => {
        projectData.tasks = createdTasks.map((task) => task._id);
        return Project.create(projectData);
      });
    });

    return Promise.all(projectPromises);
  })
  .then((createdProjects) => {
    console.log(
      `Created ${createdProjects.length} projects with their associated tasks`
    );
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("DB connection closed!");
  })
  .catch((err) => {
    console.log(
      `An error occurred while creating projects and tasks in the DB: ${err}`
    );
  });
