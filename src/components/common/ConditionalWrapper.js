//stolen from the internet, but frankly brilliant.
//wraps children in wrapper if condition is true
//otherwise, simply returns children.

function ConditionalWrapper({ condition, wrapper, children }) {
  return condition ? wrapper(children) : children;
}

export default ConditionalWrapper;
