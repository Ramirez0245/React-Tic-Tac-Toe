import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
Passing Data Through Props
To get our feet wet, let’s try passing some data from our Board component to our Square component.
We strongly recommend typing code by hand as you’re working through the tutorial and not using copy/paste. This will help you develop muscle memory and a stronger understanding.
In Board’s renderSquare method, change the code to pass a prop called value to the Square:

//Change Sqare’s render method to show that value by replacing {/* TODO *///}// with {this.props.value}:
/*
Title: Making an Interactive Component
Let’s fill the Square component with an “X” when we click it. First, change the button tag that is returned from the Square component’s render() function to this:

As a next step, we want the Square component to “remember” that it got clicked, and fill it with an “X” mark. 
To “remember” things, components use state!

State
React components can have state by setting this.state in their constructors.
this.state should be considered as private to a React component that it’s defined in. 
Let’s store the current value of the Square in this.state, and change it when the Square is clicked

Note
In JavaScript classes, you need to always call super when defining the constructor of a subclass.
All React component classes that have a constructor should start with a super(props) call.

Now we’ll change the Square’s render method to display the current state’s value when clicked:
1.Replace this.props.value with this.state.value inside the <button> tag.
2.Replace the onClick={...} event handler with onClick={() => this.setState({value: 'X'})}.

By calling this.setState from an onClick handler in the Square’s render method, 
we tell React to re-render that Square whenever its <button> is clicked. After the update, 
the Square’s this.state.value will be 'X', so we’ll see the X on the game board.
If you click on any Square, an X should show up.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Chapter: Completing the game

Lifting State Up
We may think that Board should just ask each Square for the Square’s state.
Although this approach is possible in React, 
we discourage it because the code becomes difficult to understand, susceptible to bugs, 
and hard to refactor.

Lifting state into a parent component 
To collect data from multiple children, or to have two child components communicate with each other,
you need to declare the shared state in their parent component instead. The parent component can pass 
the state back down to the children by using props; this 
keeps the child components in sync with each other and with the parent component.

Add a constructor to the Board and set the Board’s initial state to contain an array of 9 nulls
corresponding to the 9 squares:

We will now use the prop passing mechanism again. We will modify the
Board to instruct each individual Square about its current value
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }

Each Square will now receive a value prop that will either be
'X', 'O', or null for empty squares.

Since state is considered to be private to a component that defines 
it, we cannot update the Board’s state directly from Square.

When a Square is clicked, the onClick function provided by the Board is called. Here’s a review of how this is achieved:

1.The onClick prop on the built-in DOM <button> component tells React to set up a click event listener.
2.When the button is clicked, React will call the onClick event handler that is defined in Square’s render() method.
3.This event handler calls this.props.onClick(). The Square’s onClick prop was specified by the Board.
4.Since the Board passed onClick={() => this.handleClick(i)} to Square, the Square calls this.handleClick(i) when clicked.
5.We have not defined the handleClick() method yet, so our code crashes. If you click a square now, you should see a red error screen saying something like “this.handleClick is not a function”.

Note

The DOM <button> element’s onClick attribute has a special meaning to React 
because it is a built-in component

When we try to click a Square, we should get an error because we haven’t defined handleClick yet. 
We’ll now add handleClick to the Board class:

Since the Square components no longer maintain state, the Square components receive values 
from the Board component and inform the Board component when they’re clicked. In React terms, 
the Square components are now -!- controlled components -!-. 

Note how in handleClick, we call .slice() to create a copy of the squares array to 
modify instead of modifying the existing array. We will explain why we create a copy of the 
squares array in the next section.
----------------------------------------------
Title: Why Immutability Is Important

In the previous code example, -!- we suggested that you use the .slice() method to create a copy of 
the squares array -!- to modify instead of modifying the existing array. 
We’ll now discuss immutability and why immutability is important to learn.

There are generally two approaches to changing data. The first approach is to MUTATE 
the data by directly changing the data’s values. The second approach is to replace the 
data with a new copy which has the desired changes.

Data Change with Mutation
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Now player is {score: 2, name: 'Jeff'}


Data Change without Mutation
var player = {score: 1, name: 'Jeff'};
var newPlayer = Object.assign({}, player, {score: 2});
// Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

The end result is the same but by not mutating (or changing the underlying data) directly, 
we gain several benefits described below.

Complex Features Become Simple
Later in this tutorial, we will implement a “time travel” feature that 
allows us to review the tic-tac-toe game’s history and “jump back” to previous moves. 
This functionality isn’t specific to games — an ability to undo and redo certain actions 
is a common requirement in applications. Avoiding direct data mutation lets us 
keep previous versions of the game’s history intact, and reuse them later.

Detecting Changes
Detecting changes in mutable objects is difficult because they are modified directly. 
This detection requires the mutable object to be compared to previous copies of itself 
and the entire object tree to be traversed.
Detecting changes in immutable objects is considerably easier. If the immutable object 
that is being referenced is different than the previous one, then the object has changed.

Determining When to Re-Render in React
The main benefit of immutability is that it helps you build pure components in React.
Immutable data can easily determine if changes have been made, which helps to determine 
when a component requires re-rendering.
You can learn more about shouldComponentUpdate() and how you can build pure components 
by reading Optimizing Performance.
----------------------------------------------------
Title: Function Components
We’ll now change the Square to be a function component.
In React, function components are a simpler way to write components that 
only contain a render method and -!- don’t have their own state -!-. Instead of defining a 
class which extends React.Component, we can write a function that -!-takes 
props as input and returns what should be rendered-!-. Function components are less 
tedious to write than classes, and many components can be expressed this way.
------------------------------------------------------
Title: Taking Turns
We’ll set the first move to be “X” by default. We can set this default by 
modifying the initial state in our Board constructor:

Each time a player moves, xIsNext (a boolean) will be flipped to determine 
which player goes next and the game’s state will be saved. We’ll update the Board’s 
handleClick function to flip the value of xIsNext:

We’ll replace the status declaration in Board’s render function.
------------------------------------------------------
Title: Declaring a Winner
Now that we show which player’s turn is next, we should also show when the game 
is won and there are no more turns to make. Copy this helper function and paste it at 
the end of the file:

We can now change the Board’s handleClick function to return early by 
ignoring a click if someone has won the game or if a Square is already filled:

Congratulations! You now have a working tic-tac-toe game. And you’ve just learned 
the basics of React too. So you’re probably the real winner here.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ****** REVIEW THIS CHAPTER *********
  ****** REVIEW THIS CHAPTER *********
   ****** REVIEW THIS CHAPTER *********
Chapter: Adding Time Travel     ****** REVIEW THIS CHAPTER *********

As a final exercise, let’s make it possible to “go back in time” to the previous 
moves in the game.

Title: Storing a History of Moves
If we mutated the squares array, implementing time travel would be very difficult.

However, we used slice() to create a new copy of the squares array after every move, 
and treated it as immutable. This will allow us to store every past version of the squares array, 
and navigate between the turns that have already happened.

Title: Lifting State Up, Again
We’ll want the top-level Game component to display a list of past moves.

Placing the history state into the Game component lets us remove the 
squares state from its child Board component.

Just like we ~!!! “lifted state up” from the Square component into the Board component !!!~,
~!!! we are now lifting it up from the Board into the top-level Game component !!!~.
~!! This gives the Game component full control over the Board’s data, and lets it instruct 
the Board to render previous turns from the history !!~. ****

First, we’ll set up the initial state for the Game component within its constructor:

Next, we’ll have the Board component receive squares and onClick props from the 
Game component.

Here are the required steps to transform the Board component:

1.Delete the constructor in Board.
2.Replace this.state.squares[i] with this.props.squares[i] in Board’s renderSquare.
3.Replace this.handleClick(i) with this.props.onClick(i) in Board’s renderSquare

We’ll update the Game component’s render function to use the most recent history 
entry to determine and display the game’s status:

Since the Game component is now rendering the game’s status, we can remove the 
corresponding code from the Board’s render method. 

Finally, we need to move the handleClick method from the Board component 
to the Game component. We also need to modify handleClick because the Game 
component’s state is structured differently. 

Note
Unlike the array push() method you might be more familiar with, the 
concat() method doesn’t mutate the original array, so we prefer it.
------------------------------------------------------
Title: Showing the pass moves
Since we are recording the tic-tac-toe game’s history, we can now 
display it to the player as a list of past moves.

~!! We learned earlier that React elements are first-class JavaScript objects; !!~
To render multiple items in React, we can use an array of React elements.

In JavaScript, arrays have a map() method that is commonly used for mapping data 
to other data, for example:

const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
SELF NOTE:
Basicly map method just returns an altered array. The altering happens in the way
which you code the change in the method.

Using the map method, we can map our history of moves to React elements representing 
buttons on the screen, and display a list of buttons to “jump” to past moves.

Let’s ~!! map over !!~ the history in the Game’s render method:

------------------------------------------------------
TITLE: Picking a Key
When we render a list, React stores some information about each rendered list item. 

When we update a list, React needs to determine what has changed. We could have 
added, removed, re-arranged, or updated the list’s items.

In addition to the updated counts, a human reading this would probably say 
hat we swapped Alexa and Ben’s ordering and inserted Claudia between Alexa 
and Ben. However, React is a computer program and does not know what we 
intended. Because React cannot know our intentions, ~!!-- we need to specify a 
key property for each list item to differentiate each list item from its 
siblings --!!~. One option would be to use the strings alexa, ben, claudia. ~!!-- If 
we were displaying data from a database, Alexa, Ben, and Claudia’s database 
IDs could be used as keys !!~~.

SELFNOTE:
The rest will be blank because I don't want to copy all the information from section
but it too much to copy! THIS LOOKS IMPORANT TO UNDERSTAND, re-read this!
------------------------------------------------------
Title: Implementing Time Travel
In the tic-tac-toe game’s history, each past move has a unique ID 
associated with it: it’s the sequential number of the move. The moves are never 
re-ordered, deleted, or inserted in the middle, so it’s safe to use the move index as a key.

In the Game component’s render method, we can add the key as <li key={move}> 
and React’s warning about keys should disappear:

we’ll add stepNumber to the Game component’s state to indicate which 
step we’re currently viewing.

First, add stepNumber: 0 to the initial state in Game’s constructor:

Next, we’ll define the jumpTo method in Game to update that stepNumber. 
We also set xIsNext to true if the number that we’re changing stepNumber to is even:

The stepNumber state we’ve added reflects the move displayed to the user now.
After we make a new move, we need to update stepNumber by adding stepNumber: 
history.length as part of the this.setState argument. This ensures we don’t 
get stuck showing the same move after a new one has been made.

We will also replace reading this.state.history with 
this.state.history.slice(0, this.state.stepNumber + 1). This ensures that if 
we “go back in time” and then make a new move from that point, we throw away 
all the “future” history that would now become incorrect.

Finally, we will modify the Game component’s render method from always 
rendering the last move to rendering the currently selected move according to stepNumber:

------------------------------------------------------
*/
/*Note: TypeError: Cannot read property '0' of undefined 
 <Square
> 93 |     value={this.state.squares[i]}
  94 | ^  onClick={() => this.handleClick(i)}
  95 |   />
  This was an error where value square does not exist because the name
  of the state value is squares not square.
*/

