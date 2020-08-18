const fone = document.getElementById('fone');
const email = document.getElementById('email');


fone.addEventListener('keydown', function(event){
    let content = this.value.length
  if(Number(event.key)){
      console.log(this.value, content);
  }
})
