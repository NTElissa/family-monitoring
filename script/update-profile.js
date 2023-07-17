const container = document.querySelector('#update-form');

function getUpdate() {
  const formElements = {
    first_name: document.querySelector("#user-Firstname"),
    last_name: document.querySelector("#user-lastname"),
    nickname: document.querySelector("#user-nickname"),
    location: document.querySelector("#user-location"),
    phone_number: document.querySelector("#user-phonenumber"),
    image: document.querySelector("#user-image"),
    job: document.querySelector("#user-job"),
    otherFields: document.querySelector("#user-otherFields"),
    position: document.querySelector("#user-position"),
    password: document.querySelector("#user-password"),
    positionId: document.querySelector("#user-positionId"),
    confirm_password: document.querySelector("#user-confirm_password"),
  };

  const id = new URLSearchParams(window.location.search).get('id');

  fetch(`https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/user/profile/${id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(template => {
      // Populate form fields with existing data
      formElements.first_name.value = template.data.first_name;
      formElements.last_name.value = template.data.last_name;
      formElements.nickname.value = template.data.nickname;
      formElements.location.value = template.data.location;
      formElements.phone_number.value = template.data.phone_number;
      formElements.image.value = template.data.image;
      formElements.job.value = template.data.job;
      formElements.otherFields.value = template.data.otherFields;
      formElements.position.value = template.data.position;
      // Add more fields if necessary
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

async function updatePostNow() {
  const formElements = {
    first_name: document.querySelector("#user-Firstname"),
    last_name: document.querySelector("#user-lastname"),
    nickname: document.querySelector("#user-nickname"),
    location: document.querySelector("#user-location"),
    phone_number: document.querySelector("#user-phonenumber"),
    image: document.querySelector("#user-image"),
    job: document.querySelector("#user-job"),
    otherFields: document.querySelector("#user-otherFields"),
    position: document.querySelector("#user-position"),
    password: document.querySelector("#user-password"),
    positionId: document.querySelector("#user-positionId"),
    confirm_password: document.querySelector("#user-confirm_password"),
  };

  const id = new URLSearchParams(window.location.search).get('id');

  const doc = {
    first_name: formElements.first_name.value,
    last_name: formElements.last_name.value,
    nickname: formElements.nickname.value,
    location: formElements.location.value,
    phone_number: formElements.phone_number.value,
    image: formElements.image.value,
    job: formElements.job.value,
    otherFields: formElements.otherFields.value,
    position: formElements.position.value,
    password: formElements.password.value,
    confirm_password: formElements.confirm_password.value,
    positionId: formElements.positionId.value,
  };

  try {
    const response = await fetch(`https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/user/profile/${id}`, {
      method: 'PUT',
      body: JSON.stringify(doc),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    window.location.replace('user.html'); // Redirect after successful update
  } catch (error) {
    console.error('Error:', error);
    // Handle error (e.g., show error message to the user)
  }
}

container.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission
  updatePostNow(); // Call the update function
});

window.addEventListener('DOMContentLoaded', getUpdate);
