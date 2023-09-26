const React = require("react");
const DefaultLayout = require("../layouts/Default");

class Show extends React.Component {
  render() {
    const vegetable = this.props.vegetable;
    console.log(vegetable);
    return (
      <DefaultLayout title={"Vegetables Show Page"}>
        The {vegetable.name} is {vegetable.color}.{""}
        {vegetable.readyToEat
          ? " It is ready to eat. "
          : " It is not ready to eat...NOPE! "}
        ;
        <br />
        <a href="/vegetables">Home</a>
      </DefaultLayout>
    );
  }
}
