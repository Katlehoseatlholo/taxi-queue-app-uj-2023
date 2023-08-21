# Taxi queue app

A local taxi association needs some help to manage queues at some of their taxi ranks.

<span style="float: left">
	<img src="queue.png" alt="" width="100" style="display:inline-block" >
	<img src="queue.png" alt="" width="100" style="display:inline-block" >
	<img src="queue.png" alt="" width="100" style="display:inline-block" >
	<img src="minivan.png" alt="" width="100" style="display:inline-block">
	<img src="arrow.png" alt="" width="100" style="display:inline-block">
	<img src="minivan.png" alt="" width="100" style="display:inline-block">
</span>

They want a web app widget which rank managers can use to keep track of how many people are joining and leaving taxi queues. They also want to keep track of how many taxis are queueing.

## Required functionality

The widget should keep track off:

* People joining the queue 
	- add 1 to the queue
* People leaving the queue 
	- remove 1 from the queue
* Taxis joining the queue 
	- add 1 to the taxi queue
* Taxis leaving the queue:
	- remove 1 from the taxi queue
	- remove 12 people from the people queue
* A taxi can only leave if there are enough people (12 people) in the queue to fill the taxi.

## Instructions

Fork and clone this repo in your local `projects` folder.

Please **read through all** the instructions before starting to code.

Spend the **first 30 minutes** of your Solo Code session on planning. Create a Kanban board. Email a link of it to `uj-mentors@projectcodex.co`

You need to create **2 versions** of the Taxi Queue Widget:

* one with *no API* - use the `public/no-api` folder.
* and the other *with an API* - use the `public/with-api` folder.

**Create the no API widget first.**

Use `RestClient` to test your API endpoints - add the `.http` you use to git & push it to GitHub.

The `migrations` folder contains the required database scripts and it creates a `taxi_queue` table with two columns `passenger_queue_count` and `taxi_queue_count`.

## Run the app locally

To run the app locally you will need to get it from git & GitHub.

Run the command below in your `projects` folder.

```
git clone https://github.com/codex-academy/taxi-queue-app-uj-2023
```

Next install the project dependencies:

```
npm install
```

Run the app using this command:

```
npm run dev
```

Open the app in a browser using: 

```
http://localhost:4015
```

### No API app

First make the widget working in the `public/no-api` folder.

Make changes in the `taxi-queue.no-api.js` & `index.html file`

This widget is not using an API and after a browser refresh application state will reset to 0.

There are **no unit tests** for this widget.

Just make the widget functional by adding the needed functions & variables.
Link the HTML in `public/no-api/index.html` to the functions and variables you create in the `public/no-api/taxi-queue.no-api.js` file

### With an API

Next work on the widget in the `public/with-api` folder. This widget should use an API that is using SQLite.

* Make all the unit tests pass in `taxi-queue.test.js`. 
* Run the tests using `npm test`. The unit tests will update the database as needed before each test is ran.
* **Don't change** the test file `test/taxi-queue.test.js`.

* Implement the required API endpoints in the `index.js` file.
* Implement the required functions in the `taxi.sql.js` file. If all the test pass you implemented functions correctly.
* Note you can start with the API if only some of the tests are passing.
* Make sure the widgets data is not lost after a browser refresh.
* Use `axios` to call the API end points from `AlpineJS`.

## Fork & clone

Fork and clone this repo.
Commit you changes to GitHub regularly.

## Deploy

Deploy your app the [Render](render.com) - share the deployed URL in the feedback system.

## Work submission

Check your Email for the links to submit your App URL (render.com) and the URL to your GitHub repository on [feedback.projectcodex.co](feedback.projectcodex.co).

Spend the first 30 minutes of your Solo Code session on planning. Read through all the different scenarios & create a Kanban Board with the tasks you think you need to complete. Email a link of your Kanban board to `uj-mentors@projectcodex.co`. Create pseudo code using code comments to help you think through what you need to do.
Ask for help

Ask if you need help or clarity
	
And make sure you submit your final links by latest **16h00** on **21 August 2023**.
