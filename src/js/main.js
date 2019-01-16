(function() {
  // ***********************************************************************
  // Finish when feedbacks are available
  // Add click event to Feedback block switchers to change Text and Author
  var feedbackBtns = document.getElementsByClassName('feedback-btn');
  for (var i = 0; i < feedbackBtns.length; i++) {
    feedbackBtns[i].addEventListener('click', showFeedback, false);
  };
  // ***********************************************************************

  // Add click event to Volunteers extra btn
  var volunteerExtraBtn = document.getElementById('volunteer-extra-btn');
  if (volunteerExtraBtn) {
    volunteerExtraBtn.addEventListener('click', showVolunteerExtra, false);
  };
}());

// ***********************************************************************
// Finish when feedbacks are available

// Display Feedback Text and Author for curr Feedback switcher
function showFeedback() {
  // Get curr Switcher
  var feedbackElem = event.target;
  // Get all Switchers
  var allFeedbackBtns = event.srcElement.parentElement.children;
  // Remove active state for all Switchers
  for (var i = 0; i < allFeedbackBtns.length; i++) {
    allFeedbackBtns[i].classList.remove('active');
  };
  // Add active state to curr Switcher
  feedbackElem.classList.add('active');
  // Get Switcher ID to find aproppriate Feedback Text and Author
  var feedbackID = event.target.id;
  // Concat User and Volunteers feedbacks
  // var feedbacks = usersFeedback.concat(volunteersFeedback);
  var feedbacks = usersFeedback;
  // Get curr Feedback
  var feedback = getFeedback();
  function getFeedback() {
    var feedbackArr = feedbacks.filter(function(obj) {
      return obj.id == feedbackID;
    });
    return feedbackArr[0];
  };
  // Get curr Feedback Text
  var feedbackText = feedback.text;
  // Get curr Feedback Author
  var feedbackName = feedback.name;
  // Find closest Feedback Text and Author fields
  var feedbackWrapper = event.target.closest('.feedback');
  var feedbackWrapperChildren = event.target.closest('.feedback').children;
  for (var i = 0; i < feedbackWrapperChildren.length; i++) {
    if (feedbackWrapperChildren[i].classList.contains('feedback-text')) {
      var feedbackElemText = feedbackWrapperChildren[i];
    } else if (feedbackWrapperChildren[i].classList.contains('feedback-author')) {
      var feedbackElemName = feedbackWrapperChildren[i];
    };
  };
  // Assign to Feedback Text field curr Feedback Text
  feedbackElemText.innerHTML = feedbackText;
  // Assign to Feedback Author field curr Feedback Author
  feedbackElemName.innerHTML = feedbackName;
};
// ***********************************************************************

// Show extra text in Volunteers block
function showVolunteerExtra() {
  var volunteerExtraBtn = document.getElementById('volunteer-extra-btn');
  var volunteerExtra = document.getElementById('volunteer-extra');
  volunteerExtra.classList.toggle('visible');
  if (volunteerExtra.classList.contains('visible')) {
    volunteerExtraBtn.innerText = 'Read less';
  } else {
    volunteerExtraBtn.innerText = 'Read more';
  }
}

// ***********************************************************************
// Toggle menu
function toggleMenu() {
  var navToggle = document.getElementById('nav-toggle');
  var navList = document.getElementById('nav-links');
  navToggle.classList.toggle('menu-active');
  navList.classList.toggle('visible');

  navList.addEventListener('click', function() {
    navToggle.classList.remove('menu-active');
    navList.classList.remove('visible');
  });
}
