// function adminHome() {
//     const container = document.querySelector('#boxesData');
//     fetch("https://family-monitoring.onrender.com/api/v1/family/calculateRemainingBudget")
    
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("balance things data ", data);
//         const post = data.data[0]; 
//         const posts = `
       
//         <div class="box box3">
//           <i class="uil uil-share"></i>
//           <span class="text">Balance</span>
//           <span class="number" id="numberThree"> ${post.remainingBudget} rwf</span>
//         </div>
     
//         `;
//         container.innerHTML += posts;
//       })
//       .catch((error) => alert(error));
//   }
  
//   document.addEventListener('DOMContentLoaded', adminHome);
  