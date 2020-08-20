(function(win, doc){
  'use strict';

  const ajax = new XMLHttpRequest();
  const videoList = doc.querySelector('[data-js="video-list"]')
  ;
  console.log(videoList);

  function handleResponse(req){
    if (req.readyState === 4 &&  req.status === 200){
      return req.response;
    };
    return null
  };

  function getYouTubeId(youtubeURL) {
    return youtubeURL
      .replace(
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
        '$7',
      );
  };
  
  function getVideoImage(id){
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  };
  
  function generateEmbedIframe(id_video){
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id_video}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `
  }
  
  function generateVideoItem(video){
    //retornar uma <li> com a background do video, o titulo, a descrição e o link para a pagina com o video embedado 
    let id = getYouTubeId(video.url)
    let imageLink = getVideoImage(id)
    let li = `
      <li class="video-episode">
          <a 
            href=${video.url}
            target="blank"
            title="Protetivas Online"
          >
              <img class="video-image" src=${imageLink}>
          </a>
            <div class="video-text">
              <h3>Episódio ${video.id} - ${video.titulo}</h3>
              <p>${video.descricao}</p>       
            </div>
      </li>
    `
    return li;
  }

  function generateVideoList(arr, listConainer){
    arr.forEach(function(video){
      let videoItem = generateVideoItem(video);
      listConainer.innerHTML += videoItem;

    });
  }


  ajax.open('GET', 'db.json');
  ajax.send();
  ajax.addEventListener('loadend', function(){
      var data = JSON.parse(handleResponse(ajax));
      if(data)
        console.log(data)
        generateVideoList(data.videos, videoList);
      });
 

})(window, document);

