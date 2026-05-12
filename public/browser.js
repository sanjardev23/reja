// This message only checks if browser.js is connected successfully
console.log("Frontend JS ishga tushdi");

// This function checks the plan text and chooses correct icon
// Example: if user writes "Python", it returns Python icon class
function getIconJS(text) {
  // If text is empty, use ""; then make everything lowercase
  // Because "Python" and "python" should be treated the same
  const t = (text || "").toLowerCase();

  // If text contains javascript or js, return JavaScript icon
  if (t.includes("javascript") || t.includes(" js")) return "fa-brands fa-js";

  // If text contains react, return React icon
  if (t.includes("react")) return "fa-brands fa-react";

  // If text contains node, return Node.js icon
  if (t.includes("node")) return "fa-brands fa-node-js";

  // If text contains python, return Python icon
  if (t.includes("python")) return "fa-brands fa-python";

  // If text contains mongo/database/db, return database icon
  if (t.includes("mongo") || t.includes("database") || t.includes("db")) {
    return "fa-solid fa-database";
  }

  // If text contains ai/machine/ml, return robot icon
  if (t.includes("ai") || t.includes("machine") || t.includes("ml")) {
    return "fa-solid fa-robot";
  }

  // If text contains devops/docker, return Docker icon
  if (t.includes("devops") || t.includes("docker")) return "fa-brands fa-docker";

  // If text contains git, return GitHub icon
  if (t.includes("git")) return "fa-brands fa-github";

  // If text contains css/frontend, return CSS icon
  if (t.includes("css") || t.includes("frontend")) return "fa-brands fa-css3-alt";

  // If text contains html, return HTML icon
  if (t.includes("html")) return "fa-brands fa-html5";

  // If text contains backend/server/api, return server icon
  if (t.includes("backend") || t.includes("server") || t.includes("api")) {
    return "fa-solid fa-server";
  }

  // If no word matches, return default check icon
  return "fa-solid fa-circle-check";
}

// This function creates HTML design for ONE new item
// It is used after user adds a new plan without refreshing the page
function itemTemplate(item) {
  return `
    <li class="list-item" data-id="${item._id}">
      <!-- icon area -->
      <div class="item-icon">
        <i class="${getIconJS(item.reja)}"></i>
      </div>

      <!-- checkbox area. When clicked, toggleDone() runs from reja.ejs -->
      <div class="checkbox" onclick="toggleDone(this)"></div>

      <!-- plan title and comment -->
      <div class="item-content">
        <span class="item-text">${item.reja}</span>
        <p class="item-comment">${item.comment || "Comment yo'q"}</p>
      </div>

      <!-- edit and delete buttons -->
      <div class="item-actions">
        <button data-id="${item._id}" class="edit-me btn-edit" title="Tahrirlash">
          <i class="fa-solid fa-pen"></i>
        </button>

        <button data-id="${item._id}" class="delete-me btn-delete" title="O'chirish">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
  `;
}

// This connects JS to the title input in EJS
const createField = document.getElementById("create-field");

// This connects JS to the comment input in EJS
const commentField = document.getElementById("comment-field");

// This gets the form and listens when user clicks "Qo'shish"
document.getElementById("create-form").addEventListener("submit", function (e) {
  // This stops normal form reload
  e.preventDefault();

  // If input is empty, do not send data to backend
  if (createField.value.trim() === "") {
    createField.focus();
    return;
  }

  // Axios sends data from frontend to backend route: POST /create-item
  // Backend receives: req.body.reja and req.body.comment
  axios
    .post("/create-item", {
      reja: createField.value,
      comment: commentField.value,
    })
    .then((response) => {
      // If empty message exists, remove it
      const emptyState = document.querySelector(".empty-state");
      if (emptyState) emptyState.remove();

      // Backend sends created MongoDB item back
      // We add it to the page without refreshing
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data));

      // Clear input fields after adding
      createField.value = "";
      commentField.value = "";

      // Put cursor back to title input
      createField.focus();

      // Update total/done/left numbers
      updateStats();
    })
    .catch(() => {
      // If backend has problem, show error in console
      console.log("Please try again!");
    });
});

// This listens to all clicks on the page
// We use it for delete and edit buttons
document.addEventListener("click", function (e) {
  // This checks: did user click delete button or icon inside delete button?
  const deleteBtn = e.target.closest(".delete-me");

  // If delete button was clicked
  if (deleteBtn) {
    // Ask user before deleting
    if (confirm("Do you want to remove this?")) {
      // Send item id to backend route: POST /delete-item
      // Backend deletes this item from MongoDB
      axios
        .post("/delete-item", {
          id: deleteBtn.getAttribute("data-id"),
        })
        .then(() => {
          // After backend deletes item, remove it from frontend too
          deleteBtn.closest(".list-item").remove();

          // Update total/done/left numbers
          updateStats();
        })
        .catch(() => {
          console.log("Please try again!");
        });
    }
  }

  // This checks: did user click edit button or icon inside edit button?
  const editBtn = e.target.closest(".edit-me");

  // If edit button was clicked
  if (editBtn) {
    // Find the current list item
    const listItem = editBtn.closest(".list-item");

    // Get old plan title from HTML
    const oldText = listItem.querySelector(".item-text").innerHTML.trim();

    // Get old comment from HTML
    const oldComment = listItem.querySelector(".item-comment").innerHTML.trim();

    // Ask user for new title
    const userInput = prompt("Enter plan title:", oldText);

    // Ask user for new comment
    const userComment = prompt("Enter comment:", oldComment);

    // If user wrote title
    if (userInput) {
      // Send edited data to backend route: POST /edit-item
      // Backend updates MongoDB
      axios
        .post("/edit-item", {
          id: editBtn.getAttribute("data-id"),
          new_input: userInput,
          new_comment: userComment,
        })
        .then(() => {
          // Update title on frontend
          listItem.querySelector(".item-text").innerHTML = userInput;

          // Update comment on frontend
          listItem.querySelector(".item-comment").innerHTML =
            userComment || "Comment yo'q";

          // Update icon too, because title may change from "Python" to "React"
          listItem.querySelector(".item-icon i").className = getIconJS(userInput);

          alert("Item updated successfully");
        })
        .catch(() => {
          console.log("Something went wrong. Please try again!");
        });
    }
  }
});

// This gets "Barchasini o'chirish" button and listens for click
document.getElementById("clean-all").addEventListener("click", function () {
  // Ask before deleting all items
  if (confirm("Do you want to delete all items?")) {
    // Send request to backend route: POST /delete-all
    // Backend deletes all plans from MongoDB
    axios
      .post("/delete-all", {
        delete_all: true,
      })
      .then((response) => {
        // Show backend message
        alert(response.data.state);

        // Reload page because all items are deleted
        document.location.reload();
      });
  }
});