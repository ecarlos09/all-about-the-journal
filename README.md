# “consoul.log”
## A place for tech nerds to reveal their innermost feelings ...

[![Netlify Status](https://api.netlify.com/api/v1/badges/dafd330d-8703-4f6d-a426-d9a0682089eb/deploy-status)](https://app.netlify.com/sites/peaceful-hoover-3dc7e0/deploys)

## Client

Dear User,

May we welcome you to our humble website with a great mission in our minds! We are the creators of consoul.log - the place where you can unload your mind clutter and place it on display for sake of your private reflections. Even if you are not a technologist and it just happens that you have stumbled upon this page in your random search for reconciliation on the net, you are more than welcome. Division of humans into castes is not our mission!

But what is ... ?

Read on, our valuable visitor, and you will find the truth in this document that hopefully will help you to use our journal effectively! Withous further ado, let's see us getting started.

## Mission
Give computer power users place to unwind and clear the clutter of their minds by providing simple stylised online journaling solution. By providing fun, easily accessible and safe environment for keeping your thoughts online we hope we can help you in short time to get familiar with practice and philosophy of journaling. 

## Installation and using the website
 
 ### Using Netlify deployed link
 [Consoul.log](https://consoul-log.netlify.app/)
 
 ### Without using the deployed website
 1. Clone or download the repos to the same folder from theduckfliesagain/all-about-the-journal and the duckfliesagain/journal-server.
 2. Run npm install in both directories (this installs dependencies).
 3. cd into all-about-the-journal folder and start the server using npm run dev (starts server using watchify bundler).
 4. cd .. to go back and cd into journal-server folder. Here we need to start our server running npm start command.
 5. Cool! Now head to http://localhost:8000/! Happy journaling.

## Technologies

 1. Giphy API
 2. Express API framework
 3. Nodemon server runner
 4. Jest testing 
 5. Packery (website layouts) 

## Process

The team has followed linear design approach that is 
 1) We have gathered initially to discuss and brainstorm ideas:
    - brainstorming took place on Moqups online platform for collaborative website wireframing.
 2) We have agreed on the layout and proceeded onto determining the main milestones of the project to tackle:
    - here we used Kanban board in GitHub projects with some automation on some of the boards
    - must-haves of our website and other features were organised using MoSCow method
 3) We have split the work into pairs matching partners by their abilities to ensure everyone learns from experience
    - we all got to work on both client and server sides
 5) We have considered political, social and technological factors related to our project before proceeding with the design
    - for example, user persona and technologies to aid creationg had to be determined  

![image](https://i.imgur.com/oUPyjN2.jpg)

Project keystages included:
 1. Initial setup of file structure on GitHub and cloning down of repos to start working on features on our individual machines.
 2. Creating HTML skeleton of the page and adding the main input form. 
 3. Server side routing.
 4. Creating fetch functions on the client side.
 5. Creating testing suite and adding functionality of recording data in a json file.
 6. Adding post functionality.
 7. Bringing in external Giphy API for gif integration.
 8. Adding comment feature and integrating it with the layout.
 9. Adding emojis and related buttons.
 10. Preliminary basic layout done in flex, then finished with the aid of Packery.

![image](https://i.imgur.com/bRYwUQl.jpg) 



Basic initial layout

![image](https://i.imgur.com/QQGY1dR.jpg)

Journal posts section finished

## Wins and Challenges

### Wins 👍
 1. Successfully integrated Giphy API to the webpage.
 2. Made layout assymmetric as an extra challenge.
 3. All essential elements were made to work as initially have planned. 

### Challenges 👎
 1. Merging various features to staging branch on GitHub and making website work on various machines.
 2. Giphy API implementation -> making gif form drop used gif images.
 3. Layout styling: figuring out how to apply to non-existent elements and making it behave consistently.
 4. Making nested buttons.
 5. Final deploy of the website via Heroku - unexpected challenges with integration of features. 

### Bugs
 1. The search bar works fine except when searching for non-existent posts. In that case prrevious message on number of results is displayed. 


## Future Features
 1. Location functionality with ability to pin down locations on a map.
 2. Social media sharing capabilities.
 3. Ability to include images or sketches.
 4. More emojis and custom styles (fonts, colors, post and page themes).
 5. User databases.

## License

[MIT License](LICENSE)


        
