# Vet Connect
An application that allows veterans of the US armed forces connect and help each other with their transition back into society.

<img width="1426" alt="Screen Shot 2019-12-15 at 6 36 53 PM" src="https://user-images.githubusercontent.com/55306344/70871138-f8895b80-1f69-11ea-8326-14e4dd3c1283.png">


## How It's Made:
**Tech used:** HTML, CSS, JavaScript, EJS, Express, NodeJS, Passport, Mongoose, MongoDB, Multer, Socket.io
Landing page and profile uses Bootstrap template. Used Passport and Express to display random users to allow other to connect and communicate. Socket.io was used as the chat box. The script and routing was needed on multiple ejs files to pull user into chat if they click Okay on notification that pops up when other user sends them a chat. Search function was also implemented to find users based on age or branch.

## Lessons Learned
Learned more about altering schemas to input data to database. Had to determine how to route users to the same chat, initially was like a open chat room, instead of a private one.


## Installation

1. Clone repo
2. run `npm install`

## Usage

1. run `node server.js`
2. Navigate to `localhost:8080`

### Credit

Modified from Scotch.io's auth tutorial
Thank you to Mark and Trek for all of their help for their assistance
