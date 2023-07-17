

function allUsers() {
  const container = document.querySelector('.all-users');
  fetch("https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/user/allusers")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const post = data.data;
      let tableHTML = `
        <table class="user-table">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Job</th>
        
            <th>Location</th>
           
            <th>Action</th>
            <th>Setting</th>
          </tr>
      `;



for (let i = post.length - 1; i >= 0; i--) {
  let user = post[i];
  let rowHTML = `
    <tr>
      <td><img src="${user.image || 'placeholder_image.jpg'}" class="user-image"></td>
      <td>${user.first_name || 'FirstName'}</td>
      <td>${user.email || 'email@example.com'}</td>
      <td>${user.phone_number || '---'}</td>
      <td>${user.job || '---'}</td>
      <td>${user.location || '---'}</td>
      <td>
        <i class="fas fa-edit update-icon" onclick="updateUser(${user.id})"></i>
        <i class="fas fa-trash delete-icon" onclick="confirmDeleteUser(${user.id})"></i>
      </td>
      <td>
        <i class="fas fa-cog setting-icon" onclick="openSettings(${user.id})"></i>
      </td>
    </tr>
  `;
  tableHTML += rowHTML;
}




      tableHTML += `</table>`;
      container.innerHTML = tableHTML;
    })
    .catch((error) => alert(error));
}

function toggleDetails(element) {
  const additionalInfo = element.querySelector('.additional-info');
  additionalInfo.classList.toggle('show');
}

function updateUser(userId) {
  // Redirect to the update-profile.html page with the user ID as a query parameter
  window.location.href = `update-profile.html?id=${userId}`;
}

function confirmDeleteUser(userId) {
  const confirmation = confirm("Are you sure you want to delete this user?");
  if (confirmation) {
    deleteUser(userId);
  }
}

async function deleteUser(userId) {
  try {
    const response = await fetch(`https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/user/deleteUser/${userId}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (response.status === 200) {
      alert(data.message);
      // Reload the page to update the user list after successful deletion.
      window.location.reload();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("An error occurred while deleting the user.");
  }
}

document.addEventListener('DOMContentLoaded', allUsers);
