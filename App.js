import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';


const CHOICE = [
  {
    name: 'rock',
    uri: 'https://upload.wikimedia.org/wikipedia/commons/0/01/What_is_your_problem%2C_graffiti_rock_-_Flickr_-_daveynin.jpg'
  },

  {
    name: 'paper',
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtRF8o5g8nWy5Wy144PnL4OYu8VHCY6kjrllAGnsaG5Av3mT7h'
  },

  {
    name: 'scissors',
    uri: 'https://cdn11.bigcommerce.com/s-sdq9gkoc6f/images/stencil/1280x1280/products/512/380/Amzn-702-website__54053.1534883270.jpg?c=2'
  }
];

const ButtonPlay = props => (
  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={() => props.onPress(props.name)}
  >
    <Text style={styles.buttonText}>
      {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
    </Text>
  </TouchableOpacity>
);

const ChoiceCard = ({ player, choice: { name, uri } }) => {
  const title = name && name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <View style={styles.choiceContainer}>
      <Text style={styles.choiceDescription}>{player}</Text>
      <Image source={{ uri }} resizeMode="contain" style={styles.choiceImage} />
      <Text style={styles.choiceCardTitle}>{title}</Text>
    </View>
  );
};


export default function App() {
  const [gamePrompt, setGamePrompt] = useState('Choose your weapon!');
  const [userChoice, setUserChoice] = useState({});
  const [computerChoice, setComputerChoice] = useState({});
  const [countPlay, setCountPlay] = useState(0);

  const [playerLoseTime, setPlayerLoseTime] = useState(0);
  const [playerWinTime, setPlayerWinTime] = useState(0);
  const [playerTieTime, setPlayerTieTime] = useState(0);

  const [compLoseTime, setCompLoseTime] = useState(0);
  const [compWinTime, setCompWinTime] = useState(0);
  const [compTieTime, setCompTieTime] = useState(0);

  // const [percentagesPlayerWin, setPercentagesPlayerWin] = useState(0);
  // const [percentagesPlayerLose, setPercentagesPlayerLose] = useState(0);
  // const [percentagesPlayerTie, setPercentagesPlayerTie] = useState(0);

  // const [percentagesCompWin, setPercentagesCompWin] = useState(0);
  // const [percentagesCompLose, setPercentagesCompLose] = useState(0);
  // const [percentagesCompTie, setPercentagesCompTie] = useState(0);

  const randomComputerChoice = () => CHOICE[Math.floor(Math.random() * CHOICE.length)];

  const getRoundOutcome = userChoice => {
    const computerChoice = randomComputerChoice().name;
    let result;

    if (userChoice === 'rock') {
      result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';

    }
    if (userChoice === 'paper') {
      result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'scissors') {
      result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
    }

    if (userChoice === computerChoice) result = 'Tie game!';
    return [result, computerChoice];
  };

  const onPress = playerChoice => {
    const [result, compChoice] = getRoundOutcome(playerChoice);

    const newUserChoice = CHOICE.find(choice => choice.name === playerChoice);
    const newComputerChoice = CHOICE.find(choice => choice.name === compChoice);

    setGamePrompt(result);
    setUserChoice(newUserChoice);
    setComputerChoice(newComputerChoice);
    setCountPlay(countPlay + 1);

    switch (result) {
      case "Victory!":
        setPlayerWinTime(playerWinTime + 1);
        setCompLoseTime(compLoseTime + 1);
        break;
      case "Defeat!":
        setPlayerLoseTime(playerLoseTime + 1);
        setCompWinTime(compWinTime + 1);
        break;
      default:
        setPlayerTieTime(playerTieTime + 1);
        setCompTieTime(compTieTime + 1);
    }

    
    //setPercentagesPlayerWin(playerWinTime / (countPlay) * 100);
    // setPercentagesPlayerLose(playerLoseTime / (countPlay) * 100);
    // setPercentagesPlayerTie(playerTieTime / (countPlay) * 100)

    // setPercentagesCompLose(compLoseTime / (countPlay) * 100);
    // setPercentagesCompWin(compWinTime / (countPlay) * 100);
    // setPercentagesCompTie(compTieTime / (countPlay) * 100);
    
  };

  const getResultColor = () => {
    if (gamePrompt === 'Victory!') return 'green';
    if (gamePrompt === 'Defeat!') return 'red';
    return null;
  };

  const resetGame = () => {
    setCountPlay(0);
    setPlayerLoseTime(0);
    setPlayerWinTime(0);
    setPlayerTieTime(0);
    setCompLoseTime(0);
    setCompWinTime(0);
    setCompTieTime(0);
  };
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={{ backgroundColor: getResultColor() }}>{gamePrompt}</Text>
      </View>
      {/* end header */}

      {/* count */}
      <View>
        <Text style={styles.txtCount}>You played {countPlay} times</Text>
      </View>
      <View style={styles.countLWT}>
        <View style={styles.playerCount}>
          <Text style={styles.txtCount}>
            User Lost: {playerLoseTime} times ({(playerLoseTime / countPlay * 100).toFixed(0)}%)
          </Text>
          <Text style={styles.txtCount}>
            User Won: {playerWinTime} times ({(playerWinTime / countPlay * 100).toFixed(0)}%)
          </Text>
          <Text style={styles.txtCount}>
            User Tie: {playerTieTime} times ({(playerTieTime / countPlay * 100).toFixed(0)}%)
          </Text>
        </View>

        <View style={styles.compCount}>
          <Text style={styles.txtCount}>
            Computer Lost: {compLoseTime} times ({(compLoseTime / countPlay * 100).toFixed(0)}%)
          </Text>
          <Text style={styles.txtCount}>
            Computer Won: {compWinTime} times ({(compWinTime / countPlay * 100).toFixed(0)}%)
          </Text>
          <Text style={styles.txtCount}>
            Computer Tie: {compTieTime} times ({(compTieTime / countPlay * 100).toFixed(0)}%)
          </Text>
        </View>
      </View>
      {/* end count */}

      {/* body */}
      <View style={styles.body}>
        <ChoiceCard player="Player" choice={userChoice} />
        <Text>vs</Text>
        <ChoiceCard player="Computer" choice={computerChoice} />
      </View>
      {/* end body */}

      {/* footer */}
      <View style={styles.footer}>
        {
          CHOICE.map(choice => {
            return <ButtonPlay key={choice.name} name={choice.name} onPress={onPress} />;
          })
        }
        <TouchableOpacity 
          onPress={resetGame} 
          style={styles.buttonResetGame}>
          <Text style={styles.buttonText}>
            Reset Game
          </Text>
        </TouchableOpacity>
      </View>

      {/* end footer */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: 'red',
    marginLeft: 12,
    marginRight: 12
  },
  choiceContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  footer: {
    flex: 0.4,
    justifyContent: "space-around",
    alignItems: "center"
  },
  buttonStyle: {
    backgroundColor: '#bfefff',
    width: 100,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: "center",

  },
  buttonText: {
    justifyContent: "center",
    alignContent: "center",
    color: "white",
    fontWeight: 'bold'
  },
  choiceImage: {
    width: 170,
    height: 170
  },
  choiceDescription: {
    fontSize: 30,
    fontWeight: 'bold',
    borderBottomColor: 'red',
    color: 'red'
  },
  choiceCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomColor: 'red',
    color: 'red'
  },
  countLWT: {
    flex: 0.1,
    flexDirection: "row",
  },
  playerCount: {
    marginRight: 10
  },
  compCount: {
    marginLeft: 10
  },
  txtCount: {
    fontSize: 15,
    color: 'orange'
  },
  buttonResetGame: {
    backgroundColor: 'green', 
    width: 100, 
    height: 50, 
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"

  }
});
