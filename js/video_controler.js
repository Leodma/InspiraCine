(function(win, doc){
  'use strict';

  const ajax = new XMLHttpRequest();
  const videoList = doc.querySelector('[data-js="video-list"]');
  const videoIframe = doc.querySelector('[data-js="video-player-box"]');
  const videoDescription = doc.querySelector('[data-js="video-description');
  let dataVideos = {};
  
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
    return `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id_video}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `
  }

  function getURLParams(){
      let videoUrl = win.location.search;
      let params = {};
      params.categoria =  Number(new URLSearchParams(videoUrl).get("projeto"));
      params.id =  Number(new URLSearchParams(videoUrl).get("ep"));
      console.log(params);
      return params;
  }

  function getVideo(id, lista){
    let video =  lista.find(obj=> obj.id === id);
      console.log('achei o video', video)
      return video;

  }
  
  function generateVideoItem(video){
    //retornar uma <li> com a background do video, o titulo, a descrição e o link para a pagina com o video embedado 
    let id = getYouTubeId(video.url)
    let imageLink = getVideoImage(id)
    let li = `
      <li class="video-episode">
          <a 
            href="episodio.html?projeto=${video.categoria}&ep=${video.id}"
            target="self"
            title="Protetivas Online"
          >
              <img class="video-image" src=${imageLink} alt="Assista ao Episódio ${video.num_episodio} da série Annelies">
          </a>
            <div class="video-text">
              <h3> ${video.titulo}</h3>
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

  function generateVideoDescription(video){
    return `
      <div> 
        <h3>${video.titulo}</h3>
        <p>${video.descricao}</p>
      </div>
      
    `
  }

  function loadVideoIframe(){
    if (win.location.href.search(/episodio.html/)){
      let params = getURLParams();
      console.log("parametros dentro do load",params);
      let video = getVideo(params.id, dataVideos);
      let id = getYouTubeId(video.url);
      videoIframe.innerHTML = generateEmbedIframe(id);
      videoDescription.innerHTML = generateVideoDescription(video);
    }
  }


  ajax.open('GET', 'db.json');
  ajax.send();
  ajax.addEventListener('loadend', function(){
      var data = JSON.parse(handleResponse(ajax));
      if(data)
        generateVideoList(data.videos, videoList);
        dataVideos = data.videos;
        console.log("dados carregados com sucesso!!");
        win.onload = loadVideoIframe();
      });
 
  


})(window, document);

