const React = require("react");
const DefaultLayout = require("../layouts/Default");

class Show extends React.Component {
  render() {
    const fruit = this.props.fruit;

    console.log(fruit);

    return (
      <DefaultLayout title={"Fruits Show Page"}>
        The {fruit.name} is {fruit.color}.{" "}
        {fruit.readyToEat
          ? "It is ready to eat"
          : "It is not ready to eat... Cant touch this"}
        <br></br><a href="/fruits">Return to Home</a>
      </DefaultLayout>
    );
  }
}
module.exports = Show;
