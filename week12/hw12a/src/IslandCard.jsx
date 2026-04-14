function IslandCard(props) {
  return (
    <div className="island-card">
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <p><strong>Visitor Tip:</strong> {props.tip}</p>
    </div>
  )
}

export default IslandCard