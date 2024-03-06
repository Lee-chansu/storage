import SecTitle from "./SecTitle";

function Sec(props) {
  const defalutClass = "sec text-center ";
  const { area } = props;

  return (
    <>
      <section className={`sec text-center ${area}`}>
        <div className="container">
          <SecTitle>{props.title}</SecTitle>
          {props.children}
        </div>
      </section>
    </>
  );
}
export default Sec;
