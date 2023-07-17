function adminHome() {
    const container = document.querySelector('.boxes');
    fetch("https://family-monitoring-bn-4fb616af94fc.herokuapp.com/api/v1/expense/allexpense")
    
      .then((res) => res.json())
      .then((data) => {
        console.log("income and expense things data ", data);
        const post = data.data[0]; 
        const posts = `
       
        <div class="box box1" id="numberOne">
          <i class="uil uil-thumbs-up"></i>
          <span class="text">Income</span>
          <span class="number" > ${post.IncomeAmount} Rwf</span>
        </div>
        <div class="box box2">
          <i class="uil uil-comments"></i>
          <span class="text">Expance</span>
          <span class="number" id="numberTwo"> ${post.ExpenseAmount} Rwf</span>
        </div>
        <div class="box box3">
          <i class="uil uil-share"></i>
          <span class="text">Balance</span>
          <span class="number" id="numberThree">loading...</span>
        </div>
     
        `;
        container.innerHTML += posts;
      })
      .catch((error) => alert(error));
  }
  
  document.addEventListener('DOMContentLoaded', adminHome);
  