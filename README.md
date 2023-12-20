# Knights-Travails - The Odin Project

A knights travails demo showcasing the shortest path a chess knight can move to a given destination.

Built for the odin project with HTML, CSS and Javascript.

[Live Demo](https://antonharbers.github.io/Odin-Knights-Travails/)

![Repo Image](/src/Assets/repoImage.png)

## Key Concepts

### BFS (Breadth-First Search)

The Breadth-First Search (BFS) algorithm is a pivotal component in our project, facilitating the knight's pathfinding across the chessboard. BFS is adept at finding the shortest path in unweighted graphs, which aligns perfectly with the rules of knight's movement in chess.

Here's a snippet from Knight.js illustrating the BFS implementation:

JS:

```
    knightMoves() {
        const dx = [2, 2, -2, -2, 1, 1, -1, -1];
        const dy = [1, -1, 1, -1, 2, -2, 2, -2];

        this.initPathQueueVisited();

        while (this.queue.length > 0) {
            const current = this.queue.shift();
            // Check if the current position is the destination
            if (current[0] === this.end[0] && current[1] === this.end[1]) {
                return this.reconstructPath(current);
            }
            // Explore adjacent squares
            for (let i = 0; i < dx.length; i++) {
                const nextX = current[0] + dx[i];
                const nextY = current[1] + dy[i];
                if (this.isValidMove(nextX, nextY)) {
                    this.queue.push([nextX, nextY]);
                    this.visited[nextX][nextY] = current;
                }
            }
        }
        return [];
    }
```

In this function, we're queuing up potential moves and exploring them in the order they were encountered, ensuring we always follow the shortest path first.

BFS is not just for games. It's used in networking for broadcast routing, in social networking services to find connections between people, and even in AI for puzzle solving and pathfinding in robotics.

### Rendering Dynamic Content

Rendering dynamic content is crucial in creating interactive web applications. Our chessboard and knight's movements are dynamically rendered, providing an engaging user experience.

The Board.js file contains logic for dynamically rendering the chessboard:

JS:

```
    renderBoard() {
        ClearAllSquares();
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                boardDiv.appendChild(CreateSquare(i, j));
            }
        }
    }
```

This function clears the existing board and re-renders each square, allowing for dynamic updates whenever the board's state changes.

Dynamic rendering is a staple in modern web development, used in various applications from dashboards to social media feeds, enhancing user engagement by providing real-time feedback.

### Code Organization

Organizing code effectively is key to maintainability and scalability. Our project follows a modular approach, separating concerns and encapsulating functionalities.

Folder Structure
Our project structure is as follows:

```
    /.git
    /node_modules
    /src                -> Contains JS, CSS and Assets
        /Assets             -> Contains Favicon, Sounds and Images
        /scripts
            /Classes            -> Contains Board and Knight Class Scripts
            Helpers.js
            script.js           -> Main Functionality
            Variables.js
        /styles
    .gitignore
    index.hmtl          -> Entry Point and all our HTML
    package-lock.json
    package.json
    README.md
```

Classes like Board and Knight are in the /Classes directory, ensuring each module focuses on a specific aspect of the application.

For instance, Board.js focuses solely on board-related functionalities:

JS:

```
    class Board {
        constructor() { ... }
        createBoard() { ... }
        renderBoard() { ... }
        renderNotation() { ... }
    }
```

This encapsulation makes the codebase easier to navigate and modify.

Such organization is crucial in larger projects, where clear modularization aids in team collaboration, debugging, and adding new features.

### Future Enhancements

Continual improvement is essential for the longevity and relevance of a project. There are several enhancements planned to make this chessboard application even more robust and user-friendly.

#### Planned Features

- Printing the chess notation for the shortest path onto the screeen.
- Introduce different board and piece themes for customization.

Benefit
These enhancements not only keep the project interesting and engaging for users but also provide an opportunity for me to delve deeper into advanced JavaScript features.

## Final Notes

As we wrap up this journey with the Knight's Travails project, it's clear that building such an application is not just about coding skills, but also about the joy of solving complex problems and bringing ideas to life. This project serves as a great learning tool for those interested in exploring algorithms like BFS and the nuances of dynamic content rendering in web development. It's a testament to the creativity and logic that programming allows us to express. I encourage others to embark on similar projects, as they are a fantastic way to deepen understanding and showcase abilities. Whether you're a seasoned developer or a beginner, there's always something new to discover and create in the world of coding.
