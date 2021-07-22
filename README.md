# FlashyCards

<img src="https://raw.githubusercontent.com/ryandavidmercado/FlashyCards/main/screenshots/preview.png" height="300px"/> <img src="https://raw.githubusercontent.com/ryandavidmercado/FlashyCards/main/screenshots/mobile.png" height="300px" />

Interactive flashcards application for creating, editing, and studying flashcard decks. Built in React to demonstrate modern web application development, including responsive design, modular architecture, and complex interactivity via state management and hooks.

[Live Site](https://flashy-cards-red.vercel.app/)

## Purpose
The app was designed to be highly functional across desktop and mobile, making it easy to quickly set up a study session in any environment. The primary use case at the moment is for individual learners and independent study; the user is able to record their desired study material, keeping it stored for present and future use, and immediately begin to run through and study the deck.

## Features
* User-friendly, responsive interface
* Live editing and creation of decks and individual cards
* Focused study screen with one card at a time, one side at a time

## Tech Stack
* React: Enables base functionality and interactivity.
* React Router: Powers breadcrumb to keep the user oriented and enables sharing of specific content (decks, etc)
* react-responsive: Enables dynamic organization and display of components based on screen size.
* react-loading: Powers loading components to keep the user informed of application state.
* CSS Modules: Encapsulates styling for all components to enable more semantic class names and avoid CSS leakage

## Future Goals
* Create user authentication backend to enable individual accounts with personal deck databases
* Create teacher/organization account functionality
  * Administrator view: create/edit cards and decks
  * User view: browse/study cards and decks
* Enhance functionality of study screen
  * Optional randomization of decks
  * Dynamic progress bar
  * <del>Replace restart session prompt with integrated buttons</del>
