export const  buildProvidersTree = (componentsWithProps) => {
  const initialComponent = ({ children }) => <>{children}</>
  return componentsWithProps.reduce(
    (AccumulatedComponents, [Provider, props = {}]) => {
      return ({ children }) => {
        return (
          <AccumulatedComponents>
            <Provider {...props}>{children}</Provider>
          </AccumulatedComponents>
        )
      }
    }
  , initialComponent)
}