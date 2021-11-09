(function () {
  const file = document.querySelector("#data_read");
  file.addEventListener("change", e => {
    let input = e.target;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // const pre = document.getElementById('pre1');
      // pre.innerHTML = reader.result;
      const j = JSON.parse(reader.result);
      console.log(j);
    };
    reader.readAsText(file);
  })
}())