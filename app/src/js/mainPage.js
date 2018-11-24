// Initialize Firebase

var addBtn = document.getElementById("addButton");
var targetList = document.getElementById("projectList");

window.onload = function () {
  var savedInner = localStorage.getItem("listStorageInner");
  var savedOuter = localStorage.getItem("listStorageOuter");

  // If there are any saved items, update our list
  if (savedInner) {
    let targetList = document.getElementById("projectList");
    targetList.innerHTML = savedInner;
  }
  if (savedOuter) {
    let targetList = document.getElementById("projectList");
    targetList.outerHTML = savedOuter;
  }

  if ($("#projectList").has("ul").length == 0) {}
  var removeButtons = document.getElementsByClassName("removeMeBtn");

  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener(
      "click",
      (function () {
        return function () {
          let parent = this.parentElement;
          parent.parentElement.removeChild(parent);
          let targetList = document.getElementById("projectList");
          localStorage.removeItem("listStorageInner", targetList.innerHTML);
          localStorage.removeItem("listStorageOuter", targetList.outerHTML);
          localStorage.setItem("listStorageInner", targetList.innerHTML);
          localStorage.setItem("listStorageOuter", targetList.outerHTML);
        };
      })(i),
      false
    );
  }

  var editBtns = document.getElementsByClassName("editMeBtn");

  for (let j = 0; j < editBtns.length; j++) {
    editBtns[j].addEventListener(
      "click",
      (function () {
        return function () {
          let parent = this.parentElement;
          document.getElementById("entryInput").textContent =
            parent.textContent;
          var textAreaFocus = document.getElementById("entryInput");
          textAreaFocus.focus();
          parent.parentElement.removeChild(parent);
          let targetList = document.getElementById("projectList");
          localStorage.removeItem("listStorageInner", targetList.innerHTML);
          localStorage.removeItem("listStorageOuter", targetList.outerHTML);
          localStorage.setItem("listStorageInner", targetList.innerHTML);
          localStorage.setItem("listStorageOuter", targetList.outerHTML);
        };
      })(j),
      false
    );
  }
};

window.onbeforeunload = function () {
  let targetList = document.getElementById("projectList");
  localStorage.removeItem("listStorageInner", targetList.innerHTML);
  localStorage.removeItem("listStorageOuter", targetList.outerHTML);

  // If there are any saved items, update our list
  localStorage.setItem("listStorageInner", targetList.innerHTML);
  localStorage.setItem("listStorageOuter", targetList.outerHTML);
};

$("#myInput").on("keyup", function () {
  var value = $(this)
    .val()
    .toLowerCase();
  $("#projectList ul").filter(function () {
    $(this).toggle(
      $(this)
      .text()
      .toLowerCase()
      .indexOf(value) > -1
    );
  });
});

window.onclose = function () {
  let targetList = document.getElementById("projectList");
  localStorage.removeItem("listStorageInner", targetList.innerHTML);
  localStorage.removeItem("listStorageOuter", targetList.outerHTML);
  localStorage.setItem("listStorageInner", targetList.innerHTML);
  localStorage.setItem("listStorageOuter", targetList.outerHTML);
};

window.onabort = function () {
  let targetList = document.getElementById("projectList");
  localStorage.removeItem("listStorageInner", targetList.innerHTML);
  localStorage.removeItem("listStorageOuter", targetList.outerHTML);
  localStorage.setItem("listStorageInner", targetList.innerHTML);
  localStorage.setItem("listStorageOuter", targetList.outerHTML);
};

addBtn.addEventListener("click", function () {
  $("#addDialog").dialog({
    modal: false,
    resizable: false,
    buttons: {
      "Yes I'm Sure.": function () {
        $(this).dialog("close");
        let targetList = document.getElementById("projectList");
        addToList(targetList);
        localStorage.removeItem("listStorageInner", targetList.innerHTML);
        localStorage.removeItem("listStorageOuter", targetList.outerHTML);
        localStorage.setItem("listStorageInner", targetList.innerHTML);
        localStorage.setItem("listStorageOuter", targetList.outerHTML);
      },
      Cancel: function () {
        $(this).dialog("close");
      }
    }
  });
});

