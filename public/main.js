document.addEventListener("DOMContentLoaded", function(){
  document.getElementById('cancel').addEventListener('click', function(e) {
    e.preventDefault();
    fetch('/cancel', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      window.location.reload()
    })
  })
});
