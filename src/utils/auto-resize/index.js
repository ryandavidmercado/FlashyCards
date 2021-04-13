// automatically resizes a textbox to fit its content

export function autoResizeBox(inputRef) {
  const inputBox = inputRef.current;
  inputBox.style.height = "auto";
  inputBox.style.height = inputBox.scrollHeight + "px";
}

// automatically resizes a text input to fit its content

export function autoResizeWidth(inputRef) {
  const input = inputRef.current;
  const inputLength = input.value.length;
  const minLength = 6;
  const autoLength = Math.max(inputLength, minLength);
  input.style.width = `${autoLength}ch`;
}