var clearAllBtn = document.getElementById("removeAllBtn");

clearAllBtn.addEventListener("click", function () {
  $("#clearDialog").dialog({
    modal: false,
    resizable: false,
    buttons: {
      "Yes I'm Sure.": function () {
        $(this).dialog("close");
        var list = document.getElementById("projectList");
        list.textContent = "";
        let targetList = document.getElementById("projectList");
        localStorage.removeItem("listStorageInner", targetList.innerHTML);
        localStorage.removeItem("listStorageOuter", targetList.outerHTML);
        localStorage.setItem("listStorageInner", targetList.innerHTML);
        localStorage.setItem("listStorageOuter", targetList.outerHTML);
      },
      Cancel: function () {
        $(this).dialog("close");
      }
    }
  });
});

function addToList(targetList) {
  var inputText = document.getElementById("entryInput").value;
  var ul = document.createElement("ul");
  var textNode = document.createTextNode(inputText + "");
  var removeButton = document.createElement("img");
  var editButton = document.createElement("img");
  removeButton.src = "assets/img/icons8-cancel-40.png";
  editButton.src = "assets/img/icons8-edit-file-40.png";

  removeButton.title = "Remove Item";
  removeButton.setAttribute("data-toggle", "tooltip");

  editButton.title = "Edit Item";
  editButton.setAttribute("data-toggle", "tooltip");

  removeButton.addEventListener("click", function () {
    var parent = this.parentElement;
    parent.parentElement.removeChild(parent);
    let targetList = document.getElementById("projectList");
    localStorage.removeItem("listStorageInner", targetList.innerHTML);
    localStorage.removeItem("listStorageOuter", targetList.outerHTML);
    localStorage.setItem("listStorageInner", targetList.innerHTML);
    localStorage.setItem("listStorageOuter", targetList.outerHTML);
  });
  editButton.addEventListener("click", function () {
    var parent = this.parentElement;
    document.getElementById("entryInput").value = parent.textContent;
    parent.focus();
    parent.parentElement.removeChild(parent);
    let targetList = document.getElementById("projectList");
    localStorage.removeItem("listStorageInner", targetList.innerHTML);
    localStorage.removeItem("listStorageOuter", targetList.outerHTML);
    localStorage.setItem("listStorageInner", targetList.innerHTML);
    localStorage.setItem("listStorageOuter", targetList.outerHTML);
  });
  document.getElementById("entryInput").value = "";

  if (inputText.length === 0) {
    $("#errorDialog").dialog({
      modal: false,
      resizable: false,
      buttons: {
        Ok: function () {
          $(this).dialog("close");
        }
      }
    });
  }
  removeButton.className = "removeMeBtn";

  editButton.className = "editMeBtn";

  ul.appendChild(removeButton);
  ul.appendChild(editButton);
  ul.appendChild(textNode);
  ul.className = "name";
  targetList.appendChild(ul);
}

var genIdeaBtn = document.getElementById('generateIdeaBtn');