function Square(props) 
{
  return (
    //onClick meathod will run when button is clicked
    <button className="square" onClick={props.onClick} >
      {/*NOTE: does not include this.props.value. When we modified the Square to be a 
      function component, we also changed onClick={() => this.props.onClick()} to a shorter 
      onClick={props.onClick} (note the lack of parentheses on both sides). */}
      {props.value} 
    </button>
  );
}


class Board extends React.Component {
  /*constructor(props)
  {
    super(props);
    this.state =
    {
      //A array value named 'square' fill with null values
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }*/
  /*handleClick(i) OLD CODE, CODE WAS MOVED TO GAME COMPONENT
  {
    //the .slice() method creates a copy of the squares 
    //array to modify instead of modifying the existing array. 
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    //I believe that this.setState is what they were talking about that is that
    //this.setState does not 
    this.setState
    ({
      //It seems that the squares = this.state.squares.slice() get assign to this's states 
      //squares and flips this's states xIsNext: !this.state.xIsNext
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }*/
  //A meathod and or function
  renderSquare(i) 
  {
      //Passes a prop called value. From a parent
      // Board component to a child Square component.
      //This is how you pass variables
      return (
        <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        />
       //{/*<Square 
       //   //One unit of squares array of 'i' entry is pass to value i.e. value is a square entry.
       //   value={this.state.squares[i]}
       //   //The handleClick(i) meathod is passed to Square object or meathod.
       //   onClick={() => this.handleClick(i)}
       // /> */}
      );
  }
  render() 
  {
    return (
      <div>
        <div className="board-row">
          {/* this.rendSquare(i) method calls <Square value=i/> tag/object where 
              the <Square> object returns a button tag.*/}
          {this.renderSquare(0)} 
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props)
  {
    super(props);
    this.state =
    {
      history: 
      [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) 
  {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) 
  {
    this.setState
    ({
      stepNumber: step,
      xIsNext: (step % 2) == 0,
    });
  }
  render() 
  {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    console.log(history.length);
    const winner = calculateWinner(current.squares);

    const moves =  history.map((step, move) =>
    {
      const desc =  move ?
      'Go to move #' + move :
      'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    });

    let status;
    if(winner) {status = 'Winner ' + winner;}
    else {status = 'Next player is ' + (this.state.xIsNext ? 'X' : 'O'); }

    return (
      <div className="game">
        <div className="game-board" >
          <Board 
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

/* OLDER VERSION OF SQUARE 
class Square extends React.Component {
  //A Constructor is placed before the render() and return.
  //In this constructor props get passed from parent to child, props.
  //this.state is where values are stored. When initialized value = null. 
  constructor(props)
  {
    //Because this constructor is of a subclass super(props) is required.
    super(props);
    this.state =
    {
      value: null,
    };
  }
  render() {
    return (
      //button-tag can hold a function called 'onClick'. this.setState({ }) assigns values from the this.state.
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {/* props are where passing arguments are stored.
        'this.props.value' syntax is how to get a value that is
        passed from parent element to child.*/          /*}

        {/* Display this.state.value on button*/              /*}
        {this.props.value}
      </button>
    );
  }
}          */