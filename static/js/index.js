async function load_parent_data() {
  fetch("/parent")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    }).catch((e) => {
        console.log(e);
    })
}

load_parent_data();