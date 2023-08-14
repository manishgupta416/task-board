<p align="center" >
<img src="https://cdn-icons-png.flaticon.com/128/4913/4913743.png" width="150px" height="150px"  >
</p>

<div align="center" >
<h1 >⚛️ Task Board ⚛️</h1>
</div>

## About

Task Board is a web-application which allow users to manage tasks, User can add new task , edit existing task , delete task, and drag and drop functionality to group tasks into different stages (Ready, In Progress, Testing, Done). Also User can see visual metrics of each group.

## 🚀 Live Link

- [Task Board](https://task-board-v1.netlify.app/)

## Features (Usecases)

### Task Board Layout Page

- User can create new task.
- User can edit existing task.
- User can delete task.
- User can drag and drop task anywhere .
- User can see visual metrics bar chart of each group ( like total number of task in that group, total no of high, medium and low priority task and total effort spent in that group).
- Search functionality is implemented user can find task by task name.
- User can Filter task by priority and assignee.
- Badges color is added to each task based on priority (High/Medium/Low).
- Dark mode is also implement , user can switch light mode to dark and vice versa.

### Toasts

- User can see acknowledgement alerts for various actions such as added new task, task edited successfully, task deleted etc.

## About Improvement and Feature Enhancement

- I will polish the user interface to offer a more intuitive and visually appealing experience to user.
- I will add a sidebar menu.
- I will try to make the UI similar to the Gmail interface.
- I will add user authentication.
- I will add Infinite Scrolling.
- I will fix any bugs that this application may have.

## About Challenges I faced

- One of the significant challenges I encountered was during the implementation of the drag and drop feature, which I had never worked with before. I got stuck for an extended period, struggling to identify why I couldn't achieve the drag and drop functionality. I consistently encountered an error message stating **"Cannot find 'droppable' and 'draggable' entry IDs."** With the help of stackover flow forum, I was able to resolve this issue. The root cause turned out to be the usage of React's strict mode, which was causing the problem.

- Another challenge arose when I was implementing the task metrics feature, implementing react charts for the first time. Initially, I needed some time to grasp how I could accomplish this task. To overcome this, I decided to break down the process into smaller parts and then carefully understand the flow of data and rendering. Once I had a clear understanding of the flow, the implementation process became easier.

## About Design decisions

- Initially, I began with a simple UI layout consisting of heading and four columns as per to achieve requirements first. Once I successfully implemented the drag and drop functionality, I took design inspiration from the provided image. I aimed to create a similar look with my unique touch. This involved layout styling , colors , element positioning to achieve the similar kind of UI.

## Technologies Used

- Frontend : React Js , React Context API + useReducer , useState , React Router , Vanilla CSS , react-beautiful-dnd , react-chartjs-2 chart.js

## Getting Started

1. Clone the repository.
   `https://github.com/manishgupta416/task-board`
2. Install dependencies using `npm install`.

3. Start the development server with `npm start`.

## Contributing

Contributions are welcome! To contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

## Contact

For any questions or feedback, please contact [Manish Kumar]`(https://github.com/manishgupta416/).`

<h3 align="center">Connect with me 🤝 </h3>
<div align="center">

[![image](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/imanishgupta1/)
[![image](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/manish_gupta416)

[![image](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:manish.info2020@gmail.com)
[![image](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/manish_gupta416/)

</div>
