## projectZed
A webpage showing a list of projects done by Zambian Developers. A great place to find Zambian Developer works and contribute to Zambian Open Source projects.

Link to Live version of the app: https://project-zed-be264.firebaseapp.com/

I am looking for anyone that would like to help contribute to this page. Just raise an issue if you want to suggest something to be added to the site.

If you are Zambian and have a project you would like on the page just hit me a message on twitter( @MulengaWilfred)

Let's make the Zambian Developer Community Bigger Together

## Contributors

Help on this project is very much needed. If you have a suggestion, kindly raise and issue and I will respond as soon as possible. After the issue has been discussed, a pull request can be made.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Technologies used

- React
- Bootstrap
- firebase

**Requirements**

- Node(ˆv8.0)
- npm (ˆv5)
- git

## Development

Clone the repo and run `npm i` in the root directory. The project uses [Firebase](https://firebase.google.com/) as a backend and for authentication. To create your own backend, create a project on Firebase then go to "Project settings" and select "web app". Register the app with the name of your preference. Once registered, copy the necessary keys and values of the firebase config which are used in the project. Authentication and database are already set up for you.

### data structure

the data structure for each project is as follows:
  ```
  {
    description: string,
    githubUsername: string,
    link: string,
    tools: Array<string>
    type: string
  }
```

Once that is set up, the project can be run for development.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

##Deployment

### `npm build`

Builds the app for production to the build folder.

You can use Firebase's hosting to deploy the project. Ensure you are logged in with the current project. You can check the list of projects by running, `firebase list`. to deploy first run `firebase init` and follow the steps. Next, run `firebase deploy`

## License

License
Copyright © 2018 projectZed

The content of this repository is bound by [MIT License](https://github.com/WillzMu/projectZed/blob/master/LICENSE).

