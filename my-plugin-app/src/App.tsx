import CarDamageShow from './components/CarDamageShow/CarDamageShow'



const App = () => {

  return (
    <div>
      <CarDamageShow
        options={{
          initializedOptions: ['A-1', 'C-2', 'B-4', 'A-2'],
          onPositionChange(positions) {
          },
          onComplete(positions) {
          },
          onInit() { },
        }}
      />
    </div>
  )
}

export default App