genIdeaBtn.addEventListener("click", function () {


  let ideasPrefix = ['Chess', 'Sound', 'Projectile Motion', 'Tic-Tac-Toe', 'Cookbook', 'Tetris',
    'Publication', 'Grade/GPA', 'White-Hat Virus', 'Animation/Animated', 'Photoshop', 'Art Board',
    'Population', 'Pizza-Themed', 'Homework', 'Analytic', 'Hangman', 'Card', 'Portfolio', 'Number',
    'Rock, Paper, Scissors', 'Address', 'Roman Numeral to Number', 'Text', 'Profession', 'Cities',
    'Fibonacci Sequence', 'Unit', 'Binary/Hexadecimal', 'Sorting', 'Pig Latin', 'IP Address', 'Bank',
    'Money', 'Firebase', 'React', 'Angular', 'Vue.js', 'Electron', 'MP3', 'MP4', 'GIF', 'Pythagorean Theorem',
    'Area', 'Free-Fall', 'HTML/CSS/JS', 'Java', 'Python', 'Future Themed/Based', 'Regex', 'Memory', 'Sliding',
    'Movie', 'T.V. Show', 'War', 'Pong', 'Maze', 'Typing'
  ];
  // Declare Array of idea choices suffix.
  let ideasSuffix = ['Game', 'A.I/Neural Network', 'Calculator', 'Web Scraper', 'Manager', 'Replica',
    'Website', 'Puzzle', 'Tracker', 'Alarm', 'To-do List', 'Script', 'Graph', 'Coin Flip', 'Guesser',
    'Virtual Book', 'Converter/Conversion', 'Editor', 'Generator', 'API', 'Magic 8 Ball', 'Translator',
    'Account', 'Admin Panel', 'Scheduler', 'Tool', 'Analyzer', 'Database', 'Application', 'Player', 'Cipher',
    'Encoder', 'Decoder'
  ];


  let randomNumber1 = Math.floor(Math.random() * ideasPrefix.length);
  let randomNumber2 = Math.floor(Math.random() * ideasSuffix.length);
  let randomElement1 = ideasPrefix[randomNumber1];
  let randomElement2 = ideasSuffix[randomNumber2];

  var displayIdeaPrefix = document.getElementById('ideaDisplayPrefix')
  var displayIdeaSuffix = document.getElementById('ideaDisplaySuffix')

  displayIdeaPrefix.textContent = '';
  displayIdeaSuffix.textContent = '';

  displayIdeaPrefix.textContent = randomElement1 + " ";
  displayIdeaSuffix.textContent = randomElement2;


  $("#genIdeaDialog").dialog({
    modal: false,
    resizable: false,
    buttons: {
      "Generate A New Idea": function () {
        let randomNumber1 = Math.floor(Math.random() * ideasPrefix.length);
        let randomNumber2 = Math.floor(Math.random() * ideasSuffix.length);
        let randomElement1 = ideasPrefix[randomNumber1];
        let randomElement2 = ideasSuffix[randomNumber2];

        let displayIdeaPrefix = document.getElementById('ideaDisplayPrefix')
        let displayIdeaSuffix = document.getElementById('ideaDisplaySuffix')

        displayIdeaPrefix.textContent = randomElement1 + " ";
        displayIdeaSuffix.textContent = randomElement2;

      },
      "Add This To My List": function () {
        let ul = document.createElement("ul");
        let removeButton = document.createElement("img");
        let editButton = document.createElement("img");
        let targetList = document.getElementById('projectList');
        removeButton.src = "assets/img/icons8-cancel-40.png";
        editButton.src = "assets/img/icons8-edit-file-40.png";
        let ideaTextNode = document.createTextNode(displayIdeaPrefix.textContent + displayIdeaSuffix.textContent)

        removeButton.title = "Remove Item";
        removeButton.setAttribute("data-toggle", "tooltip");

        editButton.title = "Edit Item";
        editButton.setAttribute("data-toggle", "tooltip");

        removeButton.addEventListener("click", function () {
          let parent = this.parentElement;
          parent.parentElement.removeChild(parent);
          let targetList = document.getElementById("projectList");
          localStorage.removeItem("listStorageInner", targetList.innerHTML);
          localStorage.removeItem("listStorageOuter", targetList.outerHTML);
          localStorage.setItem("listStorageInner", targetList.innerHTML);
          localStorage.setItem("listStorageOuter", targetList.outerHTML);
        });
        editButton.addEventListener("click", function () {
          let parent = this.parentElement;
          document.getElementById("entryInput").value = parent.textContent;
          parent.focus();
          parent.parentElement.removeChild(parent);
          let targetList = document.getElementById("projectList");
          localStorage.removeItem("listStorageInner", targetList.innerHTML);
          localStorage.removeItem("listStorageOuter", targetList.outerHTML);
          localStorage.setItem("listStorageInner", targetList.innerHTML);
          localStorage.setItem("listStorageOuter", targetList.outerHTML);
        });
        removeButton.className = "removeMeBtn";

        editButton.className = "editMeBtn";


        ul.appendChild(removeButton);
        ul.appendChild(editButton);
        ul.appendChild(ideaTextNode)
        ul.className = "name";
        targetList.appendChild(ul);
        $(this).dialog("close");
      },
      Cancel: function () {
        $(this).dialog("close");
      }
    }
  });



});