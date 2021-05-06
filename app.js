const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent =
  "Welcome to the Daily Journal blog site, where you can find some of the interesting articles regarding the Web Development. ";
const aboutContent =
  "This is a simple blog site made with HTML, CSS, JavaScript, EJS, Nodejs and connected to the MongoDB server.";
const contactContent =
  "If you want to see more interesting articles like this, give a shout-out to me at dailyjournal@email.com";
const app = express();

var posts = [
  {
    title: "React",
    content:
      "React.js is an open-source JavaScript library that is used for building user interfaces specifically for single-page applications. It’s used for handling the view layer for web and mobile apps. React also allows us to create reusable UI components. React was first created by Jordan Walke, a software engineer working for Facebook. React first deployed on Facebook’s newsfeed in 2011 and on Instagram.com in 2012. React allows developers to create large web applications that can change data, without reloading the page. The main purpose of React is to be fast, scalable, and simple. It works only on user interfaces in the application. This corresponds to the view in the MVC template.",
  },

  {
    title: "Angular",
    content:
      "Angular is an open-source front-end framework developed by Google for creating dynamic, modern web apps. First introduced in 2009, the framework has gained huge traction over the years for eliminating unnecessary code and ensuring lighter & faster apps. Angular helps build interactive and dynamic single page applications (SPAs) with its compelling features including templating, two-way binding, modularization, RESTful API handling, dependency injection, and AJAX handling. Designers can use HTML as template language and even extend HTML’ syntax to easily convey the components of the application. You don’t need to rely on third-party libraries to build dynamic applications with Angular. Angular applications are built using TypeScript language, a superscript for JavaScript, which ensures higher security as it supports types (primitives, interfaces, etc.). It helps catch and eliminate errors early when writing the code or performing maintenance tasks.",
  },

  {
    title: "Vue",
    content:
      "Created by Evan You, Vue.js is an open-source progressive JavaScript framework for building user interfaces (UIs) and single-page applications; it is commonly referred to as Vue. This framework uses 'high decoupling', allowing developers to progressively create user interfaces (UIs). Library modularization using a framework is common in frontend development. Both React and Angular have modularization. But what differentiates Vue.js from other alternatives is its 'high decoupling', how easy it is to extend functionalities, and how well all parts work once more modules are included. For example, if we want to organize and render small visual components, all we need is Vue.js’s ‘core’ library; it is unnecessary to include additional libraries. As the application grows, we have libraries to manage routes such as ‘vue-router’, libraries to manage the global state such as ‘vuex’ or libraries to build responsive web applications such as ‘bootstrap-vue’. Additionally, if our application needs to be optimized or needs good SEO, we can include the ‘vue-server-rendering’ library. In the following figure, we can see how the libraries we just mentioned are progressively included, from a small SPA to multi-page applications (MPA). ",
  },

  {
    title: "Nodejs",
    content:
      "Node.js is an open source, cross-platform runtime environment for developing server-side and networking applications. Node.js applications are written in JavaScript, and can be run within the Node.js runtime on OS X, Microsoft Windows, and Linux. Node.js also provides a rich library of various JavaScript modules which simplifies the development of web applications using Node.js to a great extent. Features of Node.jsFollowing are some of the important features that make Node.js the first choice of software architects.Asynchronous and Event Driven − All APIs of Node.js library are asynchronous, that is, non-blocking. It essentially means a Node.js based server never waits for an API to return data. The server moves to the next API after calling it and a notification mechanism of Events of Node.js helps the server to get a response from the previous API call.Very Fast − Being built on Google Chrome's V8 JavaScript Engine, Node.js library is very fast in code execution.Single Threaded but Highly Scalable − Node.js uses a single threaded model with event looping. Event mechanism helps the server to respond in a non-blocking way and makes the server highly scalable as opposed to traditional servers which create limited threads to handle requests. Node.js uses a single threaded program and the same program can provide service to a much larger number of requests than traditional servers like Apache HTTP Server.No Buffering − Node.js applications never buffer any data. These applications simply output the data in chunks.License − Node.js is released under the MIT license.",
  },
];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  let post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };

  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  var requestedTitle = lodash.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    var storedTitle = lodash.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });
});

app.listen(process.env.PORT, function () {
  console.log("Server started on port 3000");
});
