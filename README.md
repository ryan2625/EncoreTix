# EncoreTix

Date: 2/9/2024

Author: Ryan Freas

Frontend: React native with Expo 

Backend: Express.js

<hr/>

EncoreTix is a mobile application that lets you search for different attractions, allowing the user to view each attraction and its respective upcoming events, along with external links providing more information about the events.

| METHOD:    URL:                                        // DESCRIPTION                                    |
|---------------------------------------------------------------------------------------------------------------------|
| GET:  https://better-lime-cheetah.cyclic.app/api/attractions/one/:id      // Get attraction by ID                   |
| GET:  https://better-lime-cheetah.cyclic.app/api/attractions/:searchTerm  // Get attractions, filter by search term |

<hr/>

## Requirements

You must have [Node.js LTS release](https://nodejs.org/en/) installed on your machine.


Additionally, [download Git](https://git-scm.com/) for source control.


Install [Expo Go](https://expo.dev/client) on your phone from the app store.

## Getting started

1. Clone this repository on your localmachine: 

```
 git clone https://github.com/ryan2625/EncoreTix.git
```

2. Go to the project directory

```
cd EncoreTix/client
```

3. Install dependencies

```
npm install
```

4. Run app

```
npm start
```

5. Then scan the QR code with your phone camera or a QR scanner to view the app.

The backend is hosted externally on Cyclic.sh, so you don't need to set the server up locally.

## Images

Splash Screen: 

<img src="encore2.jpg" alt="Encore2" width="300"/>

Home Page:

<img src="encore3.jpg" alt="Encore3" width="300"/>

Attraction Details:

<img src="encore1.jpg" alt="Encore1" width="300"/>
