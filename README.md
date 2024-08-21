# Atomic To-Do App

An interactive to-do list application built with Next.js, TypeScript, and adhering to Atomic Design principles.

## Table of Contents

  - [Overview](#overview)
  - [Atomic Design Implementation](#atomic-design-implementation)
  - [Project Structure](#project-structure)
  - [Features](#features)
  - [Usage](#usage)
  - [Setup Instructions](#setup-instructions)
  - [Testing](#testing)
  - [Linting and Formatting](#linting-and-formatting)
  - [Acknowledgements](#acknowledgements)

## Overview

This application allows users to add, edit, complete, and remove tasks. It persists data using `localStorage` and provides a responsive and user-friendly interface.

## Atomic Design Implementation

The project is structured based on Atomic Design principles:

1. **Atoms**: Basic building blocks like buttons, inputs, and checkboxes.
2. **Molecules**: Combinations of atoms functioning together, e.g., a task item combining a checkbox, text, and buttons.
3. **Organisms**: Complex components comprising molecules and atoms, e.g., the task list.
4. **Templates**: Layouts combining organisms to form pages.
5. **Pages**: Specific pages built using templates, organisms, molecules, and atoms.

This structure promotes reusability, scalability, and maintainability.

## Project Structure

```
src/
├── app/
│   ├── tasks/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   ├── templates/
│   └── pages/
├── hooks/
└── types/
```

## Features

- **Task Management**: Add, edit, complete, and remove tasks with a simple, user-friendly interface.
- **Persistent Storage**: Tasks are saved in localStorage, ensuring that your list persists across page reloads.
- **Atomic Design**: The project is structured using Atomic Design principles, ensuring that components are modular and reusable.
- **TypeScript Integration**: Provides type safety and better developer experience.
- **Responsive Design**: The UI is responsive, ensuring it looks great on both desktop and mobile devices.
- **Linting and Formatting**: Ensured code quality with ESLint and Prettier.
- **Unit Testing**: Components tested using Jest and React Testing Library.

## Usage

- **Adding Tasks**: Use the input field at the top to add new tasks.
- **Editing Tasks**: Click the edit button next to a task to rename it.
- **Completing Tasks**: Click the checkbox next to a task to mark it as completed.
- **Removing Tasks**: Click the delete button to remove a task, or use the "Remove Completed Tasks" button to clear all completed tasks.

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/atomic-to-do-app.git
   code atomic-to-do-app
   ```

2. **Install Dependencies**

   ```bash
   yarn install
   ```

3. **Run the Development Server**

   ```bash
   yarn dev
   ```

   Navigate to `http://localhost:3000` to view the application.

## Testing

- **Run Tests**

  ```bash
  yarn test
  ```

## Linting and Formatting

- **Lint**

  ```bash
  yarn lint
  ```

- **Format**

  ```bash
  yarn format
  ```

## Acknowledgements

- [Atomic Design Methodology](http://bradfrost.com/blog/post/atomic-web-design/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React](https://reactjs.org/)
